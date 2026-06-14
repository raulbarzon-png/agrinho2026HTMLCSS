function pegarAnimais() {
  return JSON.parse(localStorage.getItem('agrobov_animais')) || [];
}

function salvarAnimais(animais) {
  localStorage.setItem('agrobov_animais', JSON.stringify(animais));
}

function pegarVendas() {
  return JSON.parse(localStorage.getItem('agrobov_vendas')) || [];
}

function salvarVendas(vendas) {
  localStorage.setItem('agrobov_vendas', JSON.stringify(vendas));
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function calcularPesoMedio(animais) {
  if (animais.length === 0) {
    return 0;
  }

  var soma = animais.reduce(function(total, animal) {
    return total + Number(animal.peso);
  }, 0);

  return Math.round(soma / animais.length);
}

var menuBotao = document.getElementById('menuBotao');
var menuLinks = document.getElementById('menuLinks');

if (menuBotao && menuLinks) {
  menuBotao.addEventListener('click', function() {
    menuLinks.classList.toggle('aberto');
  });
}
