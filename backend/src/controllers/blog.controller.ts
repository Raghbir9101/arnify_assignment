import mongoose, { ObjectId } from 'mongoose';
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import dotenv from "dotenv";
import { HttpStatusCodes } from "../utils/errorCodes";
import Blog from "../models/blog.model";

dotenv.config();

export default class BlogController {

    // Method to get all Blogs of a user
    static getAllBlogs = asyncHandler(async (req, res): Promise<void> => {
        console.log(req.query)
        const blogs = await Blog.find({ ...req.query }, { __v: 0 }).populate('user', '_id name email');
        res.status(HttpStatusCodes.OK).json({ message: "Blogs Fetched Successfully", data: blogs });
    })

    // Method to get a Blog
    static getBlog = asyncHandler(async (req, res): Promise<void> => {
        if (!req.params.id) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Blog id is required' });
            return
        }
        const blog = await Blog.findOne({ _id: req.params.id }, { __v: 0 }).populate('user', '_id name email createdAt');
        if (!blog) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Blog not found' });
            return;
        }
        res.status(HttpStatusCodes.OK).json({ message: 'Blog Fetched Successfully', data: blog });
    })

    // Method to Add new Blog
    static addNewBlog = asyncHandler(async (req, res): Promise<void> => {
        const user = req.user;
        const { title, category, content, image } = req.body;
        if (!title || !category || !content) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Title, category and content fields are required' });
            return
        }
        const newData = { title, category, content, image, user: user._id };
        const newBlog = await Blog.create(newData);
        res.status(HttpStatusCodes.CREATED).json({ message: 'Blog Created Successfully', data: newBlog });
    })

    //Method to update Blog
    static updateBlog = asyncHandler(async (req, res): Promise<void> => {
        const { id } = req.params;
        if (!id) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Blog id is required' });
            return
        }
        const { title, category, content, image } = req.body;

        const blog = await Blog.findOne({ _id: id, user: req.user._id });
        if (!blog) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Blog not found' });
            return;
        }

        blog.title = title ?? blog.title;
        blog.category = category ?? blog.category;
        blog.content = content ?? blog.content;
        blog.image = image ?? blog.image;

        await blog.save();
        res.status(HttpStatusCodes.OK).json({ message: 'Blog Updated Successfully', data: blog });
    })

    // Method to delete a Blog
    static deleteBlog = asyncHandler(async (req, res): Promise<void> => {
        const { id } = req.params;
        if (!id) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Blog id is required' });
            return
        }
        const deletedBlog = await Blog.findOneAndDelete({ _id: id, user: req.user._id }).lean();

        if (!deletedBlog) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Blog not found' });
            return;
        }

        res.status(HttpStatusCodes.OK).json({ message: 'Blog Deleted Successfully', data: deletedBlog });
    })

}