// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*=============== THEME TOGGLE ===============*/
// No stored choice means the theme is coming from the OS preference, so we read
// that to work out what the visitor is actually looking at before flipping it.
const themeToggle = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

const currentTheme = () => {
    const explicit = rootElement.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

themeToggle.addEventListener('click', () => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    rootElement.setAttribute('data-theme', next);
    try {
        localStorage.setItem('theme', next);
    } catch (e) {
        // storage blocked (private mode) - the theme still applies for this visit
    }
});

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// Add reveal class to elements for IntersectionObserver
document.querySelectorAll('section').forEach(sec => {
    const elements = sec.querySelectorAll('h1, h2, h3, p, .btn, .experience-card, .project-card, .skill-chip, .input-box, .textarea-field, .home-img, .home-sci a');
    elements.forEach((el, index) => {
        el.classList.add('reveal');
        // Stagger delay based on index (cap at 400ms)
        const delay = Math.min(index * 100, 400);
        el.style.transitionDelay = `${delay}ms`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Remove inline delay after animation so it doesn't affect hover states
            const delay = parseInt(entry.target.style.transitionDelay) || 0;
            setTimeout(() => {
                entry.target.style.transitionDelay = '0ms';
            }, delay + 800);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form');

const showToast = (message, type = 'success') => {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    if (type === 'error') toast.classList.add('error');
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger reflow to apply initial transform
    toast.offsetHeight;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        // Wait for transition to finish before removing
        setTimeout(() => toast.remove(), 500);
    }, 4500);
};

const sendEmail = (e) =>{
     e.preventDefault()
     // serviceID - templateID - #form - publicKey
     emailjs.sendForm('service_jbvf28m','template_lg6zbru','#contact-form','2EPf1nGUpw6iVBIbA')
     .then(()=>{
         showToast('Message sent successfully ✅', 'success');
         contactForm.reset();
     }, ()=>{
         showToast('Message not sent ❌', 'error');
     })
}

contactForm.addEventListener('submit', sendEmail)
    // <!-- emailjs to mail contact form data -->