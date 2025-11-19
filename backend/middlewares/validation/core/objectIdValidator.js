const validateObjectId = (paramName = 'id') => {
    return (req, res, next) => {
        const { [paramName]: id } = req.params;
        
        // check if id exists and is a string
        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                error: `valid ${paramName} is required and must be a string`
            });
        }
        
        // validate objectid format
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(id)) {
            return res.status(400).json({
                success: false,
                error: `invalid ${paramName} format - must be a valid mongodb objectid`
            });
        }
        
        next();
    };
};

module.exports = {
    validateObjectId
};