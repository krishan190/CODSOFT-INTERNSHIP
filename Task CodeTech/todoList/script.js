document.addEventListener("DOMContentLoaded", function () {
  // Check if there are tasks in local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  displayTasks(tasks);
});

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    text: taskInput.value.trim(),
    completed: false,
  };

  // Get existing tasks from local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task
  tasks.push(task);

  // Save tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display the tasks
  displayTasks(tasks);

  // Clear the input field
  taskInput.value = "";
}

function displayTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="${task.completed ? "complete" : ""}">${
      task.text
    }</span>
            <button onclick="toggleComplete(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
            <button onclick="removeTask(${index})">Delete</button>
        `;
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
}

function removeTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
}
