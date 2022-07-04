//definição da classe
class PalavraSecreta {
  palavra;
  dica;
  constructor(palavra, dica) {
    this.palavra = palavra;
    this.dica = dica;
  }

  getPalavra() {
    return this.palavra;
  }

  getDica() {
    return this.dica;
  }
}

//Instanciando as palavras + dicas
var listaPalavras = [
  new PalavraSecreta("Brasil", "País da América do Sul."),
  new PalavraSecreta("Junqueiro", "Cidade de Alagoas."),
  new PalavraSecreta("Felipe Alencar", "Professor do IFAL."),
  new PalavraSecreta("Banana", "Fruta amarela."),
  new PalavraSecreta("Helicoptero", "Veículo aéreo."),
  new PalavraSecreta("Informatica", "Curso do IFAL."),
  new PalavraSecreta("Gato", "Animal fofo."),
];

//O código começa aqui
let indiceSorteado = sortearIndicePalavra(listaPalavras);
var palavraSecreta = definirPalavraSecreta(listaPalavras, indiceSorteado);
var dicaPalavraSorteada = definirDicaPalavraSecreta(
  listaPalavras,
  indiceSorteado
);
var palpites = [];
const maximoTentativas = 5;
var erros = 0;
var partidas = 1;
var vitorias = 0;
var derrotas = 0;
var palavraSecretaArray = definirPalavraSecretaArray(palavraSecreta);
var palavraSecretaArrayVazio =
  definirPalavraSecretaArrayVazio(palavraSecretaArray);
novaPartida();
var gameOn = true;

function definirPalavraSecretaArray(palavraSecreta) {
  return palavraSecreta.toUpperCase().split("");
}

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

function sortearIndicePalavra(lista) {
  let indiceSorteado = Math.floor(Math.random() * lista.length);
  return indiceSorteado;
}

function definirPalavraSecreta(lista, indiceSorteado) {
  let palavraSorteada = lista[indiceSorteado].getPalavra();
  console.log("palavra sorteada: " + palavraSorteada);
  return palavraSorteada;
}

function definirDicaPalavraSecreta(lista, indiceSorteado) {
  let dicaPalavraSorteada = lista[indiceSorteado].getDica();
  console.log("dica sorteada: " + dicaPalavraSorteada);
  return dicaPalavraSorteada;
}

function definirPalavraSecretaArrayVazio(pSecretaArray) {
  let pSecretaArrayVazio = [];
  for (let i = 0; i < pSecretaArray.length; i++) {
    if (palavraSecretaArray[i] == " ") {
      pSecretaArrayVazio.push(" ");
    } else {
      pSecretaArrayVazio.push("_");
    }
  }
  return pSecretaArrayVazio;
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

function limpar(timeout) {
  console.log("reiniciar.");
  palavraSecreta = "";
  palavraSecretaArrayVazio = [];
  palpites = [];
  erros = 0;
  console.log("psav " + palavraSecretaArrayVazio);
  gameOn = false;
  setTimeout(() => {
    recarregarElementos();
  }, timeout);
}

function ganhou() {
  vitorias++;
  console.log("ganhou. vitorias: " + vitorias);
  limpar(4000);
}

function perdeu() {
  derrotas++;
  console.log("perdeu. derrotas: " + derrotas);
  limpar(3000);
}

function tentativa() {
  if (!gameOn) {
    novaPartida();
  }
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
  const espaco = "&nbsp;"; //caractere de dar espaço
  let texto = document.getElementById("palavraSecreta");
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
  let numeroDeLetrasTitle = document.getElementById("numeroDeLetras");
  let palpitesText = document.getElementById("palpites");
  let numeroDePartidasTitle = document.getElementById("numeroDePartidas");
  let numeroDeVitoriasTitle = document.getElementById("numeroDeVitorias");
  let numeroDeDerrotasTitle = document.getElementById("numeroDeDerrotas");

  palpitesText.innerHTML = palpites.toString();
  numeroDeLetrasTitle.innerHTML = palavraSecretaArray.length.toString();
  numeroDePartidasTitle.innerHTML = partidas.toString();
  numeroDeVitoriasTitle.innerHTML = vitorias.toString();
  numeroDeDerrotasTitle.innerHTML = derrotas.toString();
  updateTitulo();
}

function iniciar() {
  indiceSorteado = sortearIndicePalavra(listaPalavras);
  palavraSecreta = definirPalavraSecreta(listaPalavras, indiceSorteado);
  dicaPalavraSorteada = definirDicaPalavraSecreta(
    listaPalavras,
    indiceSorteado
  );
  palavraSecretaArray = definirPalavraSecretaArray(palavraSecreta);
  palavraSecretaArrayVazio =
    definirPalavraSecretaArrayVazio(palavraSecretaArray);
  recarregarElementos();
}

function novaPartida() {
  console.log(listaPalavras);
  iniciar();
  gameOn = true;
  partidas++;
}
