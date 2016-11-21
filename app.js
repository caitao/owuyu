var express  = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Movie = require('./schemas/movie');

var db = 'mongodb://localhost/owuyu';
mongoose.connect(db);

var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views/pages' ));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);
console.log('Owuyu_node running on ' + port);

//index page
app.get('/', function (req, res) {
    Movie.find({}).exec(function (err, movies) {
        if(err){
            console.log(err);
        }else{
            res.render('index', {
                title: 'Owuyu首页',
                movies: movies
            });
        }
    });
});

//admin page 常规数据title,director等数据存不进数据库
app.post('/admin/movie/new', function(req, res) {
    var newMovie = new Movie();
    newMovie.title = req.body.title;
    newMovie.director = req.body.director;
    newMovie.language = req.body.language;
    newMovie.country = req.body.country;
    newMovie.flash = req.body.flash;
    newMovie.poster = req.body.poster;
    newMovie.year = req.body.year;
    newMovie.summary = req.body.summary;
    newMovie.save(function(err, movie) {
        if(err) {
            res.send('error saving movie');
        } else {
            console.log(movie);
            res.redirect('/movie/' + movie._id);
        }
    });
});

app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'Owuyu后台管理',
        movie: {
            director: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    });
});

//detail page
app.get('/movie/:id', function(req, res) {
    Movie.findOne({
        _id: req.params.id
    })
         .exec(function(err, movie) {
            if(err) {
                res.send('error occured');
            } else {
                res.render('detail', {
                    title: 'Owuyu详情页',
                    movie: movie
                });
         }
    });
});

//list page
app.get('/admin/list', function (req, res) {
   Movie.find().exec(function(err, movies){
       if(err){
           console.log('Database cant find one!');
       }
       res.render('list', {
           title: 'Owuyu列表页',
           movies: movies
       });
   });
});

//单个电影的update页面
app.get('/admin/update/:id', function(req, res) {
    Movie.findOne({
        _id: req.params.id
    }).exec(function(err, movie) {
        if(err) {
            res.send('error occured');
        } else {
            res.render('update', {
                title: 'Owuyu更新页',
                movie: movie
            });
        }
    });
});

//数据库更新页面
app.post('/admin/update/', function(req, res) {
    var id = req.body.id;
    Movie.findById(id, function(err, movie) {
        if(err) {
            res.send('error occured');
        } else {
            movie.title = req.body.title;
            movie.director = req.body.director;
            movie.language = req.body.language;
            movie.country = req.body.country;
            movie.flash = req.body.flash;
            movie.poster = req.body.poster;
            movie.year = req.body.year;
            movie.summary = req.body.summary;
            movie.save();
            res.redirect('/movie/' + movie._id);
        }
    });
});

//List delete movie
app.delete('/admin/list/:id', function(req, res) {
    var id = req.params.id;
    if(id){
        Movie.remove({_id : id}, function (err) {
           if(err){
               console.log('Delete error!');
           } else {
               res.json({
                   success: 1,
                   id: id
               });
           }
        });
    }
});