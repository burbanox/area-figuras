const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
const buttonClear = document.getElementById("buttonClear");
const buttonCalculate = document.getElementById("buttonCalculate");
const input = document.getElementById("input");
const resultSpace = document.getElementById("resultSpace");

const eventoClear = () => {
    cleanCanvas();
    input.value = "";
    resultSpace.innerText = "Area = ";
  };
  
  const eventoCalculate = () => {
    let r = input.value;
    let area = calcularArea(r).toFixed(3);
    resultSpace.innerText = "Area = ";
    resultSpace.innerText += "   " + area + " u²";
    drawCircle();
  };
  
  const cleanCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  const calcularArea = (radius) => {
    return Math.PI * radius * radius;
  };
  
  const drawCircle = () => {
      
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 0.4 * canvas.width;
  
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#2ea811";
    ctx.fill();
    ctx.closePath();
  };

buttonClear.addEventListener("click", eventoClear);
buttonCalculate.addEventListener("click", eventoCalculate);
