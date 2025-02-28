const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db-config");
connectDB();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

const userRouter = require("./routes/user-route");
const ownerRouter = require("./routes/owner-route");

app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter)

// render a test message
app.get("/", (req, res)=>{
  res.send("Backend is running...! 🚀");
});

app.listen(port, ()=>{
  console.log(`Server running on port: ${port}`)
});