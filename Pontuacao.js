//objeto com pontuações
function Pontuacao(nome,points){
    this.nome=nome;
    this.points=points;
}

var pontos=[];

Array.prototype.sortOn = function(key){
    this.sort(function(a, b){
        if(a[key] < b[key]){
            return -1;
        }else if(a[key] > b[key]){
            return 1;
        }
            return 0;
    });
}
            
//salva pontuação
function salvarPontos(){
    localStorage.clear();
    for(var i=0; i<pontos.length; i++){
        localStorage.setItem(i.toString(), JSON.stringify(pontos[i]));
    }
}

//restaura pontuação
function restaurarPontos() {
    pontos = [];
    for (var i = 0; i < localStorage.length; i++) {
        pontos.push(JSON.parse(localStorage.getItem(i.toString())));
    }
    criarTabela();
}

//criar tabela de pontuação
function criarTabela() {
    var myTable = document.getElementById("mostrar");
    var colunas = "<table class='table text-center'><tr><td>Posição</td><td>Nome</td><td>Pontos</td></tr>";
    for (var i = 0; i < 5; i++) {
        colunas += "<tr><td>" + i + "</td><td>" + pontos[i].nome + "</td><td>" + pontos[i].points + "</td></tr>";
    }
    colunas += "</table>";
    myTable.innerHTML = colunas;
}