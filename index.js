/*
    2018.01.06 OM CRUD AVEC NODE.JS
    ESSAIS ET ERREURS

*/
var express = require('express');
//var mysqlApostrophe = require("mysql-apostrophe");
const mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var router = express.Router();




//app.use(parser.urlencoded({ extended: true }));

//app.use(bodyParser.text()):
app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//app.use(express.bodyParser());
//app.use('/', router);

//app.use(express.json());
//app.use(parser.raw())
//app.use(mysqlApostrophe);
app.use(bodyParser.urlencoded({extended: true}));

const port = 3001;
var title = 'OM NODEJS dgfdg'
const {homePage} = require('./routes/index');
const {addLibellePage, afficherLibelles, editLibellePage, editUpdateLibelle, addLibellePageDeux, effacerLibelle, addCategoriesAddDeux, afficherAddCategoriesAddDeuxPage, aboutChier} = require('./routes/libelles');

//var decode = require('unescape');
 
//console.log(decode("merdasse  "+'&lt;div&gt;abc&lt;/div&gt;'));
/*
    Fichiers CSS et javascript nécessaires pour formater correctement,....
*/
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist/js'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.use(function(req,res,next){
    res.locals.userValue = null;
    next();
})


var mysqlConnection = mysql.createConnection({
    //    host: 'localhost',
    //  OM 2018.12.26 Après un voyage en TGV vers PARIS sans connextion à l'Internet,
    //  ce qui oblige à modifier localhost
    //  en 127.0.0.1 pour vraiment être en local (hors connexion) sinon rien ne fonctionne.
        multipleStatements: true,
        host: '127.0.0.1',
        user: 'root',
        password: "root",
        database: 'om_db_latex_final_copie'
    });

// Connection à la base de données.
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('La BD est connectée');
    }
    else {
        console.log('Problème de connection avec la BD' + JSON.stringify(err,undefined,2));
    }
});

global.mysqlConnection = mysqlConnection;


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'app_views'))
 

// Ecoute du port défini
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port : ${port}`);
});


// Définitions des routes de l'application
app.get('/', homePage);
app.get('/libelle/afficher', afficherLibelles);

app.get('/libelle/editer/:idURLLibProb', editLibellePage);
app.post('/libelle/editer/:idURLLibProb', editUpdateLibelle);

app.post('/libelle/add', addLibellePage);
app.post('/libelle/addDeux', addLibellePageDeux);

app.get('/libelle/effacer/:idURLLibProb', effacerLibelle);

app.get('/categories/addDeux', afficherAddCategoriesAddDeuxPage);
app.post('/categories/addDeux', addCategoriesAddDeux);
app.get('/chier/about', aboutChier);


//const StringDecoder = require('string_decoder').StringDecoder;
//const decoder = new StringDecoder('utf8');

//var buff = Buffer('data to be buffered');
//Print the buffered data
//console.log(buff); 
//Print the decoded buffer  
//console.log(decoder.write(buff));


// essai
//app.use(parser.urlencoded({ extended: true }));

//app.use(bodyParser.text()):
