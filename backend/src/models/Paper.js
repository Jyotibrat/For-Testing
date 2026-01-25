const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        index: true
    },
    subjectCode: {
        type: String,
        trim: true
    },
    branch: {
        type: String,
        required: [true, 'Branch is required'],
        enum: ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT', 'OTHER'],
        index: true
    },
    semester: {
        type: Number,
        required: [true, 'Semester is required'],
        min: 1,
        max: 8,
        index: true
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: 2000,
        max: 2100,
        index: true
    },
    examType: {
        type: String,
        required: [true, 'Exam type is required'],
        enum: ['mid-term', 'end-term', 'supplementary', 'internal'],
        default: 'end-term'
    },
    pdfUrl: {
        type: String,
        required: [true, 'PDF URL is required']
    },
    publicId: {
        type: String,
        required: [true, 'Cloudinary public ID is required']
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    downloads: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
        trim: true
    }],
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Text index for search
paperSchema.index({
    title: 'text',
    subject: 'text',
    tags: 'text',
    description: 'text'
});

// Compound index for common queries
paperSchema.index({ branch: 1, semester: 1, year: -1 });

// Virtual for formatted exam type
paperSchema.virtual('examTypeFormatted').get(function () {
    const types = {
        'mid-term': 'Mid Term',
        'end-term': 'End Term',
        'supplementary': 'Supplementary',
        'internal': 'Internal'
    };
    return types[this.examType] || this.examType;
});

// Static method to get popular papers
paperSchema.statics.getPopular = function (limit = 10) {
    return this.find({ isActive: true })
        .sort({ downloads: -1, views: -1 })
        .limit(limit)
        .select('title subject branch semester year pdfUrl downloads views');
};

// Static method to get recent papers
paperSchema.statics.getRecent = function (limit = 10) {
    return this.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('title subject branch semester year pdfUrl createdAt');
};

module.exports = mongoose.model('Paper', paperSchema);
