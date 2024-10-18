document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // Retrieve tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks on the page
    function renderTasks() {
        taskList.innerHTML = ""; // Clear the task list before rendering

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${task}
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="editTask(${index})">Edit</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add a new task
    addTaskBtn.addEventListener("click", () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            taskInput.value = ""; // Clear the input field
        }
    });

    // Delete a task
    window.deleteTask = function (index) {
        tasks.splice(index, 1); 
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(); // Re-render the task list
    };

    // Edit a task
    window.editTask = function (index) {
        const newTask = prompt("Edit your task:", tasks[index]);
        if (newTask) {
            tasks[index] = newTask;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks(); // Re-render the task list
        }
    };

    // Render tasks on page load
    renderTasks();
});
