
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
}
///função para atualizar o jogo
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
   
  context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

   // canos
    for(let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX; //mover os canos para a esquerda
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
}
}
///função para colocar os canos
function placePipes() {
    
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

