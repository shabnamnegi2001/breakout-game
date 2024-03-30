const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
let score = 0

const boardWidth = 670
const boardHeight= 710
const blockWidth = 50
const blockHeight = 50

const userBlockWidth = 200
const userBlockHeight = 40

const userStart = [240, 10]
let currentUserPosition = userStart

const ballStart = [320, 70]
let currentBallPosition = ballStart
const ballDiameter = 30

let xDirection = -2
let yDirection =  2


                         // block  related  

class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis+blockWidth, yAxis]
        this.topLeft = [xAxis,  yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth, yAxis+blockHeight]
        this.element 
        this.isActive = true
    }
}

//blocks
const blocks = [
    
    new Block(130, 650),
    new Block(190, 650),
    new Block(430, 650),
    new Block(490, 650),

    new Block(70, 590),
    new Block(130, 590),
    new Block(190, 590),
    new Block(250, 590),
    new Block(370, 590),
    new Block(430, 590),
    new Block(490, 590),
    new Block(550, 590),
    
    new Block(10, 530),
    new Block(70, 530),
    new Block(130, 530),
    new Block(190, 530),
    new Block(250, 530),
    new Block(310, 530),
    new Block(370, 530),
    new Block(430, 530),
    new Block(490, 530),
    new Block(550, 530),
    new Block(610, 530),

    new Block(10, 470),
    new Block(70, 470),
    new Block(130, 470),
    new Block(190, 470),
    new Block(250, 470),
    new Block(310, 470),
    new Block(370, 470),
    new Block(430, 470),
    new Block(490, 470),
    new Block(550, 470),
    new Block(610, 470),

    new Block(70, 410),
    new Block(130, 410),
    new Block(190, 410),
    new Block(250, 410),
    new Block(310, 410),
    new Block(370, 410),
    new Block(430, 410),
    new Block(490, 410),
    new Block(550, 410),
    
    new Block(130, 350),
    new Block(190, 350),
    new Block(250, 350),
    new Block(310, 350),
    new Block(370, 350),
    new Block(430, 350),
    new Block(490, 350),
    
    new Block(190, 290),
    new Block(250, 290),
    new Block(310, 290),
    new Block(370, 290),
    new Block(430, 290),
   
    new Block(250, 230),
    new Block(310, 230),
    new Block(370, 230),
    
    new Block(310, 170), 
]

//adding block

function addBlock() {
for(let i=0;i<blocks.length;i++) {
const block = document.createElement('div')
block.classList.add('block')
block.style.left = blocks[i].bottomLeft[0] +'px'
block.style.bottom = blocks[i].bottomLeft[1] +'px'
blocks[i].element = block
grid.appendChild(block)
}
}

addBlock()
 
                        //user related      
                             
//adding user

const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
const ani_user1 = document.createElement('div')
const ani_user2 = document.createElement('div')
const ani_user3 = document.createElement('div')
ani_user1.classList.add('ani_user')
ani_user2.classList.add('ani_user')
ani_user3.classList.add('ani_user')

grid.appendChild(ani_user1)
grid.appendChild(ani_user2)
grid.appendChild(ani_user3)

ani_user1.setAttribute('user_id', '1')
ani_user2.setAttribute('user_id', '2')
ani_user3.setAttribute('user_id', '3')

const ani_list = [ani_user1, ani_user2, ani_user3]


drawUser()


//position user

function drawUser() {
    user.style.left = currentUserPosition[0] +'px'
    user.style.bottom = currentUserPosition[1] + 'px'
   
    for(let item of ani_list){
        setTimeout(() => {
            item.style.left = currentUserPosition[0]+'px'
            item.style.bottom = currentUserPosition[1] + 'px'
            
        }, 4)
       
    }

}

//move user

function moveUser(e) {
    switch(e.key) {

        case 'ArrowLeft':
            if(currentUserPosition[0]>0) {
            currentUserPosition[0] -= 10
            drawUser()
            }
            break;

        case 'ArrowRight':
            if (currentUserPosition[0] < (boardWidth - userBlockWidth)) {
            currentUserPosition[0] += 10 
            drawUser()
            }
            break;
            
    }
}

document.addEventListener('keydown', moveUser)

                        //ball related

//adding ball


const ball =document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)

const ani_ball1 = document.createElement('div')
const ani_ball2 = document.createElement('div')
const ani_ball3 = document.createElement('div')

ani_ball1.classList.add('ani_ball')
ani_ball2.classList.add('ani_ball')
ani_ball3.classList.add('ani_ball')

grid.appendChild(ani_ball1)
grid.appendChild(ani_ball2)
grid.appendChild(ani_ball3)

ani_ball1.setAttribute('ball_id', '1')
ani_ball2.setAttribute('ball_id', '2')
ani_ball3.setAttribute('ball_id', '3')

const ani_ballList = [ani_ball1, ani_ball2, ani_ball3]

drawBall()

//positioning ball

function drawBall() {
    ball.style.left = currentBallPosition[0]  + 'px'
    ball.style.bottom = currentBallPosition[1] + 'px'

    for(let val of ani_ballList){
        setTimeout(() => {
            val.style.left = currentBallPosition[0] +'px'
            val.style.bottom = currentBallPosition[1]  + 'px'
        },3)
    }

}

//move ball

function moveBall() {
    currentBallPosition[0] += xDirection*2
    currentBallPosition[1] += yDirection*2
    drawBall()
    checkForCollision()
}


let timerId = setInterval(moveBall, 30)

function checkForCollision() {


    //check for wall hit 

    if(
        currentBallPosition[0]>=boardWidth-ballDiameter || currentBallPosition[0]<=0 || currentBallPosition[1]>=boardHeight-ballDiameter
    ) {
        changeDirection()
    }



    //check for block hit

   for(let i=0;i<blocks.length;i++) {
    if(
        blocks[i].isActive &&
       (currentBallPosition[0]>blocks[i].bottomLeft[0] && currentBallPosition[0]<blocks[i].bottomRight[0]) &&
       (currentBallPosition[1]>blocks[i].bottomLeft[1] && currentBallPosition[1]<blocks[i].topLeft[1] )
    ) {
        blocks[i].element.classList.remove('block')
        blocks[i].isActive = false

        setTimeout( ()=>{
            blocks[i].isActive = true
            blocks[i].element.classList.add('block')
        }, 10000 )
        changeDirection()
        score++
    }
   }

    //check for user hit
    if(
    (currentBallPosition[0]>currentUserPosition[0]  && currentBallPosition[0]<currentUserPosition[0]+ userBlockWidth ) &&
    (currentBallPosition[1]>currentUserPosition[1] && currentBallPosition[1]<currentUserPosition[1]+userBlockHeight)
    ) {
        changeDirection()
    }

    
    //game over 
    if(currentBallPosition[1]<0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'game over'
        return

    }

    scoreDisplay.innerHTML = `score: ${score}`
      
    }
     

function changeDirection() {
     if (xDirection === 2 && yDirection === 2) {
       yDirection = -2
       return
     }
     if (xDirection === 2 && yDirection === -2) {
       xDirection = -2
       return
     }
     if (xDirection === -2 && yDirection === -2) {
       yDirection = 2
       return
     }
     if (xDirection === -2 && yDirection === 2) {
       xDirection = 2
       return
     }
}