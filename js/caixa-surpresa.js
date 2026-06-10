function abrirPresente(){

    const presente =
        document.querySelector(".presente");

    const surpresa =
        document.getElementById("surpresa");

    presente.style.transform = "scale(0)";
    presente.style.opacity = "0";

    setTimeout(() => {

        presente.style.display = "none";

        surpresa.classList.add("mostrar");

        soltarCoracoes();

    }, 500);
}

function soltarCoracoes(){

    for(let i = 0; i < 25; i++){

        setTimeout(() => {

            const coracao =
                document.createElement("div");

            coracao.classList.add("coracao-explosao");

            coracao.innerHTML = "💖";

            coracao.style.left =
                Math.random() * window.innerWidth + "px";

            coracao.style.top =
                Math.random() * window.innerHeight + "px";

            document.body.appendChild(coracao);

            setTimeout(() => {
                coracao.remove();
            },3000);

        }, i * 100);

    }
}