console.log("Hello World");

//Model or storage for app "single source of truth"

var items = [];

var itemList = document.getElementById("todo-list");
var itemInput = document.getElementById("todo-input");

//console.log(itemList, itemInput);

function addTodo(){
	console.log("The add button was clicked!");
	

	//Get the text from the input field.
	var todoText = itemInput.value;

	//Add the text to the items array.
	items.push(todoText);
	console.log(items);

	//Clear the input value and focus the input again.
	itemInput.value = "";
	itemInput.focus();

	//Re-render the todoList
	renderTodoList();
}

function renderTodoList(){

	//Clear the list on the page.
	itemList.innerHTML = "";

	//Loop through the items array and add elements to the page
	for(var i=0; i < items.length; ++i){
		var newTodo = document.createElement("li");
		newTodo.id = "item-" + i.toString();
		newTodo.innerText = items[i];

		//option buttons
		appendOptionButtons(i, newTodo);

		itemList.appendChild(newTodo);
	}
}

function appendOptionButtons(index, item){


	//Delete Todo Functionality.
	var deleteButton = document.createElement("button");
	deleteButton.innerHTML = 'x';
	deleteButton.onclick = function () {
		removeTodo(index);
	};

	//Edit Todo Functionality
	var editButton = document.createElement("button");

	editButton.id = "edit-item-" + index;
	editButton.innerHTML = "edit";
	editButton.onclick = function(){
		addEditField("item-" + index.toString());
	};

	//Append option buttons to the todo.
	item.appendChild(deleteButton);
	item.appendChild(editButton);
}

function removeTodo(index){
	items.splice(index, 1);
	renderTodoList();
}

function addEditField(id){
	var itemToEdit = document.getElementById(id);
	//console.log(itemToEdit);
	console.log("edit-item" + id);
	// Disable the edit Button...
	document.getElementById("edit-" + id).disabled = true;

	//Create a new input where we can update the Todo
	var editInput = document.createElement("input");
	editInput.type = "text";
	editInput.id = "edit-input-" + id.toString();
	editInput.className = "edit-input";
	editInput.placeholder = "Edit the todo...";

	//Create a new button to submit the cahnges
	var updateButton = document.createElement("button");
	updateButton.innerHTML = "Update Todo";
	updateButton.onclick = function(){
		updateTodo(id);
	};

	//Add the input and button to the page.
	itemToEdit.appendChild(editInput);
	itemToEdit.appendChild(updateButton);
}

function updateTodo(id){
	var index = id.split("-")[1];
	//console.log("working"+index);

	var editInput = document.getElementById("edit-input-" + id);

	items[index] = editInput.value;

	//console.log(items);
	renderTodoList();
}