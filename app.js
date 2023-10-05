let taskList = document.getElementById("taskList");

function createTaskElement({ text, completed }) {
  let task = document.createElement("li");
  let textNode = document.createElement("p");
  let span = document.createElement("span");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  textNode.textContent = text;
  span.innerHTML = "&#10006;";

  task.appendChild(checkbox);
  task.appendChild(textNode);
  task.appendChild(span);

  return task;
}

document
  .getElementById("addTaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let taskInput = document.getElementById("taskInput");

    if (taskInput.value === "") alert("You have to write something!");
    else {
      let task = createTaskElement({ text: taskInput.value, completed: false });
      taskList.appendChild(task);
      taskInput.value = "";
      saveTask();
    }
  });

taskList.addEventListener("click", function (event) {
  if (event.target.tagName === "P") {
    const checkbox = event.target.parentElement.querySelector(
      "input[type='checkbox']"
    );
    checkbox.checked = !checkbox.checked;
    event.target.classList.toggle("checked");
    saveTask();
  } else if (
    event.target.tagName === "INPUT" &&
    event.target.type === "checkbox"
  ) {
    const checkbox = event.target;
    const text = checkbox.nextElementSibling;
    text.classList.toggle("checked");
    saveTask();
  } else if (event.target.tagName === "SPAN") {
    event.target.parentElement.remove();
    saveTask();
  }
});

function saveTask() {
  const tasks = Array.from(taskList.children).map((li) => {
    const text = li.querySelector("p").textContent;
    const completed = li.querySelector('input[type="checkbox"]').checked;
    return { text, completed };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";

  for (const task of tasks) {
    let taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
  }
}

showTask();
