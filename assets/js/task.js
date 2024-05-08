export function task() {
    let toDo = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : [] ;
    let inProgress = [];
    let done = [];
    let daysDiff = 0;


    const now = new Date();
    const isoDateString = now.toISOString();
    const minDate = isoDateString.substring(0, 10);

    const inputDate = document.querySelector('#taskDate');

    inputDate.setAttribute('min', minDate);

    document.addEventListener("DOMContentLoaded", function() {
        const addItemButton = document.getElementById("addItemButton");
        const taskForm = document.getElementById("taskForm");
        const todoList = document.getElementById("todoList");
        const inProgressList = document.getElementById("inProgressList");
        const doneList = document.getElementById("doneList");

        addItemButton.addEventListener("click", function() {
            taskForm.style.display = "flex";
        });

        const submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", function() {
            daysDiff = getElapsedTime();

            const taskName = document.getElementById("taskInput").value;
            const taskDescription = document.getElementById("taskDescription").value;
            const taskDate = document.getElementById("taskDate").value;

            const task = {
                name: taskName,
                description: taskDescription,
                date: taskDate,
                daysNum: daysDiff
            };

            toDo.push(task);
            localStorage.setItem('task', JSON.stringify(toDo)) ;
            taskForm.style.display = "none";
            renderTodoList();
        });
        renderTodoList() ;

        function renderTodoList() {
            renderTasks(toDo, todoList);
            renderTasks(inProgress, inProgressList);
            renderTasks(done, doneList);
        }

        function renderTasks(tasks, list) {
            list.innerHTML = "";
        
            tasks.forEach((task, index) => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task-item");
                taskDiv.draggable = true;
                taskDiv.dataset.id = `task-${index}`;

                taskDiv.addEventListener("dragstart", dragStart);
        
                const title = document.createElement("h3");
                title.textContent = task.name;
                const description = document.createElement("p");
                description.textContent = task.description;
                const dueDate = document.createElement("p");
                dueDate.textContent = task.date;
                const days = document.createElement("p");
                days.textContent = `Days left: ${task.daysNum}`;
        
                taskDiv.appendChild(title);
                taskDiv.appendChild(description);
                taskDiv.appendChild(dueDate);
                taskDiv.appendChild(days);
        
                list.appendChild(taskDiv);
        
                const blockContainers = document.querySelectorAll('.taskBlocks .block');
                blockContainers.forEach(container => {
                    container.addEventListener('dragover', allowDrop);
                    container.addEventListener('drop', drop);
                });
            });
        }

        function dragStart(event) {
            const taskId = event.target.dataset.id;
            event.dataTransfer.setData("text/plain", taskId);
        }
        
        const todoBlock = document.querySelector('.block:nth-child(1) .block ul');
        todoBlock.addEventListener('dragover', allowDrop);
        todoBlock.addEventListener('drop', drop);
    
        function allowDrop(event) {
            event.preventDefault();
        }
    
        function drop(event) {
            event.preventDefault();
            
            const taskId = event.dataTransfer.getData("text/plain");
            const taskDiv = document.querySelector(`.task-item[data-id="${taskId}"]`);
            

            const targetList = event.target.closest('ul');
            
            if (taskDiv && targetList) {

                const sourceListId = taskDiv.closest('.block').querySelector('ul').id;
                const sourceArray = getSourceArray(sourceListId);
                const targetArray = getTargetArray(targetList.id);
                const taskIndex = parseInt(taskId.split('-')[1]);
                const task = sourceArray.splice(taskIndex, 1)[0];
                targetArray.push(task);
                
                targetList.appendChild(taskDiv);
            }
        }
        


        
        function getElapsedTime() {
            const now = new Date();
            const inputDateValue = document.getElementById("taskDate").value;   
            const inputDateTime = new Date(inputDateValue);
            const timeDiff = inputDateTime.getTime() - now.getTime();
            return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        }

        function getSourceArray(sourceList) {
            switch (sourceList) {
                case 'todoList':
                    return toDo;
                case 'inProgressList':
                    return inProgress;
                case 'doneList':
                    return done;
            }
        }

        function getTargetArray(targetList) {
            switch (targetList) {
                case 'todoList':
                    return toDo;
                case 'inProgressList':
                    return inProgress;
                case 'doneList':
                    return done;
            }
        }

    });
    
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


/*function setDate() {
    const head = document.createElement('h1');

    button.addEventListener('click', function() {
        head.textContent = getElapsedTime();
    });

    document.body.appendChild(head);
}
*/


