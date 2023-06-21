const express = require("express");
const uuid = require('uuid')

const { getAllTasks, addNewTask, getTaskById, deleteTaskById, updateTaskByid } = require("./utils/task");

const app = express();
app.use(express.json());
const PORT = 8080;

app.get("/tasks", (req,res) => {
  let tasks = getAllTasks();
  return res.status(200).send(tasks)
});

app.post("/tasks",(req,res) => {
  let task = {...req.body};
  task = addNewTask(task);
  return res.status(201).send({
    message: "Task added successfully",
    task,
  })
});

app.get("/tasks/:taskId",(req,res) => {
  let taskId = req.params.taskId;
  let task = getTaskById(taskId);
  if(!task){
    return res.status(404).send({
      error:`No such Task found with id { ${taskId} }`
    })
    }else{
      return res.status(200).send(task)}
})

app.delete("/delete/:taskId",(req, res) => {
  let taskId = req.params.taskId
  let isDeleted = deleteTaskById(taskId)
  if (!isDeleted ) {
    return res.status(500).send("Error in deleting the task")
    } else {
      return res.status(200).send({
        message:"The task has been deleted succesfully!"
        })}
})

app.put("/tasks", (req,res) => {
  let taskBody = req.body;
  let isUpdated = updateTaskByid(taskBody)
  if (!isUpdated ){
    return res.status(500).send('error updating tasks')
    }
    else {
      return res.status(201).json(taskBody);
      }
});
app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
});