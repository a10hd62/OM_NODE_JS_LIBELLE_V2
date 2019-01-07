
module.exports = {

    afficherLibelles: (req,res) => {
        //console.log("Répond à la racine ROOT")
        // Envoie une chaîne de carcatères à la page HTML
        //res.send("Hello du ROOT___1656")
        //app.get('/',function(req,res){
        const queryStringSelect = "SELECT * FROM t_libelles ORDER BY id_libelle_probleme DESC";
        mysqlConnection.query(queryStringSelect,function(err,lignes) {
            res.render('afficher_libelles.ejs',{
                topicHead : 'libelles.js',
                titleom : "Liste des libellés 19.12.2018",
                items: lignes           
            }); 
            mysqlConnection.end;
        });
    },
    editLibellePage: (req, res) => {
        let idLibelleProbleme = req.params.idURLLibProb
        let query = "SELECT * FROM t_libelles WHERE id_libelle_probleme ='" + idLibelleProbleme + "' ";
        console.log(query);
        mysqlConnection.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('editer_libelles.ejs', {
                topicHead : 'libelles.js',
                titleom: "Edit Libelle",
                items: result[0],
                message: ''
            });
        });
    },

    editUpdateLibelle: (requete, res) => {
        var Libelles = {
            idLibelleProbleme : requete.params.idURLLibProb,
            libelleProbleme : requete.body.NameLibelleProbleme,
            pathImageLibelle : requete.body.NamePathimageLibelle
        }

        var input = JSON.parse(JSON.stringify(requete.body));
        console.log(input);
        //Libelles.libelleProbleme = '45';
        //Libelles.pathImageLibelle = 'caaccac 67';
        console.log(Libelles);
        /*
        let idLibelleProbleme = requete.params.idURLLibProb;
        let libelleProbleme = requete.body.NameLibelleProbleme;
        let pathImageLibelle = requete.body.NamePathimageLibelle;
        console.log(requete.body.NameLibelleProbleme);
        */
        //console.log(requete.headers);
        //console.log('Route... ',requete.route);
        //let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        
        //let query = "UPDATE t_libelles SET Libelle_Probleme = '" + Libelles.libelleProbleme + "', path_image_libelle = '" + Libelles.pathImageLibelle + "' WHERE id_libelle_probleme = '" + Libelles.idLibelleProbleme + "'";

        let query = "UPDATE t_libelles SET Libelle_Probleme =  ? , path_image_libelle =  ?  WHERE id_libelle_probleme = ? ";
        let params = [Libelles.libelleProbleme, Libelles.pathImageLibelle, Libelles.idLibelleProbleme];
        console.log(query);

        mysqlConnection.query(query, params, (err, result, fields) => {

        //mysqlConnection.query(query,  (err, result) => {            
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/libelle/afficher');
        });
    },


    addLibellePage: (req,res) => {
        var Libelles = {
            first : req.body.fname,
            last : req.body.lname
        }


        console.log(Libelles);
        res.render('home',{
            userValue : Libelles,
            topicHead : 'Libellés',
            titleom: 'NODE OM'
        });
        //res.json(student);
        
        //var decode = require('unescape');
 /*
console.log(decode(" 33  "+Libelles.first));

let Libellesfirst1 = decode(Libelles.first);
let Libelleslast1 = decode(Libelles.last);
console.log(Libellesfirst1);
console.log(Libelleslast1);
let Libellesfirst = "l\'hibou"
let Libelleslast = "decode(Libelles.last);"
mysqlConnection.escape(Libelles.first)
*/
//let Libellesfirst = mysqlConnection.escape(Libelles.first);
//console.log('____>'+Libellesfirst);

        //let R_Insert_T_Libelles = "INSERT INTO `t_libelles` (`id_libelle_probleme`, `Libelle_Probleme`, `path_image_libelle`) VALUES (NULL, 'OM_1', 'mo_2')"
        //let R_Insert_T_Libelles = "SET NAMES utf8;INSERT INTO t_libelles (Libelle_Probleme,path_image_libelle) VALUES ('" + Libelles.first + "', '" + Libelles.last + "');";
        //let R_Insert_T_Libelles = "INSERT INTO t_libelles (Libelle_Probleme,path_image_libelle) VALUES ('" + Libelles.first + "', '" + Libelles.last + "');";        
        let R_Insert_T_Libelles = "INSERT INTO t_libelles (Libelle_Probleme, path_image_libelle) VALUES ( ?, ? )";
        //let params = ['\\begin', 'latex'];
        let params = [Libelles.first, Libelles.last];
        mysqlConnection.query(R_Insert_T_Libelles, params , (err, result, fields) => {
            if (err) {
                return res.status(500).send(err);
            }
            //res.redirect('/');
        });
        //res.redirect('/');

    },
    
    effacerLibelle: (requete,res) => {
        var Libelles = {
            idLibelleProbleme : requete.params.idURLLibProb,
            libelleProbleme : requete.body.NameLibelleProbleme,
            pathImageLibelle : requete.body.NamePathimageLibelle
        }

        var input = JSON.parse(JSON.stringify(requete.body));
        console.log(input);
        //Libelles.libelleProbleme = '45';
        //Libelles.pathImageLibelle = 'caaccac 67';
        console.log(Libelles);
        /*
        let idLibelleProbleme = requete.params.idURLLibProb;
        let libelleProbleme = requete.body.NameLibelleProbleme;
        let pathImageLibelle = requete.body.NamePathimageLibelle;
        console.log(requete.body.NameLibelleProbleme);
        */
        //console.log(requete.headers);
        //console.log('Route... ',requete.route);
        let query = "DELETE FROM t_libelles WHERE id_libelle_probleme = ?";
        let params = [Libelles.idLibelleProbleme];
        console.log(params);

        mysqlConnection.query(query, params, (err, result, fields) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/libelle/afficher');
        });
    },

    addLibellePageDeux: (req,res) => {
        var Libelles = {
            first : req.body.fname,
            last : req.body.lname
        }


        console.log(Libelles);
        res.render('home_2',{
            userValue : Libelles,
            topicHead : 'Libellés addLibellePageDeux',
            titleom: 'NODE OM deux'
        });
        //res.json(student);
        
        //var decode = require('unescape');
 /*
console.log(decode(" 33  "+Libelles.first));

let Libellesfirst1 = decode(Libelles.first);
let Libelleslast1 = decode(Libelles.last);
console.log(Libellesfirst1);
console.log(Libelleslast1);
let Libellesfirst = "l\'hibou"
let Libelleslast = "decode(Libelles.last);"
mysqlConnection.escape(Libelles.first)
*/
//let Libellesfirst = mysqlConnection.escape(Libelles.first);
//console.log('____>'+Libellesfirst);

        //let R_Insert_T_Libelles = "INSERT INTO `t_libelles` (`id_libelle_probleme`, `Libelle_Probleme`, `path_image_libelle`) VALUES (NULL, 'OM_1', 'mo_2')"
        //let R_Insert_T_Libelles = "SET NAMES utf8;INSERT INTO t_libelles (Libelle_Probleme,path_image_libelle) VALUES ('" + Libelles.first + "', '" + Libelles.last + "');";
        //let R_Insert_T_Libelles = "INSERT INTO t_libelles (Libelle_Probleme,path_image_libelle) VALUES ('" + Libelles.first + "', '" + Libelles.last + "');";        
        let R_Insert_T_Libelles = "INSERT INTO t_libelles (Libelle_Probleme, path_image_libelle) VALUES ( ?, ? )";
        //let params = ['\\begin', 'latex'];
        let params = [Libelles.first, Libelles.last];
        mysqlConnection.query(R_Insert_T_Libelles, params , (err, result, fields) => {
            if (err) {
                return res.status(500).send(err);
            }
            //res.redirect('/');
        });
        //res.redirect('/');

    },
    
    afficherAddCategoriesAddDeuxPage: (req,res) => {
        res.render('home_2',{
            topicHead : 'Libellés',
            titleom: 'NODE OM Libellés afficherAddCategoriesAddDeuxPage'
        });
        console.log('user accessing Home pageafficherAddCategoriesAddDeuxPage');
    },

    addCategoriesAddDeux: (req,res) => {
        var Libelles = {
            first : req.body.fname,
            last : req.body.lname
        }


        console.log(Libelles);
        res.render('home_2',{
            userValue : Libelles,
            topicHead : 'Libellés',
            titleom: 'NODE OM'
        });
        //res.json(student);
        
        //var decode = require('unescape');
 /*
console.log(decode(" 33  "+Libelles.first));

let Libellesfirst1 = decode(Libelles.first);
let Libelleslast1 = decode(Libelles.last);
console.log(Libellesfirst1);
console.log(Libelleslast1);
let Libellesfirst = "l\'hibou"
let Libelleslast = "decode(Libelles.last);"
mysqlConnection.escape(Libelles.first)
*/
//let Libellesfirst = mysqlConnection.escape(Libelles.first);
//console.log('____>'+Libellesfirst);

        //let R_Insert_T_Libelles = "INSERT INTO `t_libelles` (`id_libelle_probleme`, `Libelle_Probleme`, `path_image_libelle`) VALUES (NULL, 'OM_1', 'mo_2')"
        //let R_Insert_T_Libelles = "SET NAMES utf8;INSERT INTO t_libelles (Libelle_Probleme,path_image_libelle) VALUES ('" + Libelles.first + "', '" + Libelles.last + "');";
        //let R_Insert_T_Libelles = "INSERT INTO t_libelles (Libelle_Probleme,path_image_libelle) VALUES ('" + Libelles.first + "', '" + Libelles.last + "');";        
        let R_Insert_T_Libelles = "INSERT INTO t_libelles (Libelle_Probleme, path_image_libelle) VALUES ( ?, ? )";
        //let params = ['\\begin', 'latex'];
        let params = [Libelles.first, Libelles.last];
        mysqlConnection.query(R_Insert_T_Libelles, params , (err, result, fields) => {
            if (err) {
                return res.status(500).send(err);
            }
            //res.redirect('/');
        });
        //res.redirect('/');

    },


    aboutChier: (req,res) => {
        res.render('about_chier',{
            topicHead : 'rarrghh',
            titleom: 'NODE OM CHIER'
        });
        console.log('about chier');
    },    

};
