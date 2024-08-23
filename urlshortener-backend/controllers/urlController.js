const Url = require('../models/Url');
const shortid = require('shortid');

exports.shortenUrl = async (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = shortid.generate();

    try {
        const newUrl = new Url({
            longUrl,
            shortUrl,
            user: req.user.id
        });
        await newUrl.save();

        res.status(201).json({ shortUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (!url) return res.status(404).json({ message: 'URL not found' });

        url.clicks++;
        await url.save();

        res.redirect(url.longUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
