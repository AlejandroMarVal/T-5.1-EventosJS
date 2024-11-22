let cartasGiradas = [];
let cartasIguales = 0;
let intentos = 0;

const tableroJuego = document.getElementById('tablero-juego');
const mostrarIntentos = document.getElementById('intentos');

const imgCartas = [
    'casa', 'copo', 'flor', 'guante',
    'muneco', 'oso', 'regalo', 'santa'
];

// función para crear y barajar cartas
function crearYBarajarCartas() {
    // vaciar el tablero de juego en caso de que ya haya cartas
    tableroJuego.innerHTML = '';

    // duplicar imagenes para hacer las parejas
    const valorCarta = [...imgCartas, ...imgCartas];
    
    // barajar
    valorCarta.sort(() => Math.random() - 0.5);

    valorCarta.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const img = document.createElement('img');
        img.src = `./IMG/${value}.PNG`; 
        img.alt = `Imagen de ${value}`;
        cardBack.appendChild(img);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        tableroJuego.appendChild(card);

        card.addEventListener('click', () => {
            // evitar clics si la carta ya está girada o con pareja
            if (card.classList.contains('flipped') || card.classList.contains('matched') || cartasGiradas.length === 2) {
                return;
            }

            card.classList.add('flipped');
            cartasGiradas.push(card);

            // comprobar si al girar 2 estas son pareja
            if (cartasGiradas.length === 2) {
                checkForMatch();
            }
        });

        card.addEventListener('mouseover', () => {
            card.classList.add('hover'); 
        });

        card.addEventListener('mouseout', () => {
            card.classList.remove('hover'); 
        });
    });
}

// comprobar si 2 son iguales
function checkForMatch() {
    const [carta1, carta2] = cartasGiradas;

    if (carta1.dataset.value === carta2.dataset.value) {
        // son pareja
        carta1.classList.add('matched');
        carta2.classList.add('matched');
        cartasIguales++;
    } else {
        // no son pareja
        setTimeout(() => {
            carta1.classList.remove('flipped');
            carta2.classList.remove('flipped');
        }, 1000);
    }

    cartasGiradas = []; // vacia el array con las cartas que ya se giraron
    intentos++; 
    mostrarIntentos.textContent = `Intentos: ${intentos}`;

    if (cartasIguales === imgCartas.length) {
        setTimeout(() => alert('¡Felicidades! Ganaste.'), 500);
    }
}

// evento para reiniciar el juego pulsando la R
document.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        
        cartasGiradas = [];
        cartasIguales = 0;
        intentos = 0;
        mostrarIntentos.textContent = `Intentos: ${intentos}`;

        crearYBarajarCartas();
    }
});

crearYBarajarCartas();