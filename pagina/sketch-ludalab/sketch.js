var potencia;

var poligono;
var listaPoligonos = []
var cantidad;
var colors = [];
var textos = ['~\\','\|/','-\'','"-','^<','.*','+\''];
var primos = [3,5,7,11,13];
var mirrors = [1,2,3,5]
var fr = 24;
var blender = 213;
var paso = 0.4;
var maxspeed = 0.05;
var tamanioletra = 48;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(254,236,241);
  if (width*height < 480000)
  {
    cantidad = 11;
  }
  else
  {
    cantidad = 24
  }

  frameRate(fr);

  for (var i=0;i < cantidad;i++)
  {
    listaPoligonos.push(new drawPolygons(random(primos),random(width),random(height),frameCount / 1000*int(random(1,5)),color(random(212,252),random(234,252),random(234,252)),100,true,random(mirrors),random(textos)));
  }
  colors = [color(254,236,241),color(238,238,251),color(246,232,250)];
  potencia = 1.20;
}

function draw() {
  //background(254,236,241);
  //background(0);
  //background(248);


  if (blender >= 252)
  {

    paso = -paso;
  }
  if (blender <= 212)
  {
    paso = -paso;
  }
  background(blender);
  blender += paso;



  for (var i=0;i <listaPoligonos.length; i++)
  {
    push();
    translate(listaPoligonos[i].posx, listaPoligonos[i].posy);
    rotate(listaPoligonos[i].rotatevar);
    listaPoligonos[i].show();
    pop();
  }
}


function drawPolygons(n,posx,posy,rotatevar,colorcito,radius,randomFlag,mirror,textual="")
{
  if (n<3){
    return false;
  }
  this.radius = radius;
  this.posx = posx;
  this.posy = posy;
  this.rotatevar = rotatevar
  this.rotateAngle = random(-maxspeed,maxspeed);
  this.sep = 1.05;
  this.mir = mirror;
  this.texto = "";
  this.conTexto=false;
  if(textual!=""){
    this.conTexto=true;
    this.texto =textual;
  }

  this.rotationX = radians(random(1,360));
  this.rotationY = radians(random(1,360));

  this.colorcito = colorcito;

  this.aperture = 360/n;
  this.nnn = n;
  this.angles = []
  this.puntos = [];

  for (var i=0;i<this.nnn;i++)
    {

      randomAng = randomFlag ? random(0,this.aperture/2):0;
      this.angles[i] = i*(this.aperture)+randomAng;
      this.puntos[i] = [this.radius*cos(radians(this.angles[i])),this.radius*sin(radians(this.angles[i]))];
    }

  this.update = function() {

 }

  this.show = function()
  {
    stroke(this.colorcito);
    this.posx

    for(var k = 0; k < this.mir; k++)
    {
      strokeWeight(1);
      strokeWeight(1+(k*2));
      noFill();
      beginShape();
      //vertex(this.puntos[0][0]*Math.pow(potencia,k), this.puntos[this.nnn-1][1]*Math.pow(potencia,k));
      for (var i = 0; i < this.nnn;i++)
      {
        this.angles[i]+=this.rotateAngle;
        this.puntos[i] = [this.radius*cos(radians(this.angles[i])),this.radius*sin(radians(this.angles[i]))];

        vertex(this.puntos[i][0]*Math.pow(potencia,k), this.puntos[i][1]*Math.pow(potencia,k));
      }
      vertex(this.puntos[0][0]*Math.pow(potencia,k), this.puntos[0][1]*Math.pow(potencia,k));
      //vertex(this.puntos[1][0]*Math.pow(potencia,k), this.puntos[1][1]*Math.pow(potencia,k));
      endShape();
    }
    //textSize(tamanioletra);
    //textAlign(CENTER, CENTER);
    //strokeWeight(0);
    //fill(246,232,250);
    //text(this.texto, 0, 0);

  }
}

