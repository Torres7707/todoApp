import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';

const app: Express = express();

const PORT: string | number = process.env.PROT || 4000;

// const secretOrPrivateKey: string = process.env.secretOrPrivateKey || 'salt'; //加密token 校验token时要使用
// app.use(
// 	expressJWT({
// 		secret: secretOrPrivateKey,
// 		algorithms: ['HS256'],
// 	}).unless({
// 		path: ['/getToken'], //除了这个地址，其他的URL都需要验证
// 	})
// );
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cors());
app.use(todoRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.atbfl.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
};
// mongoose.set('useFindAndModify', false);

mongoose
	.connect(uri, options)
	.catch((error) => {
		console.log(uri);

		throw error;
	})
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		)
	);
