const {  Friend, User } = require('../models');

const friendController = {

    createFriend({ params, body }, res) {
        Friend.create(body)
            .then(({ _id }) => {
                // getting user info
                
                return User.findOneAndUpdate(
                    // getting userId
                    { _id: params.userId },
                   
                    { $push: { friends: _id } },
                   
                    { new: true }
                );
            })
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
        Friend.findOneAndDelete({ _id: params.friendId })
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

module.exports = friendController;