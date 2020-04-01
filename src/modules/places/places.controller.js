module.exports = ({ db }) => {
  const Op = db.Sequelize.Op;

  const placeController = {
    async get(req, res) {
      let places = await db.places.findAll({
        include: [
          { association: 'Rooms' },
        ],
      });
      return places;
    },
    async getByName(req, res) {
      let name = req.params.name;
      return await db.places.find({
        include: [
          { association: 'Reservations' },
        ],     
        where:{name}
      })
    },
    async create(req, res) {
      const place = req.body;
      await db.places.create(place);
    },
    async change(req, res) {
      const changes = req.body;
      await db.places.insert(changes);
    },
    async delete(req,res) {
      await db.places.destroy(req.params.id);
    } 
  };
  return placeController;
};
