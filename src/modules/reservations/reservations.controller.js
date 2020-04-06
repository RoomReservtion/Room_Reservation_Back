module.exports = ({db}) => {
    const Op = db.Sequelize.Op;

    const reservationsController = {
        async get(req, res) {
            let reservations = await db.reservations.findAll({
                include: [
                    {association: 'User'},
                    {association: 'Place'},
                    {association: 'Room'},
                ],
            });
            return reservations;
        },
        async getByName(req, res) {
            let name = req.params.name;
            return await db.reservations.find({
                include: [
                    {association: 'User'},
                    {association: 'Place'},
                    {association: 'Room'},
                ],
                where: {name}
            })
        },
        async create(req, res) {
            const place = req.body;
            await db.reservations.create(place);
        },
        async change(req, res) {
            const changes = req.body;
            await db.reservations.insert(changes);
        },
        async delete(req, res) {
            await db.reservations.destroy(req.params.id);
        }
    };
    return reservationsController;
};
