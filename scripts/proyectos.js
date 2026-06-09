puede_moverse=true;
modo_noche=false;
modal_actual = -1;

speed = 1.5;
player = document.getElementById("main_char");
mapa = document.getElementById("fondo");
last_dir = player.dataset.last_dir;
fondo_x = "50%";
fondo_y = "50%";
hidden_x = 0;
hidden_y = 0;

player.style.left="737px";
player.style.top="30px";

var coords = [
  {
    "rango_x":[60,180],
    "rango_y":[425,545],
    "accion":"funcion",
    "numero":-1
  },
  {
    "rango_x":[916,993],
    "rango_y":[100,180],
    "accion":"modal",
    "numero":0
  },
  {
    "rango_x":[927,998],
    "rango_y":[400,483],
    "accion":"modal",
    "numero":1
  },
  {
    "rango_x":[360,524],
    "rango_y":[168,211],
    "accion":"modal",
    "numero":2
  },
  {
    "rango_x":[171,232],
    "rango_y":[223,284],
    "accion":"modal",
    "numero":3
  },
  {
    "rango_x":[335,395],
    "rango_y":[447,499],
    "accion":"modal",
    "numero":4
  },
  {
    "rango_x":[543,599],
    "rango_y":[392,465],
    "accion":"modal",
    "numero":5
  },
    {
    "rango_x":[468,495],
    "rango_y":[2,8],
    "accion":"funcion",
    "numero":-2
  },
    {
    "rango_x":[733,773],
    "rango_y":[136,180],
    "accion":"modal",
    "numero":6
  },
    {
    "rango_x":[710,734],
    "rango_y":[419,457],
    "accion":"funcion",
    "numero":-3
  },
  {
    "rango_x":[1100,1200],
    "rango_y":[200,300],
    "accion":"modal",
    "numero":7
  },
  {
    "rango_x":[1150,1350],
    "rango_y":[0,200],
    "accion":"funcion",
    "numero":-6
  }
];

