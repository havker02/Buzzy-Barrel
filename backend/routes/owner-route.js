const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
  res.send("owner route")
})

router.post("/register", async (req, res) => {
  res.status(200).json({message: "owner created"})
})

module.exports = router;