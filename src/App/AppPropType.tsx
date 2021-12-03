import { todo } from "types/storeType";
import {
	deleteTodoActionCreator,
	markCompleteActionCreator,
	markIncompleteActionCreator,
	createTodoActionCreator,
	getTodosActionCreator,
} from "types/actionTypeCreator";

interface AppPropType {
	todos: todo[];
	deleteTodo: deleteTodoActionCreator;
	markComplete: markCompleteActionCreator;
	markIncomplete: markIncompleteActionCreator;
	createTodo: createTodoActionCreator;
	getTodos: getTodosActionCreator;
}

export default AppPropType;