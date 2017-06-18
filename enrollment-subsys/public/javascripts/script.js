$(function() {
    init();
});

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

  // Create form and send it to backend
  var formData = new FormData();
  formData.append('classificationName', document.getElementById('className').value);
  formData.append('filetoupload', canvas.toDataURL('image/png'));

  xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/traning/images', true );
  xhr.send(formData);

  var i = 0
  setInterval(function(){
   console.log('this is an interval function', i);
   if (i === 20) {
    clearInterval();
    i = 0;
   }
   i += 1;
  }, 2000);
}
