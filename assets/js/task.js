export function task() {


    let toDo = [];
    let inProgress = [];
    let done = [];
    let daysDiff = 0;


    document.addEventListener("DOMContentLoaded", function() {
        const addItemButton = document.getElementById("addItemButton");
        const taskForm = document.getElementById("taskForm");
        const todoList = document.getElementById("todoList");

        //-------------------DATE-------------------------------


        const now = new Date();
        const isoDateString = now.toISOString();
        const minDate = isoDateString.substring(0, 10);
    
        const inputDate = document.querySelector('#taskDate');
    
        inputDate.setAttribute('min', minDate);

        function getElapsedTime() {

            const inputDateValue = inputDate.value;   
            const inputDateTime = new Date(inputDateValue);
            
            const timeDiff = inputDateTime.getTime() - now.getTime();
            return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        }
    


        //-------------------------------------------------





        addItemButton.addEventListener("click", function() {
            taskForm.style.display = "block";
        });

        const submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", function() {

            daysDiff = getElapsedTime()

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


            taskForm.style.display = "none";


            renderTodoList();
        });

        function renderTodoList() {

            toDo.forEach(task => {

                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task-item");

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

                todoList.appendChild(taskDiv);
            });
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