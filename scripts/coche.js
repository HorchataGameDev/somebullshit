let gifs=["missing","bulge","color","espejo","explosion","normal","side","blur"];
let c = document.getElementById("contenedor_cartas");
let v = 0;
let fondos = 3;
let momentum=0;
let face = 0;
let crack = false;
// console.log(parseInt("10px"));

let images = document.getElementsByTagName("img");
for(i=0;i<images.length;i++){
    images[i].setAttribute("loading","lazy");
}

for(i=0;i<=fondos;i++){
    let div = document.createElement("div");
    div.classList.add("fondo");
    div.style.animationDelay=(i)+"s";
    if(i%2!=0){
        div.style.backgroundImage="linear-gradient(rgba(0,255,255,.7) .1em, transparent .1em), linear-gradient(90deg, rgba(0,255,255,.7) .1em, transparent .1em)";
    }
    document.body.appendChild(div);
}
normal();
mover();
function cambio(){
    document.getElementById("coche").src="../resources/aestheticshit/"+gifs[parseInt(Math.random() * 8)]+".gif";
    setTimeout(normal,Math.random() * (2000 - 800) + 800);
}
function normal(){
    document.getElementById("coche").src="../resources/aestheticshit/base.gif";
    setTimeout(cambio,Math.random() * (20000 - 6000) + 6000);
}
function mover(){
    if(Math.abs(v)<1){
        setTimeout(mover,20);
        return;
    }
    if(parseInt(c.style.left)>-100){
        c.style.left=parseFloat(c.style.left)-3+"vw";
        setTimeout(mover,20);
        return;  
    }
        if(parseInt(c.style.left)<-5000){
        c.style.left=parseFloat(c.style.left)+3+"vw";
        setTimeout(mover,20);
        return;  
    }
    c.style.left=parseFloat(c.style.left)+(v/10)+"vw";
    setTimeout(mover,20);
}

window.addEventListener("devicemotion", handleMotion);
window.addEventListener("deviceorientation", handleOrientation);
        
function handleOrientation(event) {
    face = event.beta;
    if(event.beta>=90){
        if(event.alpha>180){
            //tilt izquierda -30
            v = -0.25*(360-event.alpha);
        }
        else{
            //tilt derecha +30
            v = 0.5*event.alpha;
        }
    }
    else{
        if(event.alpha<180){
            //tilt izquierda
            v = -0.25*event.alpha;
        }
        else{
            //tilt derecha
            v = 0.25*(360-event.alpha);
        }
    }
}

function handleMotion(event) {
    momentum = event.acceleration.x+event.acceleration.y+event.acceleration.z;
    if(momentum>5&&momentum<9){
        setTimeout(checkMomentum, 500);
    }   
}

function checkMomentum(){
    if(momentum==0){
        if(face<-170||face>170){
            if(!crack){
                crack=true;
                document.getElementById("crack").classList.remove("oculto");
                window.removeEventListener("devicemotion", handleMotion);
                window.removeEventListener("deviceorientation", handleOrientation);
            }
        }
    }
}