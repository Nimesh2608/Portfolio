// Mobile menu
const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav-links');
if (toggle) {
    toggle.onclick = () => {
        nav.classList.toggle('active');
        const icon = toggle.querySelector('i');
        icon.classList.toggle('fa-times');
        icon.classList.toggle('fa-bars');
    };
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.onclick = () => {
            nav.classList.remove('active');
            toggle.querySelector('i').className = 'fas fa-bars';
        };
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.onclick = e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target && a.getAttribute('href') !== '#') {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };
});

// Scroll animations
new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 })
    .observeAll = els => els.forEach(el => el && observer.observe(el));
const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold: 0.1 });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Back to top
const topBtn = document.querySelector('.back-to-top');
onscroll = () => topBtn && (topBtn.classList.toggle('visible', scrollY > 400));
topBtn && (topBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' }));

// Lightbox
const lb = document.getElementById('lightbox');
const img = document.getElementById('lightbox-img');
const cap = document.getElementById('lightbox-caption');
document.querySelectorAll('.gallery-item').forEach(item => {
    item.onclick = () => {
        img.src = item.dataset.src;
        cap.innerText = item.querySelector('.caption')?.innerText || '';
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
});
lb && (document.querySelector('.lightbox-close').onclick = () => lb.classList.remove('active') && (document.body.style.overflow = ''));
lb && (lb.onclick = e => e.target === lb && (lb.classList.remove('active'), document.body.style.overflow = ''));
onkeydown = e => e.key === 'Escape' && lb && lb.classList.contains('active') && (lb.classList.remove('active'), document.body.style.overflow = '');

// Active nav highlight
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];
onscroll = () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (scrollY >= top && scrollY < top + section.clientHeight) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
};