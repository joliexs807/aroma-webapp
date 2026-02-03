// Тема
function toggleTheme(){
  document.body.classList.toggle('light');
}

// Аккордеон
const accBtns = document.querySelectorAll('.accordion-btn');
accBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const content = btn.nextElementSibling;
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
    // Закрыть все
    document.querySelectorAll('.accordion-content').forEach(c=>c.style.maxHeight = null);
    // Открыть выбранный
    if(!isOpen){
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.padding = '10px 20px';
    }
  });
});

// Кнопка «Я понимаю»
document.getElementById('acceptRulesBtn').addEventListener('click', ()=>{
  window.location.href = 'profile.html'; // Или основной экран
});
