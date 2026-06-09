let peces = document.getElementsByClassName("contenedor_pez");
let pez_gay = document.getElementById("contenedor_gay");
let pez_mov = false;
let modal = document.getElementById("modal");
let modal_actual = 0;
let tiempo = 300;
document.getElementById('cuerpo_modal').setAttribute("style","height:"+(modal.clientHeight-document.getElementById("barra_modal").clientHeight-35)+"px");

posInicial(pez_gay);
pez_gay.addEventListener("mousemove",huir);


pecesStart();
kelpStart();
modalHide();
modalShow(0);

function pecesStart(){
    for (let i = 0; i < peces.length; i++) {
        posInicial(peces[i]);
        setTimeout(targetPez,Math.random() * (1000 - 100) +100,peces[i]);
    }    
}

function posInicial(pez){
    //Math.random() * (max - min) + min + "px";
    pez.style.left = (Math.random() * (80 - 15) +15) + "%";
    pez.style.top = (Math.random() * (200-10) + 10) + "px";
    if(pez.style.left <=50){
    //está a la izquierda
    pez.childNodes[1].style.transform = "scaleX(-1)";
    }
}

function moverPez(pez, target_x,target_y,speed){

    let pos_x = parseFloat(pez.style.left.split(".")[0]);
    let pos_y = parseFloat(pez.style.top);
    let distancia_x = target_x - pos_x;
    let distancia_y = target_y - pos_y;
    let suma_x = 0;
    let suma_y = 0;

    if(Math.abs(distancia_x) < 2 && Math.abs(distancia_y) < 10){
        //terminado el movimiento, busca otro
        setTimeout(targetPez,Math.random() * (100 - 20) +20,pez);
    }
    else {
        pos_x = parseFloat(pez.style.left.split(".")[0]);
        pos_y = parseFloat(pez.style.top);
        distancia_x = target_x - pos_x;
        distancia_y = target_y - pos_y;

        suma_x = parseFloat(pez.style.left) +(distancia_x/100);
        suma_y = parseFloat(pez.style.top) + (distancia_y/100);

        pez.style.left = suma_x + "%";
        pez.style.top = suma_y + "px";

        let ran = parseInt((Math.random() * 80 ));
        if(parseInt(ran) == 26){
            targetPez(pez);
            return;
        }
        else{
            setTimeout(moverPez,speed,pez,target_x,target_y,speed);
        }
    }

}

function targetPez(pez){

    let pez_x =0;

    if(parseInt(pez.style.left) < 50){
        //está a la izquierda
        pez.childNodes[1].style.transform = "scaleX(-1)";
        pez_x = (Math.random() * (90 - 80) +80);
    }
    else{
        pez.childNodes[1].style.transform = "scaleX(1)";
        pez_x = (Math.random() * (20 - 15) +15);
    }

    let pez_y = Math.random() * 290;

    moverPez(pez,pez_x, pez_y,Math.random() * (20 - 10) +10);
}

//funciones del pez especial

function huir(){

    if(pez_mov){
        return;
    }
    pez_mov = true;

    pez=document.getElementById("contenedor_gay");
    
    let pez_x =0;

    if(parseInt(pez.style.left) < 50){
        pez_x = (Math.random() * (80 - 50) +50);
    }
    else{
        pez_x = (Math.random() * (50 - 15) +15);
    }

    let pez_y = Math.random() * (230-40) + 40;

    moverPezGay(pez,pez_x, pez_y,1);
}

function moverPezGay(pez,target_x, target_y,speed){
        let pos_x = parseFloat(pez.style.left.split(".")[0]);
    let pos_y = parseFloat(pez.style.top);
    let distancia_x = target_x - pos_x;
    let distancia_y = target_y - pos_y;
    let suma_x = 0;
    let suma_y = 0;

    if(Math.abs(distancia_x) < 2 && Math.abs(distancia_y) < 10){
        //terminado el movimiento, busca otro
        pez_mov = false;
    }
    else {
        pos_x = parseFloat(pez.style.left.split(".")[0]);
        pos_y = parseFloat(pez.style.top);
        distancia_x = target_x - pos_x;
        distancia_y = target_y - pos_y;

        suma_x = parseFloat(pez.style.left) + 10*(distancia_x/100);
        suma_y = parseFloat(pez.style.top) + 10*(distancia_y/100);

        pez.style.left = suma_x + "%";
        pez.style.top = suma_y + "px";

        setTimeout(moverPezGay,speed,pez,target_x,target_y,speed);
    }
}

//funciones de las algas

function kelpStart(){

    var c = document.getElementById("contenedor_kelp");

    for(var i=3;i<=67;i=i+(Math.random()*(10-4)+4)){
        if(Math.random()>=0.3){
            c.innerHTML = c.innerHTML+"<img src='../resources/peces/kelp1.gif' id='kelp_"+(i/3)+"' class='kelp' style='left:"+(10+i-3)+"%;'>";
        }
        else{
            c.innerHTML = c.innerHTML+"<img src='../resources/peces/kelp2.gif' id='kelp_"+(i/3)+"' class='kelp' style='left:"+(10+i-3)+"%;'>";
        }
    }
}

//Funciones del modal
function modalHide(){
    modal.style.visibility="hidden";
    modal.style.pointerEvents="none";
    document.getElementById("cuerpo_modal").innerHTML = "";
}

