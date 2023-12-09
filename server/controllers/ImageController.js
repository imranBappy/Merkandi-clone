const Image = require("../models/Image");

exports.createImage = async (req, res, next) => {
  try {
    const { name, url } = req.body;
    const newImage = new Image({ name, url });
    const image = await newImage.save();
    res.status(201).json(image);
  } catch (error) {
    next(error);
  }
};

exports.createImages = async (req, res, next) => {
  try {
    const newImages = await Image.insertMany(req.body);
    res.status(201).json(newImages);
  } catch (error) {
    next(error);
  }
};

exports.getImages = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query?.page) || 1;
    const PER_PAGE = 40;
    const images = await Image.find()
      .skip(PER_PAGE * currentPage - PER_PAGE)
      .limit(PER_PAGE)
      .sort({ createdAt: -1 });
    const total = await Image.countDocuments();
    res.status(200).json({
      data: images,
      total: total,
      page: currentPage,
    });
  } catch (error) {}
};

exports.searchImage = async (req, res, next) => {
  const term = req.query.term;
  const currentPage = parseInt(req.query?.page) || 1;
  const PER_PAGE = 10;
  try {
    const images = await Image.find({
      $text: { $search: term },
    })
      .skip(PER_PAGE * currentPage - PER_PAGE)
      .limit(PER_PAGE);
    const total = await Image.countDocuments({
      $text: { $search: term },
    });
    res.status(200).json({
      total: total,
      data: images,
      page: currentPage,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

exports.getImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.status(200).json(image);
  } catch (error) {
    next(error);
  }
};

exports.updateImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;
    const image = await Image.findByIdAndUpdate(
      id,
      { name, url },
      { new: true }
    );
    res.status(200).json(image);
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Image.findByIdAndDelete(id);
    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    next(error);
  }
};
