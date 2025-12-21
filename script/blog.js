// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuBtn.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });
}

// Blog functionality
let allPosts = [];
let currentFilter = 'all';
let searchQuery = '';

// Load posts
async function loadPosts() {
    try {
        const response = await fetch('../data/posts.json');
        const data = await response.json();
        allPosts = data.posts;
        renderPosts();
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('blogGrid').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #9ca3af;">
                <p>Failed to load blog posts. Please try again later.</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Error: ${error.message}</p>
            </div>
        `;
    }
}

// Render posts
function renderPosts() {
    const blogGrid = document.getElementById('blogGrid');
    const noResults = document.getElementById('noResults');
    
    // Filter posts
    let filteredPosts = allPosts.filter(post => {
        const matchesCategory = currentFilter === 'all' || post.category === currentFilter;
        const matchesSearch = searchQuery === '' || 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
    });

    // Sort by date (newest first)
    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredPosts.length === 0) {
        blogGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    blogGrid.style.display = 'grid';
    noResults.style.display = 'none';

    blogGrid.innerHTML = filteredPosts.map(post => `
        <article class="blog-card" onclick="window.location.href='post.html?id=${post.id}'">
            ${post.featured ? '<div class="featured-badge">⭐ Featured</div>' : ''}
            <div class="blog-card-content">
                <div class="blog-card-header">
                    <span class="blog-category">${post.category}</span>
                    <span class="blog-date">${formatDate(post.date)}</span>
                </div>
                <h2 class="blog-card-title">${post.title}</h2>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-footer">
                    <div class="blog-tags">
                        ${post.tags.slice(0, 3).map(tag => `
                            <span class="blog-tag">#${tag}</span>
                        `).join('')}
                    </div>
                    <span class="read-time">${post.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');

    // Animate cards
    animateCards();
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Animate cards
function animateCards() {
    const cards = document.querySelectorAll('.blog-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        renderPosts();
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderPosts();
    });
}

// Initialize
loadPosts();

console.log('Blog page loaded!');