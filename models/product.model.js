import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  itemId: {
    type: String,
    required: true,
    unique: true
  },
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photos: {
    type: [String],
    default: []
  },
  quantityInStock: {
    type: Number,
    required: true
  },
  offers: String,
  disabled: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Product', productSchema);
