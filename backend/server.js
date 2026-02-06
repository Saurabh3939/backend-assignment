require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://primebackend-swart.vercel.app/login",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`App Is Listening On Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
