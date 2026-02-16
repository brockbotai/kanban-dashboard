document.addEventListener('DOMContentLoaded', () => {
    console.log("Kanban board loaded.");

    const todo = document.querySelector('#todo .tasks');
    const inprogress = document.querySelector('#inprogress .tasks');
    const done = document.querySelector('#done .tasks');
    const archive = document.querySelector('#archive .tasks');

    new Sortable(todo, {
        group: 'kanban', // set same group name on all lists
        animation: 150
    });

    new Sortable(inprogress, {
        group: 'kanban',
        animation: 150
    });

    new Sortable(done, {
        group: 'kanban',
        animation: 150
    });

    new Sortable(archive, {
        group: 'kanban',
        animation: 150
    });

    const addButtons = document.querySelectorAll('.add-task-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = prompt("Enter a new task:");
            if (text) {
                const newTask = document.createElement('div');
                newTask.classList.add('task');
                newTask.textContent = text;
                const tasksContainer = button.previousElementSibling;
                tasksContainer.appendChild(newTask);
            }
        });
    });
});

