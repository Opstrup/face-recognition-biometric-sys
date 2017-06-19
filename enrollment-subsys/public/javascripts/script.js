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
// Training images
//var maxPhotosToBackendPerExpression = 1000;
// Test images
var maxPhotosToBackendPerExpression = 400;
var instructions;


function init() {
 // Get the canvas and obtain a context for
 // drawing in it
 canvas = document.getElementById("myCanvas");
 ctx = canvas.getContext('2d');
 instructions = document.getElementById("instructions");
 instructions.innerHTML = "Look into camera";
 numbersOfPhotosLeft = document.getElementById("numers-of-photos-left");
 numbersOfPhotosLeft.innerHTML = "0/" + maxPhotosToBackendPerExpression;
}

function startEnrollmentProcess() {
 var expressions = ['front', 'right-eye-closed', 'left-eye-closed', 'open-mouth']
 snapshotLoop(expressions[0]).then(function() {
  instructions.innerHTML = "Close right eye";
  numbersOfPhotosLeft.innerHTML = "0/" + maxPhotosToBackendPerExpression;
  snapshotLoop(expressions[1]).then(function() {
   instructions.innerHTML = "Close left eye";
   numbersOfPhotosLeft.innerHTML = "0/" + maxPhotosToBackendPerExpression;
   snapshotLoop(expressions[2]).then(function() {
    instructions.innerHTML = "Open mouth";
    numbersOfPhotosLeft.innerHTML = "0/" + maxPhotosToBackendPerExpression;
    snapshotLoop(expressions[3]).then(function() {
     console.log('all the images was sent!');
    })
   })
  })
 });
}

function snapshotLoop(expression) {
 var i = 1;
 var deferred = jQuery.Deferred();
 var intervalFun = setInterval(function(){
  if (i === maxPhotosToBackendPerExpression) {
   clearInterval(intervalFun);
   i = 1;
   deferred.resolve();
  }
  postToBackend(expression);
  numbersOfPhotosLeft.innerHTML = i + "/" + maxPhotosToBackendPerExpression;
  i += 1;
 }, 200);
 return deferred.promise();
}

function postToBackend(expression) {
 // Draws current image from the video element into the canvas
 ctx.drawImage(video, 0,0, canvas.width, canvas.height);

 // Create form and send it to backend
 var formData = new FormData();

 formData.append('dataSubjectName', document.getElementById('className').value);
 formData.append('filetoupload', canvas.toDataURL('image/png'));
 formData.append('expression', expression);

 xhr = new XMLHttpRequest();
 xhr.open('POST', '/api/traning/images', true );
 xhr.send(formData);
}
