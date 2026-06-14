var formSustentabilidade = document.getElementById('formSustentabilidade');
var indiceValor = document.getElementById('indiceValor');
var indiceTexto = document.getElementById('indiceTexto');

function classificarIndice(indice) {
  if (indice >= 80) {
    return 'Excelente: a propriedade apresenta boas práticas sustentáveis.';
  }

  if (indice >= 60) {
    return 'Bom: existem práticas positivas, mas ainda há pontos para melhorar.';
  }

  if (indice >= 40) {
    return 'Atenção: é importante reduzir desperdícios e melhorar o manejo.';
  }

  return 'Crítico: a propriedade precisa de ações sustentáveis com urgência.';
}

formSustentabilidade.addEventListener('submit', function(evento) {
  evento.preventDefault();

  var aguaDia = Number(document.getElementById('aguaDia').value);
  var areaPasto = Number(document.getElementById('areaPasto').value);
  var manejoSolo = Number(document.getElementById('manejoSolo').value);
  var energia = Number(document.getElementById('energia').value);
  var residuos = Number(document.getElementById('residuos').value);
  var animais = pegarAnimais();

  var aguaPorAnimal = animais.length > 0 ? aguaDia / animais.length : aguaDia;
  var pontosAgua = 20;

  if (aguaPorAnimal > 80) {
    pontosAgua = 5;
  } else if (aguaPorAnimal > 50) {
    pontosAgua = 12;
  }

  var lotacao = animais.length > 0 ? animais.length / areaPasto : 0;
  var pontosLotacao = 20;

  if (lotacao > 3) {
    pontosLotacao = 5;
  } else if (lotacao > 2) {
    pontosLotacao = 12;
  }

  var indice = pontosAgua + pontosLotacao + manejoSolo + energia + residuos;

  localStorage.setItem('agrobov_indice', JSON.stringify({
    indice: indice,
    aguaDia: aguaDia,
    areaPasto: areaPasto,
    data: new Date().toLocaleDateString('pt-BR')
  }));

  indiceValor.textContent = indice;
  indiceTexto.textContent = classificarIndice(indice);
});

var indiceSalvo = JSON.parse(localStorage.getItem('agrobov_indice'));

if (indiceSalvo) {
  indiceValor.textContent = indiceSalvo.indice;
  indiceTexto.textContent = classificarIndice(indiceSalvo.indice);
}
