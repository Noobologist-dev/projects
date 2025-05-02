// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor hover effect
const hoverElements = document.querySelectorAll('a, button, .menu-item, .gallery-item');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1.5)';
        element.style.cursor = 'none';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1)';
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Menu Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const menuCategories = document.querySelectorAll('.menu-category');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // First hide all items and categories
        menuItems.forEach(item => {
            item.style.display = 'none';
        });
        menuCategories.forEach(category => {
            category.style.display = 'none';
        });

        if (filterValue === 'all') {
            // Show all items and categories
            menuItems.forEach(item => {
                item.style.display = 'flex';
            });
            menuCategories.forEach(category => {
                category.style.display = 'block';
            });
        } else {
            // Show only matching items and their categories
            menuCategories.forEach(category => {
                const items = category.querySelectorAll(`.menu-item[data-category="${filterValue}"]`);
                if (items.length > 0) {
                    category.style.display = 'block';
                    items.forEach(item => {
                        item.style.display = 'flex';
                    });
                }
            });
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Reservation submitted:', data);
        
        // Show success message
        alert('Thank you for your reservation! We will contact you shortly to confirm.');
        reservationForm.reset();
    });
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Gallery image hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('img').style.transform = 'scale(1.1)';
        item.querySelector('.gallery-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.transform = 'scale(1)';
        item.querySelector('.gallery-overlay').style.opacity = '0';
    });
});

// Add hover effect to menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.menu-item-overlay').style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.menu-item-overlay').style.transform = 'translateY(100%)';
    });
});

// Add intersection observer for fade-in animations
const fadeElements = document.querySelectorAll('.menu-category, .contact-content');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Add keyframe animation for fade-in effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Page transition
    const pageTransition = document.querySelector('.page-transition');
    
    // Check if we came from another page
    const cameFromAnotherPage = sessionStorage.getItem('pageTransition');
    
    if (cameFromAnotherPage) {
        // Remove the flag
        sessionStorage.removeItem('pageTransition');
        
        // Add loading class to body initially
        document.body.classList.add('loading');
        
        // Initial page load animation
        setTimeout(() => {
            pageTransition.classList.add('slide-up');
            document.body.classList.remove('loading');
        }, 500);
    } else {
        // If direct page load, just hide the transition
        pageTransition.style.transform = 'scaleY(0)';
    }

    // Handle page transitions for navigation links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('#') && !this.href.includes('tel:') && !this.href.includes('mailto:')) {
                e.preventDefault();
                const target = this.href;
                
                // Set flag for next page
                sessionStorage.setItem('pageTransition', 'true');
                
                // Start exit transition
                pageTransition.classList.remove('slide-up');
                
                // Ensure the transition element is visible
                pageTransition.style.transform = 'scaleY(1)';
                
                // Add slide down effect
                setTimeout(() => {
                    pageTransition.classList.add('slide-down');
                    
                    // Navigate after transition
                    setTimeout(() => {
                        window.location.href = target;
                    }, 600);
                }, 50);
            }
        });
    });

    // Handle menu item touch interactions
    let activeItem = null;

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Check if we're on a touch device
            if (window.matchMedia('(hover: none)').matches) {
                e.preventDefault();
                
                // If there's an active item and it's not the current one, deactivate it
                if (activeItem && activeItem !== this) {
                    activeItem.classList.remove('active');
                }

                // Toggle the current item
                this.classList.toggle('active');
                activeItem = this.classList.contains('active') ? this : null;
            }
        });
    });

    // Close active item when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-item') && activeItem) {
            activeItem.classList.remove('active');
            activeItem = null;
        }
    });

    // Scroll Animation for Menu Items (Mobile Only)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const menuObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Only apply animations on mobile devices
            if (entry.isIntersecting && window.matchMedia('(max-width: 768px)').matches) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Only observe menu items on mobile
    if (window.matchMedia('(max-width: 768px)').matches) {
        document.querySelectorAll('.menu-item').forEach(item => {
            menuObserver.observe(item);
        });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            document.querySelectorAll('.menu-item').forEach(item => {
                // Remove all classes and observers
                item.classList.remove('in-view');
                menuObserver.unobserve(item);

                // Re-observe only on mobile
                if (isMobile) {
                    menuObserver.observe(item);
                }
            });
        }, 250);
    });
});

// Gallery Lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const imgSrc = galleryItems[index].querySelector('img').src;
    lightboxImage.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
    lightboxImage.src = imgSrc;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
    lightboxImage.src = imgSrc;
}

// Event Listeners
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// Prevent scrolling when lightbox is open
lightbox.addEventListener('wheel', (e) => {
    if (lightbox.classList.contains('active')) {
        e.preventDefault();
    }
}); 