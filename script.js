document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    const skillBars = document.querySelectorAll('.skill-bar');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top <= windowHeight && rect.bottom >= 0 && bar.style.width === '') {
                bar.style.width = bar.getAttribute('data-percent');
            }
        });
    };

    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('load', animateSkillBars);

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;

            if (nameInput.value.trim() === '') {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('nameError').style.display = 'none';
            }

            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('emailError').style.display = 'none';
            }

            if (subjectInput.value.trim() === '') {
                document.getElementById('subjectError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('subjectError').style.display = 'none';
            }

            if (messageInput.value.trim() === '') {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('messageError').style.display = 'none';
            }

            if (isValid) {
                contactForm.reset();

                const successMessage = document.createElement('div');
                successMessage.style.cssText = 'background-color: #4CAF50; color: white; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;';
                successMessage.textContent = 'Your message has been sent successfully!';
                contactForm.appendChild(successMessage);

                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
