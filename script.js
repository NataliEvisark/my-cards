
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

    // Функция для копирования текста в буфер обмена
    function copyToClipboard(text) {
        // Создаем временный элемент textarea
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Выделяем текст и копируем
        textarea.select();
        textarea.setSelectionRange(0, 99999); // Для мобильных устройств
        
        try {
            document.execCommand('copy');
            showNotification('Скопировано: ' + text);
        } catch (err) {
            alert('Не удалось скопировать. Скопируйте вручную: ' + text);
        }
        
        // Удаляем временный элемент
        document.body.removeChild(textarea);
    }

    // Функция для показа уведомления
    function showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            z-index: 1000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем через 2 секунды
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
        }
    `;
    document.head.appendChild(style);

    // Добавляем обработчик клика на информационные блоки
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach(item => {
        item.addEventListener('click', function() {
            const textElement = this.querySelector('span');
            if (!textElement) return;
            
            const text = textElement.textContent;
            
            // Проверяем, содержит ли текст email или телефон
            if (text.includes('@') || text.includes('+7') || text.includes('(') && text.includes(')')) {
                // Очищаем текст от лишних символов для копирования
                let cleanText = text;
                
                // Если это телефон, убираем пробелы и скобки для звонка
                if (text.includes('+7')) {
                    // Для отображения оставляем как есть, для копирования очищаем
                    cleanText = text.replace(/[\s\(\)\-]/g, '');
                }
                
                copyToClipboard(cleanText);
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
