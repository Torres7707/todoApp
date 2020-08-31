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
exports.getTodo = exports.signIn = exports.signUp = exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const user_1 = __importDefault(require("../../models/user"));
//注册
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = new user_1.default({
            username: body.username,
            password: body.password,
        });
        // console.log(user);
        const newUser = yield user.save();
        const allUsers = yield user_1.default.find();
        res.status(201).json({
            message: 'sign up success',
            user: newUser,
            users: allUsers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.signUp = signUp;
//登录
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = new user_1.default({
            username: body.username,
            password: body.password,
        });
        const users = yield user_1.default.find();
        if (users.some((item) => item.username === user.username && item.password === user.password)) {
            res.status(200).json({
                message: 'sign in success',
                id: user.id,
            });
        }
        else {
            res.status(400).json({
                message: 'wrong account',
            });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.signIn = signIn;
//获取todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
//获取todos:id
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { userId }, } = req;
        const todo = yield todo_1.default.find({ userId: userId });
        res.status(200).json({ todo });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodo = getTodo;
//新增todos
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>;
        const { params: { id }, body, } = req;
        const todo = new todo_1.default({
            userId: id,
            name: body.name,
            description: body.description,
            status: body.status,
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        res.status(201).json({
            message: 'Todo added',
            todo: newTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
//更新todos
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: 'Todo updated',
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
//删除todos
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
