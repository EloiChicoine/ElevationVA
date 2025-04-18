document.addEventListener('DOMContentLoaded', function() {
    // Quote slider functionality
    const slider = document.querySelector('.quote-slider');
    const cards = document.querySelectorAll('.quote-card');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    const cardsToShow = 2;
    
    function updateSlider() {
        cards.forEach(card => {
            card.style.display = 'none';
            card.style.transform = 'translateX(0)';
        });
        
        for (let i = 0; i < cardsToShow; i++) {
            if (cards[currentIndex + i]) {
                cards[currentIndex + i].style.display = 'block';
                if (i === 1) {
                    cards[currentIndex + i].style.transform = 'translateX(30px)';
                }
            }
        }
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex/2));
        });
        
        leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
        rightArrow.style.display = currentIndex >= cardCount - cardsToShow ? 'none' : 'block';
    }
    
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= cardsToShow;
            if (currentIndex < 0) currentIndex = 0;
            updateSlider();
        }
    });
    
    rightArrow.addEventListener('click', () => {
        if (currentIndex < cardCount - cardsToShow) {
            currentIndex += cardsToShow;
            updateSlider();
        }
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index * cardsToShow;
            updateSlider();
        });
    });
    
    updateSlider();

    // Process items toggle functionality
    const processItems = document.querySelectorAll('.process-item');
    
    processItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the content element that follows this item
            const content = this.nextElementSibling;
            const icon = this.querySelector('.arrow-icon');
            
            // Toggle the content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = '0 20px';
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '10px 20px';
                icon.style.transform = 'rotate(90deg)';
            }
        });
    });
});



