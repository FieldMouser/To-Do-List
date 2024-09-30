const addToDo = document.querySelector('.newToDo');
const list = document.querySelector(".list");

//Список в виде массива объектов:
tasksList = [];

function taskAdd(name) {
    tasksList[tasksList.length] = {
        name: name,
        status: false
    }
    taskListUpdate();
}

//Работа со списком:
function callAdding() {
    const newToDo = document.createElement("input");
    newToDo.setAttribute('type', 'text');
    newToDo.classList.add('newToDoTextbox');
    addToDo.appendChild(newToDo);
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
    for (i = 0; i < tasksList.length; i++) {
        const task = document.createElement("li");
        task.textContent = tasksList[i].name;
        list.appendChild(task);
    }
}

taskListUpdate();
