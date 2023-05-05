const jwt = require("jsonwebtoken");

const   tokenVerify = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log( "<><><><><><><><><><><>");

  if (!token) {
    console.log('token not found');
    res
      .status(401)
      // .sent({ status: "failed", message: "You Need To Be Authenticated" });
  } else {
    console.log('token founded');
    jwt.verify(token, process.env.JWT_SECREAT_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({
          auth: false,
          status: "failed",
          message: "Authentication Failed",
        });
      } else {
        console.log(decoded.userId);
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

module.exports = {
  tokenVerify,
};
