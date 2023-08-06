// This function retrieves the stored tasks from local storage
function getStoredTasks() {
  var storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  } else {
    return [];
  }
}

// This function saves the tasks to local storage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update the UI with tasks
function updateUI() {
  var tasks = getStoredTasks();
  var tasksContainer = document.querySelector('#tasks');
  tasksContainer.innerHTML = '';
  tasks.forEach(function (task) {
    tasksContainer.innerHTML += `
      <div class="task">
        <span id="taskname">${task}</span>
        <button class="delete">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    `;
  });

  // Register event listeners for delete buttons
  var deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach(function (deleteButton) {
    deleteButton.onclick = function () {
      var taskName = this.parentNode
        .querySelector('#taskname')
        .textContent.trim();
      this.parentNode.remove();

      // Retrieve stored tasks
      var storedTasks = getStoredTasks();
      // Find the index of the task to be deleted
      var index = storedTasks.indexOf(taskName);
      if (index > -1) {
        // Remove the task from the tasks array
        storedTasks.splice(index, 1);
        // Save the updated tasks to local storage
        saveTasks(storedTasks);
      }
    };
  });
}

// This line selects the element with an ID of 'push' and sets a click event listener on it.
document.querySelector('#push').onclick = function () {
  // This conditional statement checks if the input field value is empty.
  if (document.querySelector('#newtask input').value.length == 0) {
    // If the input field is empty, an error message is displayed using the SweetAlert library.
    swal('Error..🙄!', 'Please Enter a task', 'warning');
  } else {
    // If the input field is not empty, a new task is created and added to the HTML.
    var taskValue = document.querySelector('#newtask input').value;
    var tasks = getStoredTasks();
    tasks.push(taskValue);
    saveTasks(tasks);
    updateUI();
  }
};

// Load tasks from local storage on page load
window.onload = function () {
  updateUI();
};
