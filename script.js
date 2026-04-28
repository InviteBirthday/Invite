const form = document.getElementById('partyForm');
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx1Z5k_g1lZZyqtfQaJ3LFtAAG3A5j-OsWQLQxqVIb9jIqw3D4Qv6IBD37yGzU1XbIl/exec';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('name').value,
        choice: document.querySelector('input[name="choice"]:checked')?.value,
    };
    
    const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',  // важно для работы без CORS проблем
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    
    alert('Спасибо! Ответ сохранён 🎉');
    form.reset();
});



function updateTimer() {
    // Укажи здесь нужный год
    const targetDate = new Date("May 30, 2026 18:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "ПИР НАЧАЛСЯ!";
        return;
    }

    // Расчет времени
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Вывод в HTML
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
}

// Запускаем каждую секунду
setInterval(updateTimer, 1000);
updateTimer(); // И один раз при загрузке


// Анимация при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    // Выбираем все элементы с классом .reveal
    const revealElements = document.querySelectorAll('.reveal');
    
    // Функция проверки, виден ли элемент
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 120; // На сколько пикселей элемент должен появиться (чем меньше, тем раньше)
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Запускаем при загрузке
    checkReveal();
    
    // Запускаем при прокрутке
    window.addEventListener('scroll', checkReveal);
});