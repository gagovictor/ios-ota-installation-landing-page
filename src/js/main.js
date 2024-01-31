document.addEventListener('DOMContentLoaded', () => {
    
    const triggerAnimations = () => {
        // Trigger animations
        const card = document.querySelector('.card');
        if (card) {
            card.classList.add('show');
        }
    };
    
    triggerAnimations();
});
