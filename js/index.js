var palavraSecreta = "natan";
var palpites = [];
const maximoTentativas = 5;
var erros = 0;
var partidas = 0;
var vitorias = 0;
const palavraSecretaArray = palavraSecreta.toUpperCase().split("");
var palavraSecretaArrayVazio = setPalavraSecretaArrayVazio();
novaPartida();

function adicionarTentativa(letra) {
  let encontrado = false;
  for (let i = 0; i < palpites.length; i++) {
    if (palpites[i] == letra) {
      encontrado = true;
    }
  }
  if (!encontrado && letra != "") {
    palpites.push(letra);
    console.log(letra + " adicionado em Letras Tentativa");
    encontrado = false;
  }
  return encontrado;
}

function setPalavraSecreta(palavra) {
  palavraSecreta = palavra.toUpperCase();
  console.log("palavra definida: " + palavraSecreta);
}

function setPalavraSecretaArrayVazio() {
  let palavraSecretaArrayVazio = [];
  for (let i = 0; i < palavraSecretaArray.length; i++) {
    palavraSecretaArrayVazio.push("_");
  }
  return palavraSecretaArrayVazio;
}

function verificaPalavraCorreta(letra) {
  console.log(palavraSecretaArrayVazio);

  let encontrado = false;
  for (let i = 0; i < palavraSecretaArrayVazio.length; i++) {
    if (palavraSecretaArray[i] === letra) {
      console.log(letra + " adicionada no array da palavra secreta");
      palavraSecretaArrayVazio[i] = letra;
      encontrado = true;
    }
  }
  console.log(palavraSecretaArray);
  console.log(palavraSecretaArrayVazio);
  if (!encontrado) {
    erros++;
    console.log("erros: " + erros);
  }
  return encontrado;
}

function verificaGanhou() {
  if (erros >= maximoTentativas) {
    console.log("perdeu");
    perdeu();
  }

  if (palavraSecretaArray.toString() == palavraSecretaArrayVazio.toString()) {
    console.log("ganhou");
    ganhou();
    return true;
  } else {
    return false;
  }
}

function pegarInput() {
  const letraInput = document.querySelector("input").value;
  console.log("letra input: " + letraInput);
  document.querySelector("input").value = "";
  return letraInput;
}

function reiniciar() {
  console.log("reiniciar.");
  palavraSecreta = "";
  palpites = [];
  palavraSecretaArrayVazio = [];
  erros = 0;
  setTimeout(() => {
    recarregarElementos();
  }, 3000);
}

function ganhou() {
  vitorias++;
  console.log("ganhou. vitorias: " + vitorias);
  reiniciar();
}

function perdeu() {
  console.log("perdeu. derrotas: " + (partidas - vitorias));
  reiniciar();
}

function tentativa() {
  var letraInput = pegarInput() || "";
  var setAuxLetra = "";
  if (letraInput.length > 1) {
    setAuxLetra = letraInput.charAt(0);
    console.log(
      "Voce digitou uma palavra, é maior que 1 letra. Convertendo: " +
        setAuxLetra
    );
  } else {
    setAuxLetra = letraInput;
  }
  const letra = setAuxLetra.toUpperCase();
  console.log(letra);
  const letraRepetida = adicionarTentativa(letra);

  if (letraRepetida) {
    console.log("voce ja jogou a letra " + letra);
  } else {
    verificaPalavraCorreta(letra);
    verificaGanhou();
  }
  recarregarElementos();
}

function updateTitulo() {
  var texto = document.getElementById("palavraSecreta");
  texto.innerHTML = "";
  console.log("palavra secreta: " + palavraSecretaArrayVazio);
  console.log("lenfe " + palavraSecretaArrayVazio.length);
  if (palavraSecretaArrayVazio.length != 0) {
    for (let i = 0; i < palavraSecretaArray.length; i++) {
      if (palavraSecretaArray[i] == " ") {
        texto.innerHTML += espaco;
      } else {
        texto.innerHTML += palavraSecretaArrayVazio[i] + " ";
      }
    }
  }
}

function recarregarElementos() {
  var numeroDeLetrasTitle = document.getElementById("numeroDeLetras");
  var palpitesText = document.getElementById("palpites");
  palpitesText.innerHTML = palpites.toString().toString().replace(",", " ");
  numeroDeLetrasTitle.innerHTML = palavraSecretaArray.length.toString();
}

function novaPartida() {
  updateTitulo();
  recarregarElementos();
  partidas++;
}
