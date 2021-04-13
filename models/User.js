const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

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
        // must match valid email address(mongoose matching validation)
    },
    thoughts: [
        // array of _id values referencing the thought model
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
           
    friends: [
        // not sure if this part is correct
        // array of _id values referencing the user model (self referencing)
        {
            type: Schema.Types.ObjectId,
            ref: 'Friend'
          }
        ]
},
{
    toJSON: {
        virutals: true,
        getters: true
    },
    id: false
});

// create virutal called friendCount that gets length of user's friends array on query
UserSchema.virtual('friendCount').get(function(){
    // not sure if this line is correct
    return this.friends.length;
});

// await.User.create([

// ]);
// await User.init();
// try {
//     await User.create({ email: 'gmail@google.com' });
// } catch (error) {
//     error.message;
// }

const User = model('User', UserSchema)

module.exports = User;

