const express = require('express');
const {matches} = require("./matches");

const router = express.Router();

router.get("/matches", async function(_, res) {
  const responseData = await matches();
  res.json(responseData);
});

module.exports = router;