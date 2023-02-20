let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
let taskDone="Not Completed";


function fetchToDo()
{
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(function(response)
  {
    return response.json();
  }).then(function(data)
  {
    
    tasks=data.slice(0,10);
    renderList()
  })
  .catch(function(error)
  {
    console.log(error);
  })

}

function addTaskToDOM(task)
{
 const li = document.createElement('li');
 li.innerHTML=
 `<input type="checkbox" id="${task.id}" ${task.completed?'checked':''} class="custom-checkbox">
 <label for="${task.id}">${task.title}</label>
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
    if(i.id===Number(taskId))
    {
        i.completed=!i.completed;
        if(i.completed==true)
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
    return task.id!=Number(taskId);
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
            title:text,
            id:Date.now().toString(),
            completed:false
        }
        event.target.value="";
        addTask(task);

    }
}

function HandleClickListner(event)
{
    const target=event.target;
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
    fetchToDo();
    addTaskInput.addEventListener("keyup",handleInputKeypress);
document.addEventListener('click',HandleClickListner)
}

initializeApp();