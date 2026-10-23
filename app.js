const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.todo-app__button--add');
const todoList = document.getElementById('incomplete-tasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  listItem.className = 'todo-app__item';

  const checkbox = document.createElement('input');

  const label = document.createElement('label');

  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'todo-app__task-label';

  checkbox.type = 'checkbox';
  checkbox.className = 'todo-app__checkbox';
  checkbox.setAttribute('aria-label', 'Mark task completed');

  editInput.type = 'text';
  editInput.className = 'todo-app__edit-input';
  editInput.setAttribute('aria-label', 'Edit task');

  editButton.innerText = 'Edit';
  editButton.type = 'button';
  editButton.className = 'todo-app__button todo-app__button--edit';

  deleteButton.type = 'button';
  deleteButton.className = 'todo-app__button todo-app__button--delete';
  deleteButton.setAttribute('aria-label', 'Delete task');

  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = '';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, handleTaskCompletionChange);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.todo-app__edit-input');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.todo-app__button--edit');
  const isEditing = listItem.classList.contains('todo-app__item--editing');

  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('todo-app__item--editing');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const handleTaskCompletionChange = function () {
  const listItem = this.parentNode;
  if (this.checked) {
    completedList.appendChild(listItem);
  } else {
    todoList.appendChild(listItem);
  }

  bindTaskEvents(listItem, handleTaskCompletionChange);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskItem, checkboxChangeHandler) {
  const checkbox = taskItem.querySelector('.todo-app__checkbox');
  const editButton = taskItem.querySelector('.todo-app__button--edit');
  const deleteButton = taskItem.querySelector('.todo-app__button--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxChangeHandler;
};

for (let i = 0; i < todoList.children.length; i++) {
  bindTaskEvents(todoList.children[i], handleTaskCompletionChange);
}

for (let i = 0; i < completedList.children.length; i++) {
  bindTaskEvents(completedList.children[i], handleTaskCompletionChange);
}
