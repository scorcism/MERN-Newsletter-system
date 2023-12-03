const express = require("express");
const { health } = require("../../controllers/contact.controller");

const router = express.Router();

router.get("/health", health)


module.exports = router;

