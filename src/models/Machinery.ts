
import mongoose, { model, models } from 'mongoose'

const machinerySchema = new mongoose.Schema ({

    machineryImage: {type: [String], required: true},
    machineryName: {type: String, required: true},
    brandName: {type: String} 
})

const Machinery = models.Machinery || model("Machinery", machinerySchema)

export default Machinery