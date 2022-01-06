import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';

import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');



todoForm.addEventListener('submit', async(e) => {
    // on submit, create a todo item in supabase
    e.preventDefault();
    const data = new FormData(todoForm);
    const todoItem = data.get('todo');

    await createTodo(todoItem);
    // reset the form
    todoForm.reset();
    // fetch the item and display the todos
    await displayTodos();
});

async function displayTodos() {
    // fetch the todos
    const todoList = await getTodos();
    
    todosEl.textContent = '';
    // loop through the lists
    // display the list of todos
    for (let todo of todoList) {
        const todoItemEl = renderTodo(todo);
        todosEl.append(todoItemEl);

        if (!todo.complete) {
            // be sure to give each todo an event listener
            todoItemEl.addEventListener('click', async() => {
                await completeTodo(todo.id);
                await displayTodos();
            });
        }
        todosEl.append(todoItemEl);
    }
    
}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', async() => {
    await displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async() => {
    // delete all todos
    await deleteAllTodos();
    // then refetch and display the updated list of todos
    await displayTodos();
});
