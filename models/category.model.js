import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    description: { type: String },
    disabled: { type: Boolean, default: false }
});

export default mongoose.model('Category', categorySchema);
