// import express from 'express'
const express = require("express");
const fs = require("fs");
const { json } = require("stream/consumers");
const app = express();
app.use(express.json());

app.post("/todos", (req, res) => {
  const { text } = req.body;

  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Internal server Error");
    }

    let db = JSON.parse(data);

    const newTodo = {
      id: Date.now(),
      text: text,
    };

    db.todos.push(newTodo);

    fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Internal server Error");
      }

      res.status(200).json(newTodo);
    });
  });
});

app.get("/todos", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error while Fetching Todos");
      return;
    } else {
      res.status(200).send(data);
    }
  });
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error while Deleting Todos");
    }
    let db = JSON.parse(data);
    const newTodos = db.todos.filter((obj) => obj.id !== id);
    db.todos = newTodos;
    fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Internal server Error");
      }
      res.status(200).json("Todo Deleted");
    });
  });
});

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const {text} = req.body;
  fs.readFile("db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error while Deleting Todos");
    }
    let db = JSON.parse(data);
    const newTodos = db.todos.map((obj)=> (obj.id === id) ? {...obj,text} : obj )
    db.todos = newTodos;
    fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Internal server Error");
      }
      res.status(200).json({
        id : id,
        text : text
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
