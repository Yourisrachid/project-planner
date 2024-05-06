
let todoTasks = [];
let inProgressTasks = [];
let doneTasks = [];

function addTask() {
    const taskName = document.getElementById("taskInput").value;
    const taskDescription = document.getElementById("taskDescription").value;

    
    const task = {
        
        name: taskName, 
        description: taskDescription,
        state: 'todo' 
    };

    todoTasks.push(task);

    
    document.getElementById("taskInput").value = '';
    document.getElementById("taskDescription").value = '';

    
    renderTasks();
}

function renderTasks() {
    const todoList = document.getElementById("todoList");
    const inProgressList = document.getElementById("inProgressList");
    const doneList = document.getElementById("doneList");

    
    todoList.innerHTML = '';
    inProgressList.innerHTML = '';
    doneList.innerHTML = '';

   
    todoTasks.forEach(task => {
        const li = createTaskElement(task);
        todoList.appendChild(li);
    });

    
    inProgressTasks.forEach(task => {
        const li = createTaskElement(task);
        inProgressList.appendChild(li);
    });

    
    doneTasks.forEach(task => {
        const li = createTaskElement(task);
        doneList.appendChild(li);
    });
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${task.name}</strong>: ${task.description}`;

    const moveButton = document.createElement("button");
    moveButton.textContent = "Déplacer";
    moveButton.onclick = function() {
        moveTask(task);
    };
    li.appendChild(moveButton);

    return li;
}

// function moveTask(task) {
//     switch (task.state) {
//         case 'todo':
            
//             todoTasks = todoTasks.filter(t => t.id !== task.id);
//             inProgressTasks.push(task);
//             break;
//         case 'inprogress':
            
//             inProgressTasks = inProgressTasks.filter(t => t.id !== task.id);
//             doneTasks.push(task);
//             break;
//         case 'done':
            
//             return;
//     }

//     renderTasks();
// }
