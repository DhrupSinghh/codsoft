document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <span class="actions">
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                </span>
            `;
            taskList.appendChild(li);
        });
    }

    // Add task
    addTaskButton.addEventListener('click', function() {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    });

    // Edit task
    window.editTask = function(index) {
        const updatedTask = prompt('Edit task:', tasks[index]);
        if (updatedTask !== null) {
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Delete task
    window.deleteTask = function(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Initial render
    renderTasks();
});
