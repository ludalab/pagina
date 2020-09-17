var cantidad;
var separacion;
var radioMax;
var x, y;
var grilla = [];
var triangulos = [];
var sat, bri;
var rosa,celeste,violeta,morado,cian2
var colores = [];
var colores2 = [];
var colores3 = [];
var changeColorSpeed;
var moveTriangleSpeed;


function setup() {
  colorMode(RGB);
  colores = [color(250, 107, 255),color(116, 255, 222),color(174, 60, 215),color(67, 0, 91),color(70, 255, 164)];
  colores2 = [color(50, 0, 108),color(244, 6, 126),color(255, 80, 164),color(215, 94, 173),color(244, 206, 227)];
  colores3 = [color(238, 246, 232),color(246, 226, 228),color(240, 208, 231),color(194, 141, 193),color(189, 202, 210)];

  changeColorSpeed = 0.5;
  moveTriangleSpeed = 0.015;

  frameRate(24);
  sat = 10;
  bri = 90;
  createCanvas(windowWidth, windowHeight);
  cantidad = 8;
  separacion = max(width, height) / cantidad;
  radioMax = separacion/3
  translate(-separacion, -separacion);
  for (let i = 0; i < cantidad + 2; i++) {
    grilla[i] = []
    for (let j = 0; j < cantidad + 2; j++) {
      grilla[i][j] = new Punto(i, j);
    }
  }
  for (let i = 0; i < cantidad + 1; i++) {
    triangulos[i] = []
    for (let j = 0; j < cantidad + 1; j++) {
      triangulos[i][j] = new Triangulo(grilla[i][j], grilla[i + 1][j], grilla[i][j + 1], grilla[i + 1][j + 1]);
    }
  }
}

function draw() {
  background(220);
  translate(-separacion / 2, -separacion / 2);
  changeColorSpeed = (mouseX/width)/10;
  moveTriangleSpeed = (mouseY/height)/10;
  for (var i = 0; i < cantidad + 2; i++) {
    for (var j = 0; j < cantidad + 2; j++) {
      grilla[i][j].move();

      if (i < cantidad + 1 && j < cantidad + 1) {
        triangulos[i][j].display();
      }
      //grilla[i][j].display();
    }
  }
  fill(255,255,255,200);
  noStroke();
  rect(0,2*height/5+10,2*width,3*height/7+20);
}

class Punto {
  constructor(px, py) {
    this.centrox = px * separacion;
    this.centroy = py * separacion;
    this.x = this.centrox;
    this.y = this.centroy;

    if (px <= 0) {
      this.targetx = this.centrox - random(0, radioMax)
    } else if (px >= cantidad) {
      this.targetx = this.centrox + random(0, radioMax)
    } else {
      this.targetx = this.centrox + random(-radioMax, radioMax)
    }

    if (py <= 0) {
      this.targety = this.centroy - random(0, radioMax)
    } else if (py >= cantidad) {
      this.targety = this.centroy + random(0, radioMax)
    } else {
      this.targety = this.centroy + random(-radioMax, radioMax)
    }

  }

  move() {
    this.x = lerp(this.x, this.targetx, moveTriangleSpeed);
    this.y = lerp(this.y, this.targety, moveTriangleSpeed);

    let d = int(dist(this.x, this.y, this.targetx, this.targety));
    if (d <= 10) {
      this.targetx = this.centrox + random(-radioMax, radioMax)
      this.targety = this.centroy + random(-radioMax, radioMax)
    }


  }

  display() {
    stroke(50);
    strokeWeight(3);
    point(this.x, this.y);

    stroke(50);
    strokeWeight(5);
    point(this.targetx, this.targety);

    strokeWeight(1);
    line(this.x, this.y, this.targetx, this.targety);
  }
}

class Triangulo {
  constructor(punto1, punto2, punto3, punto4) {
    let forma = random([true, false]);
    if (forma) {
      this.punto1 = punto1;
      this.punto2 = punto2;
      this.punto3 = punto3;
      this.punto4 = punto4;
    } else {
      this.punto1 = punto2;
      this.punto2 = punto1;
      this.punto3 = punto4;
      this.punto4 = punto3;
    }
    this.color1 = random(colores3);
    this.color2 = random(colores3);
    this.nextcolor1 = random(colores3);
    this.nextcolor2 = random(colores3);
  }

  display() {
    stroke(this.color2);
    fill(this.color1);

    triangle(this.punto1.x, this.punto1.y, this.punto2.x, this.punto2.y, this.punto4.x, this.punto4.y);

    stroke(this.color1);
    fill(this.color2);

    triangle(this.punto1.x, this.punto1.y, this.punto3.x, this.punto3.y, this.punto4.x, this.punto4.y);

    let distancia1 = dist(red(this.color1),green(this.color1),blue(this.color1),red(this.nextcolor1),green(this.nextcolor1),blue(this.nextcolor1));
    let distancia2 = dist(red(this.color2),green(this.color2),blue(this.color2),red(this.nextcolor2),green(this.nextcolor2),blue(this.nextcolor2));
    this.color1 = lerpColor(this.color1,this.nextcolor1,changeColorSpeed);
    if (distancia1<=20){
        this.nextcolor1 = random(colores3);
    }
    this.color2 = lerpColor(this.color2,this.nextcolor2,changeColorSpeed);
    if (distancia2<=20){
        this.nextcolor2 = random(colores3);
    }
  }
}
