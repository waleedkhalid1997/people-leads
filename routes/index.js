const router = require('express').Router();
const usersRoutes = require('./leadsRoutes.js');
const loginRoutes = require('./loginRoutes.js');

router.use("/leads", usersRoutes);
router.use("/login", loginRoutes);

  
module.exports = router;
