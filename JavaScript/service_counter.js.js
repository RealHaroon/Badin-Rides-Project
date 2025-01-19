document.addEventListener('DOMContentLoaded', () => {
    // Initial counter animation function
    function animateCounter(element, start, end, duration) {
        let current = start;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = formatNumber(current);
            
            if (current === end) {
                clearInterval(timer);
                // Start continuous increment after initial animation
                startContinuousIncrement(element);
            }
        }, stepTime);
    }

    // Format number with K+ for thousands
    function formatNumber(num) {
        if (num >= 1000) {
            return Math.floor(num/1000) + 'K+';
        }
        return num + '+';
    }

    // Function to continuously increment counter
    function startContinuousIncrement(element) {
        setInterval(() => {
            // Get current number value
            let currentText = element.textContent;
            let currentNum = parseInt(currentText.replace(/[^0-9]/g, ''));
            
            // If number is in K format, multiply by 1000
            if (currentText.includes('K')) {
                currentNum *= 1000;
            }
            
            // Increment by a random amount between 1 and 5
            let increment = Math.floor(Math.random() * 5) + 1;
            let newNum = currentNum + increment;
            
            // Update the display
            element.textContent = formatNumber(newNum);
        }, 2000); // Update every 2 seconds
    }

    // Initialize counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                // Get initial target from text content
                const targetText = counter.textContent.replace(/[^0-9]/g, '');
                let target = parseInt(targetText);
                if (counter.textContent.includes('K')) {
                    target *= 1000;
                }
                animateCounter(counter, 0, target, 2000);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    // Observe all stat-number elements
    document.querySelectorAll('.stat-number').forEach(counter => {
        observer.observe(counter);
    });
});