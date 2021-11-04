// Made By Bl4ky113.

//Variables Canvas.
var testCanvas = document.getElementById("testCanvas");
var testPapel = testCanvas.getContext("2d");
var xTestCanvas = 300;
var yTestCanvas = 300;

var graficaLarge = document.getElementById("graficaLCanvas");
var graficaL = graficaLarge.getContext("2d");
var xGraficaL = 320;
var yGraficaL = 320;

var graficaWidth = document.getElementById("graficaWCanvas");
var graficaW = graficaWidth.getContext("2d");
var xGraficaW = 320;
var yGraficaW = 320;

var graficaDesperdiciado = document.getElementById("graficaD2Canvas");
var graficaD = graficaDesperdiciado.getContext("2d");
var xGraficaD = 320;
var yGraficaD = 520;

var graficaPapel = document.getElementById("graficaP2Canvas");
var graficaP = graficaPapel.getContext("2d");
var xGraficaP = 320;
var yGraficaP = 520;

var graficaBase = document.getElementById("graficaB2Canvas");
var graficaB = graficaBase.getContext("2d");
var xGraficaB = 320;
var yGraficaB = 520;

var graficaVolumen = document.getElementById("graficaV3Canvas");
var graficaV = graficaVolumen.getContext("2d");
var xGraficaV = 320;
var yGraficaV = 820;

//Variables "Marcadores".

var tonoMarcador = "#0066ff";
var tonoMarco = "#4d2600";
var tonoCarita = "#ffcc99";

var grosorMarcador = "2";
var grosorMarco= "4";

//Todo Esto para HACER UNA CARITAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.

testDibujar(tonoMarco,grosorMarco, 0, 0, 300, 0);
testDibujar(tonoMarco,grosorMarco, 0, 0, 0, 300);
testDibujar(tonoMarco,grosorMarco, 300, 300, 0, 300);
testDibujar(tonoMarco,grosorMarco, 300, 300, 300, 0);

testDibujar(tonoCarita, grosorMarcador, 100, 200, 200, 200);
testDibujar(tonoCarita, grosorMarcador, 100, 200, 100, 175);
testDibujar(tonoCarita, grosorMarcador, 200, 200, 200, 175);

testDibujar(tonoCarita, grosorMarcador, 125, 175, 175, 175);
testDibujar(tonoCarita, grosorMarcador, 125, 175, 125, 150);
testDibujar(tonoCarita, grosorMarcador, 175, 175, 175, 150);

testDibujar(tonoCarita, grosorMarcador, 125, 125, 125, 100);
testDibujar(tonoCarita, grosorMarcador, 125, 125, 100, 125);
testDibujar(tonoCarita, grosorMarcador, 100, 100, 125, 100);
testDibujar(tonoCarita, grosorMarcador, 100, 100, 100, 125);

testDibujar(tonoCarita, grosorMarcador, 175, 125, 200, 125);
testDibujar(tonoCarita, grosorMarcador, 175, 125, 175, 100);
testDibujar(tonoCarita, grosorMarcador, 200, 100, 175, 100);
testDibujar(tonoCarita, grosorMarcador, 200, 100, 200, 125);

testDibujar("black", 1, 125, 125, 112.5, 100);
testDibujar("black", 1, 112.5, 100, 100, 125);
testDibujar("black", 1, 100, 125, 125, 125);

testDibujar("black", 1, 175, 125, 187.5, 100);
testDibujar("black", 1, 187.5, 100, 200, 125);
testDibujar("black", 1, 175,125, 200, 125);

//Graficas.

  //Marcos.

lDibujar(tonoMarco, grosorMarco, 20, 0, 20, 300);
lDibujar(tonoMarco, grosorMarco, 20, 300, 320, 300);
wDibujar(tonoMarco, grosorMarco, 20, 0 ,20 ,300);
wDibujar(tonoMarco, grosorMarco, 20, 300, 320, 300);
d2Dibujar(tonoMarco, grosorMarco, 20, 0, 20, 500);
d2Dibujar(tonoMarco, grosorMarco, 20, 500, 520, 500);
p2Dibujar(tonoMarco, grosorMarco, 20, 0, 20, 500);
p2Dibujar(tonoMarco, grosorMarco, 20, 500, 520, 500);
b2Dibujar(tonoMarco, grosorMarco, 20, 0, 20, 500);
b2Dibujar(tonoMarco, grosorMarco, 20, 500, 520, 500);
v3Dibujar(tonoMarco, grosorMarco, 20, 0, 20, 800);
v3Dibujar(tonoMarco, grosorMarco, 20, 800, 820, 800);

var xLMax = 32;
var xL =  2;
var yLMax = 30;
var yL = -1;

while(xL < xLMax && yL < yLMax){
  xL++;
  yL++;
  var xLineas = xL * 10;
  var yLineas = yL * 10;
  lDibujar(tonoMarco, grosorMarco, xLineas, 305, xLineas, 295);
  lDibujar(tonoMarco, grosorMarco, 15, yLineas, 25, yLineas);
  wDibujar(tonoMarco, grosorMarco, xLineas, 305, xLineas, 295);
  wDibujar(tonoMarco, grosorMarco, 15, yLineas, 25, yLineas);

}

var xLMax2 = 50;
var xL2 = 2;
var yLMax2 = 51;
var yL2 = -1;

