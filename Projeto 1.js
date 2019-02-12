window.onload = function () {

    $('#modalNome').click(function () {
        location.href = 'Projeto 1.html';
    });


    // var pontuacoes = []; //array que guarda as pontuações
    // function restaurarLocalStorage() {
    //     pontuacoes = [];
    //     for (var i = 0; i < localStorage.length; i++) {
    //         var key = localStorage.key(i);
    //         var y = JSON.parse(localStorage.getItem(key));
    //         pontuacoes.push(y);
    //     }
    // }
    // if (localStorage.length != 0) {
    //     restaurarLocalStorage();
    // }

    // //ordena de forma decrescente pelo tempo o array de pontuações
    // pontuacoes.sort(function (a, b) {
    //     return a.tempo - b.tempo
    // })

    // var estadoPontuacao = false; // verifica se contém pontuações (boolean)
    // //função que cria a tabela no html das pontuações obtidas
    // function mostrarPontuacoes() {
    //     if (pontuacoes.length > 0) {
    //             var str;
    //             str = "<table class='table text-center'>"; //classe da tabela (bootstrap)
    //             str += "<tr><th>Nome</th><th>Modo</th><th>Dificuldade</th><th>Tempo (segundos)</th></tr>"; //cabeçalho da tabela
    //             for (var i = 0; i < pontuacoes.length; i++) {
    //                 str += "<tr><td>" + pontuacoes[i]["nome"] + "</td><td>" + pontuacoes[i]["modo"] + "</td><td>" + pontuacoes[i]["dificuldade"] + "</td><td>" + pontuacoes[i]["tempo"] + "</td></tr>"; //dados das pontuações
    //             }
    //             str += "</table>";
    //             var tableReady = str; //guarda o texto de construção/código html
    //             var tableContainer = document.getElementById("div_tabela");
    //             tableContainer.innerHTML = tableReady; //cria na div 'div_tabela' a tabela das pontuações 

    //         } else {
    //             estadoPontuacao = true;
    //             sweetAlert("Oops...", "Sem pontuações!", "error"); //mensagem de erro caso não tenha pontuações guardadas
    //         }
    //     }


    // $('#btn_pontuacao').click(function () {
    //     mostrarPontuacoes();
    //     if (estadoPontuacao == false) {
    //             $('#body').css("background-image", "url('images/menu/background_3.png')"); //coloca background completo //background sem logo hit it
    //             $('#div_botoes').empty(); //limpa a div que contém os botões
    //             $("#div_tabela").append("<div id='div_btn_menu'><button id='btn_menu' type='button' class='btn center-block'>MENU</button></br</div>") //cria um botão para voltar ao menu inicial
    //             $('.btn').css("width", buttonWidth + "px"); //altera a largura do botão 
    //             $('.btn').css("height", buttonHeight + "px"); //altera o comprimento do botão
    //             $('.btn').css("font-size", btnFontSize + "px"); //altera a font do botão
    //     }
    // });



    var canvas = document.getElementById("myCanvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        var raioAni = 130;//raio circulo

        //Array das imagens
        var srcCarLado = ["./Novas Carruagens/1.png", "./Novas Carruagens/2.png", "./Novas Carruagens/3.png", "./Novas Carruagens/4.png",
            "./Novas Carruagens/5.png", "./Novas Carruagens/6.png", "./Novas Carruagens/7.png", "./Novas Carruagens/8.png", "./Novas Carruagens/LocomotivaDireita.png"
            , "./Novas Carruagens/LocomotivaEsquerda.png"];

        var startTime = Math.floor(Date.now() / 1000);//obtem o tempo de inicio em segundos
        var timer;//timer da animação principal
        var timerT;//timer da animação secundária
        var rightKey = false;
        var leftKey = false;
        var downKey = false;
        var end = false;//variavel que indica se o comboioS tem tamanho 9
        var endTime;//tempo quando comboio tiver tamanho 9
        var nomeJogador = document.getElementById("jogador");

        //deteta 
        window.addEventListener('keydown', KeyDown, false);
        window.addEventListener('keyup', KeyUp, false);

        function KeyDown(evt) {
            //TODO
            if (evt.keyCode == 39)//direita
                rightKey = true;
            if (evt.keyCode == 37)//esquerda
                leftKey = true;
            if (evt.keyCode == 40)//baixo
                downKey = true;
            timerT = window.setInterval(verificaImagemArco, 2);
        }

        function KeyUp(evt) {
            //TODO
            if (evt.keyCode == 39)//direita
                rightKey = false;
            if (evt.keyCode == 37)//esquerda
                leftKey = false;
            if (evt.keyCode == 40)//baixo
                downKey = false;
        }

        //rato

        var totalImages = 10; //Imagens que estão no array
        var numImagesLoaded = 0;
        var numImagesToLoad = 0;
        var images = [];
        var arrayTeste = [];//array auxiliar para comboioE


        //Load imagens do array
        for (var i = 0; i < totalImages; i++) {
            loadImage(srcCarLado[i]);
        }


        //Função que faz o load das imagens
        function loadImage(name) {
            images[numImagesToLoad] = new Image();
            images[numImagesToLoad].src = name;
            if (numImagesToLoad < 8) {
                arrayTeste[numImagesToLoad] = images[numImagesToLoad];
            }
            images[numImagesToLoad++].onload = function () {
                oneImageLoaded();
            }
        }

        //Função que verifica se todos os load das imagens foram feitas
        function oneImageLoaded() {
            numImagesLoaded++;
            //Só quando todas as imagens tiverem carregadas é que é chamada a animação
            if (numImagesLoaded == totalImages) {
                timer = setInterval(anima, 5);
                //console.log(images)
            }
        }

        function Imagens(img, x, y, ang, dx, dy) {
            this.x = x;//posição inicial da img
            this.y = y;//posição inicial da img
            this.ang = ang;//Angulo inicial da img
            this.img = img;//Imagem
            this.dx = dx;//Define o comprimento da imagem
            this.dy = dy;//Define a altura da imagem
            this.desenhar = function () {
                //Desenha a imagem
                ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
            }
            this.atualizar = function (newX, newY) {
                //Altera a posição de x e de y com os novos parametros que irá receber para os valores de x e y
                this.x = newX;
                this.y = newY;
            }
        }

        var raio = 50;//raio do arco
        var circX = canvas.width / 2 + raioAni * Math.cos((Math.PI / 180) * 90) + 40;//define o centro do raio em x
        var circY = canvas.height / 2 + raioAni * Math.sin((Math.PI / 180) * 90) + 35;//define o centro do raio em y
        var posicaoE = 1;//posição da carruagem que queremos comparar no array comboioE
        var circulo = new Array();//array de imagens que se encontram no circulo
        var angulos = [0, 45, 90, 135, 180, 225, 270, 315];//Angulos das posições das imagens no circulo

        //adiciona as imagens ao circulo e define as respetivas posições
        function criarImagemCirculo() {
            var i = 0;
            while (i < 8) {
                var rad = (Math.PI / 180) * angulos[i];//mudar o valor do angulo para radianos
                var x = canvas.width / 2 + raioAni * Math.cos(rad);//define a posição inicial de x de cada carruagem
                var y = canvas.height / 2 + raioAni * Math.sin(rad);//define a posição inicial de y de cada carruagem
                circulo.push(new Imagens(images[i], x, y, angulos[i], 80, 68));//Adiciona as imagem ao array circulo
                i++;
            }
        }

        //atualiza a posição da imagem do circulo para <-
        function atualizarImagemCirculoR() {
            for (var i = 0; i < circulo.length; i++) {
                circulo[i].ang += 3;
                circulo[i].atualizar(canvas.width / 2 + raioAni * Math.cos(Math.PI / 180 * circulo[i].ang), canvas.height / 2 + raioAni * Math.sin(Math.PI / 180 * circulo[i].ang));
                //console.log(circulo);
            }
        }

        //atualiza a posição da imagem do circulo para ->
        function atualizarImagemCirculoL() {
            for (var i = 0; i < circulo.length; i++) {
                circulo[i].ang -= 3;
                circulo[i].atualizar(canvas.width / 2 + raioAni * Math.cos(Math.PI / 180 * circulo[i].ang), canvas.height / 2 + raioAni * Math.sin(Math.PI / 180 * circulo[i].ang));
                //console.log(circulo);
            }
        }

        //desenha a imagem do circulo
        function desenharImagemCirculo() {
            for (var i = 0; i < circulo.length; i++) {
                circulo[i].desenhar();
                //console.log(circulo);
            }
        }

        criarImagemCirculo();

        //Função que faz cria o array do comboio de entrada
        var comboioE = new Array();
        function entradaComboioE() {
            comboioE.push(new Imagens(images[9], canvas.width, 58, 0, 100, 78));//Adiciona as imagem ao array do comboio de entrada
            for (var i = 0; i < 8; i++) {
                var posicaoAl = Math.floor(Math.random() * (arrayTeste.length - 1));
                comboioE.push(new Imagens(arrayTeste[posicaoAl], 20 + canvas.width + (i + 1) * 80, 70, 0, 80, 68));//Adiciona as imagem ao array circulo
                arrayTeste.splice(posicaoAl, 1);
            }

        }
        //desenha o comboio de entrada
        function desenharComboioE() {
            for (var i = 0; i < comboioE.length; i++) {
                comboioE[i].desenhar();
            }
        }

        //Função que Atualiza a posição do comboio até um determinado sitio
        var posComboioEntrada = false;//variavel que vai verifar se o comboio já chegou a uma determinada posição

        function atualizarComboioE() {
            var posXmax = 300; //Indica o ponto limite do comboio de entrada em x

            if (comboioE[0].x > posXmax) {
                for (var i = 0; i < comboioE.length; i++) {
                    comboioE[i].x--;
                    comboioE[i].atualizar(comboioE[i].x, comboioE[i].y);
                }
            }
            else {
                posComboioEntrada = true;
            }
        }
        entradaComboioE()

        //Função que faz cria o array do comboio de saida
        var comboioS = new Array();
        function entradaComboioS() {
            comboioS.push(new Imagens(images[8], 0, 550, 0, 100, 78));//Adiciona as imagem ao array do comboio de saida
        }

        //desenha o comboio de Saída
        function desenharComboioS() {
            for (var i = 0; i < comboioS.length; i++) {
                comboioS[i].desenhar();
            }
        }

        var tamanhoMax = 0;
        //Função que Atualiza a posição do comboio até um determinado sitio
        function atualizarComboioS() {
            var posXmax = 1545; //Indica o ponto limite do comboio de saida em x

            if (comboioS[0].x < posXmax) {
                for (var i = 0; i < comboioS.length; i++) {
                    comboioS[i].x++;
                    comboioS[i].atualizar(comboioS[i].x, comboioS[i].y);
                }
            }
            else {//alinhar carruagens à locomutiva
                for (var i = 1; i < comboioS.length; i++) {
                    if (comboioS[i].x < posXmax - (i * 80)) {
                        comboioS[i].x++;
                        comboioS[i].atualizar(comboioS[i].x, comboioS[i].y);
                        tamanhoMax = tamanhoMax + i * 80;
                    }
                }
            }


            if (comboioS.length == 9 && comboioS[8].x > posXmax - 641 && comboioS[7].x > posXmax - 561 && comboioS[6].x > posXmax - 481 && comboioS[5].x > posXmax - 401 && comboioS[4].x > posXmax - 321 && comboioS[3].x > posXmax - 241 && comboioS[2].x > posXmax - 161 && comboioS[1].x > posXmax - 81) {//quando a sequencia estiver completa e as carruagens todas encostadas saí fora do canvas
                for (var i = 0; i < comboioS.length; i++) {
                    comboioS[i].x += 8;
                    comboioS[i].atualizar(comboioS[i].x, comboioS[i].y);
                    end = true;
                    
                    desenhaImagemConseguiste();

                    if (comboioS[i].x >= canvas.width + 650) {
                        location.href = 'PagInicial.html';
                        
                    }
                    
                }
                
                for (var i = 0; i < comboioE.length; i++) {
                    comboioE[i].x -= 8;
                    comboioE[i].atualizar(comboioE[i].x, comboioE[i].y);
                }
time.innerHTML = false;//para o tempo no mostrador
            }
        }

        entradaComboioS()

        //atualiza a imagem do circulo para baixo 
        function atualizarImagemCirculoD(posicao) {
            if (circulo[posicao].y < 560) {
                circulo[posicao].y++;
                circulo[posicao].atualizar(circulo[posicao].x, circulo[posicao].y);
            }
            else {
                comboioS.push(new Imagens(circulo[posicao].img, circulo[posicao].x, circulo[posicao].y, 0, circulo[posicao].dx, circulo[posicao].dy));//adiciona imagem ao array comboioS
                circulo.splice(posicao, 1);//retira imagem do array circulo
                desenharComboioS();
                atualizarComboioS();
                posicaoE++;//aumenta uma posição para se poder comparar as imagens ao próximo elemento do array comboioE
                //console.log(circulo);
            }
        }

        //verifica se a imagem que se encontra dentro do arco é igual à imagem da sequencia
        function verificaImagemSequencia(posicao) {
            if ((circulo[posicao].img) === (comboioE[posicaoE].img)) {
                atualizarImagemCirculoD(posicao);
            }
        }

        //verifica se a imagem está dentro do arco
        function verificaImagemArco() {
            for (var i = 0; i < circulo.length; i++) {
                if ((circulo[i].x + circulo[i].dx < circX + raio) && (circulo[i].x > circX - raio) && (circulo[i].y + circulo[i].dy > circY - raio)) {
                    verificaImagemSequencia(i);//envia a posicao em que se encontra a imagem no array circulo
                }
            }
        }

        var imgSucesso = new Image();
        var fimTempo = new Image();
        imgSucesso.src = "./conseguiste.png"
        fimTempo.src = "./fimTempo.png"
        //Esta função desenha a imagem quando o jogador termina com sucesso a sequência
        function desenhaImagemConseguiste() {
            ctx.drawImage(imgSucesso, canvas.width / 2 - 125, canvas.height / 2 - 175, 500, 350);
        }
        //Esta função desenha a imagem quando o jogo atinge os 60 segundos
        function desenhaImagemFimtempo() {
            ctx.drawImage(fimTempo, canvas.width / 2 - 125, canvas.height / 2 - 175, 500, 350);
        }
        //esta função controla o som de fundo
        function mute() {
            if (myAudio.muted) {
                myAudio.muted = true;
            }
            else {
                myAudio.muted = true;
            }
        }

        function unMute() {
            if (myAudio.muted) {
                myAudio.muted = false;
            }
            else {
                myAudio.muted = false;
            }
        }

        document.getElementById("mute").addEventListener("click", mute);
        document.getElementById("unMute").addEventListener("click", unMute);
        document.getElementById("btnArrowR").addEventListener("click", atualizarImagemCirculoL);
        document.getElementById("btnArrowL").addEventListener("click", atualizarImagemCirculoR);

        //função principal
        function anima() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //desenha
            desenharComboioE();
            desenharComboioS();


            //Atualiza sempre as posições do comboio de entrada
            if (posComboioEntrada == false) {
                atualizarComboioE()
            }
            else {
                //Desenha o circulo onde estará inserido a carruagem correcta
                ctx.fillStyle = "rgba(255,255,255,0.5)"
                ctx.lineWidth = "2px";
                ctx.arc(circX, circY, raio, 0, 2 * Math.PI, false);
                ctx.fill();
                //chama imagens circulo quando comboioE pára
                desenharImagemCirculo();
            }

            //Garante que a primeira locomotiva do comboio de saida chega a uma posição em x e pára
            atualizarComboioS()

            //temporizador do jogo em segundos
            var time = document.getElementById("clock");
            var tempo = 0;
            tempo = Math.floor(Date.now() / 1000);
            tempo = tempo - startTime;


            //pára o timer e acaba o jogo
            if (tempo < 61) {
                time.innerHTML = "Tempo: " + tempo.toString() + "s";
            }
            else if (tempo < 66) {
                desenhaImagemFimtempo();
            }
            else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);//apaga o jogo para terminar
                //tempo = 60;
                end = true;
                desenhaImagemConseguiste();
                time.innerHTML = "Tempo: " + tempo + "s";
                location.href = 'PagInicial.html';
            }



            if (rightKey == true) {
                atualizarImagemCirculoR()
            }
            if (leftKey == true) {
                atualizarImagemCirculoL()
            }

            //falta um if para verificar se o jogo terminou


            if (end == true) {
                endTime = Math.floor(Date.now() / 1000);
                tempo = endTime - startTime;
                
                if (tempo >= 60) {
                    desenhaImagemFimtempo()
                }
                //time.innerHTML = time;// faz parar o relógio
                // gravarPontuacao(nomeJogador, tempo);
                // pontos.push(new Pontuacao(nomeJogador, tempo));
                // pontos.sortOn("points");
                // salvarPontos();
                //load imagem ganhaste

            }
            console.log(tempo);
        }
    }
}