$(function() {
    init();
});

function takepicture(videoOutput, width, height) {
  var canvas = document.getElementById('canvas'),
      photo  = document.querySelector('photo');

  canvas.width  = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(videoOutput, 0, 0, width, height);
  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

//--------------------
// GET USER MEDIA CODE
//--------------------
navigator.getUserMedia = ( navigator.getUserMedia ||
                   navigator.webkitGetUserMedia ||
                   navigator.mozGetUserMedia ||
                   navigator.msGetUserMedia);

var video;
var webcamStream;

function startWebcam() {
  if (navigator.getUserMedia) {
     navigator.getUserMedia (

        // constraints
        {
           video: true,
           audio: false
        },

        // successCallback
        function(localMediaStream) {
           video = document.querySelector('video');
           video.src = window.URL.createObjectURL(localMediaStream);
           webcamStream = localMediaStream;
        },

        // errorCallback
        function(err) {
           console.log("The following error occured: " + err);
        }
     );
  } else {
     console.log("getUserMedia not supported");
  }
}
//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
var canvas, ctx;

function init() {
  // Get the canvas and obtain a context for
  // drawing in it
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');
}

function snapshot() {
   // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0,0, canvas.width, canvas.height);
  console.log('the file is:', video.src);

  var formData = new FormData();
  formData.append('filetoupload', canvas.toDataURL('image/png'));

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/traning/images', true );
  xhr.send(formData);
}
