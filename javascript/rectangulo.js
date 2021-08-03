const canvas = document.getElementById("mycanvas")
const ctx = canvas.getContext("2d")
const input_1 = document.getElementById("input_1")
const input_2 = document.getElementById("input_2")
const resultSpace = document.getElementById("resultSpace")
const buttonClear = document.getElementById("buttonClear")
const buttonCalculate = document.getElementById("buttonCalculate")

buttonClear.addEventListener("click",()=>
{
    input_1.value = ""
    input_2.value = ""
    resultSpace.innerText = "Area = "
    cleanCanvas()
})

buttonCalculate.addEventListener("click",()=>
{
    if(input_1.value === "" || input_2.value === "")
    {
        alert("Fill the blanks")
    } else
    {
        let area = calcularArea(parseFloat(input_1.value),parseFloat(input_2.value)).toFixed(3)
        resultSpace.innerText = "Area = "
        resultSpace.innerText += `  ${area} u²`
        cleanCanvas()
        dibujarRectangulo(parseFloat(input_1.value), parseFloat(input_2.value))
    }
})

function cleanCanvas()
{
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function calcularArea(a,b)
{
    return a*b
}

function dibujarRectangulo(l1,l2)
{
    const centerX = canvas.width/2
    const centerY = canvas.height/2

    let ladoMenor = l1 > l2 ? l2 : l1
    let ladoMayor = l1 > l2 ? l1 : l2

    const ladoGrafica_1 = 0.75*canvas.width
    const ladoGrafica_2 = ladoGrafica_1*(ladoMenor/ladoMayor)

    ctx.beginPath()
    ctx.moveTo(centerX - ladoGrafica_1/2,centerY - ladoGrafica_2/2)
    ctx.lineTo(centerX + ladoGrafica_1/2,centerY - ladoGrafica_2/2)
    ctx.lineTo(centerX + ladoGrafica_1/2,centerY + ladoGrafica_2/2)
    ctx.lineTo(centerX - ladoGrafica_1/2,centerY + ladoGrafica_2/2)
    ctx.lineTo(centerX - ladoGrafica_1/2,centerY - ladoGrafica_2/2)
    ctx.fillStyle = "#EBE720"
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle =  "#2ea811"
    ctx.stroke()
    ctx.closePath()
}

