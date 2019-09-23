function testInfo(texto, regexInput) {
  $('#teste').removeClass('is-valid');
  $('#teste').removeClass('is-invalid');
  var re = RegExp(`${regexInput.value}`);
  var OK = re.exec(texto.value);
  console.log(texto);
  if (OK)
    $('#teste').addClass('is-valid');
  else
    $('#teste').addClass('is-invalid');
}

function criarLinha() {
  var tabela = document.getElementById('tabela');
  var row = tabela.insertRow(tabela.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = '<input type="text">';
  cell2.innerHTML = '<input type="text">';
}

function removerLinha() {
  var tabela = document.getElementById('tabela');
  tabela.deleteRow(tabela.rows.length - 1);
}

class Gramatica {
  constructor(init) {
    this.init = init
    this.regras = pegarGramatica();
  }
}

function pegarValor(linhas, linha, cell) {
  return linhas[linha].cells[cell].childNodes[0].value;
}

function testar() {
  var gramatica = new Gramatica('S');
  var texto = document.getElementById('texto').value;
  $('#texto').removeClass('is-valid');
  $('#texto').removeClass('is-invalid');
  if (verifica(gramatica, texto, 'S')) {
    $('#texto').addClass('is-invalid');
  }
  else
    $('#texto').addClass('is-valid');
}

function verifica(gramatica, texto, prop) {
  if (texto) {
    for (i = 0; i < gramatica[prop].length; i++) {
      if (texto.charAt(0) === gramatica[prop][i].charAt(0)) {
        if (gramatica[prop][i].toLowerCase() === gramatica[prop][i]) {  //se eh terminal
          if (texto.substr(1)) // se ainda tem texto
            return false
          else
            return true;
        }
        else {
          for (j = 0; j < gramatica[prop][i].length; j++) {
            if (isUpper(gramatica[prop][i].charAt(j))) {  //se eh prop
              if (verifica(gramatica, texto.substr(1), gramatica[prop][i].charAt(j))) //recursao
                return true;
              else
                return false;
            }
          }
        }
      }
    }
  }
  else return true;
}

function isUpper(char) {
  if (x.charCodeAt(0) >= 65 && x.charCodeAt(0) <= 90)
    return true;
  else
    return false;
}

function pegarGramatica() {
  let linhas = document.getElementById('tabela').rows;
  let gramatica = {}
  for (i = 0; i < linhas.length; i++) {
    if (pegarValor(linhas, i, 0).length == 1) {
      if (pegarValor(linhas, i, 1)) {
        if (gramatica[pegarValor(linhas, i, 0)]) {
          gramatica[pegarValor(linhas, i, 0)].push(pegarValor(linhas, i, 1));
        }
        else {
          // gramatica.push(pegarValor(linhas, i, 0));
          gramatica[pegarValor(linhas, i, 0)] = [pegarValor(linhas, i, 1)];
        }
      }
      else {
        alert('Coluna vazia!!');
      }
    }
    else {
      alert('Mais de um caractere como definição de uma propriedade ou coluna vazia!!');
      return;
    }
  }
  return gramatica;
}

var container = document.getElementById('mynetwork');
var nodes = [], edges = [], graph;
nodes = new vis.DataSet();
nodes.add([
  { id: '1', label: 'Node 1' },
  { id: '2', label: 'Node 2' },
  { id: '3', label: 'Node 3' },
  { id: '4', label: 'Node 4' },
  { id: '5', label: 'Node 5' }
]);

// create an array with edges
edges = new vis.DataSet();

edges.add([
  { id: '1', from: '1', to: '2' },
  { id: '2', from: '1', to: '3' },
  { id: '3', from: '2', to: '4' },
  { id: '4', from: '2', to: '5' }
]);

// create a graph
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
graph = new vis.Graph(container, data, options);