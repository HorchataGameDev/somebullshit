const caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890 ¿?¡!,.áéíóúÁÉÍÓÚüÜ-'%_".split('');
const max = caracteres.length-1;

var url = location.href;
var pin = parseInt(url.split("&pin=")[1]);
url = url.split("&pin=")[0];
var cargo = url.split("&cargo=")[1];
url = url.split("&cargo=")[0];
var nombre = url.split("nombre=")[1];

nombre = nombre.toLowerCase();
cargo = cargo.toLowerCase();

arr_nombre = nombre.split('');
arr_cargo = cargo.split('');

cod_nombre = "";
cod_cargo = "";

for(var i=0;i<arr_nombre.length;i++){
    cod_nombre = cod_nombre + arr_nombre[i].charCodeAt(0);
}

for(var i=0;i<arr_cargo.length;i++){
    cod_cargo = cod_cargo + arr_cargo[i].charCodeAt(0);
}

var computo = Math.floor(parseInt(cod_nombre)/parseInt(cod_cargo));
computo = computo * pin;

if(computo == 34775404){
    document.body.innerHTML="<img src='../resources/cmd.png' id=cmd onclick=window.location='https://horchatagamedev.github.io/cmd/'>";
    document.title = "Que así sea";
    document.body.style.backgroundColor = "rgb(43, 43, 43)";
}
else if(computo == 68105920){
    document.title = "EL CIRCO HA LLEGADO A TU CIUDAD";
    document.body.innerHTML="<center><h1>TE CREÍAS QUE IBA A SER ASÍ DE FÁCIL?? Vuelve a buscar pistas, idiot.</h1><br><img src='https://static7.depositphotos.com/1155356/680/i/950/depositphotos_6802331-stock-photo-clown-makes-funny-face.jpg'></center>";
}