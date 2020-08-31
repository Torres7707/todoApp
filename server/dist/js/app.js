"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const PORT = process.env.PROT || 4000;
// const secretOrPrivateKey: string = process.env.secretOrPrivateKey || 'salt'; //加密token 校验token时要使用
// app.use(
// 	expressJWT({
// 		secret: secretOrPrivateKey,
// 		algorithms: ['HS256'],
// 	}).unless({
// 		path: ['/getToken'], //除了这个地址，其他的URL都需要验证
// 	})
// );
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false,
}));
app.use(cors_1.default());
app.use(routes_1.default);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.atbfl.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};
// mongoose.set('useFindAndModify', false);
mongoose_1.default
    .connect(uri, options)
    .catch((error) => {
    console.log(uri);
    throw error;
})
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)));
