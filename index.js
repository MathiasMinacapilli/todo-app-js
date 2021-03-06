/* State */
const tasks = [];

/* Cash the DOM */
const createNewTaskInput = document.querySelector('#create-task-input');
const createNewTaskButton = document.querySelector('#create-task-btn');
const tasksMessagesDiv = document.querySelector('#tasks-messages-div');
const tasksCountSpan = document.querySelector('#tasks-count-span');
const doneTasksCountSpan = document.querySelector('#done-tasks-count-span');
const tasksUl = document.querySelector('#tasks-ul');

/* 
==========================================
Aux functions
==========================================
*/

/* Returns true only if the create new task input is empty. False in other case */
const isEmptyCreateNewTaskInput = () => !!(createNewTaskInput && createNewTaskInput.value === '');

/* Handles the add new task event */
const addNewTaskEventHandler = () => {
    if (!isEmptyCreateNewTaskInput()) {
        addNewTask(createNewTaskInput.value);
        createNewTaskInput.value = '';
    }
}

/* Returns a task HTML elemnt with the given title */
const createTaskElement = taskTitle => {
    const newTask = document.createElement('li');
    newTask.classList = 'task-li';
    newTask.innerHTML = `${taskTitle}`;
    return newTask;
}

/* Add new task with given title to the DOM and to the tasks state array */
const addNewTask = taskTitle => {
    if (taskTitle) {
        const newTask = createTaskElement(taskTitle);
        tasksUl.appendChild(newTask);
        tasks.push({ title: taskTitle, isDone: false });
        // Update the tasks count number
        tasksCountSpan.innerHTML = tasks.length;
    } else {
        alert('Please provide a valid task title!');
    }
}

/* If all tasks have been done, then add a successful message to alert the user. If not, then the message will be removed */
const checkIfAllTasksHaveBeenDone = () => {
    // TODO: improve perfomance, not necessary to iterate over all tasks array every time this process is invoked
    if (tasks.every(t => t.isDone)) {
        const successMessage = document.createElement('p');
        successMessage.id = 'success-message-p';
        successMessage.style.color = '#d28aff';
        successMessage.innerHTML = 'Congrats! You have completed all your tasks';
        tasksMessagesDiv.appendChild(successMessage);
    } else {
        const successMessageP = document.querySelector('#success-message-p');
        if (successMessageP) {
            const wrapper = successMessageP.parentNode;
            wrapper.removeChild(successMessageP);
        }
    }
}

/* 
==========================================
Event listeners
==========================================
*/

/* When user wants to create a new task by pressind enter */
createNewTaskInput.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.key === 'Enter') {
        addNewTaskEventHandler();
    }
});

createNewTaskButton.addEventListener('click', e => {
    e.preventDefault();
    addNewTaskEventHandler();
});

/* When user want to click on a task to mark it as done or undone */
document.addEventListener('click', e => {
    const targetTaskElement = e.target;
    if (targetTaskElement.classList.value.includes('task-li')) {
        // Update the state of the task in tasks list
        const targetTaskObject = tasks.find(t => t.title === targetTaskElement.innerHTML);
        if (targetTaskObject.isDone) {
            targetTaskElement.classList.remove('done-task');
            doneTasksCountSpan.innerHTML = parseInt(doneTasksCountSpan.innerHTML) - 1;
        } else {
            targetTaskElement.classList.add('done-task');
            doneTasksCountSpan.innerHTML = parseInt(doneTasksCountSpan.innerHTML) + 1;
        }
        targetTaskObject.isDone = !targetTaskObject.isDone;
        checkIfAllTasksHaveBeenDone();
    }
});

/* Main function that contains all the app logic */
const main = () => {

}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        main();
    }
}