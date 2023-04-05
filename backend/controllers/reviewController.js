const { StatusCodes } = require("http-status-codes")

const createReview = async (req,res) =>{
    res.status(StatusCodes.CREATED).json({msg:"ok created"})
}

const getAllReviews = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "ok get all reviews" });
};

const getSingleReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "ok get one review" });
};

const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "ok updated review" });
};

const deleteReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "ok deleted review" });
};

module.exports = {createReview, getAllReviews,getSingleReview,updateReview,deleteReview}