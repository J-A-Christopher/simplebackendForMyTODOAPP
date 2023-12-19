const sql = require("../config/db");


const Todos = function(todo){
    this.title = todo.title;
    this.description = todo.description;
    this.completed = todo.completed;

};

Todos.create = (newTodos, result) =>{
    sql.query("INSERT INTO todos SET?", newTodos, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created tutorial: ", {id:res.insertId, ...newTodos});
        result(null, {id:res.insertId, ...newTodos});
    });
};

Todos.findById = (id, result) =>{
    sql.query(`SELECT * FROM todos WHERE id= ${id}`, (err, res) =>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log( "Found todo: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);

    });

}

Todos.getAll = (title, result) => {
    let query = "SELECT * FROM todos";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
       

    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("SQL error: ", err);
            result(err, null);
            return;
        }
        console.log("Todos: ", res);
        result(null, res);
    });
};



Todos.getAllCompleted = result=>{
    sql.query("SELECT * FROM todos WHERE completed=true", (err, res) =>{
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("tutorials: ", res);
        result(null, res);

    });
}

Todos.updateById = (id, todo, result) =>{
    sql.query("UPDATE todos SET title = ?, description = ? , completed = ? WHERE id = ?",[todo.title, todo.description, todo.completed, id],
    (err, res)=>{
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows ==0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("updated todo: ",{id: id, ...todo});
        result(null, {id: id, ...todo});


    });
};

Todos.remove = (id, result) =>{
    sql.query("DELETE FROM todos WHERE id = ?", id, (err, res) =>{
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows ==0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("deleted todo with id: ", id);
        result(null, res);

    });
};

Todos.removeAll = result=>{
    sql.query("DELETE FROM todos", (err, res)=>{
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} todos`);
        result(null, res);

    });
};

module.exports = Todos;