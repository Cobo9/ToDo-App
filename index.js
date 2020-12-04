var tasks = [];
let taskId= 0;
const todoForm = document.querySelector(".todolist__form");
const todoInput = document.querySelector(".todolist__form__input");
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
}


