const Todo = require("../models/todos.model");

let todo;

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
    }
    //Creating a new todo
    todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false

    });
    //Saving our new todo in the db
    Todo.create(todo, (err, data) =>{
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while creating the todo"
            });
        }else{
            res.send(data);
        }
    })

}

exports.findAll = (req, res) =>{
    const title = req.query.title;
    Todo.getAll(title, (err, data) =>{
        if(err){
            res.status(500).send({message:err.message || "Some error occured while retieving todos.."})
        }
        else{
            res.send(data);
        }

    })
    
}

exports.findOne = (req, res) =>{
    Todo.findById(req.params.id, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({message: `Not found todo with id ${req.params.id}`});
            }else{
                res.status(500).send({
                    message: 'Error retrieving todo with id'+ req.params.id
                })
            }
        }
        else{
            res.send(data);
        }

    });
    
}

exports.findAllCompleted = (req, res) =>{
    Todo.getAllCompleted((err, data) =>{
        if(err){
            res.status(500).send({message:err.message || "Some error occured while retieving completed todos.."})
        }
        else{
            res.status(200).send(data);
        }
    })
    
}

exports.update = (req, res) =>{
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});

    }
    console.log(req.body);
    Todo.updateById(req.params.id,todo,(err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({message: `Not found todo with id ${req.params.id}`});
            }else{
                res.status(500).send({
                    message: 'Error updating todo with id'+ req.params.id
                })
            }

        }else{
            res.status(200).send(data);
        }
    })
    
}

exports.delete = (req, res) =>{
    Todo.remove(req.params.id, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({message: `Not found todo with id ${req.params.id}`});
            }else{
                res.status(500).send({
                    message: 'Could not delete todo with id'+ req.params.id
                })
            }

        }else{
            res.status(200).send({message: "Todo was deleted successfully"});
        }

    })
    
}

exports.deleteAll = (req, res) =>{
    Todo.removeAll((err, data) =>{
        if(err){
            res.staus(500).send({message: err.message || "Some error occured while removing all the tutorials"})
        }else{
            res.send({message: "All todos deleted successfully.."});
        }
    })
    
}