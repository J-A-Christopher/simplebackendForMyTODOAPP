module.exports = app =>{
    const todoController = require('../controllers/todos.controllers');
    var router = require("express").Router();
    //Create a new todo
    router.post("/", todoController.create);

    //Reatrieve all todos
    router.get("/", todoController.findAll);

    //Retrieve all completed Todos
    router.get("/completed", todoController.findAllCompleted);

    //Find a single todo
    router.get("/:id", todoController.findOne);

    //Update tutorial with id
    router.put("/:id", todoController.update);

    //Delete tutorial with id
    router.delete("/:id", todoController.delete);

    //Delete All Tutorials
    router.delete('/', todoController.deleteAll);

    app.use('/api/todos', router);

}