
/// variáveis para o jogo
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

/// variáveis para o pássaro
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImage;
///objeto para o pássaro
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

//canos
let pipeArray = []; //altura/largura dos canos = 384/3072 = 1/8
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let pipeGap = 120; //espaço entre os canos
let pipeImage;
let bottomPipeImage;


//variável para a gravidade
let velocityX = -2; 
let velocityY = 0; // velocidade vertical do pássaro
let score = 0;
let gravity = 0.5;
 //gravidade que afeta o pássaro
let GameOver = false; //variável para verificar se o jogo acabou
//função para carregar o jogo
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");


//carregar imagens 
    birdImage = new Image();
birdImage.src = "assets/flappybird.png";
birdImage.onload = function() {
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
}

topPipeImage = new Image();
topPipeImage.src = "assets/toppipe.png";

bottomPipeImage = new Image();
bottomPipeImage.src = "assets/bottompipe.png";

///chamar a função update para atualizar o jogo
requestAnimationFrame(update);
setInterval(placePipes, 1500); //chamar a função placePipes a cada 1.5 segundos
 document.addEventListener("keydown", moveBird);
context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

}
///função para atualizar o jogo
function update() {
    requestAnimationFrame(update);
    if (GameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
  
    //Passaro
    velocityY += gravity; //aplicar gravidade ao pássaro
    bird.y = Math.max(bird.y + velocityY, 0); //mover o pássaro para baixo, limitando a velocidade máxima
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

if (bird.y + bird.height >= board.height) {
    GameOver = true; //se o pássaro tocar o chão, o jogo acaba
}
   // canos
    for(let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX; //mover os canos para a esquerda
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }
        if(detectCollision(bird,pipe)){
            GameOver = true;
        }
    }

    //remover canos que saíram da tela
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }
///score
context.fillStyle = "white";
context.font = "20px Arial";
context.fillText("Score: " + score, 5, 45);

if(GameOver){
    context.fillStyle = "white";
    context.font = "40px Arial";
    context.fillText("Game Over", board.width/2 - 100, board.height/2);
}
}
///função para colocar os canos
function placePipes() {

    if(GameOver){
        return;
    } //se o jogo acabou, não colocar mais canos
    
    let RandomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2); //gerar uma posição y aleatória para o cano superior
    let openingSpace = board.height/4; //espaço entre os canos
    let topPipe ={
    img: topPipeImage,
    x: pipeX,
    y: RandomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false
}
    pipeArray.push(topPipe);

    let bottonPipe  ={
        img: bottomPipeImage,
        x : pipeX,
        y: RandomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottonPipe);

    }
function moveBird(e) {
    if(e.code == "Space" || e.code == "ArrowUp"){
        ///pulando
        velocityY = -7; //mover o pássaro para cima
    }
    //reiniciar o jogo
    if(GameOver){
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        GameOver = false;
    }
}
function detectCollision(a, b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
