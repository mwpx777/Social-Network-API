const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter a reaction!',
            maxLength: [280, "Reaction must be less than 280 characters!"]
        },
        username: {
            type: String,
            required: 'Please enter a username!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Please provide a thought!',
        maxLength: 280
    },
    username: {
        type: String,
        required: 'Please enter a username!'
    },
    userId: {
        type: String,
        required: 'Please enter a userId!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    reactions: [ReactionSchema]

},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;