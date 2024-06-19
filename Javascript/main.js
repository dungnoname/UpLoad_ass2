document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Thời gian cuộn tính bằng mili giây (2000ms = 2s)
            let start = null;

            window.requestAnimationFrame(step);

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const progressRatio = Math.min(progress / duration, 1); // Tỷ lệ tiến trình, giới hạn ở 1
                const easeInOutQuad = progressRatio < 0.5
                    ? 2 * progressRatio * progressRatio
                    : -1 + (4 - 2 * progressRatio) * progressRatio; // Hàm easing "easeInOutQuad"
                window.scrollTo(0, startPosition + distance * easeInOutQuad);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
        }
    });
});