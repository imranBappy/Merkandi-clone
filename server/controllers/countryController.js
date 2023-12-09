const Country = require("../models/Country");

exports.getCountries = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const currentPage = parseInt(page);
    const PER_PAGE = Number(limit);

    const countries = await Country.find()
      .populate("flag")
      .skip(PER_PAGE * currentPage - PER_PAGE)
      .limit(PER_PAGE);

    const totalCountry = await Country.countDocuments();
    res.status(200).json({
      total: totalCountry,
      countries: countries,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCountry = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res
        .status(404)
        .json({ success: false, message: "Country not found" });
    }
    res.status(200).json({ success: true, data: country });
  } catch (error) {
    next(error);
  }
};

exports.createCountry = async (req, res, next) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json({ success: true, data: country });
  } catch (error) {
    next(error);
  }
};

exports.updateCountry = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
