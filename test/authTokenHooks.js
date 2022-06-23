const { before, after } = require('mocha');
const { User } = require('../database/models');
const generateToken = require('../functions/generateToken');

before(async () => {
  const userCreated = await User.create({
    id: '3168c982-db30-4395-b663-4af0737428ac',
    firstName: 'testing',
    lastName: 'admin',
    email: 'testingadming@mail.com',
    password: '123456',
    roleId: 2
  });

  const token = await generateToken(userCreated.id);
  process.env.USER_AUTH_TOKEN = token;
});

after(async () => {
  await User.destroy({
    where: { id: '3168c982-db30-4395-b663-4af0737428ac' }
  });
});
