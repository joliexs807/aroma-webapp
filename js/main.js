let currentScreen = 1;
let userRole = '';
let questions = [
  {text:"Что тебя радует в этот момент?", options:["Друзья","Музыка","Другое"], allowOther:true},
  {text:"Что вызывает улыбку?", options:["Шутка","Природа","Другое"], allowOther:true},
  {text:"Что важно для тебя сегодня?", options:["Семья","Работа","Другое"], allowOther:true},
  {text:"Чем хочешь заняться?", options:["Учёба","Игры","Другое"], allowOther:true},
  {text:"Что тебе интересно узнать?", options:["Факты","Советы","Другое"], allowOther:true}
];
let currentQuestion = 0;

// Тема
function toggleTheme(){
  document.body.classList.toggle('light');
}

// Выбор роли
function selectRole(role){
  userRole = role;
  localStorage.setItem('userRole', role);
  document.getElementById('roleTitle').textContent = `Ты выбрал ${role}`;
  nextScreen();
}

// Переход на следующий экран
function nextScreen(){
  document.getElementById(`screen${currentScreen}`).classList.remove('show');
  currentScreen++;
  document.getElementById(`screen${currentScreen}`).classList.add('show');

  if(currentScreen===2){
    showQuestion();
  }
}

// Показ вопроса
function showQuestion(){
  if(currentQuestion>=questions.length){
    nextScreen();
    return;
  }
  const q = questions[currentQuestion];
  document.getElementById('questionText').textContent = q.text;
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML='';
  document.getElementById('otherInputContainer').style.display = 'none';

  q.options.forEach(opt=>{
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = ()=>{
      if(opt==="Другое" && q.allowOther){
        document.getElementById('otherInputContainer').style.display='block';
      } else {
        btn.classList.add('selected');
        currentQuestion++;
        updateProgress();
        setTimeout(showQuestion,300);
      }
    }
    answersDiv.appendChild(btn);
  });

  updateProgress();
}

// Сохранение варианта "Другое"
function submitOther(){
  const val = document.getElementById('otherInput').value;
  if(val.trim()==='') return;
  document.getElementById('otherInput').value='';
  document.getElementById('otherInputContainer').style.display='none';
  currentQuestion++;
  updateProgress();
  setTimeout(showQuestion,300);
}

// Прогресс бар
function updateProgress(){
  const bar = document.getElementById('progressBar');
  const percent = (currentQuestion/questions.length)*100;
  bar.style.width = percent+'%';
}

// Переход в профиль
function goToProfile(){
  window.location.href = "profile.html";
}
