/* ==========================================
   WINDING STORY - WEDDING TEMPLATE
   Theme: Light, Romantic, Cinematic
   Created by: AI Assistant (Antigravity)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Loader --- */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1000); // Small delay for dramatic effect
    });

    /* --- 2. Sticky Navbar & Scroll Progress --- */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    });

    /* --- 3. Music Control --- */
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicText = document.querySelector('.music-text');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicText.innerText = 'Play Romantic Theme';
        } else {
            bgMusic.play().catch(error => {
                console.log("Autoplay prevented or audio error:", error);
            });
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicText.innerText = 'Pause Music';
        }
        isPlaying = !isPlaying;
    });

    // Optional: Try to play on first interaction
    document.addEventListener('click', () => {
        if (!isPlaying && bgMusic.paused) {
            // Uncomment below if you want aggressive autoplay on first click
            // bgMusic.play();
            // isPlaying = true;
            // musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            // musicText.innerText = 'Pause Music';
        }
    }, { once: true });

    /* --- 4. Burger Menu (Mobile) --- */
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });

    /* --- 5. Chemistry Flip Cards --- */
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    /* --- 6. Lightbox (Gallery) --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const polaroids = document.querySelectorAll('.polaroid-inner img');
    const closeBtn = document.querySelector('.lightbox-close');

    polaroids.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            const caption = img.parentElement.querySelector('.polaroid-caption').innerText;
            lightboxCaption.innerText = caption;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    /* --- 7. Future Wishes Reveal --- */
    const wishItems = document.querySelectorAll('.wish-item');
    wishItems.forEach(item => {
        const trigger = item.querySelector('.wish-trigger');
        trigger.addEventListener('click', () => {
            const isAlreadyActive = item.classList.contains('active-wish');
            // Deactivate others
            wishItems.forEach(i => {
                i.classList.remove('active-wish');
            });
            // Toggle current
            if (!isAlreadyActive) {
                item.classList.add('active-wish');
            }
        });
    });

    /* --- 8. Letter Envelope Animation --- */
    const envelope = document.getElementById('envelope');
    const typewriterText = document.getElementById('typewriter-text');
    const originalText = typewriterText.innerText;
    typewriterText.innerText = ''; // Clear for effect
    let typingStarted = false;

    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        
        // Start typing effect after envelope opens
        if (!typingStarted) {
            typingStarted = true;
            setTimeout(() => {
                typeWriter(originalText, 0);
            }, 1000); // Wait for open animation
        }
    });

    function typeWriter(text, i) {
        if (i < text.length) {
            typewriterText.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 30); // Speed of typing
        }
    }

    /* --- 9. Scroll Reveal (Intersection Observer) --- */
    // Add 'reveal' class to elements we want to animate on scroll
    const itemsToReveal = document.querySelectorAll('.timeline-item, .flip-card, .polaroid, .wish-item, .movie-poster-container, .envelope-wrapper');
    
    itemsToReveal.forEach(item => {
        item.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Keep observing if you want repeat animations
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset
    });

    itemsToReveal.forEach(item => {
        revealObserver.observe(item);
    });
    /* --- 10. Hero Particles --- */
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        const canvas = document.createElement('canvas');
        particlesContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        
        let width = canvas.width = particlesContainer.offsetWidth;
        let height = canvas.height = particlesContainer.offsetHeight;
        
        window.addEventListener('resize', () => {
            width = canvas.width = particlesContainer.offsetWidth;
            height = canvas.height = particlesContainer.offsetHeight;
        });
        
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                color: `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})` // Gold with random opacity
            });
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }

});

