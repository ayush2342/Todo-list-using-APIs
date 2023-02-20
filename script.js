let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
let taskDone="Not Completed";




function addTaskToDOM(task)
{
 const li = document.createElement('li');
 li.innerHTML=
 `<input type="checkbox" id="${task.id}" ${task.done?'checked':''} class="custom-checkbox">
 <label for="${task.id}">${task.text}</label>
 <img src="bin.png" class="delete" data-id="${task.id}" />
 `

 taskList.append(li);
}

function renderList () {
    taskList.innerHTML='';

    for(let i in tasks)
    {
        addTaskToDOM(tasks[i])
    }

    tasksCounter.innerHTML=tasks.length;
 
}

function ToggleTask(taskId) 
{
   for(let i of tasks)
   {
    if(i.id===taskId)
    {
        i.done=!i.done;
        if(i.done==true)
        {
            taskDone="Completed"
        }
        else
        {
            taskDone="Not Completed"
        }
        showNotification("Task Marked as "+taskDone);
        renderList();
        return;
    }
   }
}

function deleteTask(taskId) {
    
const newTask=tasks.filter(function(task)
{
    return task.id!=taskId;
})
tasks=newTask;
renderList();
showNotification("Task Deleted Successfully");

}

function addTask(task) {

    
        tasks.push(task);
        renderList();
        showNotification("Task Added Successfully");
        return;
}

function showNotification(text) {
    window.alert(text);
}

function handleInputKeypress(event)
{
    if(event.key==="Enter")
    {
        const text=event.target.value;
        if(!text)
        {
            showNotification("Task Text cannot be empty");
            return;
        }

        const task=
        {
            text:text,
            id:Date.now().toString(),
            done:false
        }
        event.target.value="";
        addTask(task);

    }
}

function HandleClickListner(event)
{
    const target=event.target;
    console.log(target)
    if(target.className==='delete')
    {
        deleteTask(target.dataset.id);
    }
    else if(target.className==='custom-checkbox')
    {
         ToggleTask(target.id)
    }

}


function initializeApp()
{
    addTaskInput.addEventListener("keyup",handleInputKeypress);
document.addEventListener('click',HandleClickListner)
}

initializeApp();