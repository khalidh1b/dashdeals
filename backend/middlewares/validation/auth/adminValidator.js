const validateAdminAccess = (req, res, next) => {
    const user = req.user || req.decoded;
    
    // check if user exists and has admin privileges
    if (!user || !user.isAdmin) {
        return res.status(403).json({
            success: false,
            error: 'admin privileges required to access this resource',
            message: 'this endpoint is restricted to administrators only'
        });
    }
    
    next();
};

module.exports = {
    validateAdminAccess
};