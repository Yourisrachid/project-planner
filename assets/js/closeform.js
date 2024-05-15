export function closeForm() {
    document.addEventListener("DOMContentLoaded", function() {
            const closeFormButton = document.getElementById("closeFormButton");
            const taskForm = document.getElementById("taskForm");


            closeFormButton.addEventListener("click", function() {

                taskForm.style.display = "none";
            });
        });
}