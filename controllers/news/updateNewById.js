const { Entries } = require('../../database/models');

module.exports = async (req, res) => {
  const entryId = req.params.id;
  const infNewEntry = req.body;

  try {
    let newEntryId = await Entries.findOne({
      raw: true,
      where: { id: entryId }
    });

    if (!newEntryId) {
      return res.status(404).json({
        message: `No se encontró una novedad para el id ${entryId}`
      });
    } else {
      const updateEntryNew = {
        name: infNewEntry.name,
        content: infNewEntry.content,
        categoryId: infNewEntry.categoryId,
        type: infNewEntry.type,
        image: infNewEntry.image
      };

      await Entries.update(updateEntryNew, { where: { id: entryId } });
      newEntryId = await Entries.findOne({
        raw: true,
        where: { id: entryId }
      });
      console.log('updateNew', newEntryId);
      res.json(newEntryId);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error del servidor'
    });
  }
};
