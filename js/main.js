// ==================== Onboarding ====================

let currentScreen = null;
let points = 5; 
let role = null;

const questions = [
  { text: "Что тебя радует в этот момент?", options: ["Хочу поговорить", "Хочу молчать"] },
  { text: "Что тебе приносит спокойствие?", options: ["Природа", "Творчество"] },
  { text: "Как ты предпочитаешь проводить время?", options: ["С друзьями", "Наедине с собой"] },
  { text: "Что тебя вдохновляет?", options: ["Музыка", "Книги"] },
  { text: "Чему ты радуешься чаще всего?", options: ["Маленькие радости", "Большие события"] }
];

let currentQuestionIndex = 0;

function showScreen(id){
  if(currentScreen) currentScreen.classList.remove('show');
  currentScreen = document.getElementById(id);
  currentScreen.classList.add('show');
}

function nextScreen(id){ showScreen(id); }

function selectRole(selectedRole){
  role = selectedRole;
  nextScreen('questionsScreen');
  loadQuestion();
}

function loadQuestion(){
  const question = questions[currentQuestionIndex];
  document.getElementById('questionNumber').innerText = `Вопрос ${currentQuestionIndex+1} из ${questions.length}`;
  document.getElementById('questionText').innerText = question.text;
  document.getElementById('option1').innerText = question.options[0];
  document.getElementById('option2').innerText = question.options[1];
  document.getElementById('customAnswer').value = '';
}

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

function goToProfile(){ window.location.href = 'profile.html'; }

function toggleTheme(){ document.body.classList.toggle('light'); }

// ==================== Profile ====================

const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatarPreview');
if(avatarInput){
  avatarInput.addEventListener('change', e=>{
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(ev){ avatarPreview.style.backgroundImage = `url(${ev.target.result})`; }
      reader.readAsDataURL(file);
    }
  });
}

const saveBtn = document.getElementById('saveProfileBtn');
const saveMsg = document.getElementById('saveMessage');
if(saveBtn){
  saveBtn.addEventListener('click', ()=>{
    localStorage.setItem('nickname', document.getElementById('nickname').value);
    localStorage.setItem('hobbies', document.getElementById('hobbies').value);
    localStorage.setItem('music', document.getElementById('music').value);
    localStorage.setItem('about', document.getElementById('about').value);
    saveMsg.innerText = "Профиль сохранён!";
    setTimeout(()=>saveMsg.innerText="",2000);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('nickname') && localStorage.getItem('nickname')) document.getElementById('nickname').value = localStorage.getItem('nickname');
  if(document.getElementById('hobbies') && localStorage.getItem('hobbies')) document.getElementById('hobbies').value = localStorage.getItem('hobbies');
  if(document.getElementById('music') && localStorage.getItem('music')) document.getElementById('music').value = localStorage.getItem('music');
  if(document.getElementById('about') && localStorage.getItem('about')) document.getElementById('about').value = localStorage.getItem('about');
});
