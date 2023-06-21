const fs = require("fs");
const uuid = require("uuid");

const TASK_FILE = "task.json";
const EDITABLE_ITEMS = ["body", "title"]

let getAllTasks = () =>{
  try{
    let data = JSON.parse(fs.readFileSync(TASK_FILE));
    return data;
  }catch{
    console.log('No tasks found');
    return [];
  }
};

let addNewTask = (task) => {
  let allTasks = getAllTasks();
  task = {taskId : uuid.v4(), ...task}
  allTasks.push(task);
  fs.writeFileSync(TASK_FILE, JSON.stringify(allTasks))
  return task;
};

let getTaskById = (taskId) => {
  let tasks = getAllTasks();
  let task = tasks.find((task) => task.taskId === taskId);
  return task;
}

let deleteTaskById = (taskId) => {
  let tasks = getAllTasks()
  let originalLength = tasks.length
  tasks = tasks.filter((task) => task.taskId !== taskId)
  //extra
  fs.writeFileSync(TASK_FILE,JSON.stringify(tasks))
  return tasks.length < originalLength
}

let updateTaskByid = (task) => {
  let {taskId} = task
  let tasks = getAllTasks()
  let isUpdated = false
  for(let t of tasks){
    if(t.taskId === taskId){
      for(let field of EDITABLE_ITEMS){
        t[field] = task[field]
      }
      isUpdated = true
    }
  }
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks))
  return isUpdated
};

module.exports = {
  getAllTasks,
  addNewTask,
  getTaskById,
  deleteTaskById,
  updateTaskByid,
}