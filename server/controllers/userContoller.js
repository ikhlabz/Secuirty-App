import ErrorResponse from "../utils/errorResponse.js";
import { User } from "../models/users.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail, sendPasswordToGuard } from "../utils/mail.js";
import SecurityGuard from "../models/securityGuardSchema.js";
import cloudinary from "cloudinary";
import parseData from "../utils/dataParse.js";
import {
  generateAccessTokenFromRefreshToken,
  generateToken,
} from "../utils/generateTokens.js";
import Brief from "../models/briefSchema.js";
import { Shift } from "../models/shiftSchema.js";
import { Patrolling } from "../models/patrollingSchema.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, phoneNumber, password, email } = req.body; // Destructure req.body

  let user = await User.findOne({ email }); // Check if user exists in the database using the email address

  if (user)
    return next(
      new ErrorResponse(
        "User with same email already exists. Please use a different email.",
        409
      )
    ); // If user exists, return an error

  try {
    const file = req.file;
    const data = parseData(file);

    if (!data) {
      return res.status(400).json({
        error: "Please upload a valid image",
      });
    }

    const myCloud = await cloudinary.v2.uploader.upload(data.content, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    const passwordHash = await bcrypt.hash(password, 10); // Hash the password using bcryptjs
    console.log(passwordHash, "passwordHash");

    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber: parseInt(phoneNumber),
      password: passwordHash,
      email,
      userRole: req.body.userRole ? req.body.userRole : "Admin",
      userImage: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    user = await newUser.save(); // Save the user to the database

    res.status(200).json({
      success: true,
      data: {
        message: "User created successfully",
      },
    });
  } catch (error) {
    next(error);
  }
});

