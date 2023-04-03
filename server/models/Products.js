const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      required: false,
    },
    category: {
      type: [String],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('Products', ProductSchema);
