document.addEventListener('DOMContentLoaded', function() {
        const slides = document.querySelectorAll('.main-slide');
        const preview = document.querySelector('.slide-preview');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicators = document.querySelectorAll('.indicator');
            
        let currentIndex = 0;
        const totalSlides = slides.length;
        let isAnimating = false;

        // Inicializa a prévia
        updatePreview();

        // Navegação
        nextBtn.addEventListener('click', goToNextSlide);
        prevBtn.addEventListener('click', goToPrevSlide);

        // Navegação por indicadores
    indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                const targetIndex = parseInt(this.dataset.index);
                    if (targetIndex !== currentIndex && !isAnimating) {
                        goToSlide(targetIndex);
                    }
                });
            });

            // Teclado
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight') goToNextSlide();
                else if (e.key === 'ArrowLeft') goToPrevSlide();
            });

        // Touch (swipe)
        let touchStartX = 0;
            document.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});

            document.addEventListener('touchend', function(e) {
                const touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (diff > 50) goToNextSlide();
                else if (diff < -50) goToPrevSlide();
            }, {passive: true});

            function goToNextSlide() {
                if (isAnimating) return;
                const nextIndex = (currentIndex + 1) % totalSlides;
                goToSlide(nextIndex);
            }

            function goToPrevSlide() {
                if (isAnimating) return;
                const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                goToSlide(prevIndex);
            }

            function goToSlide(newIndex) {
                isAnimating = true;
                
                // Desativa slide atual
                slides[currentIndex].classList.remove('active');
                indicators[currentIndex].classList.remove('active');
                
                // Ativa novo slide
                slides[newIndex].classList.add('active');
                indicators[newIndex].classList.add('active');
                
                // Atualiza índice
                currentIndex = newIndex;
                
                // Atualiza prévia
                updatePreview();
                
                // Permite nova animação
                setTimeout(() => {
                    isAnimating = false;
                }, 1000);
            }

            function updatePreview() {
                const nextIndex = (currentIndex + 1) % totalSlides;
                const nextImg = slides[nextIndex].querySelector('img').src;
                const nextAlt = slides[nextIndex].querySelector('img').alt;
                preview.querySelector('img').src = nextImg;
                preview.querySelector('img').alt = "Próximo: " + nextAlt.split('-')[0];
            }
        });

