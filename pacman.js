class Pacman {
    constructor(x, y, largura, altura, velocidade) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.velocidade = velocidade;
        this.direcao = DIRECAO_DIREITA;
        this.proximaDirecao = DIRECAO_DIREITA;
        this.contadorQuadros = 7;
        this.quadroAtual = 1;
        
        // Alterar animação a cada 100ms
        setInterval(() => {
            this.alterarAnimacao();
        }, 100);
    }

    processarMovimento() {
        this.alterarDirecaoSePosPossivel();
        this.moverParaFrente();
        if (this.verificarColisoes()) {
            this.moverParaTras();
            return;
        }
    }

    comer() {
        for (let i = 0; i < mapa.length; i++) {
            for (let j = 0; j < mapa[0].length; j++) {
                if (
                    mapa[i][j] == 2 &&
                    this.obterMapaX() == j &&
                    this.obterMapaY() == i
                ) {
                    mapa[i][j] = 3;
                    pontuacao++;
                }
            }
        }
    }
    moverParaTras() {
        switch (this.direcao) {
            case DIRECAO_DIREITA:
                this.x -= this.velocidade;
                break;
            case DIRECAO_CIMA:
                this.y += this.velocidade;
                break;
            case DIRECAO_ESQUERDA:
                this.x += this.velocidade;
                break;
            case DIRECAO_BAIXO:
                this.y -= this.velocidade;
                break;
        }
    }    
    desenhar() {
        contextoCanvas.save();
        contextoCanvas.translate(
            this.x + tamanhoBlocosUm / 2,
            this.y + tamanhoBlocosUm / 2
        );
        contextoCanvas.rotate((this.direcao * 90 * Math.PI) / 180);
        contextoCanvas.translate(
            -this.x - tamanhoBlocosUm / 2,
            -this.y - tamanhoBlocosUm / 2
        );
        contextoCanvas.drawImage(
            framesPacman,
            (this.quadroAtual - 1) * tamanhoBlocosUm,
            0,
            tamanhoBlocosUm,
            tamanhoBlocosUm,
            this.x,
            this.y,
            this.largura,
            this.altura
        );
        contextoCanvas.restore();
    }
