const puzzle = document.getElementById("puzzle");
const mensagemPuzzle = document.getElementById("mensagemPuzzle");

let pecas = [];
let primeiraPeca = null;
let animando = false;

function criarPuzzle(){
    puzzle.innerHTML = "";
    pecas = [];
    primeiraPeca = null;
    animando = false;

    for(let i = 0; i < 9; i++){
        const peca = document.createElement("div");

        peca.classList.add("peca");

        peca.style.backgroundImage = "url('imagens/img4.png')";
        peca.style.backgroundSize = "300% 300%";

        const coluna = i % 3;
        const linha = Math.floor(i / 3);

        peca.style.backgroundPosition = `${coluna * 50}% ${linha * 50}%`;

        peca.setAttribute("data-correto", i);

        peca.addEventListener("click", function(){
            selecionarPeca(peca);
        });

        peca.addEventListener("touchstart", function(event){
            event.preventDefault();
            selecionarPeca(peca);
        }, { passive:false });

        pecas.push(peca);
    }

    embaralharPecas();
}

function embaralharPecas(){
    mensagemPuzzle.innerText = "";
    primeiraPeca = null;
    animando = false;

    pecas.sort(() => Math.random() - 0.5);

    puzzle.innerHTML = "";

    pecas.forEach((peca) => {
        peca.classList.remove("selecionada");
        peca.style.transform = "";
        peca.removeAttribute("draggable");

        puzzle.appendChild(peca);
    });
}

function selecionarPeca(peca){
    if(animando) return;

    if(!primeiraPeca){
        primeiraPeca = peca;
        peca.classList.add("selecionada");
        return;
    }

    if(primeiraPeca === peca){
        peca.classList.remove("selecionada");
        primeiraPeca = null;
        return;
    }

    trocarPecasComAnimacao(primeiraPeca, peca);
}

function trocarPecasComAnimacao(peca1, peca2){
    animando = true;

    const rect1 = peca1.getBoundingClientRect();
    const rect2 = peca2.getBoundingClientRect();

    const deltaX1 = rect2.left - rect1.left;
    const deltaY1 = rect2.top - rect1.top;

    const deltaX2 = rect1.left - rect2.left;
    const deltaY2 = rect1.top - rect2.top;

    peca1.classList.remove("selecionada");

    peca1.style.transition = "transform .35s ease";
    peca2.style.transition = "transform .35s ease";

    peca1.style.transform = `translate(${deltaX1}px, ${deltaY1}px) scale(.95)`;
    peca2.style.transform = `translate(${deltaX2}px, ${deltaY2}px) scale(.95)`;

    setTimeout(() => {
        trocarPosicaoNoHTML(peca1, peca2);

        peca1.style.transition = "none";
        peca2.style.transition = "none";

        peca1.style.transform = "";
        peca2.style.transform = "";

        void peca1.offsetWidth;
        void peca2.offsetWidth;

        peca1.style.transition = "";
        peca2.style.transition = "";

        primeiraPeca = null;
        animando = false;

        verificarPuzzle();

    }, 350);
}

function trocarPosicaoNoHTML(peca1, peca2){
    const pai = peca1.parentNode;

    const proximo1 =
        peca1.nextSibling === peca2
        ? peca1
        : peca1.nextSibling;

    const proximo2 =
        peca2.nextSibling === peca1
        ? peca2
        : peca2.nextSibling;

    pai.insertBefore(peca1, proximo2);
    pai.insertBefore(peca2, proximo1);
}

function verificarPuzzle(){
    const todasPecas = Array.from(puzzle.children);

    const completo = todasPecas.every((peca, index) => {
        return Number(peca.getAttribute("data-correto")) === index;
    });

    if(completo){
        mensagemPuzzle.innerText =
            "Você montou uma das nossas lembranças mais especiais. Eu te amo ❤️";
    }
}

criarPuzzle();