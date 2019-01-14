var scores, roundScores, activePlayer, gamePlaying, point, user0, user1;

init();

var lastDice

// addEventListner: 1 - informar nome evento, 2 - função anônima ou externa
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. Ranom number
        var dice = Math.floor((Math.random() * 6) + 1);
        var dice1 = Math.floor((Math.random() * 6) + 1);
        // 2. Display the result
        var diceDom = document.querySelector('.dicer');
        var diceDom1 = document.querySelector('.dicer1');
        diceDom.style.display = 'block';
        diceDom1.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png'; // sorteia o número para o nome do dado
        diceDom1.src = 'dice-' + dice1 + '.png';
        // 3. Update the round score the rolled number was NOT a 1
        if (dice === 6 && dice1 === 6) {
            // Active Player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
            document.querySelector('.lastDice').style.display = 'block';
            document.querySelector('.lastDice').textContent = 'Dois dados 6 te fazem perder todos os seus pontos!';
            document.querySelector('.lastDice').addEventListener('mouseover', function () {
                document.querySelector('.lastDice').style.display = 'none';
            })
            lastDice = 0;
            console.log('Dado 1: ' + dice + ' - Dado 2: ' + dice1);
        } else if (dice === 1 && dice1 === 1) {
            document.querySelector('.lastDice').style.display = 'block';
            document.querySelector('.lastDice').textContent = 'Dois dados 1 te fazem perder todos os pontos acumulados!';
            document.querySelector('.lastDice').addEventListener('mouseover', function () {
                document.querySelector('.lastDice').style.display = 'none';
            })
            document.getElementById('dicer1').style.display = 'none';
            document.getElementById('dicer').src = 'ops.png';

            document.getElementById('dicer').classList.add('dice02');
            document.getElementById('dicer').classList.remove('dice');

            document.getElementById('current-0').textContent = 0;
            document.getElementById('current-1').textContent = 0;

            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // ternário
            roundScores = 0;

            document.querySelector('.player-0-panel').classList.toggle('active'); // alterna entre as classes
            document.querySelector('.player-1-panel').classList.toggle('active'); // alterna entre as classes

            setTimeout("document.querySelector('.dicer').style.display = 'none';", 400);

            setTimeout("document.getElementById('dicer').classList.add('dice');", 400)
            setTimeout("document.getElementById('dicer').classList.remove('dice02');", 400);

            console.log('Dado 1: ' + dice + ' - Dado 2: ' + dice1);
        } else {
            // Add score
            roundScores += dice + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
            console.log(dice + dice1); // mostrar no console o valor do dado
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScores;
        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // 3. Check if player won the game
        if (scores[activePlayer] >= point) {

            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            // document.querySelector('.btn-hold').style.visibility = 'hidden';
            // document.querySelector('.btn-roll').style.visibility = 'hidden';
            document.getElementById('dicer1').style.display = 'none';
            document.querySelector('.dicer').src = 'winner-' + activePlayer + '.png';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

            document.querySelector('.dicer').classList.add('dice01');
            document.querySelector('.dicer').classList.remove('dice');

            if (activePlayer === 0) {
                document.querySelector('#name-1').textContent = 'Loser!';
            } else {
                document.querySelector('#name-0').innerHTML = 'Loser!';
            }
        } else {
            // 3.a) Next PLayer
            lastDice = 0;
            nextPlayer();
        }
    }
});

// final score
document.querySelector('#btnPoint').addEventListener('click', function () {

    point = document.getElementById('pointValue').value;

    if (point === '') {
        point = 50
        document.querySelector('#bloco02').style.display = 'block'; // msg
        document.querySelector('#bloco01').style.display = 'none'; // input
        document.querySelector('.textPoint').textContent = 'Pontuação padrão de 50 pontos foi definida!';
        console.log('Pontuação padrão de 50');
    } else {
        point = document.getElementById('pointValue').value;
        document.querySelector('#bloco02').style.display = 'block'; // msg
        document.querySelector('#bloco01').style.display = 'none'; // input
        document.querySelector('.textPoint').textContent = 'O jogo termina com ' + point + ' ponto(s)!';
        console.log('O jogo acaba em: ' + point);
    }
});

// Call function New Game
document.querySelector('.btn-new').addEventListener('click', init1);

// nextPLayer
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    setTimeout("document.querySelector('.dicer').style.display = 'none';", 400);
    setTimeout("document.getElementById('dicer1').style.display = 'none';", 400);
}

// New Game
function init() {
    scores = [0, 0]; // matriz que armazena as pontuações dos 2 jogadores
    roundScores = 0; // variável que armazena a pontuação de cada rodada
    activePlayer = 0; // variável que informa jogador ativo
    gamePlaying = true; // variável de estado
    point = 50; // inicia com a pontuação final padrão de 50 

    user0 = localStorage.getItem('player0');
    user1 = localStorage.getItem('player1');

    console.log('First PLayer: ' + user0);
    console.log('Second Player: ' + user1);

    document.querySelector('.dicer').style.display = 'none';
    document.getElementById('dicer1').style.display = 'none';
    document.querySelector('#bloco02').style.display = 'none';
    document.querySelector('#bloco01').style.display = 'block';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = user0;
    document.getElementById('name-1').textContent = user1;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.dicer').classList.add('dice');
    document.querySelector('.dicer').classList.remove('dice01');

    document.querySelector('#pointValue').value = '';

    console.log(point); //teste
}

function init1() {
    scores = [0, 0]; // matriz que armazena as pontuações dos 2 jogadores
    roundScores = 0; // variável que armazena a pontuação de cada rodada
    activePlayer = 0; // variável que informa jogador ativo
    gamePlaying = true; // variável de estado
    point = 50; // inicia com a pontuação final padrão de 50 

    // pegando dados de outro scripts
    user0 = localStorage.getItem('player0');
    user1 = localStorage.getItem('player1');

    console.log('First PLayer: ' + user0);
    console.log('Second Player: ' + user1);

    document.querySelector('.dicer').style.display = 'none';
    document.getElementById('dicer1').style.display = 'none';
    document.querySelector('#bloco02').style.display = 'none';
    document.querySelector('#bloco01').style.display = 'block';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = user0;
    document.getElementById('name-1').textContent = user1;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.dicer').classList.add('dice');
    document.querySelector('.dicer').classList.remove('dice01');

    document.querySelector('#pointValue').value = '';

    location.href = 'home.html';
}