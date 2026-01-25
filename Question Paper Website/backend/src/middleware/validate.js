const { validationResult, body, param, query } = require('express-validator');

// Validation result checker
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Auth validations
const registerValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('branch')
        .optional()
        .isIn(['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT', 'OTHER'])
        .withMessage('Invalid branch'),
    body('semester')
        .optional()
        .isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
    validate
];

const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    body('password')
        .notEmpty().withMessage('Password is required'),
    validate
];

// Paper validations
const paperValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
    body('subject')
        .trim()
        .notEmpty().withMessage('Subject is required'),
    body('branch')
        .notEmpty().withMessage('Branch is required')
        .isIn(['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT', 'OTHER'])
        .withMessage('Invalid branch'),
    body('semester')
        .notEmpty().withMessage('Semester is required')
        .isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
    body('year')
        .notEmpty().withMessage('Year is required')
        .isInt({ min: 2000, max: 2100 }).withMessage('Invalid year'),
    body('examType')
        .notEmpty().withMessage('Exam type is required')
        .isIn(['mid-term', 'end-term', 'supplementary', 'internal'])
        .withMessage('Invalid exam type'),
    validate
];

// Query validations
const papersQueryValidation = [
    query('branch')
        .optional()
        .isIn(['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT', 'OTHER'])
        .withMessage('Invalid branch'),
    query('semester')
        .optional()
        .isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
    query('year')
        .optional()
        .isInt({ min: 2000, max: 2100 }).withMessage('Invalid year'),
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be positive'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
    validate
];

const searchValidation = [
    query('q')
        .trim()
        .notEmpty().withMessage('Search query is required')
        .isLength({ min: 2 }).withMessage('Search query must be at least 2 characters'),
    validate
];

module.exports = {
    validate,
    registerValidation,
    loginValidation,
    paperValidation,
    papersQueryValidation,
    searchValidation
};
