document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function loadTasks() {
    const lists = document.querySelectorAll(".task-list ul");

    lists.forEach(function (list) {
        list.innerHTML = "";

        const listId = list.parentElement.dataset.listId;
        const tasks = JSON.parse(localStorage.getItem(`tasks_${listId}`)) || [];

        tasks.forEach(function (task, index) {
            createTaskElement(list, task, index);
        });
    });
}

function saveTasks(listId, tasks) {
    localStorage.setItem(`tasks_${listId}`, JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    const listSelector = document.getElementById("list-selector");
    const selectedListId = listSelector.value;

    if (taskText !== "") {
        const tasks = JSON.parse(localStorage.getItem(`tasks_${selectedListId}`)) || [];

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
        const dateTime = `${formattedDate} ${formattedTime}`;

        tasks.push({ text: taskText, completed: false, dateTime });
        saveTasks(selectedListId, tasks);
        loadTasks();
        taskInput.value = "";
    }
}

function createTaskElement(list, task, index) {
    const textElement = document.createElement("span");
    textElement.className = "task-name";
    textElement.innerText = task.text;

    const dateElement = document.createElement("span");
    dateElement.className = "task-date";
    dateElement.innerText = ` (Added: ${task.dateTime})`;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
        deleteTask(list, index);
    });

    const taskElement = document.createElement("li");
    taskElement.appendChild(textElement);
    taskElement.appendChild(dateElement);
    taskElement.appendChild(deleteButton);

    list.appendChild(taskElement);
}

function deleteTask(list, index) {
    const listId = list.parentElement.dataset.listId;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${listId}`)) || [];
    tasks.splice(index, 1);
    saveTasks(listId, tasks);
    loadTasks();
}
