const { Schema, model, Types } = require('mongoose');

const FriendSchema = new Schema(
    {
       friendName: {
           type: String,
           required: 'Please enter your friendName!'
       } 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);



const Friend = model('Friend', FriendSchema);

module.exports = Friend;
