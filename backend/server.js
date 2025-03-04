const express = require("express");
require("dotenv").config();
const PORT=8080;
const cors = require("cors");

const userRoutes = require("./routes/user");
const otpRoutes=require("./routes/otp");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("<h1>E-Commerce API Running</h1>"));
app.use("/users", userRoutes);
app.use("/otp",otpRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));