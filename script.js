// Ждём, пока загрузится вся страница
document.addEventListener('DOMContentLoaded', function() {
    
    // Находим все социальные ссылки
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Добавляем анимацию при наведении
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });

    // Добавляем возможность клика на информацию (для мобильных)
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            if (text.includes('@') || text.includes('+7')) {
                alert(`Скопировано: ${text}`);
                // Здесь можно добавить копирование в буфер обмена
            }
        });
    });

    // Плавное появление карточки
    const card = document.querySelector('.card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);

});