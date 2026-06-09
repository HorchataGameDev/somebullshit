document.getElementById('contenedorLateral').setAttribute("style","height:"+(document.getElementById('contenido').clientHeight-270)+"px");
window.onresize = function() {
    document.getElementById('contenedorLateral').setAttribute("style","height:"+(document.getElementById('contenido').clientHeight-270)+"px");
 }

if(screen.width<400&&window.self == window.top) {
  alert("Wow, no tan rápido, vaquero. Es mi deber informarte de que la mitad de las cosas de esta página no van a funcionar en un móvil.");
  alert("No temas, próximas versiones de esta página tendrán soporte para teléfono. De momento, hazme un favorazo y mira la página sólo desde el pc, gracias <3.");
}

if(window.self == window.top && screen.width>400){
  var contenedor_form = document.createElement("div");
  contenedor_form.setAttribute("id","que_asi_sea");
  contenedor_form.innerHTML=`
  	<img src="resources/fondos/pilar.png" style="position: fixed;z-index: -10;top:80px;left: 30%; height=10%;" class=pixelart>
	<img src="resources/fondos/cactus.png" style="position: fixed;z-index: -10;top:70px;left: 60%; height=20%;" class=pixelart>
		<p><b>Acceso al área personal</b></p>
		<form action="pages/cmd.html" method="get">
			<input type="text" placeholder="nombre" maxlength="5" name=nombre required><br>
			<input type="text" placeholder="cargo (3 primeras letras)" maxlength="3" name=cargo required><br>
			<input type="text" placeholder="pin" maxlength="4" name=pin required><br>
			<center><input type="submit" value="login"></center>
		</form>
  `;
  document.body.appendChild(contenedor_form);
}

if(sessionStorage.getItem('dark') == "true"){
  sessionStorage.setItem('dark',"false");
  darkMode();
}

audios = document.getElementsByClassName("bgm");
audios[0].volume = 0.5;
activarAudio();

async function activarAudio(){
  try{
    audios[0].play();

    if(audios[0].paused){
        setTimeout(activarAudio, 500);
    }
    else if(sessionStorage.getItem("cancion")!=null){

      audios[0].pause();
      boton=document.getElementById('botonPausa');
      num = parseInt(sessionStorage.getItem("cancion"));
      document.getElementById('imagenDiscoA').value = num;
      tiempo = sessionStorage.getItem("tiempo");
      pausado = sessionStorage.getItem("pausado");
      volumen = parseFloat(sessionStorage.getItem("volumen"));

      document.getElementById('rangoDuracion').value = sessionStorage.getItem("tiempoRango");
      document.getElementById('duracionTotal').innerHTML = sessionStorage.getItem("tiempoTexto");


      audios[num].currentTime = tiempo;
      audios[num].volume = volumen;
      document.getElementById("rangoVolumen").value=volumen*100;
      cambiarVolumen(volumen*100);

      if(pausado=="true"){
        audios[num].pause();
        boton.src="resources/reproductor/play.gif";
      }
      else{
        audios[num].play();
        boton.src="resources/reproductor/pausa.gif";
      }
      document.getElementById('imagenDiscoA').href =audios[num].dataset.url;
      document.getElementById('imagenDisco').src = "resources/musica/disco"+num+".png";
      document.getElementById('imagenDiscoA').value = num;
    }
    else{
      document.getElementById('imagenDisco').src = "resources/musica/disco0.png";
      document.getElementById('imagenDiscoA').value = 0;
      document.getElementById('duracionTotal').innerHTML = "05:19";
      sessionStorage.setItem("tiempoTexto","05:19");
      if(document.getElementById('imagenDiscoA').hasAttribute("href")){
        document.getElementById('imagenDiscoA').href ="https://youtu.be/nwjeuR5UEKE";
      }
      else{
        document.getElementById('imagenDiscoA').setAttribute("href", audios[0].dataset.url)
      }

    }
  }
  catch(DOMException){
    // console.log(DOMException);
    setTimeout(activarAudio, 500);
  }
}

function botonPausa(){
  var boton=document.getElementById('botonPausa');
  num =  parseInt(document.getElementById('imagenDiscoA').value);
  if(audios[num].paused){
      audios[num].play();
      boton.src="resources/reproductor/pausa.gif";
    }
    else{
      audios[num].pause();
      boton.src="resources/reproductor/play.gif";
    }
  
}

function siguienteCancion(){
  num =  parseInt(document.getElementById('imagenDiscoA').value);

  audios[num].pause();
  var volT = audios[num].volume;
  num=num+1;
  if(num==audios.length){
    num = 0;
  }
  audios[num].currentTime = 0;
  audios[num].volume = volT;
  audios[num].play();

  var duracionTotal = document.getElementById("duracionTotal");
  var segundos = audios[num].duration;
  var minutos = Math.floor(segundos/60);
  segundos = Math.floor(segundos%60);

  if(minutos<10){
    minutos = "0"+minutos;
  }
  if(segundos<10){
    segundos = "0"+segundos;
  }
  duracionTotal.innerHTML = minutos+":"+segundos;

  document.getElementById('imagenDiscoA').value = num;
  document.getElementById('imagenDiscoA').href =audios[num].dataset.url;
  document.getElementById('imagenDisco').src = "resources/musica/disco"+num+".png";
  document.getElementById('botonPausa').src="resources/reproductor/pausa.gif";
  sessionStorage.setItem("tiempoTexto",document.getElementById('duracionTotal').innerHTML);
}

