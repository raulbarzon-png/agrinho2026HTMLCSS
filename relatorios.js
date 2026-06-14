var formVenda = document.getElementById('formVenda');
var animalVenda = document.getElementById('animalVenda');
var listaVendas = document.getElementById('listaVendas');
var graficoRacas = document.getElementById('graficoRacas');

function carregarResumoRelatorio() {
  var animais = pegarAnimais();
  var vendas = pegarVendas();
  var pendentes = animais.filter(function(animal) {
    return animal.vacina === 'Pendente';
  }).length;
  var totalVendas = vendas.reduce(function(total, venda) {
    return total + Number(venda.valor);
  }, 0);

  document.getElementById('relTotal').textContent = animais.length;
  document.getElementById('relPesoMedio').textContent = calcularPesoMedio(animais) + ' kg';
  document.getElementById('relPendentes').textContent = pendentes;
  document.getElementById('relVendas').textContent = formatarMoeda(totalVendas);
}

function carregarSelectAnimais() {
  var animais = pegarAnimais();
  animalVenda.innerHTML = '';

  if (animais.length === 0) {
    animalVenda.innerHTML = '<option value="">Cadastre um animal primeiro</option>';
    return;
  }

  animalVenda.innerHTML = '<option value="">Selecione um animal</option>';

  animais.forEach(function(animal) {
    var opcao = document.createElement('option');
    opcao.value = animal.id;
    opcao.textContent = animal.nome + ' - ' + animal.raca;
    animalVenda.appendChild(opcao);
  });
}

function carregarVendas() {
  var vendas = pegarVendas();
  listaVendas.innerHTML = '';

  if (vendas.length === 0) {
    listaVendas.innerHTML = '<tr><td colspan="4">Nenhuma venda registrada.</td></tr>';
    return;
  }

  vendas.forEach(function(venda) {
    var linha = document.createElement('tr');

    linha.innerHTML =
      '<td>' + venda.nome + '</td>' +
      '<td>' + venda.raca + '</td>' +
      '<td>' + formatarMoeda(venda.valor) + '</td>' +
      '<td>' + venda.data + '</td>';

    listaVendas.appendChild(linha);
  });
}

function criarGraficoRacas() {
  var animais = pegarAnimais();
  var contagem = {};

  animais.forEach(function(animal) {
    contagem[animal.raca] = (contagem[animal.raca] || 0) + 1;
  });

  graficoRacas.innerHTML = '';
  var racas = Object.keys(contagem);

  if (racas.length === 0) {
    graficoRacas.innerHTML = '<p>Nenhum dado para gerar gráfico.</p>';
    return;
  }

  var maior = Math.max.apply(null, Object.values(contagem));

  racas.forEach(function(raca) {
    var altura = (contagem[raca] / maior) * 180;
    var item = document.createElement('div');
    item.className = 'barra-wrap';

    var barra = document.createElement('div');
    barra.className = 'barra';
    barra.style.height = altura + 'px';

    var texto = document.createElement('small');
    texto.textContent = raca + ' (' + contagem[raca] + ')';

    item.appendChild(barra);
    item.appendChild(texto);
    graficoRacas.appendChild(item);
  });
}

formVenda.addEventListener('submit', function(evento) {
  evento.preventDefault();

  var animais = pegarAnimais();
  var vendas = pegarVendas();
  var idAnimal = animalVenda.value;
  var animal = animais.find(function(item) {
    return item.id === idAnimal;
  });

  if (!animal) {
    return;
  }

  vendas.push({
    id: Date.now().toString(),
    nome: animal.nome,
    raca: animal.raca,
    valor: Number(document.getElementById('valorVenda').value),
    data: new Date().toLocaleDateString('pt-BR')
  });

  salvarVendas(vendas);
  formVenda.reset();
  carregarResumoRelatorio();
  carregarVendas();
});

carregarResumoRelatorio();
carregarSelectAnimais();
carregarVendas();
criarGraficoRacas();
