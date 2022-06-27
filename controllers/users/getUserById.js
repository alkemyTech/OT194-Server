const { User } = require('../../database/models');

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      attributes: {
        exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt']
      },
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'No hay un usuario con ese id'
      });
    };

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
