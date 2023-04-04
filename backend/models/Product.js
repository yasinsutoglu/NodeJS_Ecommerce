const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide product name"],
    maxlength: [100, "Name can not be more than 100 chars"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxlength: [1000, "Description can not be more than 1000 chars"],
  },
  image: {
    type: String,
    default: "/uploads/example.jpeg",
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
    enum: ["office", "kitchen", "bedroom"],
  },
  company: {
    type: String,
    required: [true, "Please provide product company"],
    enum: {
      values: ["ikea", "liddy", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
  colors: {
    type: [String],
    default:['#222'],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  freeShipping: {
    type: Boolean,
    default:false,
  },
  inventory:{
    type:Number,
    required:true,
    default:15,
  },
  averageRating:{
    type:Number,
    default:0,
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
  },
}, {timestamps:true});


module.exports = mongoose.model('Product', ProductSchema)