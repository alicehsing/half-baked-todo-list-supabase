export function renderTodo(newTodo) {
    // create a div and a p tag
    const todoDiv = document.createElement('div');
    const todoP = document.createElement('p');
    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    // add the 'todo' css class no matter what
    if (newTodo.complete) {
        todoDiv.classList.add('complete', 'todo');
    } else {
        todoDiv.classList.add('incomplete', 'todo');
    }
    // put the todo's text into the p tag
    todoP.textContent = newTodo.todo;
    // append stuff
    todoDiv.append(todoP);
    // return the div
    return todoDiv;
}