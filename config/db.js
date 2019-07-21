module.exports = {
    // user : "heroku_3k9h37jq",
    // password : "Crossbones1996*",
    // dbname: "heroku_3k9h37jq",
    // port : 47446,
    user : "jhoelccari",
    password : "sd6CsvVWVvQDmr6O",
    dbname: "todo-db",
    dburl : function() {
        //var url = "mongodb://"+this.user+":"+this.password+"@ds147446.mlab.com:"+this.port+"/"+this.dbname;
        var url = "mongodb+srv://jhoelccari:sd6CsvVWVvQDmr6O@cluster0-gmk8b.mongodb.net/todo-db?retryWrites=true&w=majority";
        return url;
    }
}