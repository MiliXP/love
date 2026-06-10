const areaCoracoes = document.getElementById("areaCoracoes");
const mensagemCoracao = document.getElementById("mensagemCoracao");

function criarCoracoes(){

    areaCoracoes.innerHTML = "";
    mensagemCoracao.innerHTML = "";

    const coracaoCorreto = Math.floor(Math.random() * 20);

    for(let i = 0; i < 20; i++){

        const coracao = document.createElement("div");

        coracao.classList.add("coracao-jogo");

        coracao.innerHTML = "💖";

        coracao.onclick = () => {

            if(i === coracaoCorreto){

                mensagemCoracao.innerHTML =
                "💘 Você encontrou meu coração! Ele sempre será seu. 💕";

                coracao.classList.add("encontrado");

            }else{

                coracao.innerHTML = "🤍";

                coracao.style.opacity = ".5";
            }
        };

        areaCoracoes.appendChild(coracao);
    }
}

criarCoracoes();