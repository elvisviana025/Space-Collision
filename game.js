window.onload = function () {
    var canvas = document.getElementById('telaJogo');
    var ctx = canvas.getContext('2d');

    // Variáveis asteroides ----------------------------------------------
    var variacaoAst = 0;
    radius = 10;
    largura_ast = 30;
    altura_ast = 30;
    i = 0;

    // asteroide 1
    max_x = canvas.width - 50;
    min_x = 0;
    max_y = -50;
    min_y = -50;
    corAst = '#ba8740';

    var x_ast = new Array();
    var y_ast = new Array();
    x_ast[i] = Math.floor((Math.random() * (max_x - min_x)) + min_x);
    y_ast[i] = Math.floor((Math.random() * (max_y - min_y)) + min_y);

    // asteroide 2
    max_x2 = 0;
    min_x2 = -50;
    max_y2 = canvas.height - 100;
    min_y2 = -100;
    corAst2 = '#995e0a';

    var x_ast2 = new Array();
    var y_ast2 = new Array();
    x_ast2[i] = Math.floor((Math.random() * (max_x2 - min_x2)) + min_x2);
    y_ast2[i] = Math.floor((Math.random() * (max_y2 - min_y2)) + min_y2);

    // asteroide 3
    max_x3 = canvas.width;
    min_x3 = canvas.width - 50;
    max_y3 = canvas.height - 100;
    min_y3 = -100;
    corAst3 = 'brown';

    var x_ast3 = new Array();
    var y_ast3 = new Array();
    x_ast3[i] = Math.floor((Math.random() * (max_x3 - min_x3)) + min_x3);
    y_ast3[i] = Math.floor((Math.random() * (max_y3 - min_y3)) + min_y3);

    // asteroide 4
    max_x4 = canvas.width;
    min_x4 = canvas.width - 50;
    max_y4 = canvas.height / 3;
    min_y4 = -100;
    corAst4 = 'gray';

    var x_ast4 = new Array();
    var y_ast4 = new Array();
    x_ast4[i] = Math.floor((Math.random() * (max_x4 - min_x4)) + min_x4);
    y_ast4[i] = Math.floor((Math.random() * (max_y4 - min_y4)) + min_y4);

    // asteroide 5
    max_x5 = 0;
    min_x5 = -50;
    max_y5 = canvas.height / 3;
    min_y5 = -100;
    corAst5 = '#435656';

    var x_ast5 = new Array();
    var y_ast5 = new Array();
    x_ast5[i] = Math.floor((Math.random() * (max_x5 - min_x2)) + min_x5);
    y_ast5[i] = Math.floor((Math.random() * (max_y5 - min_y2)) + min_y5);

    // asteroide 6
    max_x6 = canvas.width - 50;
    min_x6 = 0;
    max_y6 = -50;
    min_y6 = -100;
    corAst6 = '#666060';

    var x_ast6 = new Array();
    var y_ast6 = new Array();
    x_ast6[i] = Math.floor((Math.random() * (max_x6 - min_x6)) + min_x6);
    y_ast6[i] = Math.floor((Math.random() * (max_y6 - min_y6)) + min_y6);

    // variáveis da nave ----------------------------------------------------------------
    var naveW = 35;
    var naveH = 60;
    var naveX = canvas.width / 2 - naveW / 2;
    var naveY = canvas.height - naveH - 50;
    var naveVelocidade = 1;

    // variáveis para movimentar a nave ----------------------------------------------
    var esquerda = false;
    var direita = false;
    var cima = false;
    var baixo = false;

    // variáveis para o placar 
    var tInicial = new Date().getTime();
    var intervalo;
    var tAtual;
    var regressiva = [3, 2, 1];

    function limparTela() {
        ctx.clearRect(0, 0, 800, 400);
    }

    // Função para criar a nave ----------------------------------------------
    function desenharCilindro(x, y, w, h, r, cor) {
        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.moveTo(x, y + r);
        ctx.lineTo(x, y + h - r);
        ctx.quadraticCurveTo(x, y + h, x + r, y + h);
        ctx.lineTo(x + w - r, y + h);
        ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
        ctx.lineTo(x + w, y + r);
        ctx.quadraticCurveTo(x + w, y, x + w - r, y);
        ctx.lineTo(x + r, y);
        ctx.quadraticCurveTo(x, y, x, y + r);
        ctx.fill();
    }

    var corMotor = 'tomato';

    function desenharCilindroBorda(x, y, w, h, r, corBorda) {

        ctx.strokeStyle = corBorda;
        ctx.beginPath();
        ctx.moveTo(x, y + r);
        ctx.lineTo(x, y + h - r);
        ctx.quadraticCurveTo(x, y + h, x + r, y + h);
        ctx.lineTo(x + w - r, y + h);
        ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
        ctx.lineTo(x + w, y + r);
        ctx.quadraticCurveTo(x + w, y, x + w - r, y);
        ctx.lineTo(x + r, y);
        ctx.quadraticCurveTo(x, y, x, y + r);
        ctx.stroke();
    }


    function desenharNave() {
        // para a cruz em pé
        desenharCilindro((naveX + naveW / 2 - 2.5), (naveY + 18), 5, 30, 5, 'silver');

        // para cruz deitada
        desenharCilindro((naveX + naveW / 2 - 10), (naveY + 35), 20, 5, 1, 'gray');
        desenharCilindroBorda((naveX + naveW / 2 - 10), (naveY + 35), 20, 5, 1, 'brack');

        // para asa esquerda
        desenharCilindro((naveX + 5), (naveY + 32), 5, 28, 2, 'gray');
        desenharCilindro((naveX + 5), (naveY + 30), 5, 2, 2, corMotor);

        // para asa direita
        desenharCilindro((naveX + naveW - 10), (naveY + 32), 5, 28, 2, 'gray');
        desenharCilindro((naveX + naveW - 10), (naveY + 30), 5, 2, 2, corMotor);

        // para o círulo 
        ctx.beginPath();
        ctx.fillStyle = 'gray';
        ctx.arc((naveX + naveW / 2), (naveY + naveH / 4), 15, 0, 2 * Math.PI, true);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc((naveX + naveW / 2), (naveY + naveH / 4), 15, 0, 2 * Math.PI, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc((naveX + naveW / 2), (naveY + naveH / 4), 10, 0, 2 * Math.PI, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.arc((naveX + naveW / 2), (naveY + naveH / 4), 9, 0, 2 * Math.PI, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc((naveX + naveW / 2), (naveY + naveH / 4), 8, 0, 2 * Math.PI, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc((naveX + naveW / 2), (naveY + naveH / 4), 3, 0, 2 * Math.PI, true);
        ctx.stroke();
    }

    // Função e eventos para movimentar a nave ----------------------------------------------
    function movimentarNave() {

        if (esquerda && naveX > 0) {
            naveX -= naveVelocidade;
        }
        if (direita && naveX < (canvas.width - naveW)) {
            naveX += naveVelocidade;
        }
        if (cima && naveY > 0) {
            naveY -= naveVelocidade;
        }
        if (baixo && naveY < (canvas.height - naveH)) {
            naveY += naveVelocidade;
        }
    }
    document.onkeydown = function (tecla) {
        if (tecla.keyCode == 65) esquerda = true;
        if (tecla.keyCode == 68) direita = true;
        if (tecla.keyCode == 87) cima = true;
        if (tecla.keyCode == 83) baixo = true;
        if (tecla.keyCode == 32) {
            naveVelocidade = 2;
            corMotor = 'aqua';
        }
    }

    document.onkeyup = function (tecla) {
        if (tecla.keyCode == 65) esquerda = false;
        if (tecla.keyCode == 68) direita = false;
        if (tecla.keyCode == 87) cima = false;
        if (tecla.keyCode == 83) baixo = false;
        if (tecla.keyCode == 32) {
            naveVelocidade = 1;
            corMotor = 'tomato';
        }
    }

    // Função para detectar colisão ----------------------------------------------------------
    function detectarColisao() {
        if (((naveX + naveW) > x_ast[i] && naveX < x_ast[i] + largura_ast) &&
            ((naveY + naveH) > y_ast[i] && naveY < y_ast[i] + altura_ast) ||
            ((naveX + naveW) > x_ast2[i] && naveX < x_ast2[i] + largura_ast) &&
            ((naveY + naveH) > y_ast2[i] && naveY < y_ast2[i] + altura_ast) ||
            ((naveX + naveW) > x_ast3[i] && naveX < x_ast3[i] + largura_ast) &&
            ((naveY + naveH) > y_ast3[i] && naveY < y_ast3[i] + altura_ast) ||
            ((naveX + naveW) > x_ast4[i] && naveX < x_ast4[i] + largura_ast) &&
            ((naveY + naveH) > y_ast4[i] && naveY < y_ast4[i] + altura_ast) ||
            ((naveX + naveW) > x_ast5[i] && naveX < x_ast5[i] + largura_ast) &&
            ((naveY + naveH) > y_ast5[i] && naveY < y_ast5[i] + altura_ast) ||
            ((naveX + naveW) > x_ast6[i] && naveX < x_ast6[i] + largura_ast) &&
            ((naveY + naveH) > y_ast6[i] && naveY < y_ast6[i] + altura_ast)
        ) {
            ctx.font = "40px Arial";
            ctx.fillStyle = 'brown';
            ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
            clearInterval(jogo);
        }
    }

    // Funções para desenhar os asteriodes ------------------------------
    function desenharAst(I, X, Y) {
        //Definindo a cor azul
        ctx.fillStyle = corAst;
        //desenha na tela
        for (h = 0; h <= i; h++) {

            ctx.beginPath();
            ctx.moveTo(x_ast[h], y_ast[h] + radius);
            ctx.lineTo(x_ast[h], y_ast[h] + altura_ast - radius);
            ctx.quadraticCurveTo(x_ast[h], y_ast[h] + altura_ast, x_ast[h] + radius, y_ast[h] + altura_ast);
            ctx.lineTo(x_ast[h] + largura_ast - radius, y_ast[h] + altura_ast);
            ctx.quadraticCurveTo(x_ast[h] + largura_ast, y_ast[h] + altura_ast, x_ast[h] + largura_ast, y_ast[h] + altura_ast - radius);
            ctx.lineTo(x_ast[h] + largura_ast, y_ast[h] + radius);
            ctx.quadraticCurveTo(x_ast[h] + largura_ast, y_ast[h], x_ast[h] + largura_ast - radius, y_ast[h]);
            ctx.lineTo(x_ast[h] + radius, y_ast[h]);
            ctx.quadraticCurveTo(x_ast[h], y_ast[h], x_ast[h], y_ast[h] + radius);
            ctx.fill();
            y_ast[h]++;
        }

        if (variacaoAst % 450 == 0) {
            // i++;
            x_ast[i] = Math.floor((Math.random() * (max_x - min_x)) + min_x);
            y_ast[i] = Math.floor((Math.random() * (max_y - min_y)) + min_y);
        }
        console.log("I:" + I + "XY" + X + '-' + Y);
    }

    function desenharAst2() {
        ctx.fillStyle = corAst2;
        for (h = 0; h <= i; h++) {
            ctx.beginPath();
            ctx.moveTo(x_ast2[h], y_ast2[h] + radius);
            ctx.lineTo(x_ast2[h], y_ast2[h] + altura_ast - radius);
            ctx.quadraticCurveTo(x_ast2[h], y_ast2[h] + altura_ast, x_ast2[h] + radius, y_ast2[h] + altura_ast);
            ctx.lineTo(x_ast2[h] + largura_ast - radius, y_ast2[h] + altura_ast);
            ctx.quadraticCurveTo(x_ast2[h] + largura_ast, y_ast2[h] + altura_ast, x_ast2[h] + largura_ast, y_ast2[h] + altura_ast - radius);
            ctx.lineTo(x_ast2[h] + largura_ast, y_ast2[h] + radius);
            ctx.quadraticCurveTo(x_ast2[h] + largura_ast, y_ast2[h], x_ast2[h] + largura_ast - radius, y_ast2[h]);
            ctx.lineTo(x_ast2[h] + radius, y_ast2[h]);
            ctx.quadraticCurveTo(x_ast2[h], y_ast2[h], x_ast2[h], y_ast2[h] + radius);
            ctx.fill();

            y_ast2[h]++;
            x_ast2[h]++;

            if (variacaoAst % 400 == 0) {
                // i++;
                x_ast2[i] = Math.floor((Math.random() * (max_x2 - min_x2)) + min_x2);
                y_ast2[i] = Math.floor((Math.random() * (max_y2 - min_y2)) + min_y2);
                
            }
        }
    }

    function desenharAst3() {
        //Definindo a cor verde
        ctx.fillStyle = corAst3;
        //desenha na tela
        for (h = 0; h <= i; h++) {

            ctx.beginPath();
            ctx.moveTo(x_ast3[h], y_ast3[h] + radius);
            ctx.lineTo(x_ast3[h], y_ast3[h] + altura_ast - radius);
            ctx.quadraticCurveTo(x_ast3[h], y_ast3[h] + altura_ast, x_ast3[h] + radius, y_ast3[h] + altura_ast);
            ctx.lineTo(x_ast3[h] + largura_ast - radius, y_ast3[h] + altura_ast);
            ctx.quadraticCurveTo(x_ast3[h] + largura_ast, y_ast3[h] + altura_ast, x_ast3[h] + largura_ast, y_ast3[h] + altura_ast - radius);
            ctx.lineTo(x_ast3[h] + largura_ast, y_ast3[h] + radius);
            ctx.quadraticCurveTo(x_ast3[h] + largura_ast, y_ast3[h], x_ast3[h] + largura_ast - radius, y_ast3[h]);
            ctx.lineTo(x_ast3[h] + radius, y_ast3[h]);
            ctx.quadraticCurveTo(x_ast3[h], y_ast3[h], x_ast3[h], y_ast3[h] + radius);
            ctx.fill();

            y_ast3[h]++;
            x_ast3[h]--;

            if (variacaoAst % 400 == 0) {
                // i++;
                x_ast3[i] = Math.floor((Math.random() * (max_x3 - min_x3)) + min_x3);
                y_ast3[i] = Math.floor((Math.random() * (max_y3 - min_y3)) + min_y3);
            }
        }
    }

    function desenharAst4() {
        //Definindo a cor verde
        ctx.fillStyle = corAst4;
        //desenha na tela
        for (h = 0; h <= i; h++) {

            ctx.beginPath();
            ctx.moveTo(x_ast4[h], y_ast4[h] + radius);
            ctx.lineTo(x_ast4[h], y_ast4[h] + altura_ast - radius);
            ctx.quadraticCurveTo(x_ast4[h], y_ast4[h] + altura_ast, x_ast4[h] + radius, y_ast4[h] + altura_ast);
            ctx.lineTo(x_ast4[h] + largura_ast - radius, y_ast4[h] + altura_ast);
            ctx.quadraticCurveTo(x_ast4[h] + largura_ast, y_ast4[h] + altura_ast, x_ast4[h] + largura_ast, y_ast4[h] + altura_ast - radius);
            ctx.lineTo(x_ast4[h] + largura_ast, y_ast4[h] + radius);
            ctx.quadraticCurveTo(x_ast4[h] + largura_ast, y_ast4[h], x_ast4[h] + largura_ast - radius, y_ast4[h]);
            ctx.lineTo(x_ast4[h] + radius, y_ast4[h]);
            ctx.quadraticCurveTo(x_ast4[h], y_ast4[h], x_ast4[h], y_ast4[h] + radius);
            ctx.fill();

            y_ast4[h]++;
            x_ast4[h]--;
            x_ast4[h]--;

            if (variacaoAst % 400 == 0) {
                // i++;
                x_ast4[i] = Math.floor((Math.random() * (max_x4 - min_x4)) + min_x4);
                y_ast4[i] = Math.floor((Math.random() * (max_y4 - min_y4)) + min_y4);
            }
        }
    }

    function desenharAst5() {
        ctx.fillStyle = corAst5;
        for (h = 0; h <= i; h++) {
            ctx.beginPath();
            ctx.moveTo(x_ast5[h], y_ast5[h] + radius);
            ctx.lineTo(x_ast5[h], y_ast5[h] + altura_ast - radius);
            ctx.quadraticCurveTo(x_ast5[h], y_ast5[h] + altura_ast, x_ast5[h] + radius, y_ast5[h] + altura_ast);
            ctx.lineTo(x_ast5[h] + largura_ast - radius, y_ast5[h] + altura_ast);
            ctx.quadraticCurveTo(x_ast5[h] + largura_ast, y_ast5[h] + altura_ast, x_ast5[h] + largura_ast, y_ast5[h] + altura_ast - radius);
            ctx.lineTo(x_ast5[h] + largura_ast, y_ast5[h] + radius);
            ctx.quadraticCurveTo(x_ast5[h] + largura_ast, y_ast5[h], x_ast5[h] + largura_ast - radius, y_ast5[h]);
            ctx.lineTo(x_ast5[h] + radius, y_ast5[h]);
            ctx.quadraticCurveTo(x_ast5[h], y_ast5[h], x_ast5[h], y_ast5[h] + radius);
            ctx.fill();

            y_ast5[h]++;
            x_ast5[h]++;
            x_ast5[h]++;

            if (variacaoAst % 400 == 0) {
                // i++;
                x_ast5[i] = Math.floor((Math.random() * (max_x5 - min_x5)) + min_x5);
                y_ast5[i] = Math.floor((Math.random() * (max_y5 - min_y5)) + min_y5);
            }
        }
    }

    function desenharAst6() {
        ctx.fillStyle = corAst6;
        for (h = 0; h <= i; h++) {

            ctx.beginPath();
            ctx.moveTo(x_ast6[h], y_ast6[h] + radius);
            ctx.lineTo(x_ast6[h], y_ast6[h] + altura_ast - radius);
            ctx.quadraticCurveTo(x_ast6[h], y_ast6[h] + altura_ast, x_ast6[h] + radius, y_ast6[h] + altura_ast);
            ctx.lineTo(x_ast6[h] + largura_ast - radius, y_ast6[h] + altura_ast);
            ctx.quadraticCurveTo(x_ast6[h] + largura_ast, y_ast6[h] + altura_ast, x_ast6[h] + largura_ast, y_ast6[h] + altura_ast - radius);
            ctx.lineTo(x_ast6[h] + largura_ast, y_ast6[h] + radius);
            ctx.quadraticCurveTo(x_ast6[h] + largura_ast, y_ast6[h], x_ast6[h] + largura_ast - radius, y_ast6[h]);
            ctx.lineTo(x_ast6[h] + radius, y_ast6[h]);
            ctx.quadraticCurveTo(x_ast6[h], y_ast6[h], x_ast6[h], y_ast6[h] + radius);
            ctx.fill();
            y_ast6[h] = y_ast6[h] + 1.3;


        }
        if (variacaoAst % 450 == 0) {
            x_ast6[i] = Math.floor((Math.random() * (max_x6 - min_x6)) + min_x6);
            y_ast6[i] = Math.floor((Math.random() * (max_y6 - min_y6)) + min_y6);
        }
    }

    // funções para o placar --------------
    function calcularTempo() {
        tAtual = new Date().getTime();
        intervalo = Math.floor((tAtual - tInicial) / 1000) - 3;
        console.log(intervalo);

        if (intervalo >= 30) {
            clearInterval(jogo);
            var naveGanhou = new Image();
            naveGanhou.src = 'img/enterprise.jpg';
            naveGanhou.onload = function () {
                ctx.drawImage(naveGanhou, 0, 0, 800, 400);
            }
        }
    }

    function pontos(x) {
        ctx.font = "22px Arial";
        ctx.fillStyle = "yellow";
        if (x == -3) {
            ctx.fillText('COMEÇANDO EM ' + regressiva[0], canvas.width / 2 - 100, canvas.height - 370);
        } else {
            if (x == -2) {
                ctx.fillText('COMEÇANDO EM ' + regressiva[1], canvas.width / 2 - 100, canvas.height - 370);
            } else {
                if (x == -1) {
                    ctx.fillText('COMEÇANDO EM ' + regressiva[2], canvas.width / 2 - 100, canvas.height - 370);
                } else {
                    if (x >= 0 && x <= 29) {
                        ctx.fillText('PONTOS: ' + x, canvas.width / 2 - 50, canvas.height - 370);
                    }
                }
            }
        }
    }

    // Renderiza o jogo ----------------------------------------
    function gameloop() {
        limparTela();
        variacaoAst++;
        if (intervalo >= 0) {
            desenharAst(i, x_ast[i], y_ast[i]);
            desenharAst6();
        }

        if (intervalo >= 5) {
            desenharAst2();
        }
        if (intervalo >= 10) {
            desenharAst3();
        }
        if (intervalo >= 15) {
            desenharAst4();
        }
        if (intervalo >= 20) {
            desenharAst5();
        }
        desenharNave();
        movimentarNave();
        detectarColisao();
        calcularTempo();
        pontos(intervalo);
    }


    //a função gameloop é chamada aqui --------------------------------

    var jogo = setInterval(gameloop, 5);
}