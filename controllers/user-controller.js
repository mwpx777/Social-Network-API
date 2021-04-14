const { User} = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-_v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.json(400).json(err);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-_v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
   

    // addFriend({ params, body }, res) {
    //     // User.create(body)
    //     User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    //         .then(({ _id }) => {
    //             // getting user info

    //             return User.findOneAndUpdate(
    //                 // getting userId
    //                 { _id: params.userId },

    //                 { $push: { friends: _id } },

    //                 { new: true }
    //             );
    //         })
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: 'No user found with this id!' });
    //                 return;
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.json(err));

    // },

    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            // prevents duplicate values
            { $addToSet: { friends: params.friendId } },
            // this will runValidators so info is correct after updating
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },
    deleteFriend({ params }, res) {
        User.findOneAndDelete({ _id: params.friendId })
            .then(deletedFriend => {
                if (!deletedFriend) {
                    return res.status(400).json({ message: 'No friend found with this id!' })
                }
                return User.findOneAndUpdate(
                    // gets userId
                    { _id: params.userId },
                    // pulls the friend from User as friendId
                    { $pull: { friends: params.friendId } },
                    // rewrites user data
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user fount with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

}


module.exports = userController;