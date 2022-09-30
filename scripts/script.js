const botonComenzarNuevamente = document.getElementById(
  "botonComenzarNuevamente"
);
const botonDeLetras = document.querySelectorAll("#botonesDeLetras button");
const palabraEscritaDelUsuario = localStorage.getItem('palabraElegida');
let palabrita;
let cantidadDeErrores = 0; //cantidad de errores de cada letra lanzada.
let cantidadDeAciertos = 0; //cantidad de aciertos de cada letra lanzada.
const palabras = [
  "LIBROS",
  "ALURA",
  "PROGRAMAR",
  "ESTUDIANTE",
  "GATO",
  "PERRO",
  "AMOR",
  "AMISTAD",
  "ROSA",
  "VERDE",
  "MORADO",
  "OSOS",
  "CAMINAR",
  "ESTUDIAR",
  "INTERNET",
  "AMAR",
];
const imagenPaloEstatica = id("paloDeMuerte");
const imagenCabeza = id("cabezaDelPalo");
const imagenBrazoDerecho = id("brazoDerecho");
const imagenBrazoIzquierdo = id("1brazoIzquierdo");
const imagenParteBaja = id("parteBaja");
const imagen = id("ganoPerdio");

function id(str) {
  return document.getElementById(str);
}

function palabrarandom(num_min, num_max) {
  const amplitudValores = num_max - num_min;
  const valorAlAzar = Math.floor(Math.random() * amplitudValores) + num_min;
  return valorAlAzar;
}

function iniciarGame() {
 cantidadDeErrores = 0;
  cantidadDeAciertos = 0;
  const parrafo = id("guionesConPalabraSecreta");
  const letrasEquivocadas = id("guionesConLetrasEquivocadas");
   
  if(palabraEscritaDelUsuario === null){
    const cantidadDePalabras = palabras.length;
   const valorAlAzar = palabrarandom(0, cantidadDePalabras);
   palabrita = palabras[valorAlAzar];
  } else{
   palabrita = palabraEscritaDelUsuario.trim();
  }
  const cantidadDeLetras = palabrita.length;
  for (let i = 0; i < cantidadDeLetras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }

  //Error
  for (let i = 0; i < 4; i++) {
    const span = document.createElement("span");
    letrasEquivocadas.appendChild(span);
  }
}

for (let i = 0; i < botonDeLetras.length; i++) {
  botonDeLetras[i].addEventListener("click", letrasLanzadas);
}

function letrasLanzadas(event) {
  const spans = document.querySelectorAll("#guionesConPalabraSecreta span");
  const spansPalabrasEquivocadas = document.querySelectorAll(
    "#guionesConLetrasEquivocadas span"
  ); // tomando los guiones que estan en el span
  const button = event.target;
  button.disabled = true;
  const letra = button.innerHTML;
  const palabra = palabrita.toUpperCase(); //para que solo acepte MAYUSCULA
  let acerto = false;
  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      spans[i].innerHTML = letra;
      cantidadDeAciertos++;
      acerto = true;
      button.style.color = "green";
    }
  }

  if (acerto == false) {
    spansPalabrasEquivocadas[cantidadDeErrores].innerHTML = letra; //poniendo la letra equivocada en los guiones del error
    button.style.color = "red";
    cantidadDeErrores++;
    if (cantidadDeErrores === 1) {
      imagenCabeza.style.visibility = "visible";
    } else if (cantidadDeErrores === 2) {
      imagenBrazoDerecho.style.visibility = "visible";
    } else if (cantidadDeErrores === 3) {
      imagenBrazoIzquierdo.style.visibility = "visible";
    } else if (cantidadDeErrores === 4) {
      imagenParteBaja.style.visibility = "visible";
    }
  }

  if (cantidadDeErrores == 4) {
    const imagenOsoMuerto = document.getElementById("ositoCompleto");
    imagenOsoMuerto.style.visibility = "visible";
    imagenCabeza.style.visibility = "hidden";
    imagenBrazoDerecho.style.visibility = "hidden";
    imagenBrazoIzquierdo.style.visibility = "hidden";
    imagenParteBaja.style.visibility = "hidden";
    //imagen.src = imagenOsoMuerto;
    const idMensajePerdio = document.getElementById("mensajePerdio");
    idMensajePerdio.style.visibility = "visible";
    gameOver();
  } else if (cantidadDeAciertos == palabrita.length) {
    const idMensajeGano = document.getElementById("mensajeGano");
    idMensajeGano.style.visibility = "visible";
    gameOver();
  }
}

function gameOver() {
  for (let i = 0; i < botonDeLetras.length; i++) {
    botonDeLetras[i].disabled = true;
  }
  if(palabraEscritaDelUsuario !== null){
   localStorage.removeItem('palabraElegida');
  }
}

iniciarGame();
