import {takeEvery, put, call, StrictEffect} from "redux-saga/effects";
import {actionIds,
     createdTodoAction,
     createTodoAction,
     deletedTodoAction,
     deleteTodoAction,
     gotTodos,
     markCompleteAction, 
     markedCompleteAction,
     markedIncompleteAction,
     markIncompleteAction,
            } from "types/actionType";  
import todoApi from "api/todo-api";
import {AxiosResponse} from "axios";

//watchers
function* todoSaga(): Generator<StrictEffect>{
    yield takeEvery(actionIds.CREATE_TODO, createTodoWorker);
    yield takeEvery(actionIds.DELETE_TODO, deleteToDoWorker);
    yield takeEvery(actionIds.GET_TODOS, getToDoWorker);
    yield takeEvery(actionIds.MARK_COMPLETE, markCompleteWorker);
    yield takeEvery(actionIds.MARK_INCOMPLETE, markInCompleteWorker);
    
}

//Generator Function
//workers
function* createTodoWorker({title}: createTodoAction){

    try{
        //post call made by the API.
        const response: AxiosResponse = yield call(todoApi.post, "/todo", {title: title});
        //Wait for the response status. if the response status pass. another action dispatched!
        switch(response.status){
            case 201:
                const data: createdTodoAction = {
                    type: "CREATED_TODO",
                    todo: response.data.data.todo,
                };
                yield put(data);
        }
    }
    catch(err){}
    //update our redux by dispatching a new action

}

function* deleteToDoWorker({id}: deleteTodoAction){
    //create todo using api
    try{
        const response: AxiosResponse = yield call(todoApi.delete, `/todo/${id}`);
        switch(response.status){
            case 200:
                const data: deletedTodoAction = {
                    type: "DELETED_TODO",
                    id,
                };
                yield put(data);
        }
    }
    catch(err){}
}
function* markCompleteWorker({id}: markCompleteAction) {
    try{
        const response: AxiosResponse = yield call(todoApi.patch, `/todo/${id}`,{isCompleted: true});
        switch(response.status){
            case 200:
                const data: markedCompleteAction = {
                    type: "MARKED_COMPLETE",
                    id,
                };
                yield put(data);
        }
    }
    catch(err){}
}
function* markInCompleteWorker({id}: markIncompleteAction) {
    try{
        const response: AxiosResponse = yield call(todoApi.patch, `/todo/${id}`,{isCompleted: false});
        switch(response.status){
            case 200:
                const data: markedIncompleteAction = {
                    type: "MARKED_INCOMPLETE",
                    id,
                };
                yield put(data);
        }
    }
    catch(err){}
}
function* getToDoWorker() {
    try{
        const response: AxiosResponse = yield call(todoApi.get, `/todo`);
        switch(response.status){
            case 200:
                const data: gotTodos = {
                    type: "GOT_TODOS",
                    todos: response.data.data.todos,
                };
                yield put(data);
        }
    }
    catch(err){}
}

export default todoSaga;
