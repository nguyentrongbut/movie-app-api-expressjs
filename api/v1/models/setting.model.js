const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    name: String,
    email: String,
    logo: String,
    favicon: String,
    copyright: String,
    seo_title: String,
    seo_description: String,
    phone: String,
    deleted: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

const Setting = mongoose.model('Setting', settingSchema, "settings");

module.exports = Setting;