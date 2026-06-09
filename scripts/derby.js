document.getElementById("header").style.height=screen.height*0.2+"px";
document.getElementById("footer").style.height=screen.height*0.1+"px";
document.getElementById("main").style.height=document.getElementsByClassName("caballos").length*190+"px";

esconder();

if(window.location.href.slice(-1)!="c"){
    document.getElementById("ch").remove();
}

function esconder(){
    let modales = document.getElementsByClassName("modal_info");
    i = 0;
    for (;modales[i];) {
    modales[i].classList.add("modal_escondido");
    i++;
    }
    document.getElementById("modal_ch").classList.add("modal_escondido");
    document.getElementById("boton_ok").style.display="none";
    document.getElementById("contenedor_modales").style.display="none";
    enableScroll();
}

function mostrar(index){
    esconder();
    document.getElementById("neigh").currentTime=0;
    document.getElementById("neigh").play();
    document.getElementsByClassName("modal_info")[index-1].classList.remove("modal_escondido");
    document.getElementById("contenedor_modales").style.display="initial";
    document.getElementById("contenedor_modales").scrollTop = 0;
    document.getElementById("boton_ok").style.display="initial";
    document.getElementById("main").style.overflowY="";
    disableScroll();
}

function disableScroll() {
    document.body.style.overflowY="hidden";
}

function enableScroll() {
    document.body.style.overflowY="initial";
}

function charlie(){
    esconder();
    let call = document.createElement("audio");
    let source = document.createElement("source");
    source.setAttribute("src","../resources/musica/call.mp3");
    call.appendChild(source);
    call.currentTime=0;
    call.play();
    call.remove();
    document.getElementById("modal_ch").classList.remove("modal_escondido");
    document.getElementById("contenedor_modales").style.display="initial";
    document.getElementById("contenedor_modales").scrollTop = 0;
    document.getElementById("boton_ok").style.display="initial";
    document.getElementById("main").style.overflowY="";
    disableScroll();
}

