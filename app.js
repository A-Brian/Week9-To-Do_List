// Task Module
const Task = (title) => {
    let isCompleted = false;

    const getTitle = () => title;
    const isTaskCompleted = () => isCompleted;
    const toggleCompletion = () => {
        isCompleted = !isCompleted;
    };

    return { getTitle, isTaskCompleted, toggleCompletion };
};

// Task List Module
const TaskList = (() => {
    const tasks = [];

    const addTask = (title) => {
        const task = Task(title);
        tasks.push(task);
        return task;
    };

    const removeTask = (task) => {
        const index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
    };

    const getTasks = () => tasks;

    return { addTask, removeTask, getTasks };
})();

// UI Module
const UI = (() => {
    const taskList = document.getElementById('taskList');

    const displayTasks = () => {
        taskList.innerHTML = '';
        TaskList.getTasks().forEach((task, index) => {
            const li = document.createElement('li');
            
            // Create a checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.isTaskCompleted();
            checkbox.addEventListener('change', () => {
                task.toggleCompletion();
                displayTasks();
            });

            li.appendChild(checkbox);

            // Create the task title
            const titleSpan = document.createElement('span');
            titleSpan.textContent = task.getTitle();
            titleSpan.className = task.isTaskCompleted() ? 'completed' : '';

            li.appendChild(titleSpan);

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                TaskList.removeTask(task);
                displayTasks();
            });

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    };

    const clearInput = () => {
        const taskInput = document.getElementById('taskInput');
        taskInput.value = '';
    };

    const setupEventListeners = () => {
        const addTaskBtn = document.getElementById('addTaskBtn');
        addTaskBtn.addEventListener('click', () => {
            const taskInput = document.getElementById('taskInput');
            const title = taskInput.value.trim();
            if (title !== '') {
                TaskList.addTask(title);
                clearInput();
                displayTasks();
            }
        });
    };

    return { displayTasks, setupEventListeners };
})();

// Initialize the UI
UI.setupEventListeners();
UI.displayTasks();
