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
            <div class="card">
                 <div class="face front">
                    <img src="${deck[i].frontImage}" alt="${deck[i].name}"/>
                </div>
                <div class="face back">
                    <img src="${deck[i].backImage}" alt="back card"/>
                </div>
            </div>
            `;

        line = (line === line1) ? line2 : line1;
    }

    //Clicar na carta e checar se forma par
    const cards = document.querySelectorAll('.card');
    let flippedCard = false;
    let firstCard, secondCard;
    let Attemps = 0;
    
    cards.forEach(card => {
      card.addEventListener('click', function() {
        if (!flippedCard) {
          flippedCard = true;
          firstCard = this;
          firstCard.classList.add('flipped');
        } else {
          secondCard = this;
          secondCard.classList.add('flipped');
    
          if (firstCard.querySelector('.front img').alt === secondCard.querySelector('.front img').alt) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
          } else {
            setTimeout(() => {
              firstCard.classList.remove('flipped');
              secondCard.classList.remove('flipped');
            }, 1000);
          }
          flippedCard = false;
        }
        Attemps++;
      });
    });
    
    //Fim do jogo
    function verificarFimDoJogo() {
      if (deck.every(card => card.isFlipped)) {
        alert(`Você ganhou em ${Attemps} jogadas!`);
      }
    }
    

});
  
  
