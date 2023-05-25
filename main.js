song1= "";
song2= "";
noseX= 0;
noseY= 0;

function preload() {
song1= loadSound("song1.mp3");
song2= loadSound("song2.mp3");
}

var SpeechRecognition= window.webkitSpeechRecognition;

var recognition= new SpeechRecognition();

function start() {
    console.log("reached inside start function");
recognition.start();
}

recognition.onresult= voice_result;

function voice_result(event) {
 
    console.log(event);
    var Content = event.results[0][0].transcript;

    
    if (Content == "start") {
        play();
    }
    if(Content == "stop") {
        stop();
    }
    
}

function play() {
song1.play();
song1.setVolume(1);
song1.rate(1);
}

function stop() {
    song1.stop();
    song2.stop();
}



function setup() {
    canvas= createCanvas(500, 500);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(500, 500);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

    
}

function modelLoaded() {
    console.log("posenet is initialized");
}

function gotPoses(results) {
if(results.length > 0) {
    console.log(results);
    noseX= results[0].pose.nose.x;
    noseY= results[0].pose.nose.y;
    console.log("noseX= " + noseX + "noseY= " + noseY)
}
}

function draw() {


translate(video.width, 0);
scale(-1, 1);

image(video, 0, 0, 500, 500);

setTimeout(function(){start();},10000);

if(noseX> 0 && noseX<= 250) {
    if(song2.isPlaying()) {
    song2.stop();
   
    if(song1.isPlaying() == false) {
        song1.play();
    }
    }
}
if(noseX > 250 && noseX <= 500) {
    
    if(song1.isPlaying()) {
        song1.stop();
       
        if(song2.isPlaying() == false) {
            song2.play();
        }
        }
}
}