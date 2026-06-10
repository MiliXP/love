    function criarCoracao(){

    const coracao = document.createElement("div");

    coracao.classList.add("coracao");

    coracao.innerHTML = "❤";

    coracao.style.left =
        Math.random() * window.innerWidth + "px";

    coracao.style.fontSize =
        (Math.random() * 25 + 15) + "px";

    coracao.style.bottom = "-20px";

    coracao.style.animationDuration =
        (Math.random() * 4 + 4) + "s";

    document.body.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    },8000);
}

setInterval(criarCoracao,300);

function abrirCarta(){
    document.getElementById("resposta").innerHTML =
    "Pedro, você chegou de mansinho e foi ficando no meu coração...";
}

function mostrarMotivo(){
    document.getElementById("resposta").innerHTML =
    "Porque com você até os dias simples ficam especiais.";
}

function mostrarSurpresa(){
    document.getElementById("resposta").innerHTML =
    "Eu te amo mais do que consigo explicar.";
}

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function(event){
        const href = this.getAttribute("href");

        if(href && !href.startsWith("http") && !href.startsWith("#")){
            event.preventDefault();

            document.body.classList.add("saindo");  

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        }
    });
});

window.addEventListener("load", function(){
    setTimeout(() => {
        const loading = document.getElementById("loading");

        if(loading){
            loading.classList.add("sumir");
        }
    }, 1800);
});