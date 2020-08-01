// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');


// Event Listeners
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', checkTodoItem);


// Functions
function addTodo(event) {
    // Stop auto reloading / form submitting
    event.preventDefault();

    // Create TodoCard DIV section
    const todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');

    // Create LI
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-item');
    todoLi.innerText = todoInput.value;

    // Create BUTTON (Check)(Trash)
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('complete-btn');
    completedBtn.innerHTML = `<i class="fas fa-check-circle"></i>`;

    // Create BUTTON (Trash)
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    // Append todoLi, completedBtn and deleteBtn to todoCard then todoCard to todoList
    todoCard.appendChild(todoLi);
    todoCard.appendChild(completedBtn);
    todoCard.appendChild(deleteBtn);
    todoList.appendChild(todoCard);

    // Clear TodoInput value
    todoInput.value = '';

}

function checkTodoItem(event) {
    const item = event.target;

    // Complete Todo
    if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed')
    }

    // Delete Todo
    if (item.classList[0] === 'delete-btn') {
        const todoForDelete = item.parentElement;

        // Animation when deleting
        todoForDelete.classList.add('animationDelete');
        // When animation finished, remove it
        todoForDelete.addEventListener('transitionend', () => {
            todoForDelete.remove();
        })


    }
}