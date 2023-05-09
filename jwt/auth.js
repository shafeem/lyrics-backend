const jwt = require("jsonwebtoken");

const   tokenVerify = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log('token not found');
    res
      .status(401)
      // .sent({ status: "failed", message: "You Need To Be Authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECREAT_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({
          auth: false,
          status: "failed",
          message: "Authentication Failed",
        });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

module.exports = {
  tokenVerify,
};
