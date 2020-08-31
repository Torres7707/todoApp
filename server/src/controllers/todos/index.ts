import { Response, Request } from 'express';
import { ITodo } from './../../types/todo';
import Todo from '../../models/todo';
import { IUser } from './../../types/user';
import User from '../../models/user';

//注册
const signUp = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<IUser, 'username' | 'password'>;
		const user: IUser = new User({
			username: body.username,
			password: body.password,
		});
		// console.log(user);
		const newUser: IUser = await user.save();
		const allUsers: IUser[] = await User.find();
		res.status(201).json({
			message: 'sign up success',
			user: newUser,
			users: allUsers,
		});
	} catch (error) {
		throw error;
	}
};

//登录
const signIn = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<IUser, 'username' | 'password'>;
		const user: IUser = new User({
			username: body.username,
			password: body.password,
		});
		const users: IUser[] = await User.find();
		if (
			users.some(
				(item) =>
					item.username === user.username && item.password === user.password
			)
		) {
			res.status(200).json({
				message: 'sign in success',
				id: user.id,
			});
		} else {
			res.status(400).json({
				message: 'wrong account',
			});
		}
	} catch (error) {
		throw error;
	}
};

//获取todos
const getTodos = async (req: Request, res: Response): Promise<void> => {
	try {
		const todos: ITodo[] = await Todo.find();
		res.status(200).json({ todos });
	} catch (error) {
		throw error;
	}
};

//获取todos:id
const getTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { userId },
		} = req;
		const todo: ITodo[] | null = await Todo.find({ userId: userId });
		res.status(200).json({ todo });
	} catch (error) {
		throw error;
	}
};

//新增todos
const addTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		// const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>;
		const {
			params: { id },
			body,
		} = req;
		const todo: ITodo = new Todo({
			userId: id,
			name: body.name,
			description: body.description,
			status: body.status,
		});
		const newTodo: ITodo = await todo.save();
		const allTodos: ITodo[] = await Todo.find();

		res.status(201).json({
			message: 'Todo added',
			todo: newTodo,
			todos: allTodos,
		});
	} catch (error) {
		throw error;
	}
};

//更新todos
const updateTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { id },
			body,
		} = req;
		const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
			{ _id: id },
			body
		);
		const allTodos: ITodo[] = await Todo.find();
		res.status(200).json({
			message: 'Todo updated',
			todo: updateTodo,
			todos: allTodos,
		});
	} catch (error) {
		throw error;
	}
};

//删除todos
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
			req.params.id
		);
		const allTodos: ITodo[] = await Todo.find();
		res.status(200).json({
			message: 'Todo deleted',
			todo: deletedTodo,
			todos: allTodos,
		});
	} catch (error) {
		throw error;
	}
};

export { getTodos, addTodo, updateTodo, deleteTodo, signUp, signIn, getTodo };
