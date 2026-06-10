const canvas = document.getElementById("telaPintura");
const ctx = canvas.getContext("2d");

let pintando = false;
let corAtual = "#ff5d8f";

function mudarCor(cor){
    corAtual = cor;
}

function prepararTela(){

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ffd1dd";
    ctx.lineWidth = 4;

    ctx.strokeRect(
        2,
        2,
        canvas.width - 4,
        canvas.height - 4
    );
}

function pegarPosicao(event){

    const rect =
        canvas.getBoundingClientRect();

    const clientX =
        event.touches ?
        event.touches[0].clientX :
        event.clientX;

    const clientY =
        event.touches ?
        event.touches[0].clientY :
        event.clientY;

    return {
        x: (clientX - rect.left) *
           (canvas.width / rect.width),

        y: (clientY - rect.top) *
           (canvas.height / rect.height)
    };
}

function iniciarPintura(event){

    pintando = true;

    const pos =
        pegarPosicao(event);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function desenhar(event){

    if(!pintando) return;

    const pos =
        pegarPosicao(event);

    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle =
        corAtual;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function pararPintura(){

    pintando = false;
    ctx.beginPath();
}

function limparPintura(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    prepararTela();
}

canvas.addEventListener(
    "mousedown",
    iniciarPintura
);

canvas.addEventListener(
    "mousemove",
    desenhar
);

canvas.addEventListener(
    "mouseup",
    pararPintura
);

canvas.addEventListener(
    "mouseleave",
    pararPintura
);

canvas.addEventListener(
    "touchstart",
    function(event){
        event.preventDefault();
        iniciarPintura(event);
    }
);

canvas.addEventListener(
    "touchmove",
    function(event){
        event.preventDefault();
        desenhar(event);
    }
);

canvas.addEventListener(
    "touchend",
    pararPintura
);

prepararTela();