// Текущий экран
let currentScreen = null;
let points = 5; // всем новичкам одинаково
let role = null;

// Вопросы
const questions = [
  { text: "Что тебя радует в этот момент?", options: ["Хочу поговорить", "Хочу молчать"] },
  { text: "Что тебе приносит спокойствие?", options: ["Природа", "Творчество"] },
  { text: "Как ты предпочитаешь проводить время?", options: ["С друзьями", "Наедине с собой"] },
  { text: "Что тебя вдохновляет?", options: ["Музыка", "Книги"] },
  { text: "Чему ты радешься чаще всего?", options: ["Маленькие радости", "Большие события"] }
];

let currentQuestionIndex = 0;

// Показать экран
function showScreen(id){
  if(currentScreen) currentScreen.classList.remove('show');
  currentScreen = document.getElementById(id);
  currentScreen.classList.add('show');
}

// Переход на следующий экран
function nextScreen(id){ showScreen(id); }

// Выбор роли
function selectRole(selectedRole){
  role = selectedRole;
  nextScreen('questionsScreen');
  loadQuestion();
}

// Загрузка вопроса
function loadQuestion(){
  const question = questions[currentQuestionIndex];
  document.getElementById('questionNumber').innerText = `Вопрос ${currentQuestionIndex+1} из ${questions.length}`;
  document.getElementById('questionText').innerText = question.text;

  const buttons = document.querySelectorAll('.answer-btn');
  buttons[0].innerText = question.options[0];
  buttons[1].innerText = question.options[1];

  document.getElementById('customAnswer').value = '';
}

// Отправка ответа
function submitAnswer(answer){
  const custom = document.getElementById('customAnswer').value;
  console.log(`Ответ на вопрос ${currentQuestionIndex+1}:`, custom || answer);
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    loadQuestion();
  } else {
    document.getElementById('finalPoints').innerText = points;
    nextScreen('endScreen');
  }
}

// Переход в профиль
function goToProfile(){ window.location.href = 'profile.html'; }

// Темная/светлая тема
function toggleTheme(){
  document.body.classList.toggle('light');
}
