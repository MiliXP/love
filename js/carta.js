function abrirEnvelope(){

    const envelope = document.querySelector(".envelope");

    if(!envelope) return;

    envelope.classList.toggle("aberto");

    if(envelope.classList.contains("aberto")){

        for(let i = 0; i < 20; i++){

            setTimeout(() => {

                const coracao = document.createElement("div");

                coracao.innerHTML = "❤️";
                coracao.classList.add("coracao-explosao");

                coracao.style.left =
                    Math.random() * window.innerWidth + "px";

                coracao.style.top =
                    (window.innerHeight / 2) + "px";

                document.body.appendChild(coracao);

                setTimeout(() => {
                    coracao.remove();
                }, 3000);

            }, i * 80);

        }

    }

}