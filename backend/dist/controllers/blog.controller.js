"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = require("../utils/asyncHandler");
const dotenv_1 = __importDefault(require("dotenv"));
const errorCodes_1 = require("../utils/errorCodes");
const blog_model_1 = __importDefault(require("../models/blog.model"));
dotenv_1.default.config();
class BlogController {
}
_a = BlogController;
// Method to get all Blogs of a user
BlogController.getAllBlogs = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    const blogs = yield blog_model_1.default.find(Object.assign({}, req.query), { __v: 0 }).populate('user', '_id name email');
    res.status(errorCodes_1.HttpStatusCodes.OK).json({ message: "Blogs Fetched Successfully", data: blogs });
}));
// Method to get a Blog
BlogController.getBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Blog id is required' });
        return;
    }
    const blog = yield blog_model_1.default.findOne({ _id: req.params.id }, { __v: 0 }).populate('user', '_id name email createdAt');
    if (!blog) {
        res.status(errorCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: 'Blog not found' });
        return;
    }
    res.status(errorCodes_1.HttpStatusCodes.OK).json({ message: 'Blog Fetched Successfully', data: blog });
}));
// Method to Add new Blog
BlogController.addNewBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { title, category, content, image } = req.body;
    if (!title || !category || !content) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Title, category and content fields are required' });
        return;
    }
    const newData = { title, category, content, image, user: user._id };
    const newBlog = yield blog_model_1.default.create(newData);
    res.status(errorCodes_1.HttpStatusCodes.CREATED).json({ message: 'Blog Created Successfully', data: newBlog });
}));
//Method to update Blog
BlogController.updateBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Blog id is required' });
        return;
    }
    const { title, category, content, image } = req.body;
    const blog = yield blog_model_1.default.findOne({ _id: id, user: req.user._id });
    if (!blog) {
        res.status(errorCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: 'Blog not found' });
        return;
    }
    blog.title = title !== null && title !== void 0 ? title : blog.title;
    blog.category = category !== null && category !== void 0 ? category : blog.category;
    blog.content = content !== null && content !== void 0 ? content : blog.content;
    blog.image = image !== null && image !== void 0 ? image : blog.image;
    yield blog.save();
    res.status(errorCodes_1.HttpStatusCodes.OK).json({ message: 'Blog Updated Successfully', data: blog });
}));
// Method to delete a Blog
BlogController.deleteBlog = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(errorCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: 'Blog id is required' });
        return;
    }
    const deletedBlog = yield blog_model_1.default.findOneAndDelete({ _id: id, user: req.user._id }).lean();
    if (!deletedBlog) {
        res.status(errorCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: 'Blog not found' });
        return;
    }
    res.status(errorCodes_1.HttpStatusCodes.OK).json({ message: 'Blog Deleted Successfully', data: deletedBlog });
}));
exports.default = BlogController;
