/* folhas */
        const leaves = document.querySelector('.leaves');
        setInterval(() => {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.textContent = '🍂';
            leaf.style.left = Math.random() * 100 + 'vw';
            leaf.style.fontSize = 14 + Math.random() * 20 + 'px';
            leaf.style.animationDuration = 5 + Math.random() * 5 + 's';
            leaves.appendChild(leaf);
            setTimeout(() => leaf.remove(), 10000);
        }, 300);

       
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: .3 });

        document.querySelectorAll('.reveal-top, .reveal-left').forEach(el => observer.observe(el));

        
        const cards = document.querySelectorAll('.card');
        const cardsObs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                cards.forEach((card, i) => {
                    setTimeout(() => card.classList.add('show'), i * 200);
                });
                cardsObs.disconnect();
            }
        }, { threshold: .3 });

        cardsObs.observe(document.querySelector('.cards'));

        document.querySelectorAll('.cultura-item');
        const culturaObs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                culturaItems.forEach((item, i) => {
                    setTimeout(() => item.classList.add('show'), i * 180);
                });
                culturaObs.disconnect();
            }
        }, { threshold: .3 });

        culturaObs.observe(culturaItems[0]);