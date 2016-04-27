
var circle = document.getElementById("circle");
var audio = document.getElementById("audio");
console.log(circle);
var time;
circle.addEventListener("click", function(){
	time = setInterval(show,100);
});
var i = 0;
function show(){
	var result = move(i*100);
	var x = result.x;
	var y = result.y;
	var z = result.z;
	console.log("x:"+x +"y:"+y+"z:"+z+"i:"+i);
    circle.style.transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(" + z + "px)";
    if(y > 55){
    	clearInterval(time);
    	circle.style.display = "none";
    	audio.play();
    }
    i++;
}
