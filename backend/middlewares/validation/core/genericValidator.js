const validate = (validatorFn, source = 'body') => {
    return (req, res, next) => {
        try {
            const data = source === 'params' ? req.params : 
                        source === 'query' ? req.query : 
                        req.body;
            
            const validation = validatorFn(data);
            
            // handle validation failure
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    error: validation.error,
                    details: validation.details
                });
            }
            
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: 'validation error occurred',
                message: error.message
            });
        }
    };
};

module.exports = {
    validate
};