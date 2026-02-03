let currentScreen = null;
let points = 5;

function showScreen(id){
  if(currentScreen) currentScreen.classList.remove('show');
  currentScreen = document.getElementById(id);
  currentScreen.classList.add('show');
}

function nextScreen(id){ showScreen(id); }

function selectRole(role){
  console.log('Выбрана роль:', role);
  nextScreen('questionsScreen');
}

let questionCount = 1;
function nextQuestion(){
  if(questionCount < 5){
    questionCount++;
    document.querySelector('#questionsScreen h2').innerText = `Вопрос ${questionCount} из 5`;
  } else {
    document.getElementById('finalPoints').innerText = points;
    nextScreen('endScreen');
  }
}

function goToProfile(){ window.location.href = 'profile.html'; }

function toggleTheme(){
  document.body.classList.toggle('light');
}

/* --- Аватар --- */
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

/* --- Сохранение профиля --- */
const saveBtn = document.getElementById('saveProfileBtn');
if(saveBtn){
  saveBtn.addEventListener('click', ()=>{
    localStorage.setItem('nickname', document.getElementById('nickname').value);
    localStorage.setItem('hobbies', document.getElementById('hobbies').value);
    localStorage.setItem('music', document.getElementById('music').value);
    localStorage.setItem('about', document.getElementById('about').value);
    document.getElementById('saveMessage').innerText = "Профиль сохранён!";
    setTimeout(()=>document.getElementById('saveMessage').innerText="",2000);
  });

  // Загрузка сохранённого профиля при открытии
  document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('nickname')) document.getElementById('nickname').value = localStorage.getItem('nickname');
    if(localStorage.getItem('hobbies')) document.getElementById('hobbies').value = localStorage.getItem('hobbies');
    if(localStorage.getItem('music')) document.getElementById('music').value = localStorage.getItem('music');
    if(localStorage.getItem('about')) document.getElementById('about').value = localStorage.getItem('about');
  });
}

/* --- Аккордеон правил --- */
const accordions = document.querySelectorAll('.accordion-btn');
accordions.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const content = btn.nextElementSibling;
    if(content.style.maxHeight) content.style.maxHeight = null;
    else content.style.maxHeight = content.scrollHeight + "px";
  });
});