function minutoCero(){
  num =  parseInt(document.getElementById('imagenDiscoA').value);
  if(audios[num].currentTime < 2){
    //cancion anterior
    audios[num].pause();
    var volT = audios[num].volume;
    num=num-1;
    if(num<0){
      num = (audios.length-1);
    }
    audios[num].currentTime = 0;
    audios[num].volume = volT;
    audios[num].play();

    var duracionTotal = document.getElementById("duracionTotal");
    var segundos = audios[num].duration;
    var minutos = Math.floor(segundos/60);
    segundos = Math.floor(segundos%60);

    if(minutos<10){
    minutos = "0"+minutos;
    }
    if(segundos<10){
      segundos = "0"+segundos;
    }
    duracionTotal.innerHTML = minutos+":"+segundos;

    document.getElementById('imagenDiscoA').value = num;
    document.getElementById('imagenDiscoA').href =audios[num].dataset.url;
    document.getElementById('imagenDisco').src = "resources/musica/disco"+num+".png";
    document.getElementById('botonPausa').src="resources/reproductor/pausa.gif";
    sessionStorage.setItem("tiempoTexto",document.getElementById('duracionTotal').innerHTML);
  }
  else{
    audios[num].currentTime = 0;
  }
}

function pausar(){
  var boton=document.getElementById('botonPausa');
  num =  document.getElementById('imagenDiscoA').value;
  audios[num].pause();
  boton.src="resources/reproductor/play.gif"
}

function cambiarVolumen(valor){
  //' 100%'
  if(valor>0){
    audios[num].volume = valor/100;
    if(valor==100){
      document.getElementById('numeroVolumen').innerHTML="&nbsp;"+valor+"%";
    }
    else if(valor>=10){
      document.getElementById('numeroVolumen').innerHTML="&nbsp;&nbsp"+valor+"%";
    }
    else{
      document.getElementById('numeroVolumen').innerHTML="&nbsp;&nbsp;&nbsp;"+valor+"%";
    }
    return;
  }
    audios[num].volume = 0;
    document.getElementById('numeroVolumen').innerHTML="&nbsp;&nbsp;&nbsp;0%";
}

function irAlSegundo(segundo){
  num =  document.getElementById('imagenDiscoA').value;
  if(segundo == 0){
    audios[num].currentTime = 0;
    return;
  }
  var duracion = audios[num].duration/100;
  audios[num].currentTime = duracion*segundo;
  
}

function darkMode(){
  document.getElementById('cuerpo').classList.toggle('fondo_alt');
  document.getElementById('cuerpo').classList.toggle('fondo_alt2');

  if(sessionStorage.getItem('dark') === null){
    sessionStorage.setItem('dark',"false");
  }

  if(sessionStorage.getItem('dark') == "true"){
    sessionStorage.setItem('dark',"false");
  }
  else{
    sessionStorage.setItem('dark',"true");
  }
}

var sellos= 201; //Estupido javascript no sabe contar ficheros
var contenedorSellos = document.getElementById("divSellos");
for(var i=1;i<=sellos;i++){
    contenedorSellos.innerHTML = contenedorSellos.innerHTML+"<img class=sello src=resources/sellos/"+i+".gif>";
}

chequeos();
async function chequeos(){

  var rangoDuracion = document.getElementById('rangoDuracion');
  var tiempoActual = document.getElementById('tiempoActual');
  num =  document.getElementById('imagenDiscoA').value;

  if(num === undefined){
    setTimeout(chequeos, 300);
    return;
  }

  var segundos = audios[num].currentTime;
  if(audios[num].currentTime == 0){
    var minutos = 0;
    var segundos = 0;
  }
  else{
    var minutos = Math.floor(audios[num].currentTime/60);
    var segundos = Math.floor(audios[num].currentTime%60);
  }
  if(minutos<10){
    minutos = "0"+minutos;
  }
  if(segundos<10){
    segundos = "0"+segundos;
  }
  tiempoActual.innerHTML = minutos+":"+segundos;

  rangoDuracion.value=(audios[num].currentTime/audios[num].duration)*100;

  sessionStorage.setItem("cancion",num);
  sessionStorage.setItem("tiempo",audios[num].currentTime);
  sessionStorage.setItem("pausado",audios[num].paused);
  sessionStorage.setItem("volumen",audios[num].volume);
  sessionStorage.setItem("tiempoRango",(audios[num].currentTime/audios[num].duration)*100);

  setTimeout(chequeos, 300);
}