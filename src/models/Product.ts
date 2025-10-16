import mongoose, { models, model } from 'mongoose';

const productSchema = new mongoose.Schema({
 
  productImage: {
    type: [String],
    default: [],
  },
  productName: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product =  models.Product || model("Product", productSchema);

export default Product;
