// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

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
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
     e.preventDefault()
     // serviceID - templateID - #form - publicKey
     emailjs.sendForm('service_jbvf28m','template_lg6zbru','#contact-form','2EPf1nGUpw6iVBIbA')
     .then(()=>{
         // Show sent message
         contactMessage.textContent = 'Message sent successfully ✅'

         // Remove message after five seconds
         setTimeout(()=>{
            contactMessage.textContent = ''
         }, 5000)

         // Clear input fields
         contactForm.reset()
     }, ()=>{
        // Show error message
        contactMessage.textContent = 'Message not sent (service error) ❌'
     })
}

contactForm.addEventListener('submit', sendEmail)
    // <!-- emailjs to mail contact form data -->