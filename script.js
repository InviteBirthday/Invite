// ОТПРАВКА ФОРМЫ С БЛОКИРОВКОЙ КНОПКИ
const form = document.getElementById('partyForm');
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx1Z5k_g1lZZyqtfQaJ3LFtAAG3A5j-OsWQLQxqVIb9jIqw3D4Qv6IBD37yGzU1XbIl/exec';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Находим кнопку
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // БЛОКИРУЕМ КНОПКУ
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляю...';
    submitButton.style.opacity = '0.6';
    submitButton.style.cursor = 'wait';
    
    const data = {
        name: document.getElementById('name').value,
        choice: document.querySelector('input[name="choice"]:checked')?.value,
    };
    
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        
        alert('Спасибо! Ответ сохранён 🎉');
        form.reset();
        
        // Разблокируем кнопку после успешной отправки
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка. Попробуйте ещё раз.');
        
        // Разблокируем кнопку при ошибке
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
    }
});

// ТАЙМЕР
function updateTimer() {
    const targetDate = new Date("May 30, 2026 18:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "ПИР НАЧАЛСЯ!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
}

setInterval(updateTimer, 1000);
updateTimer();

// АНИМАЦИЯ ПРИ ПРОКРУТКЕ
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 120;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    checkReveal();
    window.addEventListener('scroll', checkReveal);
});