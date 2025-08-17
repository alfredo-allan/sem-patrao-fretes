class SemPatraoFretes {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 2;
        this.slideInterval = null;
        this.whatsappNumber = '5511981653125'; // Número do Mário
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startSlider();
        this.updateYear();
        this.showWelcomeModal();
        this.loadTheme();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        // Name input formatting
        document.getElementById('customerName').addEventListener('input', (e) => {
            this.formatName(e);
        });

        // Slider navigation
        document.querySelectorAll('.nav-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.goToSlide(parseInt(e.target.dataset.slide));
            });
        });

        // Intersection Observer for animations
        this.setupScrollAnimations();
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.getElementById('themeIcon');
        const themeText = document.getElementById('themeText');

        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Modo Escuro';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Modo Claro';
            localStorage.setItem('theme', 'dark');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            document.getElementById('themeIcon').className = 'fas fa-sun';
            document.getElementById('themeText').textContent = 'Modo Claro';
        }
    }

    formatName(e) {
        let value = e.target.value;
        // Remove caracteres especiais e números
        value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        // Capitaliza primeira letra de cada palavra
        value = value.replace(/\b\w/g, l => l.toUpperCase());
        e.target.value = value;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('customerName').value.trim();

        if (name.length < 2) {
            alert('Por favor, digite seu nome completo.');
            return;
        }

        const message = `Olá Mário! Sou ${name} e gostaria de contratar um frete.`;
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Animação do botão
        const btn = e.target.querySelector('.btn-whatsapp');
        btn.innerHTML = '<span><i class="fas fa-spinner fa-spin me-2"></i>Abrindo WhatsApp...</span>';

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            btn.innerHTML = '<span><i class="fab fa-whatsapp me-2"></i>Falar com Mário no WhatsApp</span>';
        }, 1000);
    }

    startSlider() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider();

        // Restart interval
        clearInterval(this.slideInterval);
        this.startSlider();
    }

    updateSlider() {
        const container = document.getElementById('sliderContainer');
        const dots = document.querySelectorAll('.nav-dot');

        container.style.transform = `translateX(-${this.currentSlide * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    updateYear() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    }

    showWelcomeModal() {
        setTimeout(() => {
            const modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
            modal.show();
        }, 800);
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.dataset.delay = index * 200;
            observer.observe(card);
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new SemPatraoFretes();
});
