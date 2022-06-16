const { Entries } = require('../../database/models');

module.exports = async (req, res) => {
  const entryId = req.params.id;
  const newEntry = req.body;
  console.log(newEntry.name);
  try {
    const entryDb = await Entries.findByPk(entryId);

    if (!entryDb) {
      return res.status(404).json({
        message: `No se encontró una novedad para el id ${entryId}`
      });
    }
    const updateEntryNew = {
      name: newEntry.name,
      content: newEntry.content,
      type: newEntry.type,
      image: newEntry.image
    };

    await entryDb.update(updateEntryNew);

    console.log(entryDb);
    res.json(entryDb);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error del servidor'
    });
  }
};
