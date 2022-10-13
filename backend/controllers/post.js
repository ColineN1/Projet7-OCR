//On veut que la logique métier ici avec des controllers
const Post = require('../models/post');
const fs = require('fs'); 

// Afficher tous les posts
exports.getAllPost = (req, res) => {
    Post.find().then(
        (posts) => {
            res.status(200).json(posts);
        }
    ).catch(
        (error) => {
            res.status(400).json({ error });
        }
    );
};

// Créer un post
exports.createPost = (req, res) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        usersLiked: [],
    });

    post.save()
        .then(() => { res.status(201).json({ message: 'Post publié !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

// Afficher un post
exports.getOnePost = (req, res) => {
    Post.findOne({
        _id: req.params.id
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

//Modifier un post 
exports.modifyPost = (req, res) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject._userId;

    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId || req.auth.isAdmin) {
                res.status(401).json({ message: 'Non autorisé' });
            } 
            else {
                if (req.file) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {});}
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post modifié!' }))
                    .catch(error => res.status(401).json({ error }));
}})
        .catch((error) => {
            res.status(400).json({  error });
        });
};

//Supprimer un post
exports.deletePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId != req.auth.userId || req.auth.isAdmin) { //Seul l'utilisateur qui a créé le peut la supprimer + ajout admin ? 
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                //Suppression du post
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Post supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


// Permet de savoir si l'id est présent dans un tableau
function idIsPresent(userId, array) {
    return array.includes(userId)
}

//L'utilisateur aime une sauce 
exports.likePost = (req, res) => {
    const postObject = { ...req.body };
    delete postObject._userId;

    Post.findOne({ _id: req.params.id })
        .then(post => {
            // recuperation de l'id depuis le service auth
            const userId = req.auth.userId
            // Option like +1
            const likeOption = req.body.like
            if(likeOption === 1 && !idIsPresent(userId, post.usersLiked)){
                Post.updateOne({_id:req.params.id}, {$inc:{likes: 1}, $push: {usersLiked:userId}})
                    .then(() =>{ res.status(200).json({message: "Vouz aimez ce post!"})})
                    .catch(error =>{ res.status(400).json({error: error});})
            }
            // Option annuler le like
            else if (likeOption === 0 && idIsPresent(userId, post.usersLiked)) {
                Post.updateOne({_id:req.params.id}, {$inc:{likes: -1}, $pull: {usersLiked:userId}})
                    .then(() =>{ res.status(200).json({message: "Vouz avez annulé votre like!"})})
                    .catch(error =>{ res.status(400).json({error: error});})
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};