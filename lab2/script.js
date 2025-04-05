"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskListSelect = document.getElementById("taskListSelect");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const searchInput = document.getElementById("searchInput");
    const listsContainer = document.getElementById("listsContainer");
    const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));
    const confirmText = document.getElementById("confirmText");
    const confirmDeleteBtn = document.getElementById("confirmDelete");

    let lastDeletedTask = null;

    addTaskBtn.addEventListener("click", () => addTask());
    searchInput.addEventListener("input", () => filterTasks());
    listsContainer.addEventListener("click", toggleListVisibility);
    document.addEventListener("keydown", handleUndo);

    function addTask() {
        const taskText = taskInput.value.trim();
        const listId = taskListSelect.value;
        if (taskText === "") return;

        const taskItem = document.createElement("li");
        taskItem.className = "list-group-item";
        taskItem.textContent = taskText;
        taskItem.dataset.completed = "false";

        const deleteBtn = createDeleteButton(taskText, taskItem, listId);
        taskItem.appendChild(deleteBtn);

        taskItem.addEventListener("click", () => toggleCompletion(taskItem, taskText, deleteBtn));
        document.getElementById(listId).appendChild(taskItem);
        taskInput.value = "";
    }

    function createDeleteButton(taskText, taskItem, listId) {
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm float-end";
        deleteBtn.textContent = "X";

        deleteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            confirmText.textContent = `Czy na pewno chcesz usunąć zadanie o treści: "${taskText}"?`;
            confirmModal.show();
            confirmDeleteBtn.onclick = function () {
                lastDeletedTask = { element: taskItem, listId };
                taskItem.remove();
                confirmModal.hide();
            };
        });

        return deleteBtn;
    }

    function toggleCompletion(taskItem, taskText, deleteBtn) {
        const isCompleted = taskItem.dataset.completed === "true";
        taskItem.dataset.completed = isCompleted ? "false" : "true";
        taskItem.style.textDecoration = isCompleted ? "none" : "line-through";
        taskItem.style.color = isCompleted ? "black" : "gray";
        if (!isCompleted) {
            const now = new Date().toLocaleString();
            taskItem.innerHTML = `${taskText} <span class="badge bg-secondary">${now}</span>`;
        } else {
            taskItem.innerHTML = taskText;
        }
        taskItem.appendChild(deleteBtn);
    }

    function filterTasks() {
        const searchText = searchInput.value.toLowerCase();
        const lists = document.querySelectorAll("ul.list-group");

        lists.forEach(list => {
            Array.from(list.children).forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchText) ? "block" : "none";
            });
        });
    }

    function toggleListVisibility(event) {
        if (event.target.classList.contains("list-header")) {
            const listId = event.target.dataset.list;
            const listElement = document.getElementById(listId);
            listElement.classList.toggle("d-none");
        }
    }

    function handleUndo(event) {
        if (event.ctrlKey && event.key === "z" && lastDeletedTask) {
            document.getElementById(lastDeletedTask.listId).appendChild(lastDeletedTask.element);
            lastDeletedTask = null;
        }
    }
});
