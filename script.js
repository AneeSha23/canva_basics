const canvas = document.getElementById("canva1")
// context
const ctx = canvas.getContext('2d')
// console.log(ctx)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particleArray = [] //particle class object add chyyan
hue = 0 // rainbow color kittan

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function (event) {
    // console.log(event)
    mouse.x = event.x,
    mouse.y = event.y
    // click chyumbol 10 particle object add avanam
    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particles())
    }

})

canvas.addEventListener('mousemove', function (event) {
    // console.log(event)
    mouse.x = event.x,
    mouse.y = event.y
      // mousemove chyumbol 10 particle object add avanam
    for (let i = 0; i < 5; i++) {
        particleArray.push(new Particles())
    }
})


/*function drawCircle() {

    ctx.fillStyle = "cyan"
    // ctx.fillRect(20,30,50,10)
    ctx.strokeStyle = 'cyan'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
}
*/

// create many circles, we use classes

class Particles {
    constructor() {
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 25 + 1
        this.speedX = Math.random() * 5 - 1.5
        this.speedY = Math.random() * 5 - 1.5
        this.color = 'hsl('+ hue +',100%,50%)'
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        // if size less than 0.2, gradually decrease the size and finally disappear
        if (this.size > 0.2) this.size -= 0.1
    }

    draw() {
        // to draw circle
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

/*function init(){
    for(let i=0; i<100; i++){
        particleArray.push(new Particles())
    }
  
}
init()*/
// console.log(Math.random() * 5 + 1)
// console.log( Math.random() * 3 - 1.5)
// console.log(particleArray)


function handleParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
        particleArray[i].draw()

        for(let j=i;j<particleArray.length;j++){
            // pythagoras theorem
            const dx = particleArray[i].x - particleArray[j].x
            const dy = particleArray[i].y - particleArray[j].y
            const distance = Math.sqrt(dx*dx + dy*dy)

            if(distance < 100){
                ctx.beginPath()
                ctx.strokeStyle = particleArray[i].color
                ctx.lineWidth = 0.2
                ctx.moveTo(particleArray[i].x,particleArray[i].y)
                ctx.lineTo(particleArray[j].x,particleArray[j].y)
                ctx.stroke()
                ctx.closePath()
            }
        }

        if(particleArray[i].size <= 0.3){
            particleArray.splice(i,1)
            i--
        }
    }
}




// animation

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle='rgba(0,0,0,0.02)'
    // ctx.fillRect(0,0,canvas.width,canvas.height)
    handleParticle()
    hue+=2
    // drawCircle()
    // calls only once
    requestAnimationFrame(animate)
}
animate()