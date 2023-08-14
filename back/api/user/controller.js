import User from "./model.js";
import AppError from "../../utils/appError.js";

const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(new AppError("Server error", 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate emil & password
    if (!email || !password) {
      return next(new AppError("Please provide an email and password", 400));
    }

    // Check for user
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      data: user,
      token: token,
    });
  } catch (error) {
    next(error);
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

//  get getAllUsers
const getAllUsers = async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = await User.find();
  // console.log(user)

  res.status(200).json({
    success: true,
    data: user,
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
  register,
  login,
};
