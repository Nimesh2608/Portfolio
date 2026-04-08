// Mobile navigation toggle
const toggleBtn = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = toggleBtn.querySelector('i');
        icon.classList.toggle('fa-times');
        icon.classList.toggle('fa-bars');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target && anchor.getAttribute('href') !== '#') {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll animations (Intersection Observer)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('.gallery-item');

if (lightbox && galleryItems.length) {
    const openLightbox = (src, caption) => {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(item.dataset.src, item.querySelector('.caption')?.textContent || '');
        });
    });

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => e.target === lightbox && closeLightbox());
    document.addEventListener('keydown', e => e.key === 'Escape' && lightbox.classList.contains('active') && closeLightbox());
}

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (scrollY >= top && scrollY < top + section.clientHeight) current = section.id;
    });
    navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});