var status="";
img="";
objects=[];
function preload(){
    alert_sound = loadSound('ah.mp3');
    img=loadImage('b2.jpg');
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function draw(){
    image(img, 0, 0, 380, 380);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
    objectDetector.detect(img, gotResult);
        for (i=0; i<objects.length; i++){
            if (objects[i].label == "person"){
                document.getElementById("dorno").innerHTML = "Baby Detected";  
                fill(r, g, b);
                percent = floor(objects[i].confidence*100);
                text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
                noFill();
                stroke(r, g, b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else if(objects[i].label != "person"){
                alert_sound.play();
            }
            document.getElementById("status").innerHTML="Status: Objects Detected";

            
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    objects=results;
    console.log(results);
}