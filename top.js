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
    this.init = init;
    this.regras = pegarGramatica();
  };

  verifica(texto, prop) {
    let recursiva = false;
    if (texto.substr(1)) {
      console.log(texto.charAt(0));
      recursiva = false
      for (i = 0; i < this.regras[prop].length; i++) {
        if (texto.charAt(0) === this.regras[prop][i].charAt(0)) { //verifica se primeiro char = primeiro char da prop
          if (!(this.regras[prop][i].charAt(1)))
            return false;
          else {
            recursiva = true;
            if (this.verifica(texto.substr(1), this.regras[prop][i].charAt(1))) //recursao
              return true;
            else
              return false;
          }
        }
      }
      if (!recursiva)
        return false;
    }
    else {
      console.log(texto);
      for (i = 0; i < this.regras[prop].length; i++) {
        if (texto === this.regras[prop][i])
          return true;
      }
      return false;
    }
  }
}

function pegarValor(linhas, linha, cell) {
  return linhas[linha].cells[cell].childNodes[0].value;
}

function testarGramatica() {
  let gramatica = new Gramatica('S');
  let texto = document.getElementById('texto').value;
  console.log(gramatica);
  $('#texto').removeClass('is-valid');
  $('#texto').removeClass('is-invalid');
  if (gramatica.verifica(texto, 'S')) {
    $('#texto').addClass('is-valid');
  }
  else
    $('#texto').addClass('is-invalid');
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