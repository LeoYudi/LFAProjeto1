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