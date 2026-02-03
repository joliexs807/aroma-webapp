// Тема
function toggleTheme(){ document.body.classList.toggle('light'); }

// Аватар
const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatarPreview');
avatarInput.addEventListener('change', e=>{
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(ev){ avatarPreview.style.backgroundImage = `url(${ev.target.result})`; }
    reader.readAsDataURL(file);
  }
});

// Сохранение профиля
const saveBtn = document.getElementById('saveProfileBtn');
const saveMsg = document.getElementById('saveMessage');
saveBtn.addEventListener('click', ()=>{
  localStorage.setItem('nickname', document.getElementById('nickname').value);
  localStorage.setItem('hobbies', document.getElementById('hobbies').value);
  localStorage.setItem('music', document.getElementById('music').value);
  localStorage.setItem('about', document.getElementById('about').value);
  saveMsg.innerText = "Профиль сохранён!";
  setTimeout(()=>saveMsg.innerText="",2000);
});

// Загрузка данных при открытии
document.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.getItem('nickname')) document.getElementById('nickname').value = localStorage.getItem('nickname');
  if(localStorage.getItem('hobbies')) document.getElementById('hobbies').value = localStorage.getItem('hobbies');
  if(localStorage.getItem('music')) document.getElementById('music').value = localStorage.getItem('music');
  if(localStorage.getItem('about')) document.getElementById('about').value = localStorage.getItem('about');
});
