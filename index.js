
// settings
const dotenv = require('dotenv');
dotenv.config();

const express  = require('express');
const app = express();

// Routes
const authRoute = require("./routes/auth");
const ordersRoute = require("./routes/orders");

// Cors
const cors = require('cors');

// MongoDB connect
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DataBase connected!"))
    .catch((e) => console.log(e));

// Middleware
app.use(express.json()); // Parser
app.use(cors()); // Save API URL;

// Routes setup
app.use("/api/auth", authRoute);
app.use("/api/orders", ordersRoute);

// Start app
app.listen(process.env.PORT || 5000, () => console.log("Server is running"));