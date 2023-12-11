const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserProfile = require("../models/UserProfile");
const OTP = require("../models/OTP");
const { generateOTP } = require("../utils/generateOTP");

exports.authGetController = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.query.id).select("-password");
    if (user) {
      res.json({
        isAuthintication: true,
        data: user,
      });
    } else {
      res.json({
        isAuthintication: false,
        message: "User not found!",
        error: true,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.signupController = async (req, res, next) => {
  try {
    let { name, email, password, role, surname, country, phone, isCompany } =
      req.body;
    const user = await Auth.findOne({ email: email });
    const otp = await OTP.findOne({ email: email });
    const newOTP = await generateOTP();
    if (user) {
      if (otp) {
        return res.json({
          message: "Check you email to activate your account!",
        });
      }
      if (!user.isVerify) {
        await OTP({ email: email, otp: newOTP }).save();
        return res.json({
          message: "Check you email to activate your account!",
        });
      }

      return res.status(223).json({ message: "User Already Exist!" });
    }

    if (password.length < 6) return res.json({ message: "Min length 6" });
    password = await bcrypt.hash(password, 10);

    const newUser = new Auth({ name, email, password, role });

    await newUser.save();
    if (isCompany) await UserProfile.create({ surname, country, phone });
    await OTP({ email: email, otp: newOTP }).save();

    res.json({
      message: "Check you email to activate your account!",
    });
  } catch (error) {
    next(error);
  }
};
exports.singinPostController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        isAuthintication: false,
        message: "Account is not exit",
      });
    }

    // check verify account
    if (!user.isVerify) {
      return res.status(404).json({
        isAuthintication: false,
        message: "Account is not exit",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next("Password is not correct!");
    }
    const token = jwt.sign(
      {
        data: {
          _id: user._id,
          name: user.name,
          url: user.url,
          role: user.role,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", //1m "7d"
      }
    );

    const data = {
      email: user.email,
      name: user.name,
      role: user.role,
      _id: user._id,
    };
    res.json({
      isAuthintication: true,
      data: data,
      message: "Successfully login!",
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateController = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;
    const user = await Auth.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (password) {
      if (password.length < 6) return res.json({ message: "Min length 6" });
      password = await bcrypt.hash(password, 10);
    }
    const data = { email, password, name, role };
    await Auth.updateOne({ _id: req.user._id }, data);
    res.json({
      message: "Update successfully!",
    });
  } catch (error) {
    next(error);
  }
};
exports.verifyAccountController = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const findOtp = await OTP.findOne({ otp: otp });
    if (!findOtp) {
      return res.status(404).json({ message: "OTP not found!" });
    }

    // check if otp is expired or not
    const now = new Date();
    const otpTime = new Date(findOtp.createdAt);
    const diff = now.getTime() - otpTime.getTime();
    const diffMins = Math.round(diff / (1000 * 60));
    if (diffMins > 5) {
      return res.status(404).json({ message: "OTP is expired!" });
    }
    // if otp is valid then create a user

    const user = await Auth.findOne({ email: findOtp.email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (user?.isVerify) {
      return res.status(404).json({ message: "User is already Verified!" });
    }
    user.isVerify = true;
    await user.save();
    await OTP.deleteOne({ otp: otp });
    const token = jwt.sign(
      {
        data: { _id: user._id, name: user.name, url: user.email },
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Account is verified!" });
  } catch (error) {
    next(error);
  }
};
exports.forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Auth.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (!user.isVerify) {
      return res.status(404).json({ message: "User not verified!" });
    }

    // check if otp is expired or not
    const otp = await OTP.findOne({ email: email });
    if (otp) {
      const now = new Date();
      const otpTime = new Date(otp.createdAt);
      const diff = now.getTime() - otpTime.getTime();
      const diffMins = Math.round(diff / (1000 * 60));
      if (diffMins < 5) {
        return res.status(404).json({ message: "OTP is already sent!" });
      }
    }

    const newOTP = await generateOTP();
    await OTP({ email: email, otp: newOTP }).save();
    res.json({
      message: "Check you email to activate your account!",
    });
  } catch (error) {
    next(error);
  }
};
exports.resetController = async (req, res, next) => {
  try {
    let { password, otp } = req.body;
    const findOtp = await OTP.findOne({ otp: otp });
    if (!findOtp) {
      return res.status(404).json({ message: "OTP not found!" });
    }
    // check if otp is expired or not
    const now = new Date();
    const otpTime = new Date(findOtp.createdAt);
    const diff = now.getTime() - otpTime.getTime();
    const diffMins = Math.round(diff / (1000 * 60));
    if (diffMins > 5) {
      return res.status(404).json({ message: "OTP is expired!" });
    }
    // if otp is valid then create a user
    if (password.length < 6) return res.json({ message: "Min length 6" });
    password = await bcrypt.hash(password, 10);

    await Auth.updateOne({ email: findOtp.email }, { password: password });
    await OTP.deleteOne({ otp: otp });
    res.json({
      message: "Password reset successfully!",
    });
  } catch (error) {
    next(error);
  }
};
