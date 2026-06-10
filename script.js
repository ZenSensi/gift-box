document.addEventListener('DOMContentLoaded', () => {
    const giftContainer = document.getElementById('gift-box-container');
    const interactiveGift = document.getElementById('interactive-gift');
    const surpriseContent = document.getElementById('surprise-content');
    const mainTitle = document.getElementById('main-title');
    const mainSubtitle = document.getElementById('main-subtitle');
    const giftActionBtn = document.getElementById('gift-action-btn');

    let isOpened = false;

    // Trigger opening animation when clicking the gift box
    giftContainer.addEventListener('click', () => {
        if (isOpened) return; // Prevent double-triggering
        
        isOpened = true;
        giftContainer.classList.add('opened');
        
        // Dynamic title text update
        mainTitle.textContent = "Surprise! 🎉";
        mainSubtitle.textContent = "You opened the magic box!";
        mainSubtitle.style.animation = "none"; // Stop blinking instruction
        
        // Phase 1: Sparkles explosion from the box (300ms after clicking)
        setTimeout(() => {
            triggerSparklesExplosion();
        }, 300);

        // Phase 2: Reveal the surprise card (600ms after clicking)
        setTimeout(() => {
            surpriseContent.classList.add('reveal');
            surpriseContent.setAttribute('aria-hidden', 'false');
            giftActionBtn.removeAttribute('tabindex');
            
            // Continuous gentle celebratory confetti rain
            triggerSideCannons();
        }, 600);
    });

    // Fun interaction: Extra mini-confetti burst when clicking the final button
    giftActionBtn.addEventListener('click', (e) => {
        // We let the link open in a new tab normally, but trigger a quick burst first
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 50,
                angle: 90,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#ffe066', '#ff4b72', '#ffffff']
            });
        }
    });

    /**
     * Creates a burst of confetti originating from the center of the gift box
     */
    function triggerSparklesExplosion() {
        const defaults = {
            spread: 360,
            ticks: 150,
            gravity: 1,
            decay: 0.94,
            startVelocity: 30,
            colors: ['#ff4b72', '#ff7597', '#ffe066', '#f5b041', '#ffffff']
        };

        if (typeof confetti === 'function') {
            // Sparkle burst 1
            confetti({
                ...defaults,
                particleCount: 100,
                scalar: 1.2,
                origin: { y: 0.55 }
            });

            // Sparkle burst 2 (smaller, faster particles)
            confetti({
                ...defaults,
                particleCount: 60,
                scalar: 0.75,
                origin: { y: 0.55 }
            });
        }
    }

    /**
     * Runs a continuous stream of side cannons for 2 seconds to make the reveal feel extra celebratory
     */
    function triggerSideCannons() {
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            if (typeof confetti === 'function') {
                // Left cannon
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
                }));
                
                // Right cannon
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
                }));
            }
        }, 250);
    }
});
