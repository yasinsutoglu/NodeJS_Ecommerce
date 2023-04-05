
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please provide rating"],
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide title"],
    maxlength: 100,
  },
  comment: {
    type: String,
    required: [true, "Please provide comment text"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
},
{
    timestamps:true
});

ReviewSchema.index({product:1, user:1}, {unique:true}) //! her product ve user icin sadece 1 tane review olabilecek!

ReviewSchema.statics.calculateAverageRating = async function(productId){
  const result = await this.aggregate([
    {$match:{
      product:productId,
    }},
    {$group:{
      _id:null,
      averageRating:{$avg:'$rating'},
      numOfReviews:{$sum:1}
    }}
  ]);
  
  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: (result[0]?.numOfReviews || 0),
      }
    );
  } catch (error) {
    console.log(error)
  }
}

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema)