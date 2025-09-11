
import mongoose, { model, models } from 'mongoose'

const instrumentSchema = new mongoose.Schema ({

    instrumentImage: {type: [String], required: true},
    instrumentName: {type: String, required: true},
    brandName: {type: String} 
})

const Instrument = models.Instrument || model("Instrument", instrumentSchema)

export default Instrument