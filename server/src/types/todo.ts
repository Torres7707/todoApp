import { Document } from 'mongoose';

export interface ITodo extends Document {
	userId: string;
	name: string;
	description: string;
	status: boolean;
}