var tickRate = 10,
    keyDown = {},
    keyMap = {
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

$('body').keydown(function(e){ keyDown[keyMap[e.which]] = true;  });
$('body').keyup(function(e){   keyDown[keyMap[e.which]] = false; });

var tick = function() {
  if(!puede_moverse){
    setTimeout(tick, tickRate);
    return;
  }
    fondo_x = parseFloat(player.style.left.slice(0, -2));;
    fondo_y = parseFloat(player.style.top.slice(0, -2));;
  if(keyDown['up']) {
    if(fondo_y>3){
        fondo_y=fondo_y-speed;
    }
    if(last_dir!="up"){
        last_dir="up";
        player.setAttribute("src","../resources/mapa/walking_up.gif");
    } 
    player.style="left:"+fondo_x+"px;top:"+fondo_y+"px;";
  } else if (keyDown['down']) {
    if(fondo_y<562){
    fondo_y=fondo_y+speed;
    }
    if(last_dir!="down"){
        last_dir="down";
        player.setAttribute("src","../resources/mapa/walking_down.gif");
    }
    player.style="left:"+fondo_x+"px;top:"+fondo_y+"px;";
  } else if (keyDown['left']) {
    if(fondo_x>30){
        fondo_x=fondo_x-speed;
    }
    if(last_dir!="left"){
        last_dir="left";
        player.setAttribute("src","../resources/mapa/walking_left.gif");
    }
    player.style="left:"+fondo_x+"px;top:"+fondo_y+"px;";
  } else if (keyDown['right']) {
    if(fondo_x<1280){
        fondo_x=fondo_x+speed;
    }
    player.style="left:"+fondo_x+"px;top:"+fondo_y+"px;";
    if(last_dir!="right"){
        last_dir="right";
        player.setAttribute("src","../resources/mapa/walking_right.gif");
    }
  }
  else{
    if(last_dir!="nada"){
        player.setAttribute("src","../resources/mapa/facing_"+last_dir+".png");
        last_dir="nada";
    }
  }

  setTimeout(tick, tickRate);
};

tick();

window.onkeyup = function(k){
  if(k.key=="e"){
    if(modal_actual==-1){
      interactuar();
    }
    else if(modal_actual==-2){
      document.getElementById("modal_c").classList.add("modal_escondido");
      document.getElementById("modal_s").classList.add("modal_escondido");
      modal_actual = -1;
      puede_moverse = true;
    }
    else{
      esconderModal(modal_actual);
      modal_actual = -1;
      puede_moverse = true;
    }
  }
}

function dentroDe(coord_x,coord_y,rango_x,rango_y){
  if(coord_x>=rango_x[0]&&coord_x<=rango_x[1]){
    if(coord_y>=rango_y[0]&&coord_y<=rango_y[1]){
      return true;
    }
  }
  return false;
}

function interactuar(){
  coord_x = parseFloat(player.style.left.slice(0, -2));
  coord_y = parseFloat(player.style.top.slice(0, -2));
  for(var i=0;i<coords.length;i++){
    if(dentroDe(coord_x,coord_y,coords[i]["rango_x"],coords[i]["rango_y"])){
      if(coords[i]["accion"]=="funcion"){
        //hacer la funcion
        if(coords[i]["numero"]==-1){
          window.location = "../index.html#proyectos";
        }
        else if(coords[i]["numero"]==-2){
          window.location = "templo.html";
        }
        else if(coords[i]["numero"]==-3){
          night();
        }
        else if(coords[i]["numero"]==-4){
          puede_moverse=false;
          modal_actual=-2;
          document.getElementById("modal_s").classList.toggle("modal_escondido");
          // ESTE ES EL SECRETO
        }
        else if(coords[i]["numero"]==-5){
          puede_moverse=false;
          modal_actual=-2;
          document.getElementById("modal_c").classList.toggle("modal_escondido");
          //ESTE ES EL CENTRO
        }
        else if(coords[i]["numero"]==-6){
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
      }
      


      else{
        //bloquear movimiento
        puede_moverse=false;
        //mostrar modal
        mostrarModal(coords[i]["numero"]);
      }
    }
  }
}

function home(){
  window.location = "../index.html";
}

function mostrarModal(num){
  document.getElementById(num).classList.toggle("modal_escondido");
  modal_actual  = num;
}

function esconderModal(){
  document.getElementById(modal_actual).classList.toggle("modal_escondido");
  modal_actual  = -1;
}

function night(){
  document.getElementById("fondo").style.backgroundImage =" url('../resources/fondos/city_night.png')";
  document.getElementById("main_char").style.filter = "none";
  document.getElementById("main_char").classList.toggle("chars");
  document.getElementsByClassName("farola")[0].classList.remove("modal_escondido");
  document.getElementsByClassName("farola")[1].classList.remove("modal_escondido");
  document.getElementsByClassName("farola")[2].classList.remove("modal_escondido");
  document.getElementsByClassName("farola")[3].classList.remove("modal_escondido");
  d = new Date();
  if(d.getDate()==19&&d.getMonth()==4){
    document.getElementById("modal_c").innerHTML='<p>Alguien ha dejado un teléfono en el suelo.<br>La pantalla no responde al tacto, pero todavía puede leerse el fragmento de una conversación.</p><img src="../resources/bordes/telefono.png" class="tel"><div class="tel_content"><p>Anyone else but you</p></div>';
  }
  play_audio();

  //puta mierda
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("main_char").nextElementSibling.remove();
  document.getElementById("controles").remove();

  document.getElementById("musica_de_fondo").pause();
  document.getElementById("musica_de_fondo").remove();
  document.getElementById("controlador_musica").remove();

  hidden_x = Math.random() * (1250 - 30) + 30;
  hidden_y = Math.random() * (500 - 10) + 10;

  while((hidden_x>500)&&(hidden_x<750)&&(hidden_y>200)&&(hidden_y<400)){
    hidden_x = Math.random() * (1250 - 30) + 30;
    hidden_y = Math.random() * (500 - 10) + 10;
  }

  coords=  [{
    "rango_x":[(hidden_x-50) ,(hidden_x+50)],
    "rango_y":[(hidden_y-50) ,(hidden_y+50)],
    "accion":"funcion",
    "numero":-4
  },
    {
    "rango_x":[650,700],
    "rango_y":[275,325],
    "accion":"funcion",
    "numero":-5
  }];

  document.getElementById("premio").style.opacity=0.2;
}

function play_audio(){
  document.getElementById("ambient").play();
  loop_audio();
  check_vol()
}

function loop_audio(){
  document.getElementById("ambient").currentTime = 0.1;
  setTimeout(loop_audio,9000);
}

function check_vol(){
  // vol_x = 0.1 + 0,4*(1/(1+Math.abs(hidden_x-fondo_x)));
  // vol_y = 0.1 + 0.4*(1/(1+Math.abs(hidden_y-fondo_y)));
  vol_x = 0.5*(1-(Math.abs(hidden_x-fondo_x)/600));
  vol_y = 0.5*(1-(Math.abs(hidden_y-fondo_y)/250));
  vol = vol_x + vol_y;
  if(vol<0.1){
    vol=0.1;
  }
  if(vol>10){
    vol=10;
  }
  document.getElementById("ambient").volume = vol;
  // .volume = 0.5;
  setTimeout(check_vol,100);
}