const express = require('express');
const router = express.Router();

router.get("/harmonytest", (req, res) => {
  res.json({msg: 'this is the user route'})
});


module.exports = router;