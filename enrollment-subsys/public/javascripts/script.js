function hello() {
  console.log('Hello')
  var video = document.querySelector("#videoElement");
  takepicture(video.src, 100, 100);
}
$(function() {
    var video = document.querySelector("#videoElement");

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        // do something
    }
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
