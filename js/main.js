// Тема
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// Подгрузка темы
window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('theme')==='light') document.body.classList.add('light');

  // Экран выбора роли
  const roleScreen = document.getElementById('roleScreen');
  const questionsScreen = document.getElementById('questionsScreen');
  const choiceBtns = document.querySelectorAll('.choice-btn');

  let userRole = null;
  choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      userRole = btn.dataset.role;
      localStorage.setItem('userRole', userRole);

      // Плавный переход на экран вопросов
      roleScreen.classList.remove('show');
      questionsScreen.classList.add('show');

      startQuestions();
    });
  });

  // Вопросы
  const questions = [
    {text: "Что тебя радует в этот момент?", options:["Светлое", "Темное"]},
    {text: "Что тебя сегодня вдохновляет?", options:["Природа", "Люди"]},
    {text: "Что тебе хочется сделать прямо сейчас?", options:["Поговорить", "Помолчать"]},
    {text: "Что приносит тебе радость?", options:["Маленькое", "Большое"]},
    {text: "Чем ты хочешь поделиться с другими?", options:["История", "Мысль"]}
  ];

  let currentQuestion = 0;
  const questionTitle = document.getElementById('questionTitle');
  const questionText = document.getElementById('questionText');
  const nextBtn = document.querySelector('.next-btn');
  const customInput = document.getElementById('customAnswer');
  const answerBtns = document.querySelectorAll('.answer-btn');

  const userAnswers = [];

  function startQuestions() {
    showQuestion(currentQuestion);
  }

  function showQuestion(index) {
    const q = questions[index];
    questionTitle.textContent = `Вопрос ${index + 1}`;
    questionText.textContent = q.text;
    answerBtns[0].textContent = q.options[0];
    answerBtns[1].textContent = q.options[1];
    customInput.value = "";
  }

  answerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.push(btn.textContent);
      nextQuestion();
    });
  });

  nextBtn.addEventListener('click', () => {
    if(customInput.value.trim() !== "") {
      userAnswers.push(customInput.value.trim());
      nextQuestion();
    } else {
      alert("Введите свой вариант ответа или выберите один из вариантов.");
    }
  });

  function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < questions.length) {
      showQuestion(currentQuestion);
    } else {
      // Все вопросы отвечены, начисляем баллы и идем в профиль
      localStorage.setItem('userPoints', 5); // одинаково для всех новичков
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      window.location.href = 'profile.html';
    }
  }
});
