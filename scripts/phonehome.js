for(var i=0;i<1000;i++){
    var ojo = document.createElement("img");
    ojo.setAttribute("class","ojo");
    ojo.setAttribute("src","../resources/fondos/ojo.png");
    ojo.setAttribute("style","image-rendering: pixelated; top:"+Math.random() * (document.getElementById('cuerpo').clientHeight - 100) + 100+"px;left:"+Math.random() * ((screen.width-50) - 0) + 0+"px;");
    document.getElementById('fondo').appendChild(ojo);
}


if(sessionStorage.getItem("cancion")!=null){
    num = parseInt(sessionStorage.getItem("cancion"));
}
else{
    num = 0;
}

last = "0000";
audios = document.getElementsByClassName("bgm");
audios[0].volume = 0.5;
activarAudio();

async function activarAudio(){
  try{
    audios[num].play();
    document.getElementById("playing").innerHTML="Playing:_".concat(audios[num].dataset.nombre);
    if(sessionStorage.getItem("cancion")!=null){

      boton = document.getElementById('pause');
      tiempo = sessionStorage.getItem("tiempo");
      pausado = sessionStorage.getItem("pausado");
      volumen = parseFloat(sessionStorage.getItem("volumen"));
      document.getElementById('duracion').value = sessionStorage.getItem("tiempoRango");
      document.getElementById('tiempo').innerHTML = sessionStorage.getItem("tiempoTexto");

      audios[num].currentTime = tiempo;
      audios[num].volume = volumen;

    //   document.getElementById("rangoVolumen").value=volumen*100;
    //   cambiarVolumen(volumen*100);

      if(pausado=="true"){
        audios[num].pause();
        // boton.src="resources/reproductor/play.gif";
      }
      else{
        audios[num].play();
        // boton.src="resources/reproductor/pausa.gif";
      }
    }
    else{
        var segundos = audios[num].duration;
        var minutos = Math.floor(segundos/60);
        segundos = Math.floor(segundos%60);
        if(minutos<10){
        minutos = "0"+minutos;
        }
        if(segundos<10){
        segundos = "0"+segundos;
        }
        document.getElementById('tiempo').innerHTML = minutos+":"+segundos;
        sessionStorage.setItem("tiempoTexto",minutos+":"+segundos);
    }
  }
  catch(DOMException){
    // console.log(DOMException);
    setTimeout(activarAudio, 500);
  }
}

function botonPausa(){
  var boton=document.getElementById('pause');
  if(audios[num].paused){
      audios[num].play();
      boton.src="../resources/reproductor/movil/pausa.png";
    }
    else{
      audios[num].pause();
      boton.src="../resources/reproductor/movil/play.png";
    }
  
}

function siguienteCancion(){

  audios[num].pause();
  num=num+1;
  if(num==audios.length){
    num = 0;
  }
  audios[num].currentTime = 0;
  audios[num].play();
  document.getElementById("playing").innerHTML="Playing:_".concat(audios[num].dataset.nombre);

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

  document.getElementById("playing").innerHTML="Playing:_".concat(audios[num].dataset.nombre);

  // document.getElementById('botonPausa').src="resources/reproductor/pausa.gif";
  // sessionStorage.setItem("tiempoTexto",document.getElementById('duracionTotal').innerHTML);
}

// function minutoCero(){
//   num =  3043;
//   if(audios[num].currentTime < 2){
//     //cancion anterior
//     audios[num].pause();
//     var volT = audios[num].volume;
//     num=num-1;
//     if(num<0){
//       num = (audios.length-1);
//     }
//     audios[num].currentTime = 0;
//     audios[num].volume = volT;
//     audios[num].play();

//     var duracionTotal = document.getElementById("duracionTotal");
//     var segundos = audios[num].duration;
//     var minutos = Math.floor(segundos/60);
//     segundos = Math.floor(segundos%60);

//     if(minutos<10){
//     minutos = "0"+minutos;
//     }
//     if(segundos<10){
//       segundos = "0"+segundos;
//     }
//     duracionTotal.innerHTML = minutos+":"+segundos;

//     document.getElementById('botonPausa').src="resources/reproductor/pausa.gif";
//     sessionStorage.setItem("tiempoTexto",document.getElementById('duracionTotal').innerHTML);
//   }
//   else{
//     audios[num].currentTime = 0;
//   }
// }

function pausar(){
    console.log("unpause");
  var boton=document.getElementById('botonPausa');
  audios[num].pause();
//   boton.src="resources/reproductor/play.gif"
}

