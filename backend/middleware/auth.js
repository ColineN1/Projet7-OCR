const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
       const userId = decodedToken.userId;
       const admin = decodedToken.admin;
       const author = decodedToken.author;
       req.auth = {
           userId, admin, author
       };
	next();
   } catch(error) {
       res.status(401).json({ error: error || "Requête non authentifiée !" });
   }
};