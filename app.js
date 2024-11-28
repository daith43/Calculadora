const resultado = document.querySelector("#result");
const mostrar = document.querySelector(".mostrar");

const contenedorHistorial = document.querySelector(".container-historial");
contenedorHistorial.style.display = "none";

let historial = document.querySelector("#historial");
let operaciones = document.querySelector(".operaciones");
let arrow = document.querySelector(".arrow");
let anteriorOpera = "";
let anteriorResult = "";

let datosHistorial = JSON.parse(localStorage.getItem("historial")) || [];

const operadores = ["+", "-", "*", "/", "."];

// Cientifica
let btnCientifica = document.querySelector(".btn-cientifica");
let cientifica = document.querySelector(".cont-cientifica");

btnCientifica.addEventListener("click", () => {
  cientifica.classList.toggle("cientifica-block");
});

function enviarNumero(numero) {
  resultado.value += numero;
}

function operar(operador) {
  if (operador === "pi") {
    resultado.value += Math.PI;
    return;
  }

  if (operador === "euler") {
    resultado.value += Math.E;
    return;
  }

  if (operador === "raiz") {
    resultado.value = Math.sqrt(resultado.value);
    return;
  }

  if (operador === "potencia") {
    resultado.value = Math.pow(resultado.value, 2);
    return;
  }

  if (operador === "coseno") {
    resultado.value = Math.cos((resultado.value * Math.PI) / 180);
    return;
  }

  if (operador === "tangente") {
    resultado.value = Math.tan((resultado.value * Math.PI) / 180);
    return;
  }

  // Cojo el ultimo caracter introducido, si es un operador e intentas introducir otro operador seguido la función termina y no guarda el operador nuevamente
  const ultimoCaracter = resultado.value.slice(-1);
  if (operadores.includes(ultimoCaracter)) {
    return;
  }

  resultado.value += operador;
}

// Es la función que se ejecuta al pulsar el botón '='
function resolver() {
  if (resultado.value !== "") {
    if (datosHistorial.length !== 0) {
      operaciones.innerHTML = "";
    }

    anteriorOpera = resultado.value;
    resultado.value = eval(resultado.value);
    anteriorResult = resultado.value;
    historial.value = `${anteriorOpera} = ${anteriorResult}`;
    datosHistorial.push(historial.value);
    localStorage.setItem("historial", JSON.stringify(datosHistorial));
    operaciones.innerHTML += `<p>${historial.value}</p>`;
  }

  mostrarHistorial();
}

// Muestra el historial en el contenedor de Historial
function mostrarHistorial() {
  // Si el historial está vacío muestra un mensaje
  if (datosHistorial.length == 0) {
    operaciones.innerHTML = "<p>No hay datos en memoria</p>";
  } else {
    datosHistorial = JSON.parse(localStorage.getItem("historial")) || [];
    operaciones.innerHTML = "";
    for (let i = 0; i < datosHistorial.length; i++) {
      operaciones.innerHTML += `<p>${datosHistorial[i]}</p>`;
    }
  }
}

mostrarHistorial();

// Borra el input
function borrar() {
  resultado.value = "";
}

// Borra el localStorage y los datos del DOM
function borrarHistorial() {
  localStorage.clear();
  operaciones.innerHTML = "";
  operaciones.innerHTML = "<p>No hay datos en memoria</p>";
}

// Botón para mostrar/ocultar el contenedor del historial
mostrar.addEventListener("click", () => {
  mostrar.classList.toggle("visible");

  if (mostrar.classList.contains("visible")) {
    contenedorHistorial.style.display = "block";
  } else {
    contenedorHistorial.style.display = "none";
  }
});
