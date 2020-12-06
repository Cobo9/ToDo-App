var tasks = [];
let taskId= 0;
const todoForm = document.querySelector(".todolist__form");
const todoInput = document.querySelector(".todolist__form__input");
const todoButton = document.querySelector(".todolist__form__button");
const todoList = document.querySelector(".todolist__list");
todoForm.addEventListener("submit", submitForm);
let editMode = false;


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
        disableInput: true,
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

function editItem (btn){
    let tasksArray = [...tasks];
    const elementToEdit = tasksArray.find(item=> item.id == btn.dataset.key);
    const elementToEditInput = [...document.querySelectorAll(".todolist__list__item__text")]
    const element = elementToEditInput.find(item=>btn.dataset.key == item.dataset.key);
    elementToEdit.name = element.value;
    elementToEdit.disableInput = !elementToEdit.disableInput;
    renderTodo();
}



function renderTodo(){
    todoList.innerHTML="";

    tasks.forEach(task=> {

        const input = document.createElement("input");
        input.classList.add("todolist__list__item__button");
        input.setAttribute("type", "checkbox");
        
        const editIcon = document.createElement("i");
        editIcon.setAttribute("class","fas fa-pencil-alt fa-2x");
        //If the input is being edited we change the edit icon to tick
        if(task.disableInput === false ){
            editIcon.setAttribute("class", "fas fa-check fa-2x");
        }

        const editBtn = document.createElement("button")
        editBtn.classList.add("todolist__list__item__button");
        editBtn.classList.add("todolist__list__item__button--edit");
        editBtn.setAttribute("data-key", `${task.id}`);
        //If the input is being edited we change the color of the button to blue
        if(task.disableInput === false ){
            editBtn.style.backgroundColor ="#5FC9F8";
        }

        editBtn.appendChild(editIcon)

        const deleteIcon = document.createElement("i")
        deleteIcon.setAttribute("class", "fas fa-times fa-2x")
        
        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("todolist__list__item__button");
        deleteBtn.classList.add("todolist__list__item__button--delete");
        deleteBtn.setAttribute("data-key", `${task.id}`);
        deleteBtn.appendChild(deleteIcon);

        const itemBtns = document.createElement("div")
        itemBtns.classList.add("todolist__list__item__buttons");
        itemBtns.appendChild(deleteBtn);
        itemBtns.appendChild(editBtn);
        itemBtns.appendChild(input);

        const textInput = document.createElement("input");
        textInput.classList.add("todolist__list__item__text");
        textInput.setAttribute("data-key", `${task.id}`);
        //If the disable input property in the object is set to true we disable the editability of the input
        if(task.disableInput){
            textInput.setAttribute("disabled", true);
        }
        textInput.value = task.name;

        const liItem = document.createElement("li");
        liItem.classList.add("todolist__list__item");
        liItem.setAttribute("data-key", `${task.id}`);
        if(task.disableInput === false){
            liItem.style.backgroundColor ="#DFDED4";
        }

        liItem.appendChild(textInput);
        liItem.appendChild(itemBtns);
        todoList.appendChild(liItem)
    })

    const removeBtns = document.querySelectorAll(".todolist__list__item__button--delete");
    removeBtns.forEach(btn => btn.addEventListener("click", ()=>{removeItem(btn)}));

    const editBtns = document.querySelectorAll(".todolist__list__item__button--edit");
    editBtns.forEach(btn => btn.addEventListener("click", ()=>{editItem(btn)}));
}


