"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../controllers/todos/index");
const secretOrPrivateKey = process.env.secretOrPrivateKey || 'salt'; //加密token 校验token时要使用
const router = express_1.Router();
router.get('/todos', index_1.getTodos);
router.get('/todo/:userId', index_1.getTodo);
router.post('/add-todo/:id', index_1.addTodo);
router.put('/edit-todo/:id', index_1.updateTodo);
router.delete('/delete-todo/:id', index_1.deleteTodo);
router.post('/sign-up', index_1.signUp);
router.get('/sign-in', index_1.signIn);
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
exports.default = router;
