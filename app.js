let taskList = document.getElementById("taskList");

document
  .getElementById("addTaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let taskInput = document.getElementById("taskInput");

    if (taskInput.value === "") alert("You have to write something!");
    else {
      let task = document.createElement("li");
      let text = document.createElement("p");
      let span = document.createElement("span");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      text.textContent = taskInput.value;
      span.innerHTML = "&#10006;";

      task.appendChild(checkbox);
      task.appendChild(text);
      task.appendChild(span);
      taskList.appendChild(task);
      taskInput.value = "";
    }
  });

taskList.addEventListener("click", function (event) {
  if (event.target.tagName === "P") {
    const checkbox = event.target.parentElement.querySelector(
      "input[type='checkbox']"
    );
    checkbox.checked = !checkbox.checked;
    event.target.classList.toggle("checked");
  } else if (
    event.target.tagName === "INPUT" &&
    event.target.type === "checkbox"
  ) {
    const checkbox = event.target;
    const text = checkbox.nextElementSibling;
    text.classList.toggle("checked");
  } else if (event.target.tagName === "SPAN")
    event.target.parentElement.remove();
});
