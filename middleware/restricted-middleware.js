module.exports = (req, res, next) => {
  console.log(req.url, 'req.url');
  const restrictAccess = req.url.includes('restricted');
  console.log(restrictAccess, 'restrict?');
  if(restrictAccess) {
    if(req.session && req.session.username) {
      next();
      // so no matter who it is, so long as they have the session props, we will pass them
    } else {
      res.status(400).json({ message: `status 400: missing cookie credentials` })
    }
  } else {
    next();
  }
}