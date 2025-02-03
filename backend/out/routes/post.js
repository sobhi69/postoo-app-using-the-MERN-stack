"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controllars/post");
const router = express_1.default.Router();
const multer_1 = __importDefault(require("../middleware/multer"));
router.get('/get-posts', post_1.getPosts);
router.post('/create', multer_1.default.single('file'), post_1.createOnePost);
router.route("/:id")
    .get(post_1.getOnePostMidll, post_1.retrieveOnePost)
    .patch(post_1.getOnePostMidll, multer_1.default.single('file'), post_1.patchOnePost)
    .delete(post_1.getOnePostMidll, post_1.deleteOnePost);
exports.default = router;
