import {
	markCompleteAction,
	markIncompleteAction,
	deleteTodoAction,
	createTodoAction,
	getTodos,
} from "./actionType";

//creating the type of action creator
//getTodosAction is void type and returning getTodos
export type getTodosActionCreator = () => getTodos;

export type createTodoActionCreator = (title: string) => createTodoAction;

export type markCompleteActionCreator = (id: string) => markCompleteAction;

//markCompleteAction function which is taking id of string type and returning markIncompleteAction
export type markIncompleteActionCreator = (id: string) => markIncompleteAction;

export type deleteTodoActionCreator = (id: string) => deleteTodoAction;


