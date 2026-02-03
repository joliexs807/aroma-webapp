// Тема
function toggleTheme(){
  document.body.classList.toggle('light');
}

// DOM элементы
const nickname = document.getElementById('nickname');
const hobbies = document.getElementById('hobbies');
const music = document.getElementById('music');
const about = document.getElementById('about');
const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatarPreview');
const saveBtn = document.getElementById('saveProfileBtn');
const userPoints = document.getElementById('userPoints');

// Загрузка данных при старте
window.addEventListener('DOMContentLoaded', ()=>{
  // Баллы
  userPoints.textContent = localStorage.getItem('userPoints') || 0;

  // Данные профиля
  const saved = JSON.parse(localStorage.getItem('profileData') || '{}');
  if(saved.nickname) nickname.value = saved.nickname;
  if(saved.hobbies) hobbies.value = saved.hobbies;
  if(saved.music) music.value = saved.music;
  if(saved.about) about.value = saved.about;
  if(saved.avatar) avatarPreview.style.backgroundImage = `url(${saved.avatar})`;
});

// Загрузка аватара
avatarInput.addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(evt){
      avatarPreview.style.backgroundImage = `url(${evt.target.result})`;
      localStorage.setItem('profileData', JSON.stringify({
        ...JSON.parse(localStorage.getItem('profileData')||'{}'),
        avatar: evt.target.result
      }));
    }
    reader.readAsDataURL(file);
  }
});

// Сохранение профиля
saveBtn.addEventListener('click', ()=>{
  const data = {
    nickname: nickname.value,
    hobbies: hobbies.value,
    music: music.value,
    about: about.value,
    avatar: avatarPreview.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
  };
  localStorage.setItem('profileData', JSON.stringify(data));
  alert('Профиль сохранён! ✨');
});
