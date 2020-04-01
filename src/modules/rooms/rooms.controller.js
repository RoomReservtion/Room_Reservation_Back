module.exports = ({ db }) => {
  const Op = db.Sequelize.Op;

  const roomsController = {
    async get(req, res) {
      let rooms = await db.rooms.findAll({
        include: [
          { association: 'Place' },
        ],
      });
      return rooms;
    },
    async getByName(req, res) {
      let name = req.params.name;
      let rooms = await db.rooms.findAll({
        include: [
          { association: 'Place' },
        ],
        where:{name}
      });
      return rooms;
    },
    async create(req, res) {
      const place = req.body;
      await db.invoice.create(place);
    },
    async change(req, res) {
      const changes = req.body;
      await db.places.insert(changes);
    },
    async delete(req,res) {
      await db.places.destroy(req.params.id);
    } 
  };
  return roomsController;
};
