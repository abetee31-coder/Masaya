// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// Button click handlers
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const btnText = this.textContent.toLowerCase();

        if (btnText.includes('line')) {
            console.log('LINE で相談する - LINEアプリを開く処理');
            // LINE公式アカウントのURLに置き換える
            // window.open('https://line.me/R/ti/p/@YOUR_ACCOUNT_ID', '_blank');
            alert('LINEで相談するボタンがクリックされました');
        } else if (btnText.includes('電話')) {
            console.log('お電話で相談 - 電話をかける処理');
            // tel:リンクを使用
            // window.location.href = 'tel:+81312345678';
            alert('お電話で相談するボタンがクリックされました');
        } else if (btnText.includes('問い合わせ')) {
            console.log('お問い合わせボタンがクリックされました');
            // const contactSection = document.querySelector('#contact');
            // contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation to elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .example-card, .step, .faq-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation styles
document.querySelectorAll('.feature-card, .example-card, .step, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Responsive hamburger menu (for future mobile navigation enhancement)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header .container');

    if (window.innerWidth <= 768) {
        if (!document.querySelector('.hamburger-menu')) {
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger-menu';
            hamburger.innerHTML = '☰';
            hamburger.style.cursor = 'pointer';
            hamburger.style.fontSize = '24px';
            hamburger.style.display = 'block';
            header.appendChild(hamburger);

            hamburger.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }
};

window.addEventListener('resize', createMobileMenu);
window.addEventListener('load', createMobileMenu);
