// all constants and variables

let score = 0;
let inputDir = {x : 0,y : 0};
const foodSound = new Audio("./assets/food.mp3");
const buttonSound = new Audio('./assets/button.mp3');
let lastPaintTime = 0;
let speed = 6;
let snakeArr = [{x : 10,y : 10}];
let food = {x : 6,y : 7};
const gameOver = new Audio('./assets/gameover.mp3')
const gamemusic = new Audio('./assets/game.mp3')

const button = document.querySelectorAll("#btn");

let scoreBox = document.getElementById("scoreBox");
// const gameMusic = new Audio('./assets/music.mp3');

// main function that we have to run each time

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed) return;
    lastPaintTime = ctime;
    game();
}

function isCollide(snakeArr){
    // if snake collide with yourself

    for(let i=1; i<snakeArr.length;i++){
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            return true;
        }
    }

    // if snake collide with the wall
    if(snakeArr[0].x < 0 || snakeArr[0].y < 0 || snakeArr[0].x >= 20 || snakeArr[0].y >= 20){
        return true;
    }
    return false;
}

// game function 

function game(){
    
    // if snake collide with wall and yourself 
    if(isCollide(snakeArr)){
        gameOver.play();
        gamemusic.pause();
        inputDir = {x : 0, y : 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x : 10,y : 10}];
        score = 0; 
        scoreBox.textContent = "Score : " + 0;
    }

    // updating the snake array and updating the food coordinates if you have eaten the food 
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score += 5;
        scoreBox.textContent = "Score : " + score;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x ,y : snakeArr[0].y + inputDir.y});
        let a = 1;
        let b = 19;
        food = {x : Math.round(a + (b-a) * Math.random()),y : Math.round(a + (b-a) * Math.random())}
    }

    // 


    // moving the snake
    for(let i=snakeArr.length-2; i>=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // display snake
    board.innerHTML = "";

    snakeArr.forEach((element,index) => {
        let snakediv = document.createElement('div');
        snakediv.style.gridRowStart = element.y;
        snakediv.style.gridColumnStart = element.x;
        if(index === 0){
            snakediv.classList.add('head');
        }else{
            snakediv.classList.add('snake');
        }
        board.appendChild(snakediv);
    });


    // display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// game loop window.request animation we will use settimeout also

window.requestAnimationFrame(main);
window.addEventListener("keydown",(e)=>{
    gamemusic.play();
    switch (e.key){
        case "ArrowUp" :
            console.log("ArrowsUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown" :
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight" :
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})

button.forEach((btn) => {
    btn.addEventListener('click',(event)=>{
        // buttonSound.play();
        gamemusic.play();
        switch(event.target.value){
            case "up" :
            // console.log("ArrowsUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

            case "down" :
                // console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "left" :
                // console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "right" :
                // console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;
                break;

            default:
                break;
        }
    })
})