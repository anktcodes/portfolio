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

// Get post ID from URL
const urlParams = new URLSearchParams(window.location.search);
const postId = parseInt(urlParams.get('id'));

let currentPost = null;
let allPosts = [];

// Load and display post
async function loadPost() {
    try {
        const response = await fetch('../data/posts.json');
        const data = await response.json();
        allPosts = data.posts;
        
        currentPost = allPosts.find(post => post.id === postId);
        
        if (!currentPost) {
            displayError();
            return;
        }
        
        displayPost();
        loadRelatedPosts();
    } catch (error) {
        console.error('Error loading post:', error);
        displayError();
    }
}

// Display post
function displayPost() {
    // Update page title
    document.getElementById('pageTitle').textContent = `${currentPost.title} - Ankit`;
    
    // Display meta
    document.getElementById('postMeta').innerHTML = `
        <span class="blog-category">${currentPost.category}</span>
    `;
    
    // Display title
    document.getElementById('postTitle').textContent = currentPost.title;
    
    // Display info
    document.getElementById('postInfo').innerHTML = `
        <span>${formatDate(currentPost.date)}</span>
        <span>•</span>
        <span>${currentPost.readTime}</span>
        <span>•</span>
        <span>By ${currentPost.author}</span>
    `;
    
    // Display content
    const contentHtml = currentPost.content.map(block => {
        switch(block.type) {
            case 'paragraph':
                return `<p>${block.text}</p>`;
            
            case 'heading':
                return `<h${block.level}>${block.text}</h${block.level}>`;
            
            case 'list':
                return `
                    <ul>
                        ${block.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                `;
            
            case 'code':
                return `
                    <pre><code class="language-${block.language}">${escapeHtml(block.code)}</code></pre>
                `;
            
            case 'callout':
                return `
                    <div class="post-callout ${block.style}">
                        ${block.text}
                    </div>
                `;
            
            default:
                return '';
        }
    }).join('');
    
    document.getElementById('postContent').innerHTML = contentHtml;
    
    // Display tags
    document.getElementById('postTags').innerHTML = currentPost.tags.map(tag => `
        <span class="post-tag">#${tag}</span>
    `).join('');
    
    // Show footer
    document.getElementById('postFooter').style.display = 'block';
    
    // Animate content
    animateContent();
}

// Load related posts
function loadRelatedPosts() {
    const relatedPosts = allPosts
        .filter(post => 
            post.id !== currentPost.id && 
            (post.category === currentPost.category || 
             post.tags.some(tag => currentPost.tags.includes(tag)))
        )
        .slice(0, 3);
    
    if (relatedPosts.length === 0) return;
    
    document.getElementById('relatedPosts').style.display = 'block';
    document.getElementById('relatedGrid').innerHTML = relatedPosts.map(post => `
        <article class="blog-card" onclick="window.location.href='post.html?id=${post.id}'">
            <div class="blog-card-content">
                <div class="blog-card-header">
                    <span class="blog-category">${post.category}</span>
                    <span class="blog-date">${formatDate(post.date)}</span>
                </div>
                <h2 class="blog-card-title">${post.title}</h2>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-footer">
                    <div class="blog-tags">
                        ${post.tags.slice(0, 2).map(tag => `
                            <span class="blog-tag">#${tag}</span>
                        `).join('')}
                    </div>
                    <span class="read-time">${post.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Display error
function displayError() {
    document.getElementById('postTitle').textContent = 'Post Not Found';
    document.getElementById('postContent').innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #9ca3af;">
            <p style="font-size: 1.25rem; margin-bottom: 1.5rem;">Sorry, this post doesn't exist.</p>
            <a href="blog.html" style="color: #490b8b; text-decoration: none; font-weight: 600;">
                ← Back to Blog
            </a>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Animate content
function animateContent() {
    const elements = document.querySelectorAll('.post-content > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Share functions
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentPost.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
    });
}

// Initialize
loadPost();

console.log('Post page loaded!');