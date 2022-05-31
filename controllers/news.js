const { Entries } = require('../models/entries');

const newsController = async (_req, res) => {
  try {
    const newsData = await Entries.findAll({});
    res.status(200).json(newsData);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = { newsController };
