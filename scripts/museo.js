let cuadro = 12;
let step = 1;
let sala = 4;
let facing = 3;
let salas = [
  ["unused"],
  [1, 0, 0, 3, 0, [1, 3, 0, 0]],
  [2, 0, 0, 5, 0, [2, 0, 0, 4]],
  [3, 1, 4, 6, 0, [0, 0, 0, 5]],
  [4, 0, 5, 0, 3, [1000, 0, 11, 0]],
  [5, 2, 0, 7, 4, [0, 6, 0, 0]],
  [6, 3, 0, 0, 0, [0, 7, 9, 0]],
  [7, 5, 0, 0, 0, [0, 0, 10, 8]]
];
let modal = document.getElementById("contenedor_info");
let modal_actual = 0;
let history = ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"];

loadSala(sala, facing);

document.getElementById("bgm").volume = 0.1;
document.getElementById("bgm").currentTime = 7;
document.getElementById("target").src="../resources/spots/"+findTarget()+".png";

if(sessionStorage.getItem("cheese")!=null){
  salas[2] = [2, 0, 0, 5, 0, [2, 12, 0, 4]];
}
if(findTarget() == 5){
  salas[3] = [3, 1, 4, 6, -1, [0, 0, 0, 5]];
}

function girar(i) {
  facing = 1 + ((facing + i + 1) % 4);
  history.push(i+1);
  history.shift();
  document.getElementById("step" + (1 + (step % 3))).currentTime = 0;
  document.getElementById("step" + (1 + (step % 3))).play();
  step++;
  loadSala();
}
function avanzar() {
  let i = salas[sala][facing];
  history.push(1);
  history.shift();
  if (i == 0) { return; }
  if (i == -1) { queAsiSea();return; }
  if (i == -2) {   document.getElementById("step" + (1 + (step % 3))).currentTime = 0;document.getElementById("step" + (1 + (step % 3))).play();loadSala();return; }
  document.getElementById("step" + (1 + (step % 3))).currentTime = 0;
  document.getElementById("step" + (1 + (step % 3))).play();
  step++;
  sala = i;
  loadSala();
}
function loadSala() {
    if(window.self != window.top){
    var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
    win.document.body.innerHTML = "Abres los ojos.<br>Los cierras de nuevo, una luz omnipresente inunda el espacio y se refleja en cada superficie, duele.<br>Vuelves a abrirlos, esta vez lentamente, frente ti no hay nada. El suelo es completamente blanco y plano, el cielo es blanco y uniforme, no logras distinguir el horizonte.<br>A tu derecha algo mancilla la pulcritud, en el suelo hay un puñado de tierra.<br>A tu izquierda, algo más lejos, un brazo cercenado, perfectamente momificado.<br>En la distancia distingues otras formas en el suelo: montoncitos de arena, plantas secas, piedras pequeñas, la cabeza de un martillo, un trozo de corteza de árbol.<br>Todos ellos separados unos veinte metros entre sí, esparcidos de forma desordenada.<br>De repente, te pesa el pecho. El aire que has traído contigo se disipa.<br>Te giras, pero no hay ninguna salida, no sabes muy bien cómo has entrado aquí.<br>Corres hacia el objeto más cercano, una rueda de madera.<br>Desesperas, no sabes muy bien qué hacer, tus piernas fallan y te desplomas sobre la rueda.<br>Miras al cielo sobre ti. Es blanco.<br>Cierras los ojos.";
    window.location.reload();
    }
  document.getElementById("vista_sala").src = "../resources/museo/salas/" + sala + "" + facing + ".png";
  console.log("history : "+history.join(""));
  if(document.getElementsByClassName("ojo")[0]!=undefined){
    while(document.getElementsByClassName("ojo").length > 0) {
      document.getElementsByClassName("ojo")[0].remove();
    }
    for(var i=0;i<200;i++){
      var ojo = document.createElement("img");
      ojo.setAttribute("class","ojo");
      ojo.setAttribute("src","../resources/fondos/ojo.png");
      ojo.setAttribute("style","image-rendering: pixelated; top:"+Math.random() * (document.getElementById('main').clientHeight - 100) + 100+"px;left:"+Math.random() * ((screen.width*3) - 0) + 0+"px;");
      document.getElementById('main').appendChild(ojo);
    }
    document.getElementById("vista_sala").style.fontSize = (Math.random() * (105 - 95 + 1) + 95)+"%";
  }
}
function infoCuadro() {
  cuadro = salas[sala][5][(facing - 1)];
  if(cuadro==0){return;}
  modal.classList.toggle("oculto");
  document.getElementById("cerrar").classList.toggle("oculto");
  if (cuadro > 999) {
      window.location = "phonehome.html";
  }
  else if (cuadro > 0) {
    document.getElementsByClassName("cuadro")[cuadro].classList.toggle("oculto");
  }
}
function cerrar() {
  modal.classList.toggle("oculto");
  document.getElementsByClassName("cuadro")[cuadro].classList.toggle("oculto");
  document.getElementById("cerrar").classList.toggle("oculto");
}

