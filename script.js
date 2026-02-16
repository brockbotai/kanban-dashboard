document.addEventListener('DOMContentLoaded', () => {
    console.log("Kanban board loading state...");

    const columns = document.querySelectorAll('.kanban-column');

    // Initialize SortableJS for each column
    columns.forEach(column => {
        new Sortable(column.querySelector('.tasks'), {
            group: 'kanban',
            animation: 150,
            onEnd: () => saveState() // Save state when a task is moved
        });
    });

    // Add event listeners for the 'Add Task' buttons
    const addButtons = document.querySelectorAll('.add-task-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = prompt("Enter a new task:");
            if (text && text.trim() !== '') {
                createTaskElement(text.trim(), button.previousElementSibling);
                saveState(); // Save state after adding a new task
            }
        });
    });

    // --- Helper Function to Create Task Element ---
    function createTaskElement(text, container) {
        const task = document.createElement('div');
        task.classList.add('task');

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = text;
        task.appendChild(taskText);

        const actions = document.createElement('div');
        actions.classList.add('task-actions');

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✎';
        editBtn.classList.add('action-btn', 'edit-btn');
        editBtn.title = "Edit Task";
        editBtn.addEventListener('click', () => {
            const newText = prompt("Edit task:", taskText.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskText.textContent = newText.trim();
                saveState();
            }
        });
        actions.appendChild(editBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑';
        deleteBtn.classList.add('action-btn', 'delete-btn');
        deleteBtn.title = "Delete Task";
        deleteBtn.addEventListener('click', () => {
            if (confirm("Delete this task?")) {
                task.remove();
                saveState();
            }
        });
        actions.appendChild(deleteBtn);

        task.appendChild(actions);
        container.appendChild(task);
    }

    // --- Save and Load Functions ---

    function saveState() {
        const state = {};
        columns.forEach(column => {
            const columnId = column.id;
            const tasks = [];
            column.querySelectorAll('.task .task-text').forEach(taskTextSpan => {
                tasks.push(taskTextSpan.textContent);
            });
            state[columnId] = tasks;
        });
        localStorage.setItem('kanbanState', JSON.stringify(state));
        console.log("Kanban state saved.");
    }

    function loadState() {
        const savedState = localStorage.getItem('kanbanState');
        if (savedState) {
            const state = JSON.parse(savedState);

            // Clear existing tasks from all columns
            columns.forEach(column => {
                column.querySelector('.tasks').innerHTML = '';
            });

            // Populate columns from the saved state
            for (const columnId in state) {
                const column = document.getElementById(columnId);
                if (column) {
                    const tasksContainer = column.querySelector('.tasks');
                    state[columnId].forEach(taskText => {
                        createTaskElement(taskText, tasksContainer);
                    });
                }
            }
            console.log("Kanban state loaded.");
        } else {
            console.log("No saved state found.");
        }
    }

    // Load the state when the page loads
    loadState();
});
