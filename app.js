const express = require("express");

const { getAllTasks, addNewTask } = require("./utils/task");

const app = express();
app.use(express.json());
const PORT = 8080;

app.get("/tasks", (req,res) => {
  let tasks = getAllTasks();
  return res.status(200).send(tasks)
});

app.post("/tasks",(req,res) => {
  let task = {...req.body};
  addNewTask(task);
  return res.status(201).send({
    message: "Task added successfully",
    task,
  })
})

app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
});