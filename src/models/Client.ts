import mongoose, { model, models } from 'mongoose';

const clientSchema = new mongoose.Schema({
    clientName:{
        type: String,
        required: true
    },
    clientImage:{
        type: [String],
        required: true
    }
})

const Client = models.Client || model("Client", clientSchema)

export default Client;