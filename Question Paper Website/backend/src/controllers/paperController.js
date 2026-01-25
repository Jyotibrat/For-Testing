const Paper = require('../models/Paper');
const cloudinary = require('../config/cloudinary');
const { clearCachePattern } = require('../config/redis');

// @desc    Get all papers with filters
// @route   GET /api/papers
// @access  Public
const getPapers = async (req, res, next) => {
    try {
        const {
            branch,
            semester,
            year,
            examType,
            subject,
            page = 1,
            limit = 12,
            sort = '-createdAt'
        } = req.query;

        // Build query
        const query = { isActive: true };

        if (branch) query.branch = branch;
        if (semester) query.semester = parseInt(semester);
        if (year) query.year = parseInt(year);
        if (examType) query.examType = examType;
        if (subject) query.subject = new RegExp(subject, 'i');

        // Execute query with pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [papers, total] = await Promise.all([
            Paper.find(query)
                .sort(sort)
                .skip(skip)
                .limit(parseInt(limit))
                .populate('uploadedBy', 'name')
                .lean(),
            Paper.countDocuments(query)
        ]);

        res.json({
            success: true,
            data: {
                papers,
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

// @desc    Get single paper
// @route   GET /api/papers/:id
// @access  Public
const getPaper = async (req, res, next) => {
    try {
        const paper = await Paper.findById(req.params.id)
            .populate('uploadedBy', 'name');

        if (!paper) {
            return res.status(404).json({
                success: false,
                message: 'Paper not found'
            });
        }

        // Increment view count
        paper.views += 1;
        await paper.save();

        res.json({
            success: true,
            data: { paper }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create paper (upload)
// @route   POST /api/papers
// @access  Private/Admin
const createPaper = async (req, res, next) => {
    try {
        const { title, subject, subjectCode, branch, semester, year, examType, tags, description } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a PDF file'
            });
        }

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'raw',
                    folder: 'question-papers',
                    format: 'pdf'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        // Create paper
        const paper = await Paper.create({
            title,
            subject,
            subjectCode,
            branch,
            semester: parseInt(semester),
            year: parseInt(year),
            examType,
            pdfUrl: result.secure_url,
            publicId: result.public_id,
            uploadedBy: req.user.id,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            description
        });

        // Clear cache
        await clearCachePattern('papers:*');

        res.status(201).json({
            success: true,
            message: 'Paper uploaded successfully',
            data: { paper }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update paper
// @route   PUT /api/papers/:id
// @access  Private/Admin
const updatePaper = async (req, res, next) => {
    try {
        const { title, subject, subjectCode, branch, semester, year, examType, tags, description } = req.body;

        let paper = await Paper.findById(req.params.id);

        if (!paper) {
            return res.status(404).json({
                success: false,
                message: 'Paper not found'
            });
        }

        // Update fields
        paper.title = title || paper.title;
        paper.subject = subject || paper.subject;
        paper.subjectCode = subjectCode || paper.subjectCode;
        paper.branch = branch || paper.branch;
        paper.semester = semester ? parseInt(semester) : paper.semester;
        paper.year = year ? parseInt(year) : paper.year;
        paper.examType = examType || paper.examType;
        paper.description = description || paper.description;

        if (tags) {
            paper.tags = tags.split(',').map(tag => tag.trim());
        }

        await paper.save();

        // Clear cache
        await clearCachePattern('papers:*');

        res.json({
            success: true,
            message: 'Paper updated successfully',
            data: { paper }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete paper
// @route   DELETE /api/papers/:id
// @access  Private/Admin
const deletePaper = async (req, res, next) => {
    try {
        const paper = await Paper.findById(req.params.id);

        if (!paper) {
            return res.status(404).json({
                success: false,
                message: 'Paper not found'
            });
        }

        // Delete from Cloudinary
        try {
            await cloudinary.uploader.destroy(paper.publicId, { resource_type: 'raw' });
        } catch (cloudinaryError) {
            console.error('Cloudinary delete error:', cloudinaryError);
        }

        await Paper.findByIdAndDelete(req.params.id);

        // Clear cache
        await clearCachePattern('papers:*');

        res.json({
            success: true,
            message: 'Paper deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Track download
// @route   POST /api/papers/:id/download
// @access  Public
const trackDownload = async (req, res, next) => {
    try {
        const paper = await Paper.findByIdAndUpdate(
            req.params.id,
            { $inc: { downloads: 1 } },
            { new: true }
        );

        if (!paper) {
            return res.status(404).json({
                success: false,
                message: 'Paper not found'
            });
        }

        res.json({
            success: true,
            data: { pdfUrl: paper.pdfUrl }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get popular papers
// @route   GET /api/papers/popular
// @access  Public
const getPopularPapers = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const papers = await Paper.getPopular(limit);

        res.json({
            success: true,
            data: { papers }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get recent papers
// @route   GET /api/papers/recent
// @access  Public
const getRecentPapers = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const papers = await Paper.getRecent(limit);

        res.json({
            success: true,
            data: { papers }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search papers
// @route   GET /api/search
// @access  Public
const searchPapers = async (req, res, next) => {
    try {
        const { q, branch, semester, limit = 20 } = req.query;

        const query = {
            isActive: true,
            $text: { $search: q }
        };

        if (branch) query.branch = branch;
        if (semester) query.semester = parseInt(semester);

        const papers = await Paper.find(query, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .limit(parseInt(limit))
            .select('title subject branch semester year pdfUrl')
            .lean();

        res.json({
            success: true,
            data: {
                papers,
                count: papers.length
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get autocomplete suggestions
// @route   GET /api/search/autocomplete
// @access  Public
const getAutocompleteSuggestions = async (req, res, next) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 2) {
            return res.json({
                success: true,
                data: { suggestions: [] }
            });
        }

        // Get unique subjects and titles matching the query
        const [subjects, papers] = await Promise.all([
            Paper.distinct('subject', {
                subject: new RegExp(q, 'i'),
                isActive: true
            }),
            Paper.find({
                title: new RegExp(q, 'i'),
                isActive: true
            })
                .select('title')
                .limit(5)
                .lean()
        ]);

        const suggestions = [
            ...subjects.slice(0, 5).map(s => ({ type: 'subject', value: s })),
            ...papers.map(p => ({ type: 'paper', value: p.title, id: p._id }))
        ];

        res.json({
            success: true,
            data: { suggestions }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPapers,
    getPaper,
    createPaper,
    updatePaper,
    deletePaper,
    trackDownload,
    getPopularPapers,
    getRecentPapers,
    searchPapers,
    getAutocompleteSuggestions
};
