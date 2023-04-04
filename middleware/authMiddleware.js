const adminFirebase = require("../config/config").db;

const decodeFirebaseIdToken = async (req, res, next) => {

  console.log("actual URL :" , req.host + req.port + req.originalUrl)
  if (!req.headers?.authorization?.startsWith('Bearer ')) {
    return res.status(400).json({
      error: {
        message: 'You did not specify any idToken for this request'
      },
    });
  }

  try {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const userPayload = await adminFirebase.auth().verifyIdToken(idToken);

    req.user = userPayload;
    //console.log("req.user : ", req.user)

    next();
  } catch (error) {
    console.log("Auth Error", error);
    return res.status(500).json({
      error,
    });
  }
};

// Checks if a user is authenticated from firebase admin
const checkIfAuthenticated = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({
      error: {
        message: 'You are not authorised to perform this action. SignUp/Login to continue'
      }
    });
  }
};

module.exports = {
  decodeFirebaseIdToken,
  checkIfAuthenticated,
};