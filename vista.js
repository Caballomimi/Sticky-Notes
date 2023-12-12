
function actualizarLocalStorage(arrayNotas) {
    localStorage.setItem('notas',JSON.stringify(arrayNotas))
}
function cargarNotasAlmacenadaas() {
    for (let i = 0; i < array.getArray().length; i++) {
        let notaHTML=document.getElementById("nota").cloneNode(true);
        array.cargar();
        notaHTML.querySelector("i").innerHTML=array.getArray()[i].getFecha();
        notaHTML.querySelector("h3").innerHTML=array.getArray()[i].getTitulo();
        notaHTML.querySelector("p").innerHTML=array.getArray()[i].getTexto();
        nota=array.getArray()[i];
        array.añadirNota(nota);
        notaHTML.id=nota.getId();
        document.querySelector("section").appendChild(notaHTML);
        editarEstaNota(nota);
        moverNota(nota);
        eliminarNuevaNota(nota,array);
    }
}

function crearNuevaNota (notaPrdefinida,array) {
    let notaHTML=notaPrdefinida.cloneNode(true);
        

    nota= new Note("Introduce un Titulo","Introduce texto");
    notaHTML.querySelector("i").innerHTML=nota.getFecha();
    notaHTML.querySelector("h3").innerHTML="Introduce un Titulo";
    notaHTML.querySelector("p").innerHTML="Introduce texto";
    array.añadirNota(nota);
    notaHTML.id=nota.getId();
    actualizarLocalStorage(array)
    return [notaHTML,nota];
}


function moverNota(nota) {
    notaHTML=document.getElementById(nota.getId())
    var moverdiv = false;
    var divActual;
    notaHTML.addEventListener("mousedown", (e) => {
        moverdiv = true;
        divActual=e.target.parentNode;
    });
    
    notaHTML.addEventListener("mouseup",()=>{moverdiv=false;})
    
    document.addEventListener("mousemove", (e) => {
        if (moverdiv) {
            X = e.clientX ;
            Y = e.clientY ; 
            divActual.style.left = X + "px";
            divActual.style.top = Y + "px";
            array.getArray()[divActual.id].setPosicionX(X);
            array.getArray()[divActual.id].setPosicionY(Y);
            actualizarLocalStorage(array)
        }
    });
}

function editarEstaNota(nota) {
    notaHTML=document.getElementById(nota.getId())
    notaHTML.querySelector("#editar").addEventListener("click",(e)=>{
        primero=e.target.parentNode
        segundo=primero.parentNode
        tercero=segundo.parentNode;
        h3=tercero.querySelector("h3");
        p=tercero.querySelector("p");
        if (e.target.src=="http://127.0.0.1:5500/Ejercicios/Relacion5/Worksheet5/editar.png") {
            

            inputTitulo=document.createElement("input");
            inputTitulo.type="text";
            
            inputTitulo.value=h3.innerHTML;
            h3.innerHTML=""
            h3.appendChild(inputTitulo);

            inputTexto=document.createElement("textarea");
            
            inputTexto.value=p.innerHTML;
            inputTexto.rows="8"
            p.innerHTML=""
            
            e.target.src="./tick.png";
            p.appendChild(inputTexto);
        }else{
            e.target.src="./editar.png";
            h3.innerHTML=h3.querySelector("input").value;
            p.innerHTML=p.querySelector("textarea").value;
            
            array.getArray()[tercero.id].setTitulo(h3.innerHTML);
            array.getArray()[tercero.id].setTexto(h3.innerHTML);
            actualizarLocalStorage(array)
        }
    })
}

function eliminarNuevaNota(nota) {
    notaHTML=document.getElementById(nota.getId())
    notaHTML.querySelector("#eliminar").addEventListener("click",(e)=>{
        primero=e.target.parentNode
        segundo=primero.parentNode
        tercero=segundo.parentNode;
        array.eliminarNota(array.getArray()[tercero.id]);
        tercero.style.display="none";
        actualizarLocalStorage(array)
    })
}

function obtenerFechaHora() {
    var fechaActual = new Date();
  
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    var anio = fechaActual.getFullYear();
  
    var hora = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    var segundos = fechaActual.getSeconds();
  
    // Formatear los valores para asegurar que siempre tengan dos dígitos
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    hora = hora < 10 ? '0' + hora : hora;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
  
    // Crear la cadena con el formato deseado
    var fechaHoraString = anio + '-' + mes + '-' + dia + ' | ' + hora + ':' + minutos + ':' + segundos;
  
    return fechaHoraString;
}
  