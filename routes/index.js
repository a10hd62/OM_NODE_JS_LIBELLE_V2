module.exports = {
    homePage: (req,res) => {
        res.render('home',{
            topicHead : 'Libellés',
            titleom: 'NODE OM Libellés'
        });
        console.log('user accessing Home page');
    },
};