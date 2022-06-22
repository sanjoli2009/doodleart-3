function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}
function setup(){
canvas = createCanvas(280,280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}
function clearCanvas(){
    background("white");
}

function draw(){
strokeWeight(10);
stroke("black");
if (mouseIsPressed)
{
    line(pmouseX, pmouseY, mouseX, mouseY);
}
}
function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'label:'+ results[0].label;
    document.getElementById('confidence').innerHTML = 'confidence:'+ Math.round(results[0].confidence*100)+"%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}