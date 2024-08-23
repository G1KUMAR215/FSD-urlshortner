const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Url', UrlSchema);
