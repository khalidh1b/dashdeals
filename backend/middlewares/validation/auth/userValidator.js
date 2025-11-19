const validateUserData = (req, res, next) => {
    const { name, email } = req.body;
    
    // validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            error: 'valid name is required (minimum 2 characters, no special characters only)'
        });
    }
    
    // email regex pattern for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // validate email format
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'valid email address is required in the correct format (example@domain.com)'
        });
    }
    
    next();
};

module.exports = {
    validateUserData
};