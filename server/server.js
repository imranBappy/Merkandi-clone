const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandle } = require("./middlewares/errorHandle");
const setRoutes = require("./routes");
const setMiddlewares = require("./middlewares");
const app = express();
const cors = require("cors");
const Product = require("./models/Product");

dotenv.config({ path: "./config/.env" });

// connect Database
connectDB();

//static file
app.use(express.static(__dirname + "\\public"));
app.use(cors());
//set middlewares
setMiddlewares(app);

app.get("/test", async (req, res) => {
  try {
    const products = await Product.find({
      // label: { $in: ["new", "hot"] },
      // multiple brands
      brand: { $in: ["65649e416cd9998fd5932c4a", "656b34c4b79b5d8a7f5465fa"] },
    });
    console.log(products.length);
    res.status(200).json(products);
  } catch (error) {}
});

// all routes set here
setRoutes(app);

// handle Error
app.use(errorHandle);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
