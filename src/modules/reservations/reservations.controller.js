module.exports = ({ db }) => {
  const Op = db.Sequelize.Op;

  const groupExpensesByAccountCode = async (expenses) => {
    const LineItemIDs = expenses.map((expense) => expense.SourceLineItemID);
    const groupedExpenses = await db.invoice_line_item.findAll({
      raw: true,
      attributes: [
        [db.sequelize.fn('sum', db.sequelize.col('line_amount')), 'LineAmount'],
        [db.sequelize.fn('count', db.sequelize.col('account_code')), 'Quantity'],
      ],
      include: [{
        attributes: ['name', 'code'],
        association: 'Account',
      }],
      where: { line_item_id: { [Op.in]: LineItemIDs } },
      group: ['account_code', 'Account.name'],
    });
    return groupedExpenses;
  };

  const invoiceController = {
    async retrieveInvoices(req, res) {
      const IfModifiedSince = new Date();
      IfModifiedSince.setDate(IfModifiedSince.getDate() - 1);
      await XeroProxy.update(IfModifiedSince);
    },
    async getInvoicesHistory(req, res) {
      let meruInvoiceLineItems = await db.invoice.findAll({
        include: [
          { association: 'Contact' },
          {
            association: 'LineItems',
            required: true,
            include: [
              { association: 'Account' },
              {
                association: 'MeruLineItem',
                required: true,
                include: [
                  {
                    association: 'LineItemExpenses',
                    include: [
                      {
                        association: 'SourceLineItem',
                        include: [
                          { association: 'Account' },
                          {
                            association: 'Invoice',
                            include: [
                              {
                                association: 'Contact'
                              }]
                          }]
                      }]
                  }]
              }]
          }
        ],
        where: {
          Status: { [Op.notIn]: ['VOIDED', 'DELETED'] },
          InvoiceID: { [Op.in]: db.Sequelize.literal('(SELECT DISTINCT `meru_invoice_line_items`.`invoice_id` FROM `meru_invoice_line_items`)') }
        },
        order: [['date_string', 'DESC']],
      });
      return meruInvoiceLineItems;
    },
    async createXeroExpenses(req, res) {

      const { invoice_id } = req.params;
      const { expenses } = req.body;
      let arrayDestroy = [], arrayCreate = [];

      let Invoice = await InvoicesProxy.getById(invoice_id);
      const originalLineItemIds = Invoice.LineItems.map(LineItem => LineItem.LineItemID);

      const groupedExpenses = await groupExpensesByAccountCode(expenses);
      await addLineItemsToInvoice(Invoice, groupedExpenses);
      Invoice = await InvoicesProxy.update(Invoice);

      const newLineItems = filterNewLineItems(Invoice.LineItems, originalLineItemIds);
      await insertLineItemsInfo(groupedExpenses, newLineItems, invoice_id);
      augumentExpenses(expenses, invoice_id, newLineItems);
      await LinkedTransactionsProxy.update(expenses);

      arrayDestroy.push(db.invoice.destroy({ where: { InvoiceID: invoice_id } }));
      arrayDestroy.push(db.invoice_line_item.destroy({
        where: {
          LineItemID: { [Op.in]: Invoice.LineItems.map(LineItem => LineItem.LineItemID) }
        }
      }));
      arrayDestroy.push(db.linked_transaction.destroy({
        where: {
          LinkedTransactionID: { [Op.in]: expenses.map(expense => expense.LinkedTransactionID) }
        }
      }));
      await Promise.all(arrayDestroy);
      Invoice.ContactID = Invoice.Contact.ContactID;
      Invoice.LineItems.forEach(LineItem => LineItem.InvoiceID = Invoice.InvoiceID);
      arrayCreate.push(db.invoice.create(Invoice));
      arrayCreate.push(db.invoice_line_item.bulkCreate(Invoice.LineItems));
      arrayCreate.push(db.linked_transaction.bulkCreate(expenses));
      await Promise.all(arrayCreate);
    },
  };
  return invoiceController;
};
