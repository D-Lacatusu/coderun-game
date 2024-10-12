import Player from './Player.js'

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 209/2; //e 104.5
const PLAYER_HEIGHT = 209/2; //am divizat cu mai mult
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIX_JUMP_HEIGHT = 150;


//Game objects
let player = null;

let scaleRatio = null;
let previousTime = null;

function createSprites(){
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIX_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    player = new Player(ctx, playerWidthInGame, playerHeightInGame,
         maxJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
}

function setScreen(){
    scaleRatio = getScaleRatio();
       canvas.width = GAME_WIDTH *  scaleRatio;
       canvas.height = GAME_HEIGHT * scaleRatio;
       createSprites();
} 

setScreen();
//timeout pentru resize si rotatie pe mobil pe Safari 
window.addEventListener('resize', ()=>setTimeout(setScreen,500));

if(screen.orientation){
    screen.orientation.addEventListener('change',setScreen);
}

function getScaleRatio(){
    const screenHeight = Math.min(
        window.innerHeight, 
        document.documentElement.clientHeight);

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth);

            //ecranul e mai mare decat latimea jocului
        if (screenWidth/screenHeight < GAME_WIDTH/GAME_HEIGHT){
            return screenWidth/GAME_WIDTH;
        } else {
            return screenHeight / GAME_HEIGHT;
        }
    }

//probabil ca aici o sa adaug fundalul? - momentan e alb
function clearScreen(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

    function gameLoop(currentTime){
        if(previousTime == null){
            previousTime = currentTime;
            requestAnimationFrame(gameLoop);
            return;
        }
        const frameTimeDelta = currentTime - previousTime;
        previousTime = currentTime;
        console.log(frameTimeDelta);    
        clearScreen();

        //Update game objects


        //Draw game objects
        player.draw();

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);