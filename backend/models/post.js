const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: {type: String, required: true},
    likes: { type: Number, required: true, default: 0 },
    usersLiked: {type: [String]},
});

module.exports = mongoose.model('Post', postSchema);