while(yL2 < yLMax2 && xL2 < yLMax2){
  xL2++;
  yL2++;
  var xLineas2 = xL2 * 10;
  var yLineas2 = yL2 * 10;
  d2Dibujar(tonoMarco, grosorMarco, xLineas2, 505, xLineas2, 495);
  d2Dibujar(tonoMarco, grosorMarco, 15, yLineas2, 25, yLineas2);
  p2Dibujar(tonoMarco, grosorMarco, xLineas2, 505, xLineas2, 495);
  p2Dibujar(tonoMarco, grosorMarco, 15, yLineas2, 25, yLineas2);
  b2Dibujar(tonoMarco, grosorMarco, xLineas2, 505, xLineas2, 495);
  b2Dibujar(tonoMarco, grosorMarco, 15, yLineas2, 25, yLineas2);

}

var xLMax3 = 81;
var xL3 = 2;
var yLMax3 = 81;
var yL3 = -1;

while(yL3 < yLMax3 && xL3 < xLMax3){
  xL3++;
  yL3++;
  var xLineas3 = xL3 * 10;
  var yLineas3 = yL3 * 10;
  v3Dibujar(tonoMarco, grosorMarco, xLineas3, 805, xLineas3, 795);
  v3Dibujar(tonoMarco, grosorMarco, 15, yLineas3, 25, yLineas3);

}

  //Funciones Matematicas.

var variableX = -0.5;
var variableXMAX = 20;
var variableY = 1;
var variableYMAX = 22;

while(variableX < variableXMAX && variableY < variableYMAX){
  variableX = variableX + 0.5;
  variableY++;
  var lNumeroY = (yGraficaL - 20) - ( -2*variableX + 24);
  var wNumeroY = (yGraficaW - 20) - ( -2*variableX + 20);
  var d2NumeroY = (yGraficaD - 20) - (4*(Math.pow(variableX, 2)));
  var p2NumeroY = (yGraficaP - 20) - (-4*(Math.pow(variableX, 2)) + 480)
  var b2NumeroY = (yGraficaB - 20) - (4*(Math.pow(variableX, 2)) - 88*(variableX) + 480);
  var v3NumeroY = (yGraficaV - 20) - (4*(Math.pow(variableX, 3)) - 88*(Math.pow(variableX, 2)) + 480*(variableX));
  var NumeroX = variableY * 10;

  console.log(variableX, lNumeroY, wNumeroY, d2NumeroY, p2NumeroY, b2NumeroY, v3NumeroY, NumeroX);

  lDibujar(tonoMarcador, 6, NumeroX, 300, NumeroX, lNumeroY);
  wDibujar(tonoMarcador, 6, NumeroX, 300, NumeroX, wNumeroY);
  d2Dibujar(tonoMarcador, 6, NumeroX, 500, NumeroX, d2NumeroY);
  p2Dibujar(tonoMarcador, 6, NumeroX, 500, NumeroX, p2NumeroY);
  b2Dibujar(tonoMarcador, 6, NumeroX, 500, NumeroX, b2NumeroY);
  v3Dibujar(tonoMarcador, 6, NumeroX, 800, NumeroX, v3NumeroY);

}

//functions Dibujar en el Canvas.

function testDibujar(color, grosor, xi, yi, xf, yf){
  testPapel.beginPath();
  testPapel.strokeStyle = color;
  testPapel.lineWidth = grosor;
  testPapel.moveTo(xi, yi);
  testPapel.lineTo(xf, yf);
  testPapel.stroke();
  testPapel.closePath();
}

function lDibujar(color, grosor, xi, yi, xf, yf){
  graficaL.beginPath();
  graficaL.strokeStyle = color;
  graficaL.lineWidth = grosor;
  graficaL.moveTo(xi, yi);
  graficaL.lineTo(xf, yf);
  graficaL.stroke();
  graficaL.closePath();

}

function wDibujar(color, grosor, xi, yi, xf, yf){
  graficaW.beginPath();
  graficaW.strokeStyle = color;
  graficaW.lineWidth = grosor;
  graficaW.moveTo(xi, yi);
  graficaW.lineTo(xf, yf);
  graficaW.stroke();
  graficaW.closePath();

}

function d2Dibujar(color, grosor, xi, yi, xf, yf){
  graficaD.beginPath();
  graficaD.strokeStyle = color;
  graficaD.lineWidth = grosor;
  graficaD.moveTo(xi, yi);
  graficaD.lineTo(xf, yf);
  graficaD.stroke();
  graficaD.closePath();

}

function p2Dibujar(color, grosor, xi, yi, xf, yf){
  graficaP.beginPath();
  graficaP.strokeStyle = color;
  graficaP.lineWidth = grosor;
  graficaP.moveTo(xi, yi);
  graficaP.lineTo(xf, yf);
  graficaP.stroke();
  graficaP.closePath();

}

function b2Dibujar(color, grosor, xi, yi, xf, yf){
  graficaB.beginPath();
  graficaB.strokeStyle = color;
  graficaB.lineWidth = grosor;
  graficaB.moveTo(xi, yi);
  graficaB.lineTo(xf,yf);
  graficaB.stroke();
  graficaB.closePath();

}

function v3Dibujar(color, grosor, xi, yi, xf, yf){
  graficaV.beginPath();
  graficaV.strokeStyle = color;
  graficaV.lineWidth = grosor;
  graficaV.moveTo(xi, yi);
  graficaV.lineTo(xf, yf);
  graficaV.stroke();
  graficaV.closePath();

}
