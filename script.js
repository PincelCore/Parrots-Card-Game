const deck = [];

// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}

document.addEventListener('DOMContentLoaded', function() {
    //Perguntar ao usuário o número de cartas
    let Ncards = Number(prompt('Você precisa escolher um nº par entre 4 e 14. Com quantas cartas você quer jogar?'));

    while (isNaN(Ncards) || Ncards === null || Ncards < 4 || Ncards > 14 || Ncards % 2 == 1){
        Ncards = Number(prompt('Você é burro? Escolha um par entre 4 e 14 pra jogar!'));
    }

    //Inicia o jogo com cronômetro
    let IntervalId;
    let time = 0;
    const timer = document.getElementById('time');

    IntervalId = setInterval(() => {
    time++;
    timer.textContent = time;
    }, 1000);
    

    //Selecionar as imagens da frente das cartas
    const cardImages = [
        { name: 'bobrossparrot', src: 'media/bobrossparrot.gif' },
        { name: 'explodyparrot', src: 'media/explodyparrot.gif' },
        { name: 'fiestaparrot', src: 'media/fiestaparrot.gif' },
        { name: 'metalparrot', src: 'media/metalparrot.gif' },
        { name: 'revertitparrot', src: 'media/revertitparrot.gif' },
        { name: 'tripletsparrot', src: 'media/tripletsparrot.gif' },
        { name: 'unicornparrot', src: 'media/unicornparrot.gif' }
      ];

    // Embaralhar os índices do array cardImages para deixar as imagens em posições diferentes 
    cardImages.sort(comparador);
      
    // Montar o baralho de acordo com o que o jogador pediu e
    // garantir que haja sempre um par de cartas iguais
  for(let i = 0; i < Ncards / 2; i++){
      const card1 = {
        name: cardImages[i % cardImages.length].name,
        backImage: 'media/back.png',
        frontImage: cardImages[i % cardImages.length].src,
        isFlipped: false
      }

      const card2 = {
        name: cardImages[i % cardImages.length].name,
        backImage: 'media/back.png',
        frontImage: cardImages[i % cardImages.length].src,
        isFlipped: false
      }
      deck.push(card1, card2);
    }

    // Embaralhar o deck para garantir que os pares não fiquem em índices consecutivos
    deck.sort(comparador);

   // Distribuir as cartas na mesa
    const line1 = document.querySelector('.cards-line-1');
    const line2 = document.querySelector('.cards-line-2');

    let line = line1;

    for (i = 0; i < deck.length; i++) {
        line.innerHTML += `
            <div class="card" data-test="card">
                 <div class="face front">
                    <img src="${deck[i].frontImage}" alt="${deck[i].name}" data-test="face-up-image"/>
                </div>
                <div class="face back">
                    <img src="${deck[i].backImage}" alt="back card" data-test="face-down-image"/>
                </div>
            </div>
            `;

        line = (line === line1) ? line2 : line1;
    }

    //Clicar na carta e checar se forma par
    const cards = document.querySelectorAll('.card');
    let flippedCard = false;
    let firstCard, secondCard;
    let attemps = 0;

    function cardClickHandler() {
      attemps++;
      if (this.classList.contains('flipped')) {
        return;
      }
      this.classList.add('flipped');
      if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
      } else {
        secondCard = this;
        if (firstCard.querySelector('.front img').src === secondCard.querySelector('.front img').src) {
          firstCard.removeEventListener('click', cardClickHandler);
          secondCard.removeEventListener('click', cardClickHandler);
          firstCard = null;
          secondCard = null;
          endGame();
        } else {
          document.body.classList.add('no-click');
          setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
            document.body.classList.remove('no-click');
          }, 1000);
        }
        flippedCard = false;
      }
    }

    cards.forEach(card => {
      card.addEventListener('click', cardClickHandler);
    });

    //Fim do jogo
    function endGame() {
      const cards = document.querySelectorAll('.card');
      const allFlipped = [...cards].every(card => card.classList.contains('flipped'));
      if (allFlipped) {
        setTimeout(() => {
          alert(`Você ganhou em ${attemps} jogadas! A duração do jogo foi de ${time} segundos!` );
          
          let answer = prompt("Você gostaria de reiniciar a partida? (sim ou não)");
          while(answer !== "sim" && answer !== "não"){
            answer = prompt("Você é burro? Apenas digite: sim ou não");
          }

          if (answer === "sim"){
            location.reload();
          }
        }, 400);
        clearInterval(IntervalId);
      }
    }
      

});
  
  
