const input = document.querySelector(".input");
const submit = document.querySelector(".button-85");
const tasksDiv = document.querySelector(".tasks");
const btn = document.querySelector(".btn")

let arrayOfTasks = [];

triggerDataOnPage();

if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}

submit.onclick = function () {

    if (input.value != "") {
        addDataToArray(input.value)
        input.value = "";
    }

}



function addDataToArray(taskText) {

    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }

    arrayOfTasks.push(task)

    addDataToPageFrom(arrayOfTasks)

    addDataToLocalStorage(arrayOfTasks)
}

function addDataToPageFrom(arrayOfTasks) {

    // Empty TasksDiv to avoid mix Data

    tasksDiv.innerHTML = "";

    // Looping to add data

    arrayOfTasks.forEach(task => {
        let mainDiv = document.createElement("div")
        let textMainDiv = document.createTextNode(task.title)
        mainDiv.appendChild(textMainDiv)
        mainDiv.className = "task";
        mainDiv.setAttribute("data-id", task.id)
        if (task.completed) {
            mainDiv.className = "task Done";
        }

        let span = document.createElement("span")
        let textSpan = document.createTextNode("Delete")
        span.appendChild(textSpan)
        span.className = "del";

        mainDiv.appendChild(span)

        tasksDiv.appendChild(mainDiv)
    });

}


function addDataToLocalStorage(arrayOfTasks) {

    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}


function triggerDataOnPage() {

    let Data = window.localStorage.getItem("tasks");

    if (Data) {

        addDataToPageFrom(JSON.parse(window.localStorage.getItem("tasks")))

    }

}



tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove()
        deleteDataFromLocalStorage(e.target.parentElement.getAttribute("data-id"))
    }


    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done")
        toggleCompleted(e.target.getAttribute("data-id"));
    }
})


function deleteDataFromLocalStorage(taskId) {


    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)

    addDataToLocalStorage(arrayOfTasks)
}


function toggleCompleted(taskId) {


    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false
        }
    }

    addDataToLocalStorage(arrayOfTasks)
}


btn.addEventListener("click", (e) => {
    window.localStorage.removeItem("tasks")
    arrayOfTasks = [];
    addDataToPageFrom(arrayOfTasks);
})







