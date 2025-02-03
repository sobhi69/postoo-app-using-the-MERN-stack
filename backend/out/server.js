"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connectToDB_1 = require("./lib/connectToDB");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3012;
const post_1 = __importDefault(require("./routes/post"));
(0, connectToDB_1.connectToDB)();
const connection = mongoose_1.default.connection;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/post', post_1.default);
if (process.env.NODE_ENV !== 'development') {
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), '..', 'frontend', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(path_1.default.resolve(), '..', 'frontend', 'dist', 'index.html'));
    });
}
connection.once('open', () => {
    console.log(`connected to database`);
    app.listen(port, () => console.log(`app is alive at http://localhost:${port}`));
});
