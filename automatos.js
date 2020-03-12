var deleteNode = (data, callback) => {
    nodeQueue.push(data.nodes[0]);  // guardando o estado excluido para ser re-criado posteriormente
    
    nodeQueue.sort(); // garantindo que os ids excluidos sejam reutilizados em ordem
    
    callback(data);
};

var deleteEdge = (data, callback) => {
    var i;
    for (i=0 ; i<data.edges.length; i++) {
        const aux = edges.get({
            filter: (item) => {
                return (item.id == data.edges[i]);
            }
        });
    
        if(aux.length > 0) {
            const dupe = edges.get({
                filter: (item) => {
                    return (item.from === aux[0].from && item.to === aux[0].to);
                }
            });
            edges.remove(dupe);
        }
    }
    callback(data);
}

var addNode = (data, callback) => {
    if (!nodeQueue.length) {
        data.id = ids;
        data.label = 'q' + ids;
        callback(data);
        ids++;
    }
    else {
        data.id = nodeQueue.shift();
        data.label = 'q' + data.id;
        callback(data);
    }
};

var addEdge = (data, callback) => {
    value = prompt("Insira o valor da transição: ");
    while (!value || value.length != 1) {
        alert("Entrada inválida!");
        value = prompt("Insira o valor da transição: ");
    }

    var dupe = edges.get({
        filter: (item) => {
            return (item.from == data.from && item.to == data.to && item.id != data.id);
        }
    })

    if(dupe.length > 0) {
        data.label = value;
        data.hidden = true;
        edges.update({
            id: dupe[0].id,
            label: dupe[0].label + ', ' + value,
        })
    }
    else {
        data.label = value;
    }
    callback(data);
};

function inicial() {
    var aux, existe, text;
    if(inicio == -1)
        text = "Não há um estado inicial no momento!\nInsira o numero do estado inicial desejado: ";
    else 
        text = "O estado inicial atual é q" + inicio + "\nInsira o numero do novo estado inicial: ";

    aux = prompt(text);

    existe = nodes.get({
        filter: (item) => {
            return (item.id == aux);
        }
    });

    console.log(existe);
    if(existe.length > 0) {
        if(inicio != -1)    
            nodes.update({
                id: inicio,
                shape: 'ellipse',
            });
        
        nodes.update({
            id: aux,
            shape: 'triangleDown',
        })
        inicio = aux;
    }
    else alert("O estado não existe!");
}

function final() {
    var aux, existe;
    aux = prompt("Insira o número do estado que se tornará final: ");

    existe = nodes.get({
        filter: (item) => {
            return (item.id == aux);
        }
    });

    if (existe.length > 0) {
        nodes.update({
            id: aux,
            color: {
                border: '#B30000',
                background: '#FF9999',
                highlight: {
                    border: '#B30000',
                    background: '#FFCCCC'
                },
                hover: {
                    border: '#B30000',
                    background: '#FFCCCC'
                }
            }
        })
        if (!fim.find((aux)=>{}))
            fim.push(aux);
    }
    else alert("O estado não existe!");
}


function remfinal() {
    var aux, existe;
    aux = prompt("Insira o número do estado que não será mais final: ");

    existe = nodes.get({
        filter: (item) => {
            return (item.id == aux);
        }
    });

    if (existe.length > 0) {
        nodes.update({
            id: aux,
            color: {
                border: '#2B7CE9',
                    background: '#97C2FC',
                        highlight: {
                    border: '#2B7CE9',
                        background: '#D2E5FF'
                },
                hover: {
                    border: '#2B7CE9',
                        background: '#D2E5FF'
                }
            }
        })
        fim.splice(fim.indexOf(aux), 1);
    }
    else alert("O estado não existe!");
}





var container = document.getElementById('mynetwork');
var nodes, edges, network, nodeQueue = [];
var ids = 0, inicio = -1, fim = [];

nodes = new vis.DataSet();
edges = new vis.DataSet();

var options = {
    locale: 'pt',
    locales: {
        pt: {
            edit: 'Editar',
            del: 'Excluir',
            back: 'Voltar',
            addNode: 'Adicionar estado',
            addEdge: 'Adicionar transição',
            editNode: 'Editar estado',
            editEdge: 'Editar transição',
            addDescription: 'Clique em um ponto para adicionar o estado.',
            edgeDescription: 'Clique em um estado e arraste até outro para criar a transição.',
            editEdgeDescription: 'Clique em um ponto de uma transição e o arraste para o novo estado.',
        }
    },
    interaction: {
        hover: true
    },
    manipulation: {
        addNode: addNode,
        addEdge: addEdge,
        deleteNode: deleteNode,
        deleteEdge: deleteEdge,
    },
    edges: {
        arrows: 'to',
        smooth: {
            enabled: true,
            type: "continuous",
            roundness: 0.5
        },
        font: {
            color: '#000000',
            size: 16,
            background: '#ffffff',
        }
    },
    physics: {
        enabled: false
    }
};

var data = {
    nodes: nodes,
    edges: edges
};

network = new vis.Network(container, data, options);

// network.on("click", function (params) {
//     params.event = "[original event]";
// });

// network.on("dragStart", function (params) {
//     params.event = "[original event]";
// });

// network.on("dragging", function (params) {
//     params.event = "[original event]";
// });

// network.on("dragEnd", function (params) {
//     params.event = "[original event]";
// });

// network.on("controlNodeDragging", function (params) {
//     params.event = "[original event]";
// });

// network.on("controlNodeDragEnd", function (params) {
//     params.event = "[original event]";
// });