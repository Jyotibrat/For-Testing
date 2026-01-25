const Paper = require('../models/Paper');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res, next) => {
    try {
        const [
            totalPapers,
            totalUsers,
            totalDownloads,
            totalViews,
            recentPapers,
            topPapers,
            branchStats,
            monthlyUploads
        ] = await Promise.all([
            Paper.countDocuments({ isActive: true }),
            User.countDocuments({ isActive: true, role: 'student' }),
            Paper.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: null, total: { $sum: '$downloads' } } }
            ]),
            Paper.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: null, total: { $sum: '$views' } } }
            ]),
            Paper.find({ isActive: true })
                .sort({ createdAt: -1 })
                .limit(5)
                .select('title subject branch createdAt')
                .lean(),
            Paper.find({ isActive: true })
                .sort({ downloads: -1 })
                .limit(5)
                .select('title subject downloads views')
                .lean(),
            Paper.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: '$branch', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            Paper.aggregate([
                { $match: { isActive: true } },
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { '_id.year': -1, '_id.month': -1 } },
                { $limit: 12 }
            ])
        ]);

        res.json({
            success: true,
            data: {
                overview: {
                    totalPapers,
                    totalUsers,
                    totalDownloads: totalDownloads[0]?.total || 0,
                    totalViews: totalViews[0]?.total || 0
                },
                recentPapers,
                topPapers,
                branchStats,
                monthlyUploads: monthlyUploads.reverse()
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users (admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, role } = req.query;

        const query = {};
        if (role) query.role = role;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [users, total] = await Promise.all([
            User.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .select('-password')
                .lean(),
            User.countDocuments(query)
        ]);

        res.json({
            success: true,
            data: {
                users,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle user status
// @route   PUT /api/admin/users/:id/toggle
// @access  Private/Admin
const toggleUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent deactivating self
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                success: false,
                message: 'Cannot deactivate your own account'
            });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.json({
            success: true,
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create admin user
// @route   POST /api/admin/users/admin
// @access  Private/Admin
const createAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: 'admin'
        });

        res.status(201).json({
            success: true,
            message: 'Admin user created successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStats,
    getUsers,
    toggleUserStatus,
    createAdmin
};
