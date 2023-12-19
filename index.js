const express = require('express');
const cors = require('cors');
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res, next)=>{
    res.json({message: "Welcome to Cjs Simple Application"});
});

require("./routes/todos.routes")(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log('Server is running at port ', PORT);

});