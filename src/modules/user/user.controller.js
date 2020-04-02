module.exports = ({ db }) => {
  const userController = {
      async get(req, res) {
        return db.users.findAll({
          include: [
            { association: 'Reservations' },
          ],     
      })},
      async getByName(req, res) {
        let name = req.params.name;
        return await db.users.find({
          include: [
            { association: 'Reservation' },
          ],     
          where:{name}
        })
      },
      async create(req, res) {
        const place = req.body;
        await db.users.create(place);
      },
      async change(req, res) {
        const changes = req.body;
        await db.users.insert(changes);
      },
      async delete(req,res) {
        await db.users.destroy(req.params.id);
      } 
    };
  return userController;
};
  