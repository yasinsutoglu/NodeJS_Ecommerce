const User =require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')


const getAllUsers = async (req,res)=>{
    // console.log(req.user) //login olunan user'ı burada görürüz.
    const users = await User.find({role:'user'}).select('-password') //!removing password from response of DB
    res.status(StatusCodes.OK).json({users})
}


const getSingleUser = async (req, res) => {
  const user = await User.findOne({_id:req.params.id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError(`No user with id: ${req.param.id}`)
    }
    res.status(StatusCodes.OK).json({ user });
};


const showCurrentUser = async (req, res) => {
  // console.log(req.user)
  res.status(StatusCodes.OK).json({user:req.user})
};

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({})
};

const updateUserPassword = async (req, res) => {
  const {oldPassword, newPassword} = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide old and new password");
  }

  const user = await User.findOne({_id:req.user.userId})

  const isPasswordCorrect = await user.comparePassword(oldPassword)

  if(!isPasswordCorrect){
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  user.password = newPassword;
  await user.save() // bunu kullanarak model'deki pre('save') ile password hashlemesi yaptırdık.

  res.status(StatusCodes.OK).json({msg:'Success! Password Updated!'});
};

module.exports = {
    getAllUsers, 
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}