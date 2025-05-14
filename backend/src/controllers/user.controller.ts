import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { HttpStatusCodes } from "../utils/errorCodes";
import User from "../models/user.model";
import Blog from "../models/blog.model";


export default class UserController {

  static getUsersList = asyncHandler(async (req, res): Promise<void> => {
    const users = await User.find({}, { name: 1, _id: 1 }).lean();
    res.status(HttpStatusCodes.OK).send(users);
  })

  // Method to get user data with jwt token
  static getUserDataWithToken = asyncHandler(async (req, res): Promise<void> => {
    res.status(HttpStatusCodes.OK).send(req.user);
  })

  // Method to delete user
  static deleteUser = asyncHandler(async (req, res): Promise<void> => {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Blog.deleteMany({ user: req.user._id });
      res.status(HttpStatusCodes.OK).send({ message: "User and its all Blogs Deleted Successfully" });
    }
    catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err)
    }
  })

}
