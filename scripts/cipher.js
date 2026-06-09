//by HorchataGameDev
const caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890 ¿?¡!,.áéíóúÁÉÍÓÚüÜ-'%_/".split('');
const max = caracteres.length;

function encrypt(key,text){
    resultado = [];
    acumulador= key.length;
    if(key.length<1){
        return 'no hay clave';
    }
    if(text.length<1){
        return 'no hay texto'
    }
    key = key.split('');
    text = text.split('');
    var i = 0;
    for (var j =0;j<text.length;j++){
        var existe = false;
        for (var k=0;k<max;k++){
            if(text[j]==caracteres[k]){
                my_index = (k+acumulador+(key[i].charCodeAt(0)%max))%max;
                acumulador = acumulador+key[i].charCodeAt(0);
                i++
                i=i%key.length
                resultado.push(caracteres[my_index]);
                existe = true;
                break;
            }
        }
        if(!existe){
            resultado.push(text[j]); //ignora caracteres si no existen en la secuencia
        }
    }
    return resultado.join("");
}

function decrypt(key,text){
    resultado = [];
    acumulador= key.length;
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
            resultado.push(text[j]); //ignora caracteres si no existen en la secuencia
        }
    }
    return resultado.join("");
}