// Controller for user login

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body; // Destructure req.body
  try {
    const user = await User.findOne({ email }).select("+password"); // Check if user exists in the database using the email address
    const tokenUser = await User.findOne({ email });
    if (!user) return next(new ErrorResponse("Invalid Email", 404)); // If user does not exist, return an error
    const isMatch = await bcrypt.compare(password, user.password); // Compare the password entered with the password in the database
    if (!isMatch) return next(new ErrorResponse("Invalid Password", 401)); // If the passwords don't match, return an error
    const tokens = generateToken(tokenUser); // Generate tokens
    res.status(200).json({
      success: true,
      data: {
        message: "User logged in successfully",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const registerGuard = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    password,
    email,
    defaultGeoLocation,
  } = req.body; // Destructure req.body

  let user =
    (await User.findOne({ email })) && (await SecurityGuard.findOne({ email })); // Check if user exists in the database using the email address

  if (user)
    return next(
      new ErrorResponse(
        "User with same email already exists. Please use a different email.",
        409
      )
    ); // If user exists, return an error

  const passwordHash = await bcrypt.hash(password, 10); // Hash the password using bcryptjs

  const file = req.files["file"][0];
  const data = parseData(file);
  const pdf = req.files["pdf"][0];
  const pdfData = parseData(pdf);

  console.log(data);
  console.log(pdfData, "pdfdata");
  if (
    req.body.securityGuardImage &&
    req.body.securityGuardImage.startsWith("data:image")
  ) {
    const securityGuardImage = req.body.securityGuardImage;

    const myCloud = await cloudinary.v2.uploader.upload(securityGuardImage, {
      folder: "avatars",
      width: 150,
      crop: "scale",
      resource_type: "auto",
    });

    const myPdf = await cloudinary.v2.uploader.upload(pdfData.content, {
      folder: "pdfs",
      resource_type: "auto",
    });

    const newUser = await SecurityGuard.create({
      firstName,
      lastName,
      phoneNumber,
      password: passwordHash,
      email,
      securityGuardImage: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      employeePdf: {
        public_id: myPdf.public_id,
        url: myPdf.secure_url,
      },
      defaultGeoLocation,
    });

    user = await newUser.save(); // Save the user to the database

    const admin = await User.findOne({ userRole: "Admin" });

    admin.securityGuards.push(user._id);

    await admin.save(); // Save the guard to the admin database

    res.status(201).json({
      success: true,
      data: {
        message: "Security Guard added successfully",
      },
    });
  }

  const myCloud = await cloudinary.v2.uploader.upload(data.content, {
    folder: "avatars",
    width: 150,
    crop: "scale",
    resource_type: "auto",
  });

  const myPdf = await cloudinary.v2.uploader.upload(pdfData.content, {
    folder: "pdfs",
    resource_type: "auto",
  });

  const newUser = await SecurityGuard.create({
    firstName,
    lastName,
    phoneNumber,
    password: passwordHash,
    email,
    securityGuardImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    employeePdf: {
      public_id: myPdf.public_id,
      url: myPdf.secure_url,
    },
    defaultGeoLocation,
  });

  sendPasswordToGuard(email, password);

  user = await newUser.save(); // Save the user to the database

  const admin = await User.findOne({ userRole: "Admin" });

  admin.securityGuards.push(user._id);

  await admin.save(); // Save the guard to the admin database

  res.status(200).json({
    success: true,
    data: {
      message: "Security Guard added successfully",
    },
  });
});

export const loginGuard = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body; // Destructure req.body
  try {
    const user = await SecurityGuard.findOne({ email }).select("+password"); // Check if user exists in the database using the email address
    const tokenUser = await SecurityGuard.findOne({ email });
    if (!user) return next(new ErrorResponse("Invalid Email", 404)); // If user does not exist, return an error
    const isMatch = await bcrypt.compare(password, user.password); // Compare the password entered with the password in the database
    if (!isMatch) return next(new ErrorResponse("Invalid Password", 401)); // If the passwords don't match, return an error
    const tokens = generateToken(tokenUser); // Generate tokens
    res.status(200).json({
      success: true,
      data: {
        message: "User logged in successfully",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Controller to get user details using access token from request headers or body

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const { userId } = req; // Destructure req.user
  try {
    if (!userId) return next(new ErrorResponse("User ID not found", 404));

    const user =
      (await User.findById(userId)) || (await SecurityGuard.findById(userId)); // Find user by ID

    if (!user) return next(new ErrorResponse("User not found", 404));

    res.status(200).json({
      success: true,
      data: {
        message: "User details retrieved successfully",
        user,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Controller to generate new access token from refresh token

export const generateNewAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.body.refreshToken || req.headers["refresh-token"]; // Get refresh token from request body or headers
  if (!refreshToken)
    return next(new ErrorResponse("Please provide a refresh token", 401));
  try {
    const newAccessToken = generateAccessTokenFromRefreshToken(refreshToken);
    if (!newAccessToken)
      return next(new ErrorResponse("Invalid refresh token", 401));
    res.status(200).json({
      success: true,
      data: {
        message: "New access token generated successfully",
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Controller to change the password of a user using old password

export const changePassword = asyncHandler(async (req, res, next) => {
  const { userID, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ userID }).select("+password");
    if (!user) return next(new ErrorResponse("User not found", 404));
    // Check if the provided current password matches the password in the database

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return next(new ErrorResponse("Incorrect Password", 401));

    // Hash the new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    user.password = passwordHash;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        message: "Password changed successfully",
      },
    });
  } catch (error) {
    next(error);
  }
});

// Controller to generate a link to reset password

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorResponse("User not found", 404));
    // Generate reset token and reset url and send email to user
    const resetToken = user.generatePasswordResetToken();
    const resetUrl = `${baseUrl}/user/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);
    res.status(200).json({
      success: true,
      data: {
        message: "Password reset link sent to your email",
      },
    });
  } catch (error) {
    next(error);
  }
});

// Controller to reset password using reset token

export const resetPassword = asyncHandler(async (req, res, next) => {
  const resetToken = req.params.token;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({
      passwordResetToken: resetToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user)
      return next(
        new ErrorResponse("Invalid reset token, or your token is expired", 401)
      );
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      data: {
        message: "Password reset successful",
      },
    });
  } catch (error) {
    next(error);
  }
});

// Controller to soft delete a user

export const softDeleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return next(new ErrorResponse("User not found", 404));
    await user.softDelete(); // call the softDelete method on the user document
    res.status(200).json({
      success: true,
      data: {
        message: "User deleted successfully",
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const guards = await SecurityGuard.find({}).select("-password");
    res.status(200).json({
      success: true,
      data: {
        guards,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getSuperVisors = asyncHandler(async (req, res, next) => {
  try {
    const supervisors = await User.find({ userRole: "Supervisor" });
    res.status(200).json({
      success: true,
      data: {
        supervisors,
      },
    });
  } catch (error) {
    return next(new ErrorResponse("Error getting supervisors", 404));
  }
});

export const updateGuardLocation = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    const guard = await SecurityGuard.findById(id);
    if (!guard) return next(new ErrorResponse("Guard not found", 404));

    const updatedGuard = await SecurityGuard.findByIdAndUpdate(
      id,
      {
        defaultGeoLocation: {
          latitude,
          longitude,
        },
      },
      { new: true }
    ).select("+password");

    req.io.emit("guard location update", "Location updated");

    res.status(200).json({
      success: true,
      data: {
        updatedGuard,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getGuardDetailsById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const guard = await SecurityGuard.findById(id).select("+password");
    // Convernt the password to plain text

    const decryptedPassword = await bcrypt.compare(
      guard.password,
      guard.password
    );

    console.log("Guard Password: ", guard.password);

    if (!guard) return next(new ErrorResponse("Guard not found", 404));
    res.status(200).json({
      success: true,
      data: {
        guard,
        decryptedPassword,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const softDeleteGuard = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const guard = await SecurityGuard.findById(id);
    if (!guard) return next(new ErrorResponse("Guard not found", 404));
    await guard.softDelete(); // call the softDelete method on the guard document
    res.status(200).json({
      success: true,
      data: {
        message: "Guard deleted successfully",
      },
    });
  } catch (error) {
    next(error);
  }
});

export const deleteGuard = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const guard = await SecurityGuard.findById(id);
    if (!guard) return next(new ErrorResponse("Guard not found", 404));
    await SecurityGuard.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: {
        message: "Guard deleted successfully",
      },
    });
  } catch (error) {
    next(error);
  }
});

export const addBrief = asyncHandler(async (req, res, next) => {
  const { message, guardID, shiftID } = req.body;

  try {
    const guard = await SecurityGuard.findById(guardID);
    if (!guard) return next(new ErrorResponse("Guard not found", 404));

    const brief = await Brief.create({
      message,
      postedBy: guardID,
      shiftID: shiftID,
    });

    res.status(201).json({
      success: true,
      data: {
        brief,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getBriefsById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const briefs = await Brief.findById(id);
    if (!briefs) return next(new ErrorResponse("Briefs not found", 404));
    res.status(200).json({
      success: true,
      data: {
        briefs,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getBriefs = asyncHandler(async (req, res, next) => {
  try {
    const briefs = await Brief.find({})
      .populate({
        path: "postedBy",
        select: "firstName lastName",
        schema: "SecurityGuard",
      })
      .populate({
        path: "shiftID",
        schema: "Shift",
      });
    res.status(200).json({
      success: true,
      data: {
        briefs,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getGuardShifts = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const shifts = await Shift.find({ assignedGuards: id });
    res.status(200).json({
      success: true,
      data: {
        shifts,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getGuardsPatrollingsById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const guard = await SecurityGuard.findById(id);
    if (!guard) return next(new ErrorResponse("Guard not found", 404));
    const patrollings = await Patrolling.find({ assingedTo: id }).populate({
      path: "patrollingArea",
      schema: "Location",
    });

    res.status(200).json({
      success: true,
      guardPatrolling: patrollings,
    });
  } catch (error) {
    next(error);
  }
});

export const updateSuperVisor = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { phoneNumber, activeStatus } = req.body;
    const supervisor = await User.findById(id);
    if (!supervisor)
      return next(new ErrorResponse("Supervisor not found", 404));

    const updatedSupervisor = await User.findByIdAndUpdate(
      id,
      {
        phoneNumber,
        activeStatus,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        updatedSupervisor,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const updateGuard = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { phoneNumber, activeStatus } = req.body;
    const guard = await SecurityGuard.findById(id);
    if (!guard) return next(new ErrorResponse("Guard not found", 404));

    const updatedGuard = await SecurityGuard.findByIdAndUpdate(
      id,
      {
        phoneNumber,
        activeStatus,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        updatedGuard,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const deleteSupervisor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const supervisor = await User.findById(id);
    if (!supervisor)
      return next(new ErrorResponse("Supervisor not found", 404));
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: {
        message: "Supervisor deleted successfully",
      },
    });
  } catch (error) {
    next(error);
  }
});
