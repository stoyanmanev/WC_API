const express = require('express');
const matches = require("./matches");

const router = express.Router();

router.get("/matches", function(_, res) {
  res.json(matches);
});

module.exports = router;