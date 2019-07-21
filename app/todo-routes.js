const todoController = require('./controllers/todo-controller')
const ObjetctID = require('mongodb').ObjectID

module.exports = function (app, db){
    controller = todoController(app,db);
    
    app.get('/', controller.index );

    app.get('/list', controller.list );

    app.post('/create', controller.create );

    app.get('/detail/:id', controller.detail );

    app.delete('/delete/:id', controller.delete );

    app.put('/update/:id', controller.edit );
}