function queAsiSea(){
  document.getElementById("home").src = "../resources/museo/salas/" + sala + "" + facing + ".png";
  salas = [[0, -2, -2, -2, -2, [13, 13, 13, 13]]];
  sala = 0;
  facing = 1;
  document.getElementById("home").classList.toggle("oculto");
  console.log( document.getElementById("bgm").children[0]);
  document.getElementById("bgm").pause();
  document.getElementById("bgm_home").volume=0.2;
  document.getElementById("bgm_home").play();
  for(var i=0;i<300;i++){
    document.getElementById("vista_sala").alt += "Lo era para todos nosotros "
  }
  var ojo = document.createElement("img");
  ojo.setAttribute("class","ojo");
  ojo.setAttribute("src","../resources/fondos/ojo.png");
  ojo.setAttribute("style","image-rendering: pixelated; top:"+Math.random() * (document.getElementById('main').clientHeight - 100) + 100+"px;left:"+Math.random() * (screen.width - 0)+"px;");
  document.getElementById('main').appendChild(ojo);
  loadSala(1);

  console.log(salas);
}

function format(i){
    i = i - Math.floor(i);
    if (i < 0){
      i = i + 1
    }
    return i;
}

function findTarget(){
  d = new Date();
  jd = (d.getTime() / 86400000) - (d.getTimezoneOffset() / 1440) + 2440587.5;
  let p = format((jd - 2451550.1) / 29.530588853);
  return Math.floor(p*10);
}

function updateInfo(){
  var i = document.getElementById("info_update");
  i.innerHTML="<h1 style='padding: 80vw 0vw 48vw 0vw;'>"+decrypt(history.join(""),"3ñO-S2c.0-3irÚrüoCíÚ")+"</h1>";
}

const caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890 ¿?¡!,.áéíóúÁÉÍÓÚüÜ-'%_/".split('');
const max = caracteres.length;

function decrypt(key,text){
    resultado = [];
    acumulador=0;
    if(key.length<1){
        return 'no hay clave';
    }
    if(text.length<1){
        return 'no hay texto';
    }
    key = key.split('');
    text = text.split('');
    var i = 0;
    for (var j =0;j<text.length;j++){
        var existe = false;
        for (var k=0;k<max;k++){
            if(text[j]==caracteres[k]){
                my_index = (k-acumulador-(key[i].charCodeAt(0)%max))%max;
                acumulador = acumulador+key[i].charCodeAt(0);
                if(my_index<0){
                    my_index = max+my_index;
                }
                i++
                i=i%key.length
                resultado.push(caracteres[my_index]);
                existe = true;
                break;
            }
        }
        if(!existe){
            resultado.push(text[j]);
        }
    }
    return resultado.join("");
}