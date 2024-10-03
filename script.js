const addToDo = document.querySelector('.newToDo');
const list = document.querySelector(".list");

// Сохранение в json
function saveTasks() {
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
}

// загрузка из json
function loadTasks() {
    const savedTasks = localStorage.getItem('tasksList');
    if (savedTasks) {
        tasksList = JSON.parse(savedTasks);
        taskListUpdate();
    }
}

//Список в виде массива объектов:
tasksList = [];

function taskAdd(name) {
    tasksList[tasksList.length] = {
        name: name,
        status: false
    }
    saveTasks();
    taskListUpdate();
}

//Работа со списком:
function callAdding() {
    const newToDo = document.createElement("input");
    newToDo.setAttribute('type', 'text');
    newToDo.classList.add('newToDoTextbox');
    addToDo.appendChild(newToDo);

    // Устанавливаем фокус на текстовом поле
    newToDo.focus();
    
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Подтвердить";
    confirmButton.setAttribute('onclick', 'confirmAdding()');
    confirmButton.classList.add('confirmButton');
    addToDo.appendChild(confirmButton);
    addToDo.removeChild(document.querySelector('.addToDo'));
}

function confirmAdding() {
    const inputElement = document.querySelector('.newToDoTextbox');
    const inputValue = inputElement.value; // Получаем значение из поля ввода
    
    if (inputValue.trim() === "") {
        alert("Введите задачу!"); // Проверка на пустое значение
        return; // Выход, если значение пустое
    }

    taskAdd(inputValue); // Используем значение поля ввода
    const addToDoButton = document.createElement("button");
    addToDoButton.textContent = "Добавить задачу";
    addToDoButton.setAttribute('onclick', 'callAdding()');
    addToDoButton.classList.add('addToDo');
    addToDo.appendChild(addToDoButton);
    addToDo.removeChild(document.querySelector('.confirmButton'));
    addToDo.removeChild(inputElement);
}

function taskListUpdate(){
    list.innerHTML = "";
    for (let i = 0; i < tasksList.length; i++) {
        const doneButton = document.createElement("button");
        doneButton.innerHTML = '<i class="fas fa-check"></i>';
        doneButton.setAttribute('onclick', 'doneTask(' + i + ')');
        doneButton.classList.add('done-btn');

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.setAttribute('onclick', 'deleteTask(' + i + ')');
        deleteButton.classList.add('delete-btn');

        // Создание контейнера для кнопок
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        buttonContainer.appendChild(doneButton);
        buttonContainer.appendChild(deleteButton);

        const task = document.createElement("li");
        task.textContent = tasksList[i].name;
        if (tasksList[i].status == true) {
            task.innerHTML = "<strike>" + tasksList[i].name + "</strike>";
        }
        task.appendChild(buttonContainer);
        list.appendChild(task);    
    }
}


function deleteTask(num) {
    tasksList.splice(num, 1);
    taskListUpdate();
    saveTasks();
}

function doneTask(num) {
    if (tasksList[num].status === true) {
        tasksList[num].status = false;
    }
    else {
        tasksList[num].status = true;
    }
    saveTasks();
    taskListUpdate();
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
});

taskListUpdate();

document.addEventListener("keydown", function(event) {
    if (event.code == "Enter") {
        confirmAdding();
    }
});