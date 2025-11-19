const validatePasswordUpdate = (req, res, next) => {
    const { currentPass, newPass } = req.body;
    
    // check if both passwords are provided
    if (!currentPass || !newPass) {
        return res.status(400).json({
            success: false,
            error: 'both current password and new password are required for password update'
        });
    }
    
    // validate new password length
    if (newPass.length < 6) {
        return res.status(400).json({
            success: false,
            error: 'new password must be at least 6 characters long for security'
        });
    }
    
    // check if new password is different from current password
    if (currentPass === newPass) {
        return res.status(400).json({
            success: false,
            error: 'new password must be different from current password'
        });
    }
    
    next();
};

module.exports = {
    validatePasswordUpdate
};