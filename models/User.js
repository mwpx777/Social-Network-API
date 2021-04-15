const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Please provide a username!',
        trim: true
    },
    email: {
        type: String,
        required: 'Please provide an email address!',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        // array of _id values referencing the thought model
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
    {
        toJSON: {
            virutals: true,
            getters: true
        },
        id: false
    });

// create virutal called friendCount that gets length of user's friends array on query
UserSchema.virtual('friendCount').get(function () {
   
    return this.friends.length;
});


const User = model('User', UserSchema)

module.exports = User;


