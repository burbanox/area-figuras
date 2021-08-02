const input_1 = document.getElementById("input_1")
const input_2 = document.getElementById("input_2")
const input_3 = document.getElementById("input_3")
const resultSpace = document.getElementById("resultSpace")
const buttonClear = document.getElementById("buttonClear")
const buttonCalculate = document.getElementById("buttonCalculate")
const canvas = document.getElementById("mycanvas")
const ctx = canvas.getContext("2d")
const rotation = document.getElementById("rotation-icon")

let rAngle = 0
let trianguloDibujado = false

rotation.addEventListener("click",()=>
{
    let l1 = parseFloat(input_1.value)
    let l2 = parseFloat(input_2.value)
    let l3 = parseFloat(input_3.value)

    if(trianguloDibujado)
    {
        cleanCanvas()
        if(rAngle <= 2*Math.PI)
        {
            rAngle += Math.PI/10
            drawTriangle(l1,l2,l3,rAngle)
        }else
        {
            rAngle = Math.PI/10
            drawTriangle(l1,l2,l3,rAngle)
        }
    }
})

buttonClear.addEventListener("click", ()=>
{
    cleanCanvas()
    input_1.value = ""
    input_2.value = ""
    input_3.value = ""
    resultSpace.innerText = "Area = "
    trianguloDibujado = false
})

buttonCalculate.addEventListener("click", ()=>
{
    let l1 = parseFloat(input_1.value)
    let l2 = parseFloat(input_2.value)
    let l3 = parseFloat(input_3.value)

    if(input_1.value === "" || input_2.value === "" || input_3.value==="")
    {
        alert("Fill the spaces")
    }else
    {
        if(verificarTriangulo(l1,l2,l3))
        {
            let area = calcularArea(l1,l2,l3).toFixed(3)
            resultSpace.innerText = "Area = "
            cleanCanvas()
            resultSpace.innerText += ` ${area} u²`
            drawTriangle(l1,l2,l3,0)
            trianguloDibujado = true
        }
        else
        {
            alert("The sides of the triangle are not valid")
        }
    }
})

const cleanCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function calcularArea(l1,l2,l3) 
{
    let s = (l1 + l2 + l3)/2
    return Math.sqrt(s*(s-l1)*(s-l2)*(s-l3))
}

function drawTriangle(l1,l2,l3,rotationAngle)
{
    const centerX = canvas.width/2
    const centerY = canvas.height/2
    const side = 0.80*canvas.width

    let angle_1 = Math.acos((l3**2 + l2**2 - l1**2)/(2*l2*l3))
    let angle_2 = Math.acos((l3**2 + l1**2 - l2**2)/(2*l1*l3))
    let angle_3 = Math.acos((l2**2 + l1**2 - l3**2)/(2*l1*l2))
    let greaterAngle = mayor(angle_1,angle_2,angle_3)
    let L = 0, h = 0, x = 0

    if(greaterAngle===angle_1)
    {
        L = side
        let w = side*(l3/l1)
        h = w*Math.sin(angle_2)
        x = L - w*Math.cos(angle_2)
    } else if(greaterAngle===angle_2)
    {
        L = side
        let w = side*(l1/l2)
        h = w*Math.sin(angle_3)
        x = L - w*Math.cos(angle_3)
    } else
    {
        L = side
        let w = side*(l1/l3)
        h = w*Math.sin(angle_2)
        x = L - w*Math.cos(angle_2)
    }

    //get the cordenates
    const Px1 = centerX - L/2
    const Py1 = centerY + h/2
    const Px2 = centerX + L/2
    const Py2 = centerY + h/2
    const Px3 = centerX  + L/2 - x
    const Py3 = centerY - h/2
    
    //rotate the cordenates
    const rPx1 = (Px1 - centerX)*Math.cos(-rotationAngle) - (Py1 - centerY)*Math.sin(-rotationAngle) + centerX
    const rPy1 = (Px1 - centerX)*Math.sin(-rotationAngle) + (Py1 - centerY)*Math.cos(-rotationAngle) + centerY
    const rPx2 = (Px2 - centerX)*Math.cos(-rotationAngle) - (Py2 - centerY)*Math.sin(-rotationAngle) + centerX
    const rPy2 = (Px2 - centerX)*Math.sin(-rotationAngle) + (Py2 - centerY)*Math.cos(-rotationAngle) + centerY
    const rPx3 = (Px3 - centerX)*Math.cos(-rotationAngle) - (Py3 - centerY)*Math.sin(-rotationAngle) + centerX
    const rPy3 = (Px3 - centerX)*Math.sin(-rotationAngle) + (Py3 - centerY)*Math.cos(-rotationAngle) + centerY

    ctx.beginPath()
    ctx.moveTo(rPx1,rPy1)
    ctx.lineTo(rPx2,rPy2)
    ctx.lineTo(rPx3,rPy3)
    ctx.fillStyle = "#2ea811"
    ctx.fill()
    ctx.closePath()
}

function mayor(a,b,c)
{
    let mayor = a
    if(mayor < b)
    {
        mayor = b
        if(mayor < c)
        {
            mayor = c
        }
    } else if(mayor < c)
    {
        mayor = c
    }

    return mayor
}

function verificarTriangulo(l1,l2,l3)
{
    if(!(l1 + l2> l3 && l2 + l3 > l1 && l1 + l3 > l2)){
        return false
    }
    return true
}