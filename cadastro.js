var formAnimal = document.getElementById('formAnimal');
var listaAnimais = document.getElementById('listaAnimais');
var limparFormulario = document.getElementById('limparFormulario');

function atualizarResumo() {
  var animais = pegarAnimais();
  var pendentes = animais.filter(function(animal) {
    return animal.vacina === 'Pendente';
  }).length;

  document.getElementById('totalAnimais').textContent = animais.length;
  document.getElementById('vacinasPendentes').textContent = pendentes;
  document.getElementById('pesoMedio').textContent = calcularPesoMedio(animais) + ' kg';
}

function renderizarAnimais() {
  var animais = pegarAnimais();
  listaAnimais.innerHTML = '';

  if (animais.length === 0) {
    listaAnimais.innerHTML = '<tr><td colspan="7">Nenhum animal cadastrado ainda.</td></tr>';
    atualizarResumo();
    return;
  }

  animais.forEach(function(animal) {
    var linha = document.createElement('tr');

    linha.innerHTML =
      '<td>' + animal.nome + '</td>' +
      '<td>' + animal.raca + '</td>' +
      '<td>' + animal.peso + ' kg</td>' +
      '<td>' + animal.idade + ' meses</td>' +
      '<td>' + animal.vacina + '</td>' +
      '<td>' + animal.pasto + '</td>' +
      '<td>' +
      '<button class="acao-tabela editar" data-id="' + animal.id + '">Editar</button>' +
      '<button class="acao-tabela excluir" data-id="' + animal.id + '">Excluir</button>' +
      '</td>';

    listaAnimais.appendChild(linha);
  });

  atualizarResumo();
}

function limparCampos() {
  formAnimal.reset();
  document.getElementById('animalId').value = '';
}

formAnimal.addEventListener('submit', function(evento) {
  evento.preventDefault();

  var animais = pegarAnimais();
  var id = document.getElementById('animalId').value;

  var animal = {
    id: id || Date.now().toString(),
    nome: document.getElementById('nome').value.trim(),
    raca: document.getElementById('raca').value,
    peso: Number(document.getElementById('peso').value),
    idade: Number(document.getElementById('idade').value),
    vacina: document.getElementById('vacina').value,
    pasto: document.getElementById('pasto').value,
    observacao: document.getElementById('observacao').value.trim()
  };

  if (id) {
    animais = animais.map(function(item) {
      return item.id === id ? animal : item;
    });
  } else {
    animais.push(animal);
  }

  salvarAnimais(animais);
  limparCampos();
  renderizarAnimais();
});

listaAnimais.addEventListener('click', function(evento) {
  var botao = evento.target;
  var id = botao.getAttribute('data-id');

  if (!id) {
    return;
  }

  var animais = pegarAnimais();
  var animal = animais.find(function(item) {
    return item.id === id;
  });

  if (botao.classList.contains('editar') && animal) {
    document.getElementById('animalId').value = animal.id;
    document.getElementById('nome').value = animal.nome;
    document.getElementById('raca').value = animal.raca;
    document.getElementById('peso').value = animal.peso;
    document.getElementById('idade').value = animal.idade;
    document.getElementById('vacina').value = animal.vacina;
    document.getElementById('pasto').value = animal.pasto;
    document.getElementById('observacao').value = animal.observacao;
    window.scrollTo(0, 0);
  }

  if (botao.classList.contains('excluir')) {
    var novaLista = animais.filter(function(item) {
      return item.id !== id;
    });
    salvarAnimais(novaLista);
    renderizarAnimais();
  }
});

limparFormulario.addEventListener('click', limparCampos);
renderizarAnimais();
