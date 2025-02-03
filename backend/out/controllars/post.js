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
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchOnePost = exports.deleteOnePost = exports.retrieveOnePost = exports.getOnePostMidll = exports.createOnePost = exports.getPosts = void 0;
const post_1 = __importDefault(require("../model/post"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find();
        res.json(posts);
    }
    catch (error) {
        console.error(`error in getPosts ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.getPosts = getPosts;
const createOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const file = req.file;
    if (!title) {
        res.status(400).json({ message: "please enter the title and select an img" });
        return;
    }
    const cloudResponse = yield cloudinary_1.default.uploader.upload((file === null || file === void 0 ? void 0 : file.path) || '');
    const newPost = new post_1.default({
        title,
        description,
        imgUrl: cloudResponse.secure_url,
        updateMode: true
    });
    try {
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        console.error(`error in createOnePost ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.createOnePost = createOnePost;
const getOnePostMidll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let post;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        post = yield post_1.default.findById(id);
        if (!post) {
            res.status(404).json({ message: "this post is no longer in DB" });
            return;
        }
    }
    catch (error) {
        console.error(`error in getOnePostMidll ${error}`);
        res.status(500).json({ message: error.message });
    }
    req.post = post;
    next();
});
exports.getOnePostMidll = getOnePostMidll;
const retrieveOnePost = (req, res) => {
    res.json(req.post);
};
exports.retrieveOnePost = retrieveOnePost;
const deleteOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.post;
    try {
        yield post_1.default.findByIdAndDelete(post._id);
        res.json({ message: `post with id ${post._id} has been deleted` });
    }
    catch (error) {
        console.error(`error in deleteOnePost ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteOnePost = deleteOnePost;
const patchOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const file = req.file;
    const post = req.post;
    if (title) {
        post.title = title;
    }
    if (description || description == '') {
        post.description = description;
    }
    if (file) {
        const cloudResponse = yield cloudinary_1.default.uploader.upload((file === null || file === void 0 ? void 0 : file.path) || '');
        post.imgUrl = cloudResponse.secure_url;
    }
    try {
        yield post.save();
        res.json(post);
    }
    catch (error) {
        console.error(`error pathOnePost ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.patchOnePost = patchOnePost;
