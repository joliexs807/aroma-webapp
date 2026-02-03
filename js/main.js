// Theme
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');
}

window.addEventListener('DOMContentLoaded',()=>{
  const t = localStorage.getItem('theme')||'dark';
  if(t==='light') document.body.classList.add('light');
});

// Onboarding logic
let role=''; let history=[]; let questionIndex=0; let currentQuestion=null;

const questions={
  'Душа': [
    {text:'Что сейчас больше всего шумит внутри тебя?',answers:['Хочу говорить','Хочу молчать'],allowOther:true},
    {text:'Что тебя радует в этот момент?',answers:['Семья','Творчество'],allowOther:true},
    {text:'Кому бы ты хотел довериться?',answers:['Друзьям','Сам себе'],allowOther:false},
    {text:'Что бы ты хотел изменить прямо сейчас?',answers:['Эмоции','Действия'],allowOther:false},
    {text:'Чем хочешь поделиться?',answers:['История','Совет'],allowOther:false}
  ],
  'Свет': [
    {text:'Чем хочешь поделиться сегодня?',answers:['Делиться светом','Помогать другим'],allowOther:true},
    {text:'Что вдохновляет тебя быть светом?',answers:['Добро','Любовь'],allowOther:false},
    {text:'Как хочешь помогать?',answers:['Советом','Действием'],allowOther:false},
    {text:'Кому важнее всего помочь?',answers:['Близким','Незнакомым'],allowOther:false},
    {text:'Что хочешь оставить после себя?',answers:['Свет','Энергию'],allowOther:false}
  ]
};

function fadeOut(el,cb){el.classList.remove('show'); setTimeout(cb,500);}
function fadeIn(el){el.classList.add('show');}

function selectRole(r){
  role=r;
  history.push(`Выбрана роль: ${role}`);
  questionIndex=0;
  showQuestion();
  fadeOut(document.getElementById('screen1'),()=>fadeIn(document.getElementById('screen2')));
}

function showQuestion(){
  currentQuestion=questions[role][questionIndex];
  document.getElementById('roleTitle').textContent=`Ты выбрал: ${role}`;
  document.getElementById('questionText').textContent=currentQuestion.text;
  const ansDiv=document.getElementById('answers'); ansDiv.innerHTML='';
  currentQuestion.answers.forEach(a=>{
    const btn=document.createElement('button');
    btn.textContent=a;
    btn.onclick=()=>answerSelected(a);
    ansDiv.appendChild(btn);
  });
  document.getElementById('otherInputContainer').style.display=currentQuestion.allowOther?'block':'none';
}

function answerSelected(ans){history.push(`Вопрос ${questionIndex+1}: ${ans}`); nextQuestion();}
function submitOther(){const val=document.getElementById('otherInput').value.trim(); if(!val) return; history.push(`Вопрос ${questionIndex+1}: ${val}`); document.getElementById('otherInput').value=''; nextQuestion();}
function nextQuestion(){questionIndex++; if(questionIndex>=questions[role].length){fadeOut(document.getElementById('screen2'),()=>fadeIn(document.getElementById('screen3')));} else showQuestion();}
function goToProfile(){
  localStorage.setItem('userRole',role);
  localStorage.setItem('history',JSON.stringify(history));
  localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');
  window.location.href='profile.html';
}
