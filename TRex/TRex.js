var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight -100;

//공룡 Object 속성 정의
var dino = {
    x : 10,
    y : 200, //공룡 등장 좌표
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);//10, 10 위치에 100, 100 사이즈 그린다
    }
} 

//장애물 : 여러 Object 사용
class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//프레임 : 60, 120
var timer = 0;
//장애물 여러개 관리하기
var cactus여러개 = [];

//1초에 60번 코드 실행하기
//프레임마다 실행
function 프레임마다실행할거(){
    requestAnimationFrame(프레임마다실행할거);
    timer++;

    //캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //프레임
    if (timer % 60 === 0){
        //장애물 생성
        var cactus = new Cactus(); //60프레임마다 {장애물} 생성하고 array에 집어넣음
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a) => {
        a.x--;
        a.draw();//array에 있던거 다 draw()
    })
    
    dino.draw();
}