import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {
	getTodos,
	getTodo,
	addTodo,
	updateTodo,
	deleteTodo,
	signUp,
	signIn,
} from '../controllers/todos/index';

const secretOrPrivateKey: string = process.env.secretOrPrivateKey || 'salt'; //加密token 校验token时要使用
const router: Router = Router();

router.get('/todos', getTodos);

router.get('/todo/:userId', getTodo);

router.post('/add-todo/:id', addTodo);

router.put('/edit-todo/:id', updateTodo);

router.delete('/delete-todo/:id', deleteTodo);

router.post('/sign-up', signUp);

router.get('/sign-in', signIn);

// router.get('/getToken', function (req, res) {
// 	res.json({
// 		result: 'ok',
// 		token: jwt.sign(
// 			{
// 				name: 'BinMaing',
// 				data: '=============',
// 			},
// 			secretOrPrivateKey,
// 			{
// 				expiresIn: 60 * 60 * 24,
// 			}
// 		),
// 	});
// });

export default router;
