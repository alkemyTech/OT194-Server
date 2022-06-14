const { Entries } = require('../../database/models');

module.exports = async (req, res) => {
  const { name, content, image, categoryId, deletedAt } = req.body;
  const type = 'news';
  try {
    const newCreated = await Entries.create({
      name,
      content,
      image,
      categoryId,
      deletedAt,
      type
    });
    if (!newCreated) {
      return res.status(404).json({
        message: 'Surgio un problema con el servidor, comuniquese con el Administrador '
      });
    };
    res.status(200).json(newCreated);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
