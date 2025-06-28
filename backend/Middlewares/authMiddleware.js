import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1];
    
    //  When there is a token they are logged in
    //  therefore no token, not logged in
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. Please log in to continue,'
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("token info", decodedToken);

        req.userInfo = decodedToken;
        next();
        
    } catch (error) {
       return res.status(500).json({
            success: false,
            message: 'Access denied. Please log in to continue,'
        }); 
    }
    
};

export default authMiddleware;