const userService = require('../services/userService');
const { logError } = require('../utils/logger');

class UserProfileController {
    // create user
    async saveUser(req, res) {
        try {
            const result = await userService.saveUser(req.body);
            
            if (result.existing) {
                return res.status(200).json({
                    message: result.message,
                    user: true
                });
            }
            
            res.status(201).json(result.result);
            
        } catch (error) {
            logError('Error in saveUser controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'Failed to save user',
                message: error.message
            });
        }
    }

    // Get user profile
    async getUserProfile(req, res) {
        try {
            const { email } = req.params;
            const result = await userService.getUserProfile(email);
            
            if (!result.success) {
                return res.status(404).json({
                    success: false,
                    message: result.message
                });
            }
            
            res.status(200).json(result.user);
            
        } catch (error) {
            logError('Error in getUserProfile controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'Failed to get user profile',
                message: error.message
            });
        }
    }

    // Update user profile
    async updateUserProfile(req, res) {
        try {
            const { email } = req.params;
            const result = await userService.updateUserProfile(email, req.body);
            
            if (!result.success) {
                return res.status(404).json({
                    success: false,
                    message: result.message
                });
            }
            
            res.status(200).json({
                success: true,
                message: result.message,
                result: result.result
            });
            
        } catch (error) {
            logError('Error in updateUserProfile controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'Failed to update user profile',
                message: error.message
            });
        }
    }

    // Update password
    async updatePassword(req, res) {
        try {
            const { email } = req.params;
            const { currentPass, newPass } = req.body;
            
            const result = await userService.updatePassword(email, currentPass, newPass);
            
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            
            res.status(200).json({
                success: true,
                message: result.message,
                result: result.result
            });
            
        } catch (error) {
            logError('Error in updatePassword controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'Failed to update password',
                message: error.message
            });
        }
    }
};

module.exports = new UserProfileController();