module.exports = async (req, res) => {
  const { firstName, lastName, email, image, roleId } = req.user;

  const userData = {
    firstName,
    lastName,
    email,
    image,
    roleId
  };

  res.status(200).json(userData);
};
