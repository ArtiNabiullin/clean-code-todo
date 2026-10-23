const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.todo-app__button--add');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  listItem.className = 'todo-app__item';

  const checkBox = document.createElement('input');

  const label = document.createElement('label');

  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'todo-app__task-label';

  checkBox.type = 'checkbox';
  checkBox.className = 'todo-app__checkbox';
  checkBox.setAttribute('aria-label', 'Mark task completed');

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

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.todo-app__edit-input');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.todo-app__button--edit');
  const containsClass = listItem.classList.contains('todo-app__item--editing');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('todo-app__item--editing');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('.todo-app__checkbox');
  const editButton = taskListItem.querySelector('.todo-app__button--edit');
  const deleteButton = taskListItem.querySelector('.todo-app__button--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
