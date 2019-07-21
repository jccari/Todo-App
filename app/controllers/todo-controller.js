const ObjectID = require('mongodb').ObjectID
const path      = require('path');

module.exports = function(app, db){
    return {
        index : (req, res) => {
            var options = {
                root: path.join(__dirname, '../../public/html'),
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };
            res.sendFile('index.html', options);
        },

        list : (req, res) => {
            console.log("List")
            db.collection("todo-list").find({}, {}).toArray()
            .then(items => {
                console.log(`Mostrrando ${items.length} documentos`)
                items.forEach(console.log)
                res.send(items);
            })
            .catch(err => console.error(`Ha ocurrido algun error: ${err}`))
        },

        detail : (req, res) => {
            var query = {'_id': new ObjectID(req.params.id) };
            db.collection('todo-list').findOne(query, (err, task) => {
                if (err)  res.send("Error buscando la tarea");
                
				res.status(200).send(task);
		    });
        },

        create : (req, res) => {
            //console.log(req.body)
            var data = {
                owner: req.body.owner,
                status: req.body.status,
                content: req.body.content
            };
            db.collection("todo-list").insertOne(data, (err, res) => {
                if ( err ) console.log("Hubo un error guardando el elemento");
                console.log(data);
                console.log("Insertado correctamente");
            });
            //TODO: mostrar lista de elementos
            res.send( req.body.owner +" su tarea fue guardada");
        },

        delete : (req, res) => {
            console.log("Delete")
            var query = {
                _id: ObjectID(req.params.id)
            };
            db.collection("todo-list").deleteOne(query, (err,task) => {
                if (err) res.send(500).send("Error borrando el elemento")
                console.log(task);
                res.status(200).send("Borrado");
            });
        },

        edit : (req, res) => {
            var query = {
                _id: ObjectID(req.params.id)
            };
            var update = { $set: {
                                    owner: req.body.owner,
                                    status: req.body.status,
                                    content: req.body.content
                                }};
            db.collection("todo-list").updateOne(query, update, (err, task) =>{
                if (err) res.status(500).send("Error editando la tarea")
                res.status(200).send("Tarea actualizada");
            });

        }
    }
}