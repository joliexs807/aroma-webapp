// Тема
function toggleTheme(){
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// Подгрузка темы
window.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.getItem('theme')==='light') document.body.classList.add('light');

  // Профиль
  const nickname = document.getElementById('nickname');
  const hobbies = document.getElementById('hobbies');
  const music = document.getElementById('music');
  const about = document.getElementById('about');
  const avatarInput = document.getElementById('avatar');
  const avatarPreview = document.getElementById('avatarPreview');
  const saveBtn = document.getElementById('saveProfileBtn');
  const userPoints = document.getElementById('userPoints');

  if(userPoints){
    userPoints.textContent = localStorage.getItem('userPoints') || 0;
  }

  if(nickname){
    const saved = JSON.parse(localStorage.getItem('profileData') || '{}');
    if(saved.nickname) nickname.value = saved.nickname;
    if(saved.hobbies) hobbies.value = saved.hobbies;
    if(saved.music) music.value = saved.music;
    if(saved.about) about.value = saved.about;
    if(saved.avatar) avatarPreview.style.backgroundImage = `url(${saved.avatar})`;
  }

  // Аватар
  if(avatarInput){
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
  }

  // Сохранение профиля
  if(saveBtn){
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
  }

  // Аккордеон
  document.querySelectorAll('.accordion-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const content = btn.nextElementSibling;
      const isOpen = content.style.maxHeight && content.style.maxHeight!=='0px';
      document.querySelectorAll('.accordion-content').forEach(c=>{c.style.maxHeight=null; c.style.padding='0 20px';});
      if(!isOpen){content.style.maxHeight = content.scrollHeight+'px'; content.style.padding='10px 20px';}
    });
  });

  // Кнопка правил
  const acceptRulesBtn = document.getElementById('acceptRulesBtn');
  if(acceptRulesBtn){
    acceptRulesBtn.addEventListener('click', ()=>{
      window.location.href='profile.html';
    });
  }

  // Onboarding кнопки выбора
  document.querySelectorAll('.choice-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const role = btn.dataset.role;
      localStorage.setItem('userRole', role);
      alert(`Вы выбрали: ${role}`);
      // Тут можно плавный переход на вопросы
    });
  });
});
