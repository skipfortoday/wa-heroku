const express = require("express");
const app = express();
const product = require("./api/product");
const cors = require("cors");
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json({ extended: false }));

app.use("/api/product", product);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
