import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))
async function main(){
    console.log('connecting to mongodb')
    await mongoose.connect(process.env.ATLAS_URI)

    console.log('succesffully connected to mongodb!')

    // we should probably move to a real database but this might do for now
    const eventSchema = new mongoose.Schema({
        event_id: {
            type: Number,
            required: true
        },
        user_id: {
            type: Number,
            required: true
        },
        event_name: {
            type: String,
            required: true
        },
        is_active: {
            type: Boolean,
            required: true
        },
        created_date: {
            type: Date,
            default: Date.now
        }
    });

    const meetingSchema = new mongoose.Schema({
        meeting_id: {
            type: Number,
            required: true
        },
        event_id: {
            type: Number,
            required: true
        },
        created_date: {
            type: Date,
            default: Date.now
        }
    });

    const userSchema = new mongoose.Schema({
        user_id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        created_date: {
            type: Date,
            default: Date.now
        }
    });
    
    const attendeeSchema = new mongoose.Schema({
        attendee_name: {
            type: String,
            required: true
        },
        meeting_id: {
            type: Number,
            required: true
        },
        time_joined: {
            type: Date,
            default: Date.now
        }
    });

    models.Event = mongoose.model('Event', eventSchema)
    models.Meeting = mongoose.model('Meeting', meetingSchema)
    models.User = mongoose.model('User', userSchema)
    models.Attendee = mongoose.model('Attendee', attendeeSchema)
    console.log('mongoose models created')
}

export default models;