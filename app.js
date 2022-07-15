let searchInput = document.querySelector(".searchInput");
let listItem = document.querySelector(".list-Items");
let options = document.querySelectorAll(".option-status span");
let checkbox = document.querySelector(".checkbox");
let clearBtn = document.querySelector(".clearBtn");



searchInput.focus()
let isChecked = false;

// diplaying all todos to the document
function displayTodos(option){

    let todos = JSON.parse(localStorage.getItem("todos") ||  "[]")
    document.querySelectorAll(".listItem").forEach(item => item.remove())
    todos.forEach((todo, index) => {
        let isCompleted = todo.status == "completed" ? "checked" : ""
        if(option == todo.status || option == "all"){
            listItem.innerHTML += `
            <div class="listItem">
                <ul>
                    <li> 
                        <label for="${index}">
                            <input ${isCompleted} onClick="(updateStatus(this))") class="checkbox" type="checkbox" id="${index}"><span class="para">${index + 1}. ${todo.value}</span></input>
                            </label>
                            <i onClick="(displayOptions(this))" class="fa-solid fa-ellipsis"></i>
                        <hr>
                        <div class="popup-container">
                            <div onClick="(editTodos('${index}', '${todo.value}'))" class="edit">Edit</div>
                            <div onClick="(deleteTodos(${index}))" class="delete">Delete</div>
                        </div>
                    </li>
                </ul>
            </div>
        	`
      } 
    });
 
}
displayTodos("all")

// setting the todos to local storage 
function getTodos(){
    let todos;
    let todoObj = {
       value : searchInput.value,
       status : "pending"
   }
 
   if(searchInput.value != ""){
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
         todos = JSON.parse(localStorage.getItem("todos"))
        }
        todos.push(todoObj)
        localStorage.setItem("todos", JSON.stringify(todos))
        displayTodos("all")
}
   }

// listneing for click to add todos
searchInput.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
        getTodos()
        searchInput.value = ""
    }
});

// updating the status in localstorage and changing the active todos color 
function updateStatus(selectTask){
    let todos = JSON.parse(localStorage.getItem("todos") ||  "[]")
    let taskName = selectTask.parentElement.lastElementChild
    if(selectTask.checked){
        taskName.classList.add("active")
        todos[selectTask.id].status = "completed"
    }else{
        taskName.classList.remove("active")
        todos[selectTask.id].status = "pending"
    }
    localStorage.setItem("todos", JSON.stringify(todos))
    
}
// displaying the options to edit or delete
function displayOptions(elem){
    let popup = elem.parentElement.lastElementChild
    popup.classList.add("active")

    document.addEventListener("click", (e)=>{
        if(e.target.tagName != "I" || e.target != elem){
            popup.classList.remove("active")
        }
    })
};

// editing the todos and updating localstorage 
function editTodos(index, todo){
    searchInput.focus()
    searchInput.value = todo
    let todos = JSON.parse(localStorage.getItem("todos"))
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
    displayTodos("all")
}
// deleting the todos and updating localstorage 
function deleteTodos(idx){
    let todos = JSON.parse(localStorage.getItem("todos"))
    todos.splice(idx, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
    displayTodos("all")
}

// getting the filtered options and setting the active status 
options.forEach(option =>{
    option.addEventListener("click", ()=>{
        document.querySelector("span.active").classList.remove("active")
        option.classList.add("active")
        displayTodos(option.id)
    })
});

// clear all  todos
clearBtn.addEventListener("click", ()=>{
    let todos = JSON.parse(localStorage.getItem("todos") ||  "[]")
    todos.splice(0, todos.length)
    localStorage.setItem("todos", JSON.stringify(todos))
    displayTodos("all")
})