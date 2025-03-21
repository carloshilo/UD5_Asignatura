// Lógica del cuestionario
const questions = [
  {
    question: "¿Quién fue la ganadora de la temporada 1 de Drag Race España?",
    options: ["Carmen Farala", "Killer Queen", "Sagitarria", "Pupi Poisson"],
    answer: "Carmen Farala"
  },
  {
    question: "¿En qué plataforma se emite Drag Race España?",
    options: ["Netflix", "ATRESplayer Premium", "HBO Max", "Prime Video"],
    answer: "ATRESplayer Premium"
  },
  {
    question: "¿Qué frase icónica salva Supremme de Luxe a la reina nominada cada episodio?",
    options: ["¡Weeeeerk!", "Shantay, te quedas", "Sashay, te vas", "La más... ¡draga!"],
    answer: "Shantay, te quedas"
  },
  {
    question: "¿Cuál es la única drag canaria en ganar algún reto?",
    options: ["Drag Vulcano", "Drag Sethlas", "Drag Chuchi", "Dita Dubois"],
    answer: "Drag Sethlas"
  },
  {
    question: "¿Qué celebridad NO ha sido imitada en el Snatch Game?",
    options: ["Bárbara Rey", "Mario Vaquerizo", "Pablo Motos", "Carmen Lomana"],
    answer: "Pablo Motos"
  },
  {
    question: "¿Qué se utiliza en Drag Race España para un lip sync?",
    options: ["Coreografía", "Emociones", "Vestuario", "Todas las anteriores"],
    answer: "Todas las anteriores"
  },
  {
    question: "¿Quién tenía la 'Reina de la Suerte' en la temporada 4, que le salvó de hacer el lip sync?",
    options: ["La Bella Vampi", "Angelita La Perversa", "La Niña Delantro", "Le Cocó"],
    answer: "La Bella Vampi"
  },
  {
    question: "¿Cuál es la reina conocida por ir 'como un cuadro'?",
    options: ["Shani LaSanta", "Arantxa Castilla-La Mancha", "Hugáceo Crujiente", "Pink Chadora"],
    answer: "Hugáceo Crujiente"
  },
  {
    question: "¿A quién le dijo Juriji Der Klee 'no te hablo por cerda y por falsa'?",
    options: ["Estrella Xtravaganza", "Marina", "Sharonne", "Venedita Von Däsh"],
    answer: "Marina"
  },
  {
    question: "¿Cómo se llama el programa de entrevistas relacionado con Drag Race España?",
    options: ["¡Dragón!", "Drag Race Aftershow", "El Drag Debate", "Tras la Carrera"],
    answer: "Tras la Carrera"
  }
];

let currentQuestion = 0;
let score = 0;

// Obtener los elementos del DOM
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const questionCounterEl = document.getElementById('question-counter');

// Función para mostrar las preguntas
function showQuestion() {
  // Limpiar el fondo de los botones antes de cargar una nueva pregunta
  document.querySelectorAll('#options button').forEach(button => {
    button.classList.remove('bg-green-300', 'bg-red-300');
  });

  // Ocultar el botón "Siguiente" al inicio
  nextBtn.classList.add('hidden');

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  questionCounterEl.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  optionsEl.innerHTML = '';

  // Crear los botones de respuesta para cada opción de la pregunta
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'w-full bg-white text-gray-800 border border-gray-300 rounded py-2';

    // Acción cuando el usuario hace clic en una opción
    btn.onclick = () => {
      // Desactivar todos los botones de respuesta después de seleccionar una opción
      document.querySelectorAll('#options button').forEach(b => b.disabled = true);

      // Si la respuesta es correcta o incorrecta, aplicar el feedback visual
      if (option === q.answer) {
        btn.classList.add('bg-green-300');
        score++;
      } else {
        btn.classList.add('bg-red-300');
      }

      // Mostrar la respuesta correcta en verde, aunque el usuario haya fallado
      document.querySelectorAll('#options button').forEach(b => {
        if (b.textContent === q.answer && !b.classList.contains('bg-green-300')) {
          b.classList.add('bg-green-300');
        }
      });

      // Mostrar el botón "Siguiente" solo después de seleccionar una opción
      nextBtn.classList.remove('hidden');

      // Eliminar el hover después de seleccionar una opción
      document.querySelectorAll('#options button').forEach(button => {
        button.classList.remove('hover:bg-pink-200');
      });
    };

    optionsEl.appendChild(btn);
  });

  // Mostrar hover solo cuando el botón "Siguiente" está oculto (antes de seleccionar una opción)
  if (nextBtn.classList.contains('hidden')) {
    document.querySelectorAll('#options button').forEach(button => {
      button.classList.add('hover:bg-pink-200');
    });
  }
}

// Lógica del botón "Siguiente"
nextBtn.onclick = () => {
  currentQuestion++; // Avanzar a la siguiente pregunta
  if (currentQuestion < questions.length) {
    showQuestion(); // Mostrar la siguiente pregunta
  } else {
    // Si no quedan más preguntas, mostrar el resultado final
    document.getElementById('quiz-container').style.display = 'none';

    // Cambiar el fondo del resultado según la puntuación
    if (score <= 4) {
      resultEl.classList.add('bg-red-300'); // Fondo rojo para puntuación baja
      resultEl.classList.add('text-red-700'); // Texto rojo para puntuación baja
      resultEl.classList.remove('bg-green-100'); // Asegurarse de que el fondo verde no esté aplicado
      resultEl.classList.remove('text-green-700'); // Asegurarse de que el texto verde no esté aplicado
      resultEl.innerHTML = `¡Has terminado! Tu puntuación es <strong>${score} de ${questions.length}</strong><br>Sashay... te vas.`; // Mensaje de baja puntuación
    } else {
      resultEl.innerHTML = `¡Has terminado! Tu puntuación es <strong>${score} de ${questions.length}</strong> 👑✨<br>¡Shantay, te quedas!`; // Mensaje de alta puntuación
    }

    // Mostrar el resultado
    resultEl.classList.remove('hidden');
  }
};

// Inicializar la primera pregunta cuando la página cargue
window.onload = showQuestion;

// Lógica para el botón "Ver más"
document.addEventListener('DOMContentLoaded', () => {
  const showMoreBtn = document.getElementById('show-more-btn');
  const hiddenSections = document.querySelectorAll('.container .hidden');
  let currentIndex = 0;

  // Añadir un evento de clic al botón "Ver más"
  showMoreBtn.addEventListener('click', () => {
    // Si hay más secciones para mostrar
    if (currentIndex < hiddenSections.length) {
      hiddenSections[currentIndex].classList.remove('hidden'); // Mostrar la siguiente sección
      currentIndex++;
    }

    // Si ya no quedan más secciones, ocultar el botón "Ver más"
    if (currentIndex === (hiddenSections.length - 2)) {
      showMoreBtn.classList.add('hidden');
    }
  });
});

// Lógica para el reproductor de audio
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playImg = document.getElementById('play-img'); // Obtener la imagen del botón

audioPlayer.volume = 0.04; // Ajustar volumen al mínimo

// Controlar la reproducción del audio
playBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playImg.src = 'src/images/cd.gif'; // Cambiar imagen a 'cd.gif' cuando se está reproduciendo
  } else {
    audioPlayer.pause();
    playImg.src = 'src/images/play.gif'; // Cambiar imagen a 'play.gif' cuando se pausa
  }
});

