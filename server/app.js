
const express = require("express");
const middleware = require("./middleware/middleware");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const app = express();

app.use(middleware);
app.use("/", authRoutes);
app.use("/", userRoutes);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
