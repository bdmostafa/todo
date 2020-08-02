// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.filter');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodoFromLocalStorage);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', checkTodoItem);
filter.addEventListener('click', filterTodo);


// Functions =========================================
// Function for add new todo
function addTodo(event) {
    // Stop auto reloading / form submitting
    event.preventDefault();

    // Function to create elements and append todo
    todoDiv(todoInput.value);

    // Clear TodoInput value
    todoInput.value = '';

}

// Function to create elements and append todo
function todoDiv(todo) {
    // Create TodoCard DIV section
    const todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');

    // Create LI
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-item');
    todoLi.innerText = todo;

    // Add todo to local storage
    if (todoInput.value) {
        saveTodoToLocalStorage(todo);
    }

    // Create BUTTON (Edit)
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = `<i class="fas fa-edit"></i>`;

    // Create BUTTON (Check)
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('complete-btn');
    completedBtn.innerHTML = `<i class="fas fa-check-circle"></i>`;

    // Create BUTTON (Trash)
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    // Append todoLi, editBtn, completedBtn and deleteBtn to todoCard then todoCard to todoList
    todoCard.appendChild(todoLi);
    todoCard.appendChild(editBtn);
    todoCard.appendChild(completedBtn);
    todoCard.appendChild(deleteBtn);
    todoList.appendChild(todoCard);
}

// Function for edit, complete and delete todo
function checkTodoItem(event) {
    const item = event.target;

    // Edit Todo
    if (item.classList[0] === 'edit-btn') {
        let currentTodo = item.parentElement.children[0].innerText
        let editedTodo;
        let resultPopup = prompt("Please edit your TODO:", currentTodo);
        if (resultPopup == null || resultPopup == "") {
            editedTodo = todoForEdit;
        } else {
            editedTodo = resultPopup;
        }
        // console.log(indexOf(item.parentElement))
        // console.log(indexOf(item.parentElement.children[0]))
        removeTodoFromLocalStorage(item.parentElement);
        item.parentElement.children[0].innerHTML = editedTodo;
        saveTodoToLocalStorage(editedTodo);
    }

    // Complete Todo
    if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed')
    }

    // Delete Todo
    if (item.classList[0] === 'delete-btn') {
        const todoForDelete = item.parentElement;

        // Animation when deleting
        todoForDelete.classList.add('animationDelete');

        // Remove from Local Storage
        removeTodoFromLocalStorage(todoForDelete);

        // When animation finished, remove it
        todoForDelete.addEventListener('transitionend', () => {
            todoForDelete.remove();
        })
    }
}

// Function for filter todo lists - (all, completed, uncompleted)
function filterTodo(event) {
    const todoForFilter = todoList.childNodes;
    todoForFilter.forEach((todo) => {
        switch (event.target.value) {
            case 'All':
                todo.style.display = 'flex';
                break;
            case 'Completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'Uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

// todoItems variable for local storage
let todoItems;
// Check todo items in local storage
function checkTodoLocalStorage() {
    if (localStorage.getItem('todoItems') === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(localStorage.getItem('todoItems'))
    }
    return todoItems;
}

// Function for saving todo items in local storage
function saveTodoToLocalStorage(todoItem) {

    checkTodoLocalStorage();

    // Save todo into local
    todoItems.push(todoItem);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// Function to get todo items from local storage
function getTodoFromLocalStorage() {

    checkTodoLocalStorage();

    // Get todo from local storage and display on the front-end
    todoItems.forEach((todo) => {
        todoDiv(todo);
    })
}

// Function to remove todo items from local storage
function removeTodoFromLocalStorage(todoForDelete) {
    checkTodoLocalStorage();

    // Item index to be deleted
    const todoIndex = todoForDelete.children[0].innerText;
    // From index, remove 1 item 
    todoItems.splice(todoItems.indexOf(todoIndex), 1);
    // Save updated todoItems to local storage 
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}