document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move the cursor instantly
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function moveFollower() {
        // Calculate the distance to move
        let distX = mouseX - followerX;
        let distY = mouseY - followerY;
        
        // Smoothly update follower position
        followerX += distX * 0.1;
        followerY += distY * 0.1;
        
        // Apply the smooth movement
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(moveFollower);
    }
    moveFollower();

    // Cursor hover effect
    const hoverElements = document.querySelectorAll('a, button, .menu-item, .gallery-item, .filter-btn');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            element.style.cursor = 'none';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Page transition
    const pageTransition = document.querySelector('.page-transition');
    
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Initial page load animation
    setTimeout(() => {
        pageTransition.classList.add('slide-up');
        document.body.classList.remove('loading');
    }, 500);

    // Handle page transitions for navigation links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('#') && !this.href.includes('tel:') && !this.href.includes('mailto:')) {
                e.preventDefault();
                const target = this.href;
                
                // Start exit transition
                pageTransition.classList.remove('slide-up');
                
                // Ensure the transition element is visible
                pageTransition.style.display = 'block';
                
                // Trigger reflow
                pageTransition.offsetHeight;
                
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

    // Menu filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');

    function filterMenu(category) {
        menuItems.forEach(item => {
            const shouldShow = category === 'all' || item.getAttribute('data-category') === category;
            item.style.opacity = shouldShow ? '1' : '0';
            item.style.display = shouldShow ? 'flex' : 'none';
        });

        menuCategories.forEach(categorySection => {
            const hasVisibleItems = category === 'all' || 
                Array.from(categorySection.querySelectorAll('.menu-item'))
                    .some(item => item.getAttribute('data-category') === category);
            categorySection.style.opacity = hasVisibleItems ? '1' : '0';
            categorySection.style.display = hasVisibleItems ? 'block' : 'none';
        });
    }

    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Get the filter value
            const filterValue = btn.getAttribute('data-filter');
            // Apply the filter
            filterMenu(filterValue);
        });
    });

    // Initialize with 'all' filter
    filterMenu('all');

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Force repaint to ensure proper visibility
            navLinks.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                navLinks.style.display = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                navLinks.style.display = 'none';
            }
        });
    }
}); 