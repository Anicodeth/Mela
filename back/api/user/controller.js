import User from "./model.js";
import AppError from "../../utils/appError.js";
import App from "../../loader/app.js";
import Campaign from "../campaign/model.js";

const register = async (req, res, next) => {
  try {

    const existingUser = await User.findOne({email: req.body.email})

    if (existingUser){
        return next(new AppError("userAlreadyExists", "a user already exists with email address", 400))
    }

    const user = await User.create(req.body);

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      data: {...user._doc, token}
    });

  } catch (error) {

      next(new AppError("Can't create user", error.message , 500));

  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate emil & password
    if (!email || !password) {
      return next(new AppError("Empty credentials", "Please provide an email and password", 400));
    }

    // Check for user
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new AppError("Invalid credentials", "No user found with the provided credentials", 404));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid credentials", "Password doesn't match", 400));
    }

    const token = user.getSignedJwtToken();


    res.status(200).json({
      success: true,
      data: {...user._doc, token}
    });
  } catch (error) {
    next(new AppError("unknownError", "couldn't sign in user", "400"));
  }
};

//  get me
const getMe = async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = await User.findById(req.user_id)

  res.status(200).json({
    success: true,
    data: user,
  });
};

//get user
const getUser = async (req, res, next) =>{

  try{
    const user = await User.findById(req.params.id)

    //collect total raised money by the user
    const campaigns = await Campaign.find({creatorId: req.params.id});

    let raisedMoney = 0;

    campaigns.foreach((campaign)=>{
      raisedMoney += campaign.donatedMoney;
    })


    res.status(200).json({
      success: true,
      data: {
        ...user,
        raisedMoney,
      },
    })
  }catch (error){
    res.status(404).json({
      success:false,
      error: "couldn't find a user"
    })
  }

}

//  get getAllUsers
const getAllUsers = async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users,
  });
};

// delete user
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(new AppError("server error", 500));
  }
};

// change password

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, currentPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user)
      return next(new AppError("There is no user with the specified id", 400));

    const isMatch = await user.matchPassword(oldPassword);

    if (isMatch) {
      user.password = currentPassword;
      await user.save();
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(new AppError("server error", 500));
  }
};

const editUser = async (req, res, next) => {
  try {
    delete req.body.password;

    const user = await User.findById(req.body.id);

    if (!user)
      return next(new AppError("There is no user with the specified id", 400));
    const newone = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    console.log("Ddalal adlaldadldl");
    console.log(newone);
    return res.status(200).json({
      success: true,
      data: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    next(new AppError("server error", 500));
  }
};

export default {
  editUser,
  changePassword,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  register,
  login,
};
