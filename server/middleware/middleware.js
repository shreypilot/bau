
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

module.exports = router;
