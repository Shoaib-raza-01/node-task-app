const fs = require("fs");

const TASK_FILE = "task.json";

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
  allTasks.push(task);
  fs.writeFileSync(TASK_FILE, JSON.stringify(allTasks))
};

module.exports = {
  getAllTasks,
  addNewTask
}