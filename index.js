/* State */
const tasks = [];

/* Cash the DOM */
const createNewTaskInput = document.querySelector('#create-task-input');
const tasksUl = document.querySelector('#tasks-ul');

/* 
==========================================
Aux functions
==========================================
*/

/* Returns true only if the create new task input is empty. False in other case */
const isEmptyCreateNewTaskInput = () => !!(createNewTaskInput && createNewTaskInput.value === '');

/* Returns a task HTML elemnt with the given title */
const createTaskElement = taskTitle => {
    const newTask = document.createElement('li');
    newTask.classList = 'task-li';
    newTask.innerHTML = `${taskTitle}`;
    return newTask;
}

const addNewTask = taskTitle => {
    if (taskTitle) {
        const newTask = createTaskElement(taskTitle);
        tasksUl.appendChild(newTask);
        tasks.push({ title: taskTitle, isDone: false })
    } else {
        alert('Please provide a valid task title!');
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
    if (e.key === 'Enter' && !isEmptyCreateNewTaskInput()) {
        addNewTask(createNewTaskInput.value);
        createNewTaskInput.value = '';
    }
});

/* When user want to click on a task */
document.addEventListener('click', e => {
    const targetTaskElement = e.target;
    if (targetTaskElement.classList.value.includes('task-li')) {
        // Update the state of the task in tasks list
        const targetTaskObject = tasks.find(t => t.title === targetTaskElement.innerHTML);
        if (targetTaskObject.isDone) {
            targetTaskElement.classList.remove('done-task');
        } else {
            targetTaskElement.classList.add('done-task');
        }
        targetTaskObject.isDone = !targetTaskObject.isDone;
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