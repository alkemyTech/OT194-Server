const db = require('../../database/models');
const User = db.User;

module.exports = async (req, res) => {
  const id = req.params.id;

  if (req.user.id !== id && req.user.roleId !== 2) {
    return res.status(401).json({ message: 'No tiene permisos para eliminar a ese usuario' });
  }

  try {
    await User.destroy({ where: { id } });

    res.status(200).json({ message: 'El usuario fue eliminado' });
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({ message: 'Error del servidor, contacte al administrador' });
  }
};
