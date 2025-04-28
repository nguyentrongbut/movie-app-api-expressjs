const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: '',
    },
    description: String,
    status: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true,
});
const Category = mongoose.model('Category', categorySchema, "category");

module.exports = Category;