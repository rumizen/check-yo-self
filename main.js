/* ---------- Query Selectors ---------- */


const searchBar = document.querySelector('.header--search__input');
const searchBtn = document.querySelector('.header--search__icon');
const taskTitle = document.querySelector('.form__input--task-title');
const taskItem = document.querySelector('.form__input--task-item');
const taskItemBtn = document.querySelector('.form__input--task-item--button');
const makeTaskListBtn = document.querySelector('.form__button--make-task-list');
const clearAllBtn = document.querySelector('.form__button--clear-all');
const filterByUrgencyBtn = document.querySelector('.form__button--filter-by-urgency');
const main = document.querySelector('main');
const taskList = document.querySelector('.form__task-item-list');


/* -------------- Global Variables ------------- */


var allTodos = JSON.parse(localStorage.getItem('storedTodos')) || [];


/* -------------- Event Listeners ------------- */


window.addEventListener('load', startCheckYoSelf);
taskItem.addEventListener('input', inputChecker);
taskTitle.addEventListener('input', inputChecker);
// searchBtn.addEventListener('click');
taskItemBtn.addEventListener('click', createTask);
makeTaskListBtn.addEventListener('click', createNewTodo);
// clearAllBtn.addEventListener('click');
// filterByUrgencyBtn.addEventListener('click',);


/* -------------- On Load Fuctions ------------- */


function startCheckYoSelf() {
	disableButton(makeTaskListBtn);
	disableButton(clearAllBtn);
	disableButton(taskItemBtn);
	reinstantiateTodos(allTodos);
	loadTodos();
}

function inputChecker() {
	if (taskItem.value === '' || taskTitle.value === '') {
		disableButton(taskItemBtn);
		disableButton(makeTaskListBtn);
	} else {
		enableButton(taskItemBtn);
		enableButton(makeTaskListBtn);
	}
}

function enableButton(btn) {
	btn.removeAttribute('disabled');
}

function disableButton(btn) {
	btn.setAttribute('disabled', '');
}

function resetInput(input, btn) {
	input.value = '';
	disableButton(btn);
}

function reinstantiateTodos(todos) {
	allTodos = [];
	todos.forEach(function(todo) {
		let newTodo = new ToDoList(todo.id, todo.title, todo.urgent, todo.tasks);
		allTodos.push(newTodo);
	})
}

function loadTodos() {
	allTodos.forEach(function(el) {
		appendTodo(el);
	});
}

function createTask(e) {
	e.preventDefault()
	const task = `
	<div class="task-item" data-id=${Date.now()}>
		<img class="task-item__icon--delete" src="images/delete.svg">
		<p class="task-item__text">${taskItem.value}</p>
	</div>`;
	taskList.insertAdjacentHTML('beforeend', task);
	resetInput(taskItem, taskItemBtn);
}

function appendTodo(newTodo) {
	const cardText = `
		<article class="todo-card flex" data-id=${newTodo.id}>
			<section class="todo-card__top flex">
				<h2 class="todo-card__top--title">${newTodo.title}</h2>
			</section>
			<section class="todo-card__middle flex">
			</section>
			<section class="todo-card__bottom flex">
				<div class="todo-card__bottom__icon todo-card__bottom__icon--urgent flex">
					<img class="todo-card__bottom--urgent" src="images/urgent.svg">
					<p>Urgent</p>
				</div>
				<div class="todo-card__bottom__icon todo-card__bottom__icon--delete flex">
					<img class="todo-card__bottom--delete" src="images/delete.svg">
					<p>Delete</p>
				</div>
			</section>
		</article>`;
	main.insertAdjacentHTML('afterbegin', cardText);
	newTodo.tasks.forEach(function(el) {
		document.querySelector('.todo-card__middle').insertAdjacentHTML('beforeend', `
			<div class="todo-card__middle--task flex">
				<img class="todo-card__middle--task--checkbox" src="images/checkbox.svg"
				<p class="todo-card__middle--task--text">${el.content}</p>
			</div>`);
	});
}

function createNewTodo(e) {
	e.preventDefault();
	const taskArray = Array.prototype.slice.call(document.querySelectorAll('.task-item__text'));
	const taskObjArray = taskArray.map(function(el) {
		return el = {content: el.innerText, checked: false};
	}) 
	const newTodo = new ToDoList(Date.now(), taskTitle.value, false, taskObjArray);
	appendTodo(newTodo);
	allTodos.push(newTodo);
}

function todoButtons(e) {
	const click = e.target;
	const card = e.target.closest(classname);
	const cardIndex = getIndex();
	const taskObject = todoArray[cardIndex];

	if (click.matches('.todo-card__bottom--delete')) {
		deleteButton(click);
	}
	if (click.matches('.todo-card__bottom--urgent')) {
		urgentButton(click);
	}
	if (click.matches('.todo-card__checkbox')) {
		taskCompleteButton(click);
	}
}

function getIndex(card) {
	cardIndex = todoArray.findIndex(function(el) {
		return el === card.dataset.id;
	})
}


function deleteButton(click) {

}

function urgentButton(click) {

}

function taskCompleteButton(click) {

}

function updateTaskDOM(target) {
	// find ID of target
	// use array.find() to return object
	// iterate through object.tasks and match task innerText
	// create var for that object (taskObject)
	// run taskObject.updateTask(target, taskObject)
}