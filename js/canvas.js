// Request Animation Frame assists the browser in generating a smoother animation
// I think it tries to get 60fps, but I'm not 100% on what the exact fps is
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// varabiables used with the canvas
var canvas = document.getElementById('canvas'),
    w = window.innerWidth,
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h,
    populateSpeed = 100,
    particleSpeed = 0.5,
    particleCount = 50;
    particles = [],
    tick = 0,
    x = 0;

// Animation loop
function loop() {

  createParticles();
  updateParticles();
  killParticles();
  drawParticles();
  requestAnimFrame(loop);

}
requestAnimFrame(loop);

// Utility functions for getting randomish values
function getRandomWhite(){
 return ((Math.random()*55) + 200);
}
function getRandomAlpha(){
 return ((Math.random()*0.5) + 0.5);
}


// Intiate each particle here
// Called once per particle
function createParticles() {
  var whiteish = getRandomWhite(),
    alpha = getRandomAlpha(),
    randVal1 = Math.floor(whiteish),
    randVal2 = Math.floor(whiteish),
    randVal3 = Math.floor(whiteish);
  
  //every 10th tick
  if( tick % populateSpeed == 0 ) {
  //add particle if < 100
    if ( particles.length < particleCount ) {
        particles.push({
        x: Math.random()*canvas.width, //0 and width
        y: 0,
        speed: (2+Math.random()*3) * particleSpeed,//2-5
        radius: 5+Math.random()*5,//5-10
        color: 'rgba(' + randVal1 + ',' + randVal2 + ',' + randVal3 + ',' + alpha + ')'/*'white'*/,
        });
    }
  }
}
        
// Move the particle 
// Called every frame
function updateParticles() {
    for ( var i in particles ) {
        var part = particles[i];
        part.y += part.speed;
    }
}

// Destroy particle
// Called when particle goes out of bounds
function killParticles() {
    for ( var i in particles ) {
        
        var part = particles[i];
        
        if ( part.y > canvas.height ) {
            //console.log('x');
            part.y = 0;
        }
    }
}

// Paints entire canvas
// Called every frame
function drawParticles() {

    var c = canvas.getContext('2d');
    c.fillStyle = '#0c1e30';
    c.fillRect (0, 0, canvas.width, canvas.height);
    for ( var i in particles ) {
        var part = particles[i];
        c.beginPath();
        c.rect(part.x, part.y, part.radius, part.radius*5);
        c.closePath();
        c.fillStyle = part.color;
        c.fill();
    }
}

       