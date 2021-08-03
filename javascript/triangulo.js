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
    const side = 0.70*canvas.width

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
    const centerRotation = obtenerPuntoDeRotacion(Px1, Py1 , Px3 , Py3 , Px2 ,Py2 )
    const rPx1 = (Px1 - centerRotation.x)*Math.cos(rotationAngle) - (Py1 - centerRotation.y)*Math.sin(rotationAngle) + centerRotation.x
    const rPy1 = (Px1 - centerRotation.x)*Math.sin(rotationAngle) + (Py1 - centerRotation.y)*Math.cos(rotationAngle) + centerRotation.y
    const rPx2 = (Px2 - centerRotation.x)*Math.cos(rotationAngle) - (Py2 - centerRotation.y)*Math.sin(rotationAngle) + centerRotation.x
    const rPy2 = (Px2 - centerRotation.x)*Math.sin(rotationAngle) + (Py2 - centerRotation.y)*Math.cos(rotationAngle) + centerRotation.y
    const rPx3 = (Px3 - centerRotation.x)*Math.cos(rotationAngle) - (Py3 - centerRotation.y)*Math.sin(rotationAngle) + centerRotation.x
    const rPy3 = (Px3 - centerRotation.x)*Math.sin(rotationAngle) + (Py3 - centerRotation.y)*Math.cos(rotationAngle) + centerRotation.y
    console.log("rPx1 = " + rPx1 + " rPy1 = " + rPy1)
    ctx.beginPath()
    ctx.moveTo(rPx1,rPy1)
    ctx.lineTo(rPx2,rPy2)
    ctx.lineTo(rPx3,rPy3)
    ctx.lineTo(rPx1,rPy1)
    ctx.lineWidth = 3
    ctx.strokeStyle =  "#2ea811"
    ctx.stroke()
    // ctx.fillStyle = "#2ea811"
    // ctx.fill()
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

function obtenerPuntoDeRotacion(x1,y1,x2,y2,x3,y3)
{
    const m1 = (y1 - y2)/(x1 - x2)
    const m2 = (y2 - y3)/(x2 - x3)
    const b1 = y1 - m1*x1
    const b2 = y2 - m2*x2
    const puntoMedio1 = [(x1 + x2)/2,(y1 + y2)/2]
    const puntoMedio2 = [(x3 + x2)/2,(y3 + y2)/2]
    const m_mediana1 = (puntoMedio1[1] - y3)/(puntoMedio1[0] - x3)
    const m_mediana2 = (puntoMedio2[1] - y1)/(puntoMedio2[0] - x1)
    const b_mediana1 = y3 - m_mediana1*x3
    const b_mediana2 = y1 - m_mediana2*x1
    const px = (b_mediana2 - b_mediana1)/(m_mediana1 - m_mediana2)
    const py = m_mediana1*px + b_mediana1
    
    return { x : px , y : py}
}