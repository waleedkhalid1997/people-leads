const express = require("express");
const usersRoutes = require('./leadsRoutes.js');
const router = express.Router();   

router.use("/leads", usersRoutes);

  
module.exports = router;