function goto(i){
  last = last.substring(1,4)+""+i;
  if(last=="3043"){
    document.getElementById("cuerpo").innerHTML="<center><h1 style='margin-top:50vw;'> &#8593; &#8593; &#8594; &#8593; &#8594; &#8593; &#8592; &#8593; &#8594; &#8593; &#8592; &#8593; &#8592; &#8593; &#8593;<BR>CLICK</h1></center><img style=margin-top:"+(document.body.parentElement.scrollHeight*0.6)+"px; src=../resources/botonera/Sierra.png id=sierra onclick=alert><p>Saludos, internauta. Soy Sierra, Sierra la serpiente.<br>¿Te mola este sitio? Pues lo siento, ya está pillado.<br>Quédate tanto rato como te plazca pero no te confundas, esta es mi casa.<br>La verdad es que he tenido mucha potra, me cosqué de este sitio por casualidad y no me he movido de aquí.<br>Está muy mal el tema de la vivienda, seguro que ya has conocido al caballo y al ratón.<br>Los dos querían buscarse un lugar secreto para sus movidas pero no les sale nada.<br>Y yo sin quererlo ni beberlo me ha tocado justo eso.<br>No les vayas a decir donde estoy, ¿eh? Que no quiero que se me apalanquen aquí.</p>";
    document.getElementById("reproductor").remove();
    document.getElementById("navegacion").remove();
    document.documentElement.scrollTop = 0;
    if(window.self != window.top){
      var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
      win.document.body.innerHTML = 'Pocos años después de llegar a este lugar me invitó a su taller.<br>Nunca había visto cómo trabajaba. El lugar era un caos, pero encontraba todo lo que necesitaba al instante, supongo que tenía un sistema de organización propio, indescifrable para alguien como yo.<br>Al entrar le vi en el centro del caos, le acorralaban mesas llenas de papeles con carácteres sin sentido que se escribían y borraban como por arte de magia.<br>Cada centímetro de pared estaba cubierto por pantallas, todas de diferentes tamaños, cada una con un programa diferente en ejecución. La pantalla principal, la más grande, curiosamente no tenía nada abierto.<br>"Mira esto. Te va a encantar" me dijo, señalando a una de las pantallas pequeñas a la altura de mis ojos.<br>La pantalla mostraba la imagen de un bebé sano y rollizo.<br>"Esta pobre criatura iba a desarrollar problemas de corazón a sus tiernos 55 años, pero podemos solucionar el problema antes de que haya nacido. ¿Qué te parece?".<br>Esa parte era cierta, querían que todo el mundo naciera con las mismas oportunidades.<br>Le contesté que era fascinante lo que era capaz de hacer. "Eso no es todo" me contestó. Tras escribir rápidamente en sus notas los ojos del bebé cambiaron. "¿Te recuerdan a alguien?".<br>El bebé me miró con mis ojos.';
      window.location.reload();
    }
  }
}

// function cambiarVolumen(valor){
//   //' 100%'
//   if(valor>0){
//     audios[num].volume = valor/100;
//     if(valor==100){
//       document.getElementById('numeroVolumen').innerHTML="&nbsp;"+valor+"%";
//     }
//     else if(valor>=10){
//       document.getElementById('numeroVolumen').innerHTML="&nbsp;&nbsp"+valor+"%";
//     }
//     else{
//       document.getElementById('numeroVolumen').innerHTML="&nbsp;&nbsp;&nbsp;"+valor+"%";
//     }
//     return;
//   }
//     audios[num].volume = 0;
//     document.getElementById('numeroVolumen').innerHTML="&nbsp;&nbsp;&nbsp;0%";
// }

function irAlSegundo(segundo){
  if(segundo == 0){
    audios[num].currentTime = 0;
    return;
  }
  var duracion = audios[num].duration/100;
  audios[num].currentTime = duracion*segundo;
}

// function darkMode(){
//   document.getElementById('cuerpo').classList.toggle('fondo_alt');
//   document.getElementById('cuerpo').classList.toggle('fondo_alt2');

//   if(sessionStorage.getItem('dark') === null){
//     sessionStorage.setItem('dark',"false");
//   }

//   if(sessionStorage.getItem('dark') == "true"){
//     sessionStorage.setItem('dark',"false");
//   }
//   else{
//     sessionStorage.setItem('dark',"true");
//   }
// }

// var sellos= 201; //Estupido javascript no sabe contar ficheros
// var contenedorSellos = document.getElementById("divSellos");
// for(var i=1;i<=sellos;i++){
//     contenedorSellos.innerHTML = contenedorSellos.innerHTML+"<img class=sello src=resources/sellos/"+i+".gif>";
// }

chequeos();
async function chequeos(){

  var rangoDuracion = document.getElementById('duracion');
  var tiempoActual = document.getElementById('tiempo');

  if(num === undefined){
    num = 0;
    setTimeout(chequeos, 300);
    return;
  }
    if(num <0 ){
    num = 0;
    setTimeout(chequeos, 300);
    return;
  }

  console.log("check");

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