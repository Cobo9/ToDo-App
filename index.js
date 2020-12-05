var tasks = [];
let taskId= 0;
const todoForm = document.querySelector(".todolist__form");
const todoInput = document.querySelector(".todolist__form__input");
const todoButton = document.querySelector(".todolist__form__button");
const todoList = document.querySelector(".todolist__list");
todoForm.addEventListener("submit", submitForm);



function submitForm (e){
    e.preventDefault();
    if(todoInput.value == "")return
    addTask(todoInput.value);
}


function addTask (text){
    taskId++
    const task = {
        name: text,
        id: taskId,
    }
    tasks.push(task);
    renderTodo();
}

function removeItem(id){
    let tasksArray = [...tasks];
    const filteredArr = tasksArray.filter(item => item.id != id.dataset.key)
    tasks = filteredArr;
    renderTodo()
}



function editItem(id){

    // First we need to find the element in the array of tasks
    let tasksArray = [...tasks];
    const elementToEdit = tasksArray.find(item=> item.id == id.dataset.key)

    //prepare the input field and button, input field takes the value of the text on the item in the array.
    todoInput.value = elementToEdit.name;
    todoButton.textContent="Edit";

    //now the user can edit their task in the input field
    //we need to remove the submit event listener from the form, and add a different 
    //one to fetch the input value and change the textContent of task;
    todoForm.removeEventListener("submit", submitForm);
    todoForm.addEventListener("submit", (e)=>fetchValue(e,todoInput.value, elementToEdit));


}



function fetchValue (e,todoInputValue, elementToEdit){
    ///first we block the refresher
    e.preventDefault()
    //second we alter the name of the element in the array to the one that user wrote
    elementToEdit.name = todoInputValue;

    //restore the button and the input field to default behavior
    todoInput.value = "";
    todoButton.textContent="Submit";

    //we need to restore the listeners to their default behaviour
    todoForm.removeEventListener("submit", (e)=>fetchValue(e,todoInput.value, elementToEdit));
    todoForm.addEventListener("submit", submitForm);
    //render of the newly altered list
    renderTodo();
}


function renderTodo(){
    todoList.innerHTML="";

    tasks.forEach(item=> {

        const input = document.createElement("input");
        input.classList.add("todolist__list__item__button");
        input.setAttribute("type", "checkbox");
        
        const editIcon = document.createElement("i");
        editIcon.setAttribute("class","fas fa-pencil-alt fa-2x");

        const editBtn = document.createElement("button")
        editBtn.classList.add("todolist__list__item__button");
        editBtn.classList.add("todolist__list__item__button--edit");
        editBtn.setAttribute("data-key", `${item.id}`);
        editBtn.appendChild(editIcon)

        const deleteIcon = document.createElement("i")
        deleteIcon.setAttribute("class", "fas fa-times fa-2x")
        
        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("todolist__list__item__button");
        deleteBtn.classList.add("todolist__list__item__button--delete");
        deleteBtn.setAttribute("data-key", `${item.id}`);
        deleteBtn.appendChild(deleteIcon);

        const itemBtns = document.createElement("div")
        itemBtns.classList.add("todolist__list__item__buttons");
        itemBtns.appendChild(deleteBtn);
        itemBtns.appendChild(editBtn);
        itemBtns.appendChild(input);

        const textSpan = document.createElement("span");
        textSpan.classList.add("todolist__list__item__text");
        textSpan.textContent = item.name;

        const liItem = document.createElement("li");
        liItem.classList.add("todolist__list__item");
        liItem.appendChild(textSpan);
        liItem.appendChild(itemBtns);
        todoList.appendChild(liItem)
    })

    const removeBtns = document.querySelectorAll(".todolist__list__item__button--delete");
    removeBtns.forEach(item => item.addEventListener("click", ()=>{removeItem(item)}));

    const editBtns = document.querySelectorAll(".todolist__list__item__button--edit");
    editBtns.forEach(item => item.addEventListener("click", ()=>{editItem(item)}));
}


