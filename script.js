// This line selects the element with an ID of 'push' and sets a click event listener on it.
document.querySelector('#push').onclick = function(){

    // This conditional statement checks if the input field value is empty.
    if(document.querySelector('#newtask input').value.length == 0){

        // If the input field is empty, an error message is displayed using the SweetAlert library.
        swal("Error..🙄!", "Please Enter a task", "warning");

    } else {

        // If the input field is not empty, a new task is created and added to the HTML.
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

        // This section of code selects all the delete buttons for each task, and sets a click event listener on them.
        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove(); // This line removes the task element from the HTML.
            }
        }
    }
}
