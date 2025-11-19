const validateEmail = (req, res, next) => {
    const { email } = req.params;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // check if email exists and matches the pattern
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'valid email address is required in the correct format (example@domain.com)'
        });
    }
    
    next();
};

module.exports = {
    validateEmail
};