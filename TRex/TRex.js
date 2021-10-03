var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight -100;

//이미지 그리기
var img1 = new Image();
img1.src = 'fish.png';

//공룡 Object 속성 정의
var dino = {
    x : 10,
    y : 200, //공룡 등장 좌표
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);//10, 10 위치에 100, 100 사이즈 그린다
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);//이미지 그리기 함수
    }
}

//이미지 그리기
var img2 = new Image();
img2.src = 'tree.png';

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
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);//이미지 그리기 함수
    }
}

//프레임 : 60, 120
var timer = 0;
//장애물 여러개 관리하기
var cactus여러개 = [];
//점프가 무한정 작동하는 것 방지
var 점프timer = 0;
var animation;

//1초에 60번 코드 실행하기
//게임실행 함수-프레임마다 실행
function 프레임마다실행할거(){
    //js 기본 함수
    animation = requestAnimationFrame(프레임마다실행할거);
    timer++;

    //캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //프레임
    if (timer % 60 === 0){
        //장애물 생성
        var cactus = new Cactus(); //60프레임마다 {장애물} 생성하고 array에 집어넣음
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i, o) => {
        //x 좌표가 0 미만이면 제거
        if (a.x < 0){
            // i 위치의 요소 1개를 제거
            o.splice(i, 1);
        }
        a.x--;
        충돌하냐(dino, a);//충돌체크-장애물별 충돌 확인
        a.draw();//array에 있던거 다 draw()
    })

    if (점프중 == true) {
        dino.y--;
        점프timer++;//점프 시 프레임마다 +1
    }
    if (점프중 == false) {//점프 후 원위치
        if (dino.y < 200) {
            dino.y++;
        }
    }
    //100 프레임 지나면 dino.y--; 중지
    if (점프timer > 100) {
        점프중 = false;
        점프timer = 0;
    }
    dino.draw();
}

프레임마다실행할거();

//충돌확인
function 충돌하냐(dino, cactus){
    //dino의 오른쪽 x 축과 cactus의 x축 차이
    var x축차이 = cactus.x - (dino.x + dino.width);
    //dino의 아래쪽 y 축과 cactus의 y축 차이
    var y축차이 = cactus.y - (dino.y + dino.height);
    if (x축차이 < 0 && y축차이 < 0) {
        //캔버스 초기화
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //애니메이션, 프레임 중단 = 게임 중지
        cancelAnimationFrame(animation);
    }
}

var 점프중 = false;
document.addEventListener('keydown', function(e){
    if (e.code === 'Space') {
        점프중 = true;
    }
})