function modalShow(tipo){
    modalHide();
    modal.style.visibility="visible";
    modal.style.pointerEvents="all";
    switch(tipo) {
        case 0:
            document.getElementById("titulo_modal").innerHTML = "omg de verdad quieres conocerme...";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="I love you";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo + ": Info";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Mi área personal</h1>
            <p>Bienvenide a mi zona de hablar sobre cosas que me gustan, aquí puedes conocerme a través de mis intereses y tal vez llevarte alguna recomendación chula. No te tengo que explicar cómo funciona esta página, verdad? Qué inteligente eres! Buen chico/chica/ambos/ninguno.</p>
                `;
            break;
        case 1:
            document.getElementById("titulo_modal").innerHTML = "El sexo arte";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="I believe in you";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Películas";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Baby steps</h1>
            <p>La verdad es que el cine no me ha interesado hasta hace relativamente poco. Los últimos 6 años me he juntado con gente que siente verdadera pasión por las películas y que quieren dedicar parte de su vida a ello.<br>
            Me gustaría hacer un top de películas o hablar de actores que me gustan, pero siento que todavía no he visto suficiente como para encontrar el patrón de qué tipo de películas son las que más disfruto. De momento, me estoy gozando todo lo que me recomiendan mis amigos, es un medio maravilloso y merece muchísimo la pena. Es muy raro encontrar una película a la que no puedas sacarle algo de valor.<br>
            Entonces, ¿por qué cojones pongo una sección de películas? Porque me gustaría ampliar esta sección más adelante y tal vez añadir una sección de televisión para poner series que también estoy descubriendo. Si te interesa mucho mucho mucho saber qué es lo que veo, te dejo mi letterboxd aquí para que curiosees, pero te aviso de que por eso mismo que me dicho, no pongo valoraciones a las películas. Tampoco uso la función de diario, solo quiero llevar un registro de las películas que voy viendo.
            </p>
            <h1>Mi Letterboxd</h1>
            <img class=imagen_texto height=100px width=100px src='https://play-lh.googleusercontent.com/PFcm5Ne2otuXxkCNgql_XtpHjYrlhIGGQRFaz9XLFg2wikmMP5YCv_OsvFe1PLDAvGg' onclick="window.open('https://letterboxd.com/horchataGD','_blank').focus();">
            </div>
                `;
            break;
        case 2:
            document.getElementById("titulo_modal").innerHTML = "Nacido en la época correcta";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="Do what you can with this one";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Videojuegos";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Hola, ¿sabías que me gustan los videojuegos?</h1>
            <p>
                Llegados a este punto ya es evidente, no querría ser gamedev si no me encantaran los videojuegos. Juego sobre todo a juegos independientes porque me gusta la variedad y los juegos hechos con pasión.
                <br>Te voy a hablar de un puñado de juegos importantes para mi y tú te vas a callar y vas a leerlo enterito, vale?
            </p>
            <h2>Rain World</h2>
            <p>
                Empezamos heavy. A día de hoy, Rain World (+ downpour) es mi juego favorito. Si quieres llevarte una recomendación de esta lista, que sea Rain World, aunque te cueste y creas que no es para ti. Rain World es de los pocos juegos que de verdad justifica su dificultad con sus temas centrales y su historia (fuck you dark souls). Creo que todo el mundo puede encontrar valor en este juego si consigue pasar por los retos que le plantea.<br>
                ¿Por qué merece la pena Rain World? Para empezar, es el juego más bonito que te vas a encontrar. Cada pantalla es un fondo de escritorio y tu motivación durante buena parte del juego para avanzar es explorar zonas visualmente espectaculares. La capacidad de inmersión que tiene Rain World es impresionante, consigue activar la parte primitiva de tu cerebro que busca constantemente depredadores escondidos en el escnario y el miedo que sientes al ver una criatura nueva sin saber con seguridad cómo afrontar el encuentro es muy real.<br><br>
                Sin entrar en spoilers, la escala del mapa y de algunas zonas parece una exageración, pero es real. El contraste de las mecánicas y de la historia es una genialidad, el sistema de movimiento es extremadamente (te voy a coger de los hombros y te voy a repetir, extremadamente) complejo, el mundo de Rain World es una de mis cosas favoritas y te puedo hablar de él durante unas pocas horas, tengo un power point preparado, y la forma en la que explora sus temas a través de ese mundo que tanto me gusta hace que sea mi juego favorito del mundo. De verdad, si alguna vez lo ahs probado y lo has dejado, dale otra oportunidad.<br>
                Rain World no me inspira a crear poque quiera hacer algo parecido, Rain Wolrd me inspira a crear a pesar de que sé que jamás voy a llegar a crear nada parecido.<br><br>
                Viendo imágenes del juego parece mentira que todo lo que te estoy diciendo sea verdad. 
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co24pm.webp class=imagen_texto height=150px>
            </p>
            <h2>ABZÛ</h2>
            <p>
                ABZÛ es una carta de amor a la vida acuática y, por lo tanto, es una carta de amor a mí también. Sentí ABZÛ como una experiencia completamente personalizada y me enamoré de él. No diría que es un juego destacable por su mensaje o su diseño o sus mecánicas, simplemente ha conectado extremadamente bien conmigo y de eso es de lo que va el arte.
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co28sy.webp class=imagen_texto height=150px>
            </p>
            <h2>Cave Story</h2>
            <p>
                Cave Story es un juego que me ha inspirado mucho como creador. Es un juego extremadamente sencillo elevado puramente por el talento y las ideas de su creador, Pixel. Cuando jugué Cave Story no paraba de sorprenderme con la creatividad con la que Pixel expandía el juego más allá de sus limitaciones. Es un verdadero ejemplo de cómo con pasión y originalidad puedes hacer que tu obra sea más que la suma de sus partes, cosa que a mi me hace confiar muchísimo más en mis ideas y mis capacidades como programador.
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co7cty.webp class=imagen_texto height=150px>
            </p>
            <h2>Townscaper</h2>
            <p>
                Townscaper es algo que apenas cuenta como un juego, pero que encapsula perfectamente lo que me gusta de los videojuegos. Townscaper es un mapa con una rejilla irregular en la que puedes crear edificios haciendo clic. Es pura experiencia. Entra, prueba lo que el juego tiene que ofrecer hasta que tú lo consideres suficiente y vete. De hecho, <a target=_blank href=https://oskarstalberg.com/Townscaper/>pruébalo ahora mismo</a>.
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co50bc.webp class=imagen_texto height=150px>
            </p>
            <h2>OneShot</h2>
            <p>
                Creo que OneShot fue la chispa que hizo que me interesara de verdad por el desarrollo de videojuegos. En parte porque, como cave story, es un juego sencillo elevado por el talento del equipo tras él (tengo que destacar la música, el apartado gráfico, el guión y la programación), pero sobre todo por el propio equipo. Son un trío de gente muy guay, tanto que les seguía en twitter por otras cosas antes de jugar al juego sin saberlo, y les veo constantemente contentos con sus proyectos y con sus vidas y me anima a seguir adelante con esto sabiendo que hay gente que lo ha conseguido. 
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co1u08.webp class=imagen_texto height=150px>
            </p>
            <h2>Outer Wilds</h2>
            <p style=font-size:50px;padding-left:50px;margin-bottom:11px;>🤫</p>
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co65ac.webp class=imagen_texto height=150px>
            <h2>A short hike</h2>
            <p>
                A short hike es definitivamente el tipo de juego que me gustaría hacer. No por las vibes cozy, sino por el diseño abierto y la oferta constante al jugador de pequeñas experiencias interesantes.
                <br>De hecho, creo que se puede notar esta idea en el diseño de esta misma página web.
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co6e83.webp class=imagen_texto height=150px>
            </p>
            <h2>Sayonara Wild Hearts</h2>
            <p>
                Sayonara Wild Hearts es un juego redondísimo, de lo más cercano a la perfección que me he encontrado nunca. Este juego me inspira de lo bueno que es. Dios cómo me gusta Sayonara Wild Hearts.
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co2gx1.webp class=imagen_texto height=150px>
            </p>
            <h2>Picayune Dreams</h2>
            <p>
                Picayune Dreams es un cúmulo de muchas cosas que me gustan. Te lo describo rápido a ver si te interesa: es un bullet heaven breakcore que cuenta su historia a través de segmentos que parecen sacados de yume nikki. No puedo expresar suficiente lo mucho que me encanta que el juego incoprore su propio código en la estética y las mecánicas del juego.
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co7g3r.webp class=imagen_texto height=150px>
            </p>
            <h2>Disco Elysium</h2>
            <p>
                Siento ser otra persona más que viene a darte la tabarra con Disco Elysium, pero si es el mejor juego jamás escrito lo será por algo. Simplemente cómpralo (o piratéalo, sólo Dios sabe a quién va a ir a parar el dinero después de lo que le pasó al estudio). Te va a hacer reír y después te va a hundir un puñal en la boca del estómago y después te va a hundir otro puñal justo al lado y después va a cubrirte a patadas.
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co1sfj.webp class=imagen_texto height=150px>
            </p>
            <h2>Yume Nikki</h2>
            <p>
                Me gustan mucho todos los juegos "clon" de yume nikki, no sé qué es lo que tiene la fórmula pero me encanta este sistema de exploración y el subconsciente y el sueño me parecen temas extremadamente curiosos y me dan un poco de miedito. Mi favorito es .flow y alguna vez me gustaría hacer un juego del estilo.<br>Puedes jugar a todos estos juegos <a href=https://ynoproject.net/ target=_blank> aquí</a>.
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big/co81f2.webp class=imagen_texto height=150px>
            </p>
            <h2>Shovel Knight</h2>
            <p>
                Son todos absolutos juegazos, pero Specter of Torment está muy por encima. Qué maravilla de juegos, si no los has jugado y te gustan los juegos que rebosan carisma deja de perder el tiempo y comprate la colección de las 4 campañas. 
                <img src=https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2gsx.jpg class=imagen_texto height=150px>
            </p>



            
        
            <h1>Mi Backloggd</h1>
            <p>He jugado a muchos más juegos que estos! Ni siquiera te he enseñado todos mis juegos favoritos, así que te dejo aquí mi backloggd para que curiosees. Intento mantenerlo actualizado, pero no estoy jugando con tanta frecuencia con la que me gustaría.</p>
            <img class=imagen_texto height=100px width=100px src='https://cdn-1.webcatalog.io/catalog/backloggd/backloggd-icon-filled-256.png?v=1722424670368' onclick="window.open('https://backloggd.com/u/HorchataGameDev/','_blank').focus();">

            </div>
                `;
            break;
        case 3:
            document.getElementById("titulo_modal").innerHTML = "I love my silly little creatures";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="Don't give up";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Pokémon";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Honestamente</h1>
            <p>Pokemon no me vuelve loco. Llevo ya unos cuantos años desconectado de la saga y aunque les tengo mucho cariño a los juegos viejos (hasta la 6a gen aprox) no creo que sea algo que me defina mucho.</p>
            <h1>Dicho esto</h1>
            <p>Pokemon ha superado los 1000 personajes diferentes y esto ha hecho que empiece a surgir la idea de que "todos son el favorito de alguien" y me parece una cosa muy cuca y muy mona. Me gusta saber el pokémon favorito de cada persona porque siempre da sorpresa o ternura, además, todo el mundo tiene un pokemon favorito y no hay opiniones erróneas!</p>
            <p>Cuando digo que me gusta pokemon no me refiero necesariamente a los juegos o al competitivo o al lore. Podría ser analfabeto y me gustaría exactamente lo mismo. Lo que me gusta son los bichines y lo majos que son, así que aquí te pongo mis 32 pokemon favoritos enfrentados en una competición por mi carño.
            <div id="bracket">
            </div>
            <center><button onclick=modalHide();modalShow(3); id=boton_shuffle>shuffle</button>
            <button  onclicK=bracketStart(); id=boton_run>run</button></center>
                `;
            bracketShuffle();
            break;
        case 4:
            document.getElementById("titulo_modal").innerHTML = "They are literally meeee";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="I'm proud of you";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Personajes";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Eyeyeyeyey, no tan rápido</h1>
            <p>Escucha, esto me da un poquito de vergüenza, ¿seguro que quieres ver mi kinlist? Tampoco es ninguna locura, si no te interesa no lo mires y salimos los dos ganando... <br>¿No? ¿Quieres verla? Bueno, déjamne hablar antes de otros personajes que me dan menos cosilla.</p>
            <h1>The big ones</h1>
            <p>Hay dos lobos dentro de mí. Uno de ellos muerde y tira de mis muñecas y el otro hace lo mismo en mis tobillos. Estos lobos se llaman Daiba Nana y Midori Nagumo.</p>

            <div style=margin:auto;height:200px;><img class=sillies src=../resources/sobreMi/nagumo.gif> <img class=sillies src=../resources/sobreMi/nana.png></div><br>

            <p>Primero la pelirroja, Nagumo de CITY. Una hijaputa, hablando en claro.<br>Chavala de veintimedios tacaña, caradura, egoísta y vaga. Le gusta beber cerveza y apostar en carreras de caballos. 
            No es una mala persona, sólo está un poco perdida en la vida y no puede pagar el alquiler. Su egoísmo viene de la insatisfacción que le causa no haber encontrado todavía qué es lo que le hace feliz. 
            Como dirían los jóvenes de hoy en día, es la tía más real con hype moments y aura. Creo que cualquier chaval a las puertas de la adultez puede empatizar con esta chica y ver más allá de su egocentrismo. She is literally me.</p>

            <p>Ahora la rubia, Nana de Revue Starlight. La chica más maja del universo.<br>Joven (de mi año she is literally meeeee) estudiante de actuación, personificación de la generosidad, el esfuerzo y el talento, pero aun así se mantiene humilde, tranquila y encantadora. Coser y cocinar son su especialidad! ¿Esconde algo? Qué va! Ninguna red flag por aquí, sigue avanzando!</p>
            
            <p>Creo que no hace falta señalar las similitudes y las diferencias, pero lo voy a hacer porque es relleno gratis para mi web!<br>
            La una es una persona extremadamente generosa, hábil y preparada: Sabe cuál es su meta en la vida y lo sacrifica todo para conseguirlo. La otra sólo se preocupa por ella misma, depende por completo de la gente que la quiere y toma atajos para conseguir sus objetivos, que siempre son satisfacción a corto plazo porque no tiene una meta en la vida.<br>
            Ninguno de estos dos personajes es feliz. Sus facetas de satisfacción y apatía son máscaras que usan para afrontar el día a día porque tienen miedo. Miedo a quedarse sola y miedo a que la vida no merezca la pena más allá de la infancia.</p>
            <p>Ahora bien, cómo pueden ser las dos literalmente yo si son personajes completamente opuestos? Bueno, pues porque cuando digo que son literalmente yo es porque son literalmente yo.<br>
            Ninguna persona real podría ir por la vida como van estas dos, obviamente, son extremos muy extremos, pero yo soy el punto medio exacto. Veo mi forma de ser en ambas, veo mis carencias y veo formas de remediarlas, veo advertencias, errores y metas. No son mi modelo vital, son pautas y me ayudan a mejorar como persona.</p>
            
            <p>Estas dos patéticas lesbianas (lovingly) han marcado el rumbo de mi vida de cierta forma. Parece una gilipollez, pero pensar qué haría mi kinnie en esta situación me ha llevado a sitios a los que no me habría atrevido a pisar. Entre ellos independizarme, no dejar de buscar trabajo, seguir estudiando y aprendiendo, cortar gente poco sana de mi vida, plantar cara a ciertas personas, escribir una jodida página web molona...

            <br><br>Por eso quería dedicarles una sección a estas dos, porque son muy importantes para mi. 
            </p>
            <h1>what the <b>fuck</b></h1>
            <p>
                Déjame hablarte de un personaje que me gusta mucho. No es mega hiper importante para mi como las dos anteriores, pero las similitudes entre nosotros son alarmantes.
            </p>
            <div style=margin:auto;height:200px;>
                <img src=../resources/sobreMi/cas.jpg class=sillies height=200px> 
                <img src=../resources/sobreMi/cas2.jpg class=sillies height=200px> 
            </div>
            <p>
                Esta es Cas, de Bee and puppycat, otra girlfailure con la que comparto las siguientes características:<br>
                - Programadora.<br>
                - Insatisfecha con su trabajo.<br>
                - Asexual.<br>
                - Increíblemente patética.<br>
                - Fraternal.<br>
                - Manchas en la piel. (a veces?)<br>
                - Décadas sin dormir.<br>
                - Su color de pelo es mi color favorito. (what the hell)<br>
                - En serio, menuda pringada.<br><br>
                Esta serie no es super popular, pero si algún día la ves, tienes la obligación de pensar en mí cada vez que Cas aparezca en pantalla.
            </p>
            
            <h1>Mi personaje fav de la ficción</h1>
            <img src=../resources/sobreMi/baby.png class=imagen_texto height=200px>
            <p>
                Midna! Mi personaje favorito del mundo! La quiero mucho, necesito que sea feliz y que le vaya bien, voy a besar su cabecita y acariciar su pelo, my sweet summer child.<br>
                Midna, de The Legend of Zelda Twilight Princess, es el personaje que más me gusta de cualquier obra de ficción que conozco. Lleva siendo mi personaje favorito muchos años, desde 2015 aprox. La quiero con locura. ¿Qué es lo que me gusta de ella? Absolutamente todo.

                <h2>historia</h2>
                <P>Quiero hablar de Midna y de su papel en Twilight Princess, de su crecimiento y de sus sacrificios, pero solo me sale hablar de lo mucho que la quiero y lo guay que es. Es tan tan sdajgsdfdgk mirala es que jfjfdjfjd ayyy es tan maja y tan bonita... Si ya has jugado al juego, sabes de lo que hablo, es la mejor. Si no has jugado al juego (deberías jugar al juego), sólo tienes que saber que es un personaje sencillo pero muy bien escrito, con una personalidad muy marcada y una historia muy bonita que la saga no ha sabido replicar (Smidward Sword).<br>

                </p><img src=../resources/sobreMi/babygirl.png class=imagen_texto height=200px><p>
                <h2>diseño</h2>
                <P>Midna es una mujer que ha perdido su cuerpo y se siente atrapada en una forma corpórea inútil y fea. El diseño de su nueva forma refleja estas inquietudes a través de la asimetría y la antinormatividad, haciendo caso diametralmente opuesto de los cánones de belleza femenina.<br>
                La belleza es subjetiva, pero una de las pautas más aceptadas para determinar el atractivo de un cuerpo es su simetría. Normalmente en un diseño de personaje se suele incluir un solo elemento de acento en la simetría: un reloj de pulsera, un broche, un lunar, un tatuaje, la raya del pelo, etc. pero el diseño de Midna incluye muchos elementos asimétricos para que la asimetría no sea un detalle, sino la base del diseño. Midna cuenta con: un ojo derecho pequeño, redondo y de colores vivos y un ojo izquierdo grande, estilizado, alargado y de piedra; un colmillo en un solo lado de la boca; dos tonos de piel repartidos de forma irregular por el cuerpo; diferentes marcas y tatuajes en ambos lados del torso y las piernas; bordes irregulares y dispares en las orejas y los brazos y por último, una gran mano, un ógano del cuerpo intrinsicamente asimétrico, que nace de su cabeza. 
                <br>
                <br>
                Los cánones de belleza, por otra parte, están muy claros, lo que me facilita corroborar esta filosofía de diseño en Midna señalando todos los elementos de su cuerpo opuestos a ellos.<br>
                Las proporciones del cuerpo de Midna son un caos: su cabeza es tan grande y ancha como el resto de su cuerpo; sus brazos son largos y delgados en relación a sus piernas, que son cortas y deformes, sus pantorrillas y sus pies están subdesarrollados en relación a sus muslos; los dos tonos de su cuerpo contrastan mucho entre sí y su patrón de su acentúa su tripa y disimula su pecho. Por último, sus facciones faciales son desroporcionadas entre sí, con una nariz anormalmente chata y estrecha, un ojo prominente y una sonrisa ancha con dientes mal colocados.<br>Por si no fuera poco, midna también presenta elementos que imitan el vello corporal en los brazos y vello facial en sus mejillas, elementos evidentemente asociados a la masculinidad y no a la normatividad femenina.
                <br>
                <br>
                Esta antibelleza sumada a los colores enfermizos de su cuerpo (el gris pálido de un cadáver, el gris oscuro de una infección grave, el rojo sangriento del iris y el amarillo de su esclera), los elementos monstruosos y su aparente desnudez tiene la intención de incomodar al jugador y despertar simpatía por Midna, que tiene que lidiar con su nueva forma de vida.<br>
                Sin embargo, es un diseño tan estilizado y efectivo que todos estos elementos inquietantes son fáciles de ignorar cuando el jugador empieza a encariñarse con el personaje. Es un diseño muy mono, es adorable, quiero pellizcar sus prqueñas mejillas drenadas de sangre.
                <br><br>Por último, quiero mencionar que el arte conceptual de midna (aqui abajo) es super interesante y cada uno va tirando en medidas diferentes a los puntos clave de su diseño. Su versión final me parece el punto medio perfecto y es mi favorita.
            </p>
            <img src=../resources/sobreMi/midna_ca.jpg class=imagen_texto height=200px>
            <p>Es un poco frustrante ser fan de este personaje por un par de motivos. Creo que jamás he visto una mayor víctima de mischaracterization por parte de la comunidad, me da la impresion de que la gente sólo recuerda las primeras pocas horas del juego, cuando es borde y resentida, y se olvida de la evolución y la parte verdaderamente entrañable del personaje. Por no hablar de lo absurdamente horny que está todo el mundo con este personaje. Aunque sea asexual, entiendo lo que hace atractiva a una persona, pero jamás lograré comprender el efecto que tiene un personaje con esta complexión física en la mente de tanto pajero. Este es uno de esos personajes de los que NO puedes buscar imágenes directamente en google, porque no exagero cuando digo que la mitad de los resultados son porno. I hate it here.</p>
            <h1>Kinlist</h1>
            <p>Bueno, venga, ya he escrito suficiente, aquí tienes embarrassing information about myself.</p>
            <img src="../resources/sobreMi/kinlist.png" class=imagen_texto width=600px>
            <p>Tienes que avisarme si te sientes absolutamente feral por alguno de estos personajes! Vamos a hablar de ellos!
                `;
            break;
        case 5:
            document.getElementById("titulo_modal").innerHTML = "A chimp with a machine gun";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="Your friends miss you";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Fotos";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Pequeña galería de fotos que me gustan</h1>
            <img class=foto_galeria src=../resources/galeria/samsara.jpg onclick="window.open(this.src,'_blank').focus();">
            <h1 class=foto_tag>"samsara"<br>31/12/2025 Peñagrande</h1>
            <img class=foto_galeria src=../resources/galeria/corazón.jpg onclick="window.open(this.src,'_blank').focus();">
            <h1 class=foto_tag>"corazón"<br>31/10/2025 Peñagrande</h1>
            <img class=foto_galeria src=../resources/galeria/chinook.jpg onclick="window.open(this.src,'_blank').focus();">
            <h1 class=foto_tag>"chinook"<br>24/09/2025 Barajas</h1>
            <img class=foto_galeria src=../resources/galeria/abejita.jpg onclick="window.open(this.src,'_blank').focus();">
            <h1 class=foto_tag>"abejita"<br>13/07/2025 Soria</h1>
            <img class=foto_galeria src=../resources/galeria/amigo.jpg onclick="window.open(this.src,'_blank').focus();">
            <h1 class=foto_tag>"amigo"<br>26/04/2025 Peñagrande</h1>
            <img class=foto_galeria src=../resources/galeria/ojo.jpg onclick="window.open(this.src,'_blank').focus();">
            <h1 class=foto_tag>"ojo"<br>31/12/2024 Segovia</h1>
            <img class=foto_galeria src=../resources/galeria/sistema_nervioso.jpg onclick="window.open(this.src,'_blank').focus();">
            <h1 class=foto_tag>"sistema nervioso"<br>31/12/2024 Segovia</h1>
            <img class=foto_galeria src=../resources/galeria/planeta.jpg onclick="window.open(this.src,'_blank').focus();">
            <h1 class=foto_tag>"planeta"<br>05/05/2023 Soria</h1>
                `;
            break;
        case 6:
            document.getElementById("titulo_modal").innerHTML = "自動翻訳をご利用いただきありがとうございます";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="Be kind";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Anime";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Mangos, animes y otras japonesadas</h1>
            <p>
            Venga, tengo la intención de que esta sección sea muy cortita, porque no me considero para nada un fan del anime ni del manga, pongo esta sección porque lo que consigue gustarme de este medio me gusta MUCHO.  
            Hace unos años me encontré un slideshow de tiktok de recomendaciones de anime titulado <b>shows where girls get to be silly!! (no fanservice)</b> y creo que es la categoría que mejor define lo que me gusta.
            </p>
            <h2>MyGo / AveMujica</h2>
            <p>
                Este último año he descubierto que me gusta mucho el género de "grupo de mujeres se junta para tocar música con evidente tensión romántica de por medio" me he juntado con un amigo y nos hemos visto Bocchi, Girls band cry, Mygo, Ave Mujica, Love Live y Love Live sunshine. La fórmula simplemente no envejece.<br>
                Creo que me quedo con Mygo y Ave Mujica porque  

                <br><br>Extrañamente, en estas series siempre hay una escena en un acuario.
            </p>
            <h2>CITY</h2>
            <p>
                Una comedia costumbrista y absurda de una joven adulta buscando qué cojones hace con su vida. Si no te llama mucho el argumento no te preocupes, también va sobre sus dos amigas, sobre un restaurante de comida occidental, sobre un equipo de fútbol, un dibujante, el equipo editorial de la revista de la ciudad, tres viejos que quieren revivir su juventud, un señor muy majo, un policía, la familia rica de la ciudad, el dueño de un anticuario, un chef, una vieja y alguna persona más.<br><br>
                Es tan caótico como suena, complementa muy bien su humor y tiene unos cuantos momentos bonitos y tristes. Dale una oportunidad!

            </p>
            <h2>CITY the animation</h2>
            <p>
                HOOOOLY SHIT CITY THE ANIMATION??!?<br>Así es, querido lector, la adaptación animada de CITY comenzó a emitirse en julio de 2025 y no te puedes hacer una idea de lo mucho que significa mara mi. ¿Que qué me parece la adaptación? Bueno...<br>
                Entiendo que es un mal necesario, pero están cortando y reestructurando cosas que me parecen demasiado importantes como para simplemente no enseñarlas, pero bueno, merece la pena por poder verlo en movimiento y con música, además permite tanto al anime como al manga tener una identidad propia. El episodio 5 es una jodida obra maestra.
            </p>
            <h2>Houseki no Kuni</h2>
            <p>
                Obra budista estándar, sobre alcanzar la felicidad a través del ciclo del sufrimiento. De por si estas historias me gustan mucho, pero a este comic se le va mazo la flapa con elementos de su mundo y mitología y hace que me guste aún más. La exploración del personaje de Phos, el protagonista, y lo que le hace humano poco a poco es una barbaridad.
            </p>
            <h2>Revue Starlight</h2>
            <p>
                Yuri. Máxima expresión del amor romántico entre dos mujeres jamás puesto en una pantalla. Dios mio these bitches gay. La serie va de un grupo de chicas en una academia de artes escénicas y su relación con el escenario y entre ellas. Es una serie extremadamente rewatcheable.<br>
                A pesar de que me gusta mucho MUCHO la serie, no hay que olvidar la película, que es igual de buena, los mangas, que son menos importantes pero hay unos cuantos y merecen mucho la pena; las 7(?) representaciones musicales diferentes y la visual novel de El Dorado, que es muchísimo más gay y muy bonita.
            </p>
            <h2>Girls' last tour</h2>
            <p>
                Exploración del amor platónico y la naturaleza de la civilización a través de el viaje de dos chicas en el apocalipsis. Me gusta mucho más el manga, pero por desgracia para mi la música del anime es preciosa y solo por eso hace que también merezca la pena. SI te interesa vertelo, elige el que más rabia te dé.
            </p>
            <h2>Dungeon meshi</h2>
            <p>
                O como se trajo a España "Tragones y Mazmorras" es un manga de fantasía muy tonto y cuco. Es muy completo para lo corto que es. Tiene un buen cast de personajes bastante elaborado, un mundo muy bien pensado y una historia decente con un final satisfactorio. Lo que más me gusta es que se nota que la autora ha dedicado mucho tiempo a pensar cómo puede influir la presencia de todos estos elementos fantásticos en la vida cotidiana, más allá de la base de la que parte (dungeons and dragons). Rezuma realismo mágico. También me gustan mucho un puñado de blorbos y en general podría morir por varios de sus personajes.
            </p>
            <h2>Yotsuba</h2>
            <p>
                Conoces Yotsuba, aunque ahora mismo no te venga a la cabeza, sabes lo que es Yotsuba y sabes que es muy bueno. Así que por qué no te lo lees y ya?
                <img class=imagen_texto src=../resources/sobreMi/yots.jpg height=350px>
                </p>
                `;
            break;
        case 7:
            document.getElementById("titulo_modal").innerHTML = "Old man yells at cloud";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="Your feelings matter";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Música";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Cómo es que todo el mundo sabe hablar de música??</h1>
            <video width="200" height="200" controls class=imagen_texto>
                <source src="../resources/sobreMi/musica.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p>He escuchado música todos los días de mi vida desde que era un pimpollo, preferiría vivir sin piernas que vivir sin música, es una de las mejores cosas que tiene la vida y sin embargo odio hablar de ella.
            <br>
            ¿Por qué todo el mundo conoce y sabe diferenciar todos los géneros musicales? ¿En qué momento de la vida se aprende eso? Quiero escuchar música, no ponerme a estudiar nomenclaturas, gracias.
            <br><br>
            No me molesta que alguien piense que soy ignorante, tampoco sé diferenciar marcas de coche y soy incapaz de acordarme de los nombres de los actores, pero siempre me ha dado la impresión de que el gusto musical se usa como herramienta para valorar a una persona y eso sí que me fastidia, simplemente hay música que me gusta y música que no me gusta y la música y los gustos son conceptos abstractos difíciles de delimitar. No puedo definir mis gustos con etiquetas y un puñado de artistas y álbumes que me gustan.</p>

            <h1>Un puñado de artistas y álbumes que me gustan</h1>
            <p>Bueno, mira, no me gusta esta forma de comunicar lo que me gusta pero es la única que se me ocurre, así que voy a recoger lo que haya escuchado últimamente y te voy a explicar en pocas palabras qué tienen que me hace tilín.</p>

            <p>
            <b>Modest Mouse</b><br>
                Creo que son relativamente famosetes, me gusta mucho la voz jodida de Isaac Brock y el contraste del tono entre sus dos discos más famosos Good News For People Who Love Bad News y We Were Dead Before The Ship Even Sank, que son prácticamente lo único que escucho de ellos.<br>
            <br><b>Cage The Elephant</b><br>
                No sé qué son, voy a decir rock también. Mi disco favorito suyo es Melaphobia y lo que más me gusta es la parte instrumental, no sé si lo que estoy escribiendo tiene algo de sentido, pero la variedad y la fuerza de los instrumentos en algunas canciones me da en la parte correcta del cerebro.<br>
            <br><b>Harley Poe</b><br>
                Aquí ya no tengo ni idea, ¿folk? Mucha guitarra acústica, una voz muy chula y enérgica y letras edgys. Me gustan mucho también sus covers de Have a Great Life.<br> 
            <br><b>Chapell Roan</b><br>
                No sé si has llegado a la sección de pride pero soy bastante asexual, así que es bastante raro que escuche canciones sobre lo duro que folla la persona que las canta. Ahora bien, no sé qué tiene Chapell Roan (seguramente el rollo drag, una voz espectacular y letras devastadoras) pero no me importa cuando se pone a cantar horny. Soy incapaz de elegir entre Red Wine Supernova y Picture You.<br>
            <br><b>Paloma San Basilio</b><br>
                Reina. Diva. Diosa. Eterna.<br>
            <br><b>of Montreal</b><br>
                Aquí ya me pierdo, ni puta idea de  lo que está cantando este queer.<br>
            <br><b>Will Wood</b><br>
                Prefiero su música actual por encima de las canciones edgys que tiene con los tapeworms, pero me trago cualquier cosa que haya hecho. Aun así, In Case I Make It es bastante hit or miss para mi, pero dios mío cuando hitea... No puedo elegir entre Tomcat Disposables, Against the Kitchen Floor y Becoming the Lastnames y Euthanasia siempre me hace llorar.<br>
            <br><b>PRINCESS PRINCESS</b><br>
                No tengo ni idea de lo que me están diciendo pero me encanta la energía y la voz de la cantante. Viene de locos para escuchar mientras escribes, para no centrarte en la letra.<br>
            <br><b>Misha Panfilov</b><br>
                Mi otra alternativa de música, este tío hace música instrumental muy tranquilita que me pongo para cualquier cosa. Siempre termina colandose en el wrapped.<br>
            <br><b>The Dø</b><br>
                Yo qué sé simplemente suena bien, no me está convenciendo este sistema.
            </p>

            <h1>Vale, suficiente</h1>
            <p>
                Mira, si sigo así no voy a acabar nunca. Escucho mucha más variedad que todo esto que te he contado y ni siquiera diría que todos los artistas que te he mencionado son de mis favoritos. Creo que es más fácil si te dejo una playlist aquí abajo y tú ves un poco el rollo.<br>
                <img class=imagen_texto height=100px width=100px src='https://m.media-amazon.com/images/I/51rttY7a+9L._h1_.png' onclick="window.open('https://open.spotify.com/playlist/1pH9d21opctQU8CmAyfPjD','_blank').focus();">
            </p>
                `;
            break;
        case 8:
            document.getElementById("titulo_modal").innerHTML = "HorchataWebDev";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="Press F10 for help";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Web";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Tengo una página web!</h1>
            <p>Como desarrollador web titulado que soy, tengo una página web personal que recoge todos mis proyectos e información sobre mi. Falta mucho para que esté terminada, pero me encantaría que le echaras un vistazo!</p>
            <div id="contenedor_iframe">
                <iframe id="web_personal" title="Inline Frame Example" width="98%" height="400px" src="../index.html"></iframe>
            </div>
                `;
            
            break;
        case 9:
            document.getElementById("titulo_modal").innerHTML = "Varios datos sueltos sobre mi";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="You are not a burden";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Misc.";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Cosas de las que podría sacar otra categoría pero no me apetece escribir tanto!</h1>
            <p>
                - Mi instrumento favorito es el violín.<br>
                - Me encantan los animales, pero especialmente las criaturas marinas.<br>
                - Me interesa mucho el budismo como filosofía de vida.<br>
                - Mi sabor de helado favorito es el de limón.<br>
                - Me gusta mucho cocinar y me atrevería a decir que se me da bien.<br>
                - Tengo conocimientos enciclopédicos sobre las primeras temporadas de Los Simpsons.<br>
                - Mi color favorito es el turquesa.<br>
                - Mi comida favorita es el arroz con tomate y huevo frito, soy un chico sencillo.<br>
                - Mi cumpleaños es el día de la mujer trabajadora.<br>
                - No me gusta nada el sabor del alcohol, pero aun así bebo de vez en cuando.<br>
                - Hago el crucigrama de El País casi todos los días y cada uno es más mierdón que el anterior.<br>
                - Me gustaría mucho aprender a cantar en condiciones.<br>
                - Varias personas me han dicho que les recuerdo a sus abuelas.<br>
                - Me encantaría tatuarme pero me da miedo de que mi piel sensible haga que quede feo.<br>
                - Soy neurotípico!<br>
                - Tengo un power point de 3 horas de la historia del mundo de Rain World pendiente de ser ampliado.<br>
                - Me gusta mucho DnD pero jamás he tenido un grupo estable.<br>
                - Me he criado en el campo.<br>
                - Mi lugar favorito del mundo es el parque de la torre de Hércules en A Coruña.<br>
                - No sé qué hacer con mi vida!<br>
                - Me gusta mucho hacer regalos.<br>
                - Mi tarta favorita es la red velvet.<br>
                - Sigo jugando Pokémon Go.<br>
                - Me paso los viajes largos apuntando ideas en una libreta sobre los juegos que quiero hacer.<br>
                - Me gusta ir preparado para todo. Suelo llevar encima tiritas, pañuelos, dinero suelto y un kit de costura.<br>
                - Si quieres regalarme flores, regálame tagetes (patula nana a poder ser).<br>
                - En algún momento quiero adoptar dos ratas y llamarlas Hambre y Piojos.<br>
                - Me pirran las historias existencialistas a través de personajes autómatas o transhumanos.<br>
                - Creo que como especie deberíamos darle un descanso al desarrollo informático hasta que hayamos pulido lo que tenemos ahora.<br>
                - Mi estación del año favorita es la Primavera.<br>
                - Las cosas que más miedo dan en el mundo son las serpientes y el sueño.<br>
                - Tengo una mancha en la piel que me recorre el brazo derecho.<br>
                - La sintáxis se me daba increíblemente bien en el cole y las mater terriblemente mal.<br>

            </p>
                `;
            break;
        case 10:
            document.getElementById("titulo_modal").innerHTML = "Yo lo que quiero es que me dejen tranquilo";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="Murder is Ok";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide "+tipo+ ": Identidad";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Here's a doozy!</h1>
            <p>
            Mi sexualidad es mística y mi género esotérico. Llevo años estudiando esta misteriosa faceta del universo y no llego a comprenderla al 100%, pero voy a intentar explicarte todo lo que he aprendido.
            En general, prefiero no ser percibido, pero si algún día estás en un apuro y no tienes más remedio que percibirme como individuo, me considero un <b>hombre aroace GNC</b>. La explicación detallada es más complciada que eso, así que voy a ir punto por punto:
            </p>
            <img src="../resources/sobreMi/Natsuo.jpg" class=imagen_texto width=170px>

            <h1>Arromántico (aro)</h1>
            <p>
            El arromanticismo es un término paraguas que recoge a todas aquellas personas que sienten poca o ninguna atracción romántica por otras personas, muy clave la distinción entre el amor romántico (el de tu pareja) y el amor platónico (el de tu familia y amigos). A mi me basta con el amor de mis amigos. Nunca me he enamorado y tampoco siento la necesidad de hacerlo. Sin embargo, me parece muy bonito compartir tu vida con otra persona y me gustaría poder hacer eso algún día. Tal vez con una persona que entienda el amor de la misma forma que yo.
            </p>
            <img src="../resources/sobreMi/aro.png" class=imagen_texto width=170px>
            
            <h1>Asexual (ace)</h1>
            <p>
            De forma similar, nada o poca atracción sexual.
            No sólo es que no me guste el sexo, es que genuinamente no lo pillo. Para mi es como some looney tunes kinda shit, se me hace infantil, si es que eso tiene algo de sentido. No entiendo el peso que se le da en las relaciones o cómo puede arruinar una amistad. No entiendo el uso del sexo en obras de ficción. No entiendo por qué todo el mundo pierde la cabeza por follar.
            En resumen, el sexo como acto es bastante whatever y me da igual, el sexo como concepto social me da una pereza infinita.
            </p>
            <img src="../resources/sobreMi/ace.png" class=imagen_texto width=170px>
            
            <h1>Aroace</h1>
            <p>
            Aroace es la combinación de ambos y nuesta bandera es la mejor sin ninguna duda. Evidentemente no es un 50/50 exacto, en mi caso diría que soy algo más arromántico.
            </p>
            <img src="../resources/sobreMi/aroace.png" class=imagen_texto width=170px>

            <h1>Bisexual</h1>
            <p>
            ¿Recuerdas cuando he mencionado que no me cierro a compartir mi vida con la persona indicada? ¿De qué género es esa persona? Literalmente cualquiera, no podría importarme menos. Con suerte será una mujer y los heteros nos dejarán en paz.
            </p>
            <img src="../resources/sobreMi/bi.png" class=imagen_texto width=170px>

            <h1>Hombre</h1>
            <p>
            Después de reflexionar mucho sobre mi género no tengo ningún problema en presentarme como hombre cis.
            Sin embargo, no hay ninguna parte de mi que se enorgullezca de ser hombre. No tengo disforia, no tengo euforia, no tengo envidia del aspecto o el género de otras personas.
            Mi género me genera (jejeje) una profunda indiferencia. Creo que la mejor forma de describirme es como una persona agénero, pero no me importa lo suficiente como para explorar ese aspecto de mí.
            </p>
            <img src="../resources/sobreMi/biped.png" class=imagen_texto width=170px>

            <h1>GNC</h1>
            <p>
            GNC significa Gender NonConforming. se refiere a una persona que expresa su género de forma no convencional.
            Vestir y presentarse de forma masculina es mi bread and butter pero también me gusta maquillarme y vestir femenino de vez en cuando y me queda espectacularmente bien.
            </p>
            <img src="../resources/sobreMi/tim.jpg" class=imagen_texto width=100px>

            <h1>Pronombres</h1>
            <p>
            He/Him.
            Puedes llamarme en femenino de vez en cuando, pero no siempre. Me gusta dejar claro que no soy una mujer, por movidas de hace un tiempo!
                <img src="../resources/sobreMi/hehim.gif" class=imagen_texto width=170px>
            </p>

            <p>
            En resumen, soy muy fan de la teoría queer y no quiero más que amigos.
            </p>
                `;
            break;
        case 99:
            document.getElementById("titulo_modal").innerHTML = "EH! FUERA DE AQUÍ!";
            document.getElementsByClassName("status-bar-field")[0].innerHTML="You horny dog";
            document.getElementsByClassName("status-bar-field")[1].innerHTML="Slide 69: Nudes";
            document.getElementById("cuerpo_modal").innerHTML=`
            <h1>Algunas fotos personales mías</h1>
            <p>Wow has conseguido darle clic? O has usado un teléfono? Bueno, te felicito por tu perseverancia, por tu astucia o por pulsar f12. Lamentablemente lo de las nudes era una broma, no vas a conseguir verme sin ropa sin invitarme antes a unas copas.<br>Veenga, no llores, te voy a contar un secreto, vale? Presta atención porque esto es importante!<br><br></p>
            <p>No le digas a nadie que te he contado esto, pero debajo del manto de la tierra y del océano infinito se extiende una superficie eterna, tan lejana que jamás ha conocido la luz o la oscuridad, donde no hay diferencias entre el ayer y el mañana. Lo llamo Desierto Blanco, una zona majestuosa envuelta en misterio y secretismo. ¿Quieres verlo? No es tan inaccesible como parece, al menos no para ti con tu ordenador. Para otras personas puede resultar bastante complicado, para ti es tan sencillo como <b>cavar</b>.</p>
            <p>Desciende más allá del suelo, golpea una y otra y otra vez, hasta que empiezes a atisbar la pulcritud pálida, usa la fuerza de tus seguidores, adentraos más y más profundamente en el abismo blanco, sigue adelante y podrás apreciar una fracción del infinito.</p>
                `;
            break;
        default:
            document.getElementById("titulo_modal").innerHTML = tipo;
            document.getElementById("cuerpo_modal").innerHTML = "<p>Aquí habrá cosas sobre "+tipo+"</p>";
    }
    document.getElementsByClassName("status-bar-field")[2].innerHTML="CPU Usage: "+(Math.floor((Math.random() * (43 - 30 + 1) ) + 30))+"%";
    modal_actual = tipo;
}

async function bracketShuffle(){
    var retirar = document.getElementsByClassName("participante");
    for(var i=0;i<retirar.length;i++){
        retirar[i].remove();
    }

    var contenedor = document.getElementById("bracket");
    var participantes = [...Array(33).keys()];
    participantes.shift();
    shuffleArray(participantes);
    for(var i=0;i<participantes.length;i++){
        img_t = document.createElement('img');
        img_t.setAttribute("src","../resources/orbita/"+participantes[i]+".png");
        img_t.classList.add("participante");
        img_t.setAttribute("data-puesto",participantes[i]);
        if(i<(16)){
            img_t.style="top:"+(14+(i*31))+"px;left:"+(-i*42)+"px;"
        }
        else{
            img_t.style="top:"+(-28+((i-16)*31))+"px;left:"+(650-((i-16)*42))+"px;";
        }   
        contenedor.appendChild(img_t);
    }
    var winner = document.createElement("img");
    winner.setAttribute("id","winner");
    winner.setAttribute("src","../resources/orbita/1.png");
    contenedor.appendChild(winner);
    document.getElementById("winner").style.visibility="hidden";
}

function bracketStart(){
    //disable buttons
    var boton_run = document.getElementById("boton_run");
    var participantes = document.getElementsByClassName("participante");
    var shaved = Array.prototype.slice.call(participantes);
    boton_run.disabled=true;

    var shaved2 = ronda(participantes,0,0);
    shaved2 = ronda(shaved2,5,5);
    shaved2 = ronda(shaved2,16,16);
    var winner1;
    var winner2;

    if(parseInt(shaved2[0].dataset.puesto)<parseInt(shaved2[1].dataset.puesto)){
        //gana 0
        largo = parseInt(shaved2[0].style.left.slice(0, -2));
        largo = largo+58;
        shaved2[0].style = "left:"+largo+"px;top:47%;";
        winner1 = shaved2[0];
    }
    else{
        //gana 1
        largo = parseInt(shaved2[1].style.left.slice(0, -2));
        largo = largo+58;
        shaved2[1].style = "left:"+largo+"px;top:47%;";
        winner1 = shaved2[1];
    }
    if(parseInt(shaved2[2].dataset.puesto)<parseInt(shaved2[3].dataset.puesto)){
        //gana 2
        largo = parseInt(shaved2[2].style.left.slice(0, -2));
        largo = largo-67;
        shaved2[2].style = "left:"+largo+"px;top:39%;";
        winner2 = shaved2[2];
    }
    else{
        //gana 3
        largo = parseInt(shaved2[3].style.left.slice(0, -2));
        largo = largo-67;
        shaved2[3].style = "left:"+largo+"px;top:39%;";
        winner2 = shaved2[3];
    }
    document.getElementById("winner").style.visibility="visible";

}
function ronda(lista,offset_i,offset_d){
    var devolver = [];
    var ratio = 100/(lista.length/4)*0.95;
    for(var i=0;i<lista.length;i=i+2){
        //izquierda
        if(i<lista.length/2){
            //gana el primero
            if(parseInt(lista[i].dataset.puesto)<parseInt(lista[i+1].dataset.puesto)){
                //mover el sprite 15 pixeles hacia abajo y 80 hacia la derecha
                largo = parseInt(lista[i].style.left.slice(0, -2));
                alto = offset_i+6.5+((ratio*i)/2);
                largo = largo+73;
                lista[i].style = "left:"+largo+"px;top:"+alto+"%;";
                devolver.push(lista[i]);
            }
            //gana el siguiente
            else{
                //mover el sprite 15 pixeles hacia arriba y 80 hacia la derecha
                largo = parseInt(lista[i+1].style.left.slice(0, -2));
                alto = offset_i+6.5+((ratio*i)/2);

                largo = largo+73;

                lista[i+1].style = "left:"+largo+"px;top:"+alto+"%;";
                devolver.push(lista[i+1]);
            }
        }
        //derecha
        else{
            //gana el primero
            if(parseInt(lista[i].dataset.puesto)<parseInt(lista[i+1].dataset.puesto)){
                //mover el sprite 15 pixeles hacia abajo y 80 hacia la izquierda
                largo = parseInt(lista[i].style.left.slice(0, -2));
                alto = offset_d-2+((ratio*(i-(lista.length/2)))/2);

                largo = largo-68;

                lista[i].style = "left:"+largo+"px;top:"+alto+"%;";
                devolver.push(lista[i]);
            }
            //gana el siguiente
            else{
                //mover el sprite 15 pixeles hacia arriba y 80 hacia la izquierda
                largo = parseInt(lista[i+1].style.left.slice(0, -2));
                alto = offset_d-2+((ratio*(i-(lista.length/2)))/2);

                largo = largo-68;

                lista[i+1].style = "left:"+largo+"px;top:"+alto+"%;";
                devolver.push(lista[i+1]);
            }
        }
    }
    return devolver
}

function ronda2(lista){
    var devolver = [];
    for(var i=0;i<lista.length;i=i+2){
        //izquierda
        if(i<lista.length/2){
            
            //gana el primero
            if(parseInt(lista[i].dataset.puesto)<parseInt(lista[i+1].dataset.puesto)){
                //mover el sprite 15 pixeles hacia abajo y 80 hacia la derecha
                alto = parseInt(lista[i].style.top.slice(0, -2));
                largo = parseInt(lista[i].style.left.slice(0, -2));

                alto = alto+15;
                largo = largo+80;

                lista[i].style = "left:"+largo+"px;top:"+alto+"px;";
                devolver.push(lista[i+1]);
            }
            //gana el siguiente
            else{
                //mover el sprite 15 pixeles hacia arriba y 80 hacia la derecha

                alto = parseInt(lista[i+1].style.top.slice(0, -2));
                largo = parseInt(lista[i+1].style.left.slice(0, -2));

                alto = alto-11;
                largo = largo+80;

                lista[i+1].style = "left:"+largo+"px;top:"+alto+"px;";
                devolver.push(lista[i+1]);
            }
        }
        //derecha
        else{
            //gana el primero
            if(parseInt(lista[i].dataset.puesto)<parseInt(lista[i+1].dataset.puesto)){
                //mover el sprite 15 pixeles hacia abajo y 80 hacia la izquierda
                alto = parseInt(lista[i].style.top.slice(0, -2));
                largo = parseInt(lista[i].style.left.slice(0, -2));

                alto = alto+15;
                largo = largo-68;

                lista[i].style = "left:"+largo+"px;top:"+alto+"px;";
                devolver.push(lista[i+1]);
            }
            //gana el siguiente
            else{
                //mover el sprite 15 pixeles hacia arriba y 80 hacia la izquierda

                alto = parseInt(lista[i+1].style.top.slice(0, -2));
                largo = parseInt(lista[i+1].style.left.slice(0, -2));

                alto = alto-11;
                largo = largo-68;

                lista[i+1].style = "left:"+largo+"px;top:"+alto+"px;";
                devolver.push(lista[i+1]);
            }
        }
    }
    return devolver
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    boton_run.disabled=false;
}

window.onresize = function() {
    var suma = modal.clientHeight-document.getElementById("barra_modal").clientHeight-35;
    document.getElementById('cuerpo_modal').setAttribute("style","height:"+suma+"px");
}

window.onkeydown = function(k){
    if(modal_actual == 8 && k.key == "F10" && modal.style.visibility == "visible"){//cambiar a 4
        alert("Rescue personnel will arrive shortly to help you. Do not leave this area.");
        coords = [
        [4,8,10,12],
        [1,2,4,6,8,10,12,13,14],
        [4,6,8,12],
        [1,2,4,6,8,9,10,12,13,14],
        [4,8,9,10,12]
    ];
        for(var i=0;i<5;i++){
            for(var j=1;j<=15;j++){
                if(!coords[i].includes(j)){
                    div_t = document.createElement('div');
                    div_t.style="position: absolute;height: 3%;aspect-ratio: 1/1;z-index: -1;background-color: black;top:"+(35+(i*4))+"%;left:"+(20+(j*2))+"%;";
                    document.body.appendChild(div_t);
                }
            }
        }
    }
}