const textoInputPalabraElegida = document.getElementById("textoInput");

function btnguardarPalabra(){
   const palabraEscritaDelUsuario = textoInputPalabraElegida.value.toUpperCase();
   const validarError = validarCaracteres(palabraEscritaDelUsuario); 
    if(validarError === true){
     alert("Escribiste Numeros y caracteres no aceptados");
   }else{
     localStorage.setItem('palabraElegida', palabraEscritaDelUsuario.trim());
      window.location.href ="juego.html";
   }
}

function validarCaracteres(palabraEscritaDelUsuario) {
 let caracteresNoAceptados = ["0","1","2","3","4","5","6","7","8","9","-","*","@","+","!","¡","$","%",".","#","(",")",":",";","/","'","?","¿","<",">",",","=","[","]","{","&","}","°","ñ","Á","ú","ó","í","á","é","ü","É","Í","Ó","Ú","Ü","Ñ","Ñ"];
 let validacion = false;

   for (let i = 0; i < caracteresNoAceptados.length; i++){
        if (palabraEscritaDelUsuario.includes(caracteresNoAceptados[i])){
         validacion = true;
        }
            
    }
   return validacion;
}
