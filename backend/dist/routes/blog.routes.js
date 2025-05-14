"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = __importDefault(require("../controllers/blog.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blog tasks
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all blog tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", blog_controller_1.default.getAllBlogs);
/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a specific blog task by ID
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog task ID
 *     responses:
 *       200:
 *         description: Blog task details
 *       404:
 *         description: Blog task not found
 */
router.get("/:id", blog_controller_1.default.getBlog);
/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog task
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog task created successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/", blog_controller_1.default.addNewBlog);
/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog task
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog task updated successfully
 *       404:
 *         description: Blog task not found
 */
router.put("/:id", blog_controller_1.default.updateBlog);
/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog task
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog task ID
 *     responses:
 *       200:
 *         description: Blog task deleted successfully
 *       404:
 *         description: Blog task not found
 */
router.delete("/:id", blog_controller_1.default.deleteBlog);
exports.default = router;
