const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const verifyToken = require("./middleware/verifyToken");
const dotenv = require("dotenv").config();

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.use(verifyToken);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
