var cantidad;
var separacion;
var radioMax;
var x, y;
var grilla = [];
var triangulos = [];
var sat, bri;
var rosa,celeste,violeta,morado,cian2

function setup() {
  colorMode(RGB);
  rosa = color(250, 107, 255);
  celeste = color(116, 255, 222);
  violeta = color(174, 60, 215);
  morado = color(67, 0, 91);
  cian2 = color(70, 255, 164);
  colores = [rosa,celeste,violeta,morado,cian2];

  colorMode(HSB);
  frameRate(24);
  sat = 15;
  bri = 95;
  createCanvas(windowWidth, windowHeight);
  cantidad = 8;
  separacion = max(width, height) / cantidad;
  radioMax = separacion / 2
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
  for (var i = 0; i < cantidad + 2; i++) {
    for (var j = 0; j < cantidad + 2; j++) {
      grilla[i][j].move();

      if (i < cantidad + 1 && j < cantidad + 1) {
        triangulos[i][j].display();
      }
      //grilla[i][j].display();
    }
  }
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

    this.speed = 0.010;
  }

  move() {
    this.x = lerp(this.x, this.targetx, this.speed);
    this.y = lerp(this.y, this.targety, this.speed);

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
    let hue1 = random(0, 360);
    let hue2 = random(0, 360);
    this.color1 = color(hue1, sat, bri);
    this.color2 = color(hue2, sat, bri);
  }

  display() {
    stroke(100);
    fill(this.color1);

    triangle(this.punto1.x, this.punto1.y, this.punto2.x, this.punto2.y, this.punto4.x, this.punto4.y);

    stroke(85);
    fill(this.color2);

    triangle(this.punto1.x, this.punto1.y, this.punto3.x, this.punto3.y, this.punto4.x, this.punto4.y);

  }
}
