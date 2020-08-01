// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');


// Event Listeners
todoBtn.addEventListener('click', addTodo)

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