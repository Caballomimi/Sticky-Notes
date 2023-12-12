var array = new arrayNotas();
window.onload=()=>{
    
    if (localStorage.getItem('notas') !== null) {
        console.log("Buenas Noches")
        nuevaArray=JSON.parse(localStorage.getItem('notas'))
        array.setArray(nuevaArray.array);
        cargarNotasAlmacenadaas()
    }
    document.getElementById("btnCrear").addEventListener("click",()=>{
        notaHTML_nota=crearNuevaNota(document.getElementById("nota"),array)
        notaHTML= notaHTML_nota[0]
        nota=notaHTML_nota[1]
        document.querySelector("section").appendChild(notaHTML);
        editarEstaNota(nota);
        moverNota(nota);
        eliminarNuevaNota(nota,array);

    });
 
}