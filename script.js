if(sessionStorage.getItem("premio")!=null){
  premio = document.createElement("img");
  premio.setAttribute("src","../resources/winner.png");
  premio.setAttribute("onerror","this.setAttribute('src','resources/winner.png')");
  premio.style="height:200px;width:200px;position:fixed;top:0px;right:100px;z-index:2;pointer-events:none;";
  premio.setAttribute("id","premio");
  document.body.appendChild(premio);
}

function alternarMusica(){
  let musica_de_fondo = document.getElementById("musica_de_fondo");
  let controlador_musica = document.getElementById("controlador_musica");
  if(musica_de_fondo.paused){
      musica_de_fondo.play();
    controlador_musica.setAttribute("src","../resources/dance.gif");
  }
  else{
    musica_de_fondo.pause();
    controlador_musica.setAttribute("src","../resources/eepy.gif");
  }
}

function alertar(texto){
  //crea un texto pequeñito en la posición del cursor que se va
  const e = document.createElement("h1");
  e.classList.add("textoFuego");
  // document.getElementById("principal").appendChild(e);
  document.getElementsByTagName("body")[0].appendChild(e);

    // get the coordinates of the mouse
  var x = event.clientX;     // get the horizontal coordinate
  var y = event.clientY;   // get the vertical coordinate

  // position newthing using the coordinates
  e.style.position = "fixed"; // fixes el relative to page. Could use absolute.
  e.style.left = (x+Math.random() * (80- (-80)) + (-80)) + "px";
  e.style.top = (y+Math.random() * (80- (-80)) + (-80)) + "px";
  e.innerHTML=texto;
  setTimeout(() => destruirLuego(), 500);
}
function destruirLuego(){
  var l = document.getElementsByClassName("textoFuego");
  l[0].remove();
}
function ganador(){
  document.cookie = "ganador=si; expires=Thu, 01 Jan 3043 00:00:00 UTC; path=/";
  window.location("../resources/winner.png");
  alert("|Enhorabuena! Has ganado el premio a más páginas abiertas dentro de si mismas!");
}

/* 
 * Party parrot gifs from http://cultofthepartyparrot.com
 * Circular mouse trail logic from Tim Tilton on Dynamic Drive http://dynamicdrive.com/dynamicindex13/circletext.htm
 */

const PARROTS = 25,
      SIZE = 30,
      SPACING = 4,
      DIAMETER = 0,
      ROTATION = 0.1,
      SPEED = 0.3,
      OFFSET = 20;

let parrots = [],
    a = Math.round(SIZE * DIAMETER * 0.208333),
    current = OFFSET,
    mouse = {
      x: a + OFFSET,
      y: a + OFFSET
    };

// populate parrots
if(!document.querySelector("#no_trail")){
  for (let i = 0; i < PARROTS; i++) {
  parrots[i] = new Parrot(i);
}
}

function Parrot(i) {
  this.x = 0;
  this.y = 0;
  this.X = 0;
  this.Y = 0;
  this.div = document.createElement('div');
  this.div.id = 'parrot-' + i;
  this.div.className = 'parrot-' + getRandom(1,20);
  document.body.appendChild(this.div);
};

function placeParrot(parrot, x, y) {
  parrot.x = x;
  parrot.y = y;
  parrot.div.style.left = parrot.x + 'px';
  parrot.div.style.top = parrot.y + 'px';
}

function makeCircle() {
  let parrot;
  current -= ROTATION;
  for (let i = PARROTS - 1; i > -1; --i) {
    parrot = parrots[i];
    parrot.div.style.top = Math.round(parrot.y + a * Math.sin((current + i) / SPACING) - 15) + 'px';
    parrot.div.style.left = Math.round(parrot.x + a * Math.cos((current + i) / SPACING)) + 'px';
  }
}

addEventListener("mousemove", function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

addEventListener("wheel", function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function draw() {
  let parrot = parrots[0];
  let prevParrot = parrots[0];
  parrot.x = parrot.X += (mouse.x - parrot.X) * SPEED;
  parrot.y = parrot.Y += (mouse.y - parrot.Y) * SPEED;
  for (let i = PARROTS - 1; i > 0; --i) {
    parrot = parrots[i];
    prevParrot = parrots[i-1];
    parrot.x = parrot.X += (prevParrot.x - parrot.X) * SPEED;
    parrot.y = parrot.Y += (prevParrot.y - parrot.Y) * SPEED;
  }
  makeCircle();
  requestAnimationFrame(draw);
}

draw();