const database = [];
function loopDataBase() {
    var databaseText = ""

    database.forEach(
        function (value, index) {
            databaseText += `  
            <div class="column">
            <button onclick="deleteColumn(${index})" class=" button close-column">
                <i class="fas fa-times"></i>
            </button>
            <p class="title">${value.title}</p>
            ${loopTasks(value.tasks, index)}
                <div class="add-new-task-box">
                <input id="task-${index}"type="text" class="task-input" placeholder="Add Task">
                <button onclick="addTask(${index})" class="button add-task button-${index}">
                    <i class="fas fa-plus fas-${index}"></i>
                </button>
            </div>

        </div>`;



        }
    );

    databaseText += `
    <div class="column">
    <div class="add-new-task-box">
        <input id="title" type="text" class="task-input" placeholder="Add Title" autofocus>
        <button onclick="addTitle()" class="button add-task">   
            <i class="fas fa-plus"></i>
        </button>
    </div>

</div>`;
    document.querySelector(".wrapper").innerHTML = databaseText;

}
loopDataBase();

function loopTasks(tasks, titleIndex) {
    var tasksText = "";
    tasks.forEach(function (value, index) {
        tasksText += `<div class="task-box">
        <p class="task-text"> ${value}</p>
        <div class="action-box">
            <button onclick="editTask(${titleIndex},${index})" class="button edit">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteTasks(${titleIndex},${index})" class="button delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>

    </div>`
    });

    return tasksText;


}

function addTitle() {
    const inputTitle = document.getElementById("title").value;
    if (inputTitle != "") {
        const columnObject = {
            title: inputTitle,
            tasks: [],
        };
        database.push(columnObject);
        loopDataBase();
    };
};

function addTask(index) {
    const task = document.getElementById(`task-${index}`).value;
    if (task != "") {
        database[index].tasks.push(task);
        loopDataBase();
    }
};
function deleteColumn(index) {
    database.splice(index, 1);
    loopDataBase();

}
function deleteTasks(titleIndex, taskIndex) {
    database[titleIndex].tasks.splice(taskIndex, 1);
    loopDataBase();



};
function editTask(titleIndex, taskIndex) {
    const task = database[titleIndex].tasks[taskIndex];
    document.getElementById(`task-${titleIndex}`).value = task;
    document
        .querySelector(`.fas-${titleIndex}`)
        .classList.replace("fa-plus", "fa-edit")
        document.getElementById(`task-${titleIndex}`).focus();
    document.querySelector(`.button-${titleIndex}`).onclick = function () {
        editTaskButton(titleIndex, taskIndex)
    };

}



function editTaskButton(titleIndex, taskIndex) {
    const editValue = document.getElementById(`task-${titleIndex}`).value;
    database[titleIndex].tasks.splice(taskIndex, 1, editValue);
    loopDataBase();
}




