const express = require("express");
const bodyParser = require('body-parser');
const validate = require('../middleware/validate');
const userSchema = require('../validations/usersValidation');


const {
    createNewLead,
    
} = require("../controllers/leadController");

const router = express.Router();

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

router.use(bodyParser.json())

// http://localhost:3000/api/v1/users/
router
  .route("/")
  .post(createNewLead)




module.exports = router;