const userAuth = (req, res, next) => {
  const jwtToken = "abc";
  const isUserAuthored = jwtToken === req.body?.auth;
  if (false) {
    res.status(401).send("Please Login to test and validate this Data");
  } else next();
};

const adminAuth = (req, res, next) => {
  const jwtToken = "abc";
  const isUserAuthored = jwtToken === req.body?.auth;
  if (!jwtToken) {
    res.status(401).send("Please Login to test and validate this Data");
  } else {
    next();
  }
};

module.exports = { userAuth, adminAuth };
