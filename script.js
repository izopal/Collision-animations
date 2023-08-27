const canvasBoom = document.getElementById('canvasBoom');
const ctx = canvasBoom.getContext('2d');
canvasBoom.width = 500;
canvasBoom.height = 600;

// Створюємо обєкт в який будемо поміщати всіх активних вибухи
const explosions = [];

// створюємо змінну для визначення координат відхилення при 'click'
let boomPosition = canvasBoom.getBoundingClientRect();
console.log(boomPosition);




class Boom {
// вказуємо обовязково х, y можна було розміщати персонажів які будуть створені конструктом
    constructor(x, y) {
        
        // вказуємо для елементу диму при бігу
        this.spriteWidth = 200;
        this.spritHeight = 179;

        // вказуємо мультиплікатор "*.5" замість "/2" даним nh.ком ми пришвидшуємо процес,
        // також якшо вказувати ++і замість і++ процес буде відбуватися швидше, тому що
        // ++і перетворю і до і=і+1 і повертає готовий результат, а
        // і++ спочатку створю копію і повертає результат у вигляді копії що сповільнює процес опрацювання даних 
        this.width = this.spriteWidth * .55;
        this.height = this.spritHeight * .55;
        this.x = x;
        this.y = y;
         
        this.image = new Image();
        this.image.src = 'Image/boom.png';

        this.sound = new Audio();
        this.sound.src = 'Sound/Misc 02.wav';

        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;

        
    }
    update(){
        if(this.frame === 0 ) this.sound.play();

        ++this.timer;
        if (this.timer % 10 === 0){
            ++this.frame;
        };
    }
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spritHeight,
             - this.width * .5, - this.height * .5, this.width, this.height);
        ctx.restore();
    }
}



window.addEventListener('click', function(e){
    greateAnimation(e);
});

function greateAnimation(e){
    let positionX = e.x - boomPosition.left;
    let positionY = e.y - boomPosition.top;
    explosions.push(new Boom(positionX, positionY));
}

function animate(){
    ctx.clearRect (0, 0, canvasBoom.width, canvasBoom.height);
    for (let i = 0; i < explosions.length; ++i){
        explosions[i].update();
        explosions[i].draw();
        // видаляємо з реєстру обєктіу які створюють при кліку
        if (explosions[i].frame > 5){
            explosions.splice(i, 1);
            --i;
        }
    }
    requestAnimationFrame(animate);
}
animate();




  