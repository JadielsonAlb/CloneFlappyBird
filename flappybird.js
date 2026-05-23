
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

    ///desenhar o pássaro novamente para atualizar a posição
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
}

function placePipes() {
    let topPipe ={
    img: topPipeImage,
    x: pipeX,
    y: pipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false
}
    pipeArray.push(topPipe);
}