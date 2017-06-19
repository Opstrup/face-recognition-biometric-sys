var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Enrollment process'});
});

router.get('/enrollment', function(req, res, next) {
  res.render('enrollment', { title: 'Galactic Bank' });
});

router.post('/api/traning/images', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

   var dataSubjectName = fields.dataSubjectName;
   var expression = fields.expression;

   // splitting encoded image from encoding msg type
   fs.readdir(__dirname + '/../images/', function(err, files) {
     var imgStr = fields.filetoupload.split(",")[1];
     // training images
     //var newpath = __dirname + '/../images/' +  dataSubjectName + '-' + expression + '.' + files.length + '.jpg';
     // test images
     var newpath = __dirname + '/../images/' + files.length + '.jpg';
     base64_decode(imgStr, newpath);
     // training images
     // fs.appendFile(__dirname + '/../images/' + "training_images_links", 'https://u2608706.dl.dropboxusercontent.com/u/2608706/traning_images/'+ dataSubjectName + '-' + expression + '.' + files.length + '.jpg\n', function(err){
     //  if (err) throw err;
     // });
     // test images
     fs.appendFile(__dirname + '/../images/' + "test_images_links", 'https://u2608706.dl.dropboxusercontent.com/u/2608706/test_images/'+ files.length + '.jpg\n', function(err){
      if (err) throw err;
     });
   });
  });
  return res.end();
});

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
  // create buffer object from base64 encoded string,
  // it is important to tell the constructor that the string is base64 encoded
  var bitmap = new Buffer(base64str, 'base64');
  // write buffer to file
  fs.writeFileSync(file, bitmap);
}

module.exports = router;
