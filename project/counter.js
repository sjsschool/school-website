// Initialize counters when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        let count = 0;
        const updateDisplay = () => {
            counter.textContent = count.toLocaleString();
        };
        
        // Simulate counting animation
        const targetCount = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 2000; // 2 seconds
        const steps = 50;
        const increment = targetCount / steps;
        
        const interval = setInterval(() => {
            count = Math.min(count + increment, targetCount);
            updateDisplay();
            
            if (count >= targetCount) {
                clearInterval(interval);
            }
        }, duration / steps);
    });
});
