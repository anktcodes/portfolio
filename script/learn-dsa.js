/* ==========================================
   DSA ROADMAP DATA STRUCTURE
   ========================================== */

// This array defines your learning path.
// Add new topics here as you progress.
// Keep the order - it represents your learning sequence.

const dsaTopics = [
    {
        id: 'arrays',
        number: 1,
        title: 'Arrays',
        description: 'Foundation of data structures - learn indexing, traversal, and basic operations',
        content: `
            <h2>Arrays</h2>
            <p>Arrays are the most fundamental data structure. They store elements in contiguous memory locations.</p>
            
            <h3>Key Concepts</h3>
            <ul>
                <li>Zero-based indexing</li>
                <li>Fixed vs Dynamic size</li>
                <li>Time complexity: O(1) for access, O(n) for search</li>
                <li>Common operations: insert, delete, search, traverse</li>
            </ul>
            
            <h3>Common Problems</h3>
            <p>Two Sum, Maximum Subarray, Contains Duplicate, etc.</p>
            
            <h3>Example Code</h3>
            <pre><code>// Array traversal
arr = [1, 2, 3, 4, 5]
for i in range(len(arr)):
    print(arr[i])</code></pre>
            
            <p><em>Add your learning notes here as you progress...</em></p>
        `
    },
    {
        id: 'stack',
        number: 2,
        title: 'Stack',
        description: 'LIFO data structure - perfect for backtracking and nested operations',
        content: `
            <h2>Stack</h2>
            <p>Stack follows Last-In-First-Out (LIFO) principle. Think of it as a stack of plates.</p>
            
            <h3>Key Operations</h3>
            <ul>
                <li>push() - Add element to top</li>
                <li>pop() - Remove element from top</li>
                <li>peek() - View top element</li>
                <li>isEmpty() - Check if stack is empty</li>
            </ul>
            
            <h3>Common Use Cases</h3>
            <p>Valid Parentheses, Expression Evaluation, Browser History, Undo/Redo</p>
            
            <h3>Example Code</h3>
            <pre><code>stack = []
stack.append(1)  # push
stack.append(2)
top = stack.pop()  # returns 2</code></pre>
            
            <p><em>Add your learning notes here...</em></p>
        `
    },
    {
        id: 'two-pointers',
        number: 3,
        title: 'Two Pointers',
        description: 'Technique for efficient array/string traversal with two indices',
        content: `
            <h2>Two Pointers Technique</h2>
            <p>Use two pointers to traverse data structures efficiently, often reducing time complexity from O(n²) to O(n).</p>
            
            <h3>When to Use</h3>
            <ul>
                <li>Sorted arrays</li>
                <li>Finding pairs with a target sum</li>
                <li>Removing duplicates in place</li>
                <li>Palindrome checking</li>
            </ul>
            
            <h3>Common Patterns</h3>
            <p>Opposite ends (left/right), Same direction (slow/fast), Sliding window</p>
            
            <h3>Example Problem</h3>
            <p>Two Sum II - Input Array Is Sorted</p>
            
            <p><em>Add your learning notes here...</em></p>
        `
    },
    {
        id: 'hashing',
        number: 4,
        title: 'Hashing',
        description: 'Hash tables for O(1) lookups - trade space for speed',
        content: `
            <h2>Hashing</h2>
            <p>Hash tables provide constant-time average case for insertions, deletions, and lookups.</p>
            
            <h3>Key Concepts</h3>
            <ul>
                <li>Hash function maps keys to indices</li>
                <li>Collision handling (chaining, open addressing)</li>
                <li>Load factor and resizing</li>
                <li>Trade-off: O(1) time but O(n) space</li>
            </ul>
            
            <h3>Common Use Cases</h3>
            <p>Counting frequencies, Finding duplicates, Two Sum problem, Caching</p>
            
            <h3>Python Implementation</h3>
            <pre><code># Dictionary is a hash table
hash_map = {}
hash_map['key'] = 'value'
if 'key' in hash_map:  # O(1) lookup
    print(hash_map['key'])</code></pre>
            
            <p><em>Add your learning notes here...</em></p>
        `
    },
    {
        id: 'linked-list',
        number: 5,
        title: 'Linked List',
        description: 'Dynamic data structure with nodes - efficient insertions and deletions',
        content: `
            <h2>Linked List</h2>
            <p>A linked list is a linear collection of nodes where each node points to the next.</p>
            
            <h3>Types</h3>
            <ul>
                <li>Singly Linked List</li>
                <li>Doubly Linked List</li>
                <li>Circular Linked List</li>
            </ul>
            
            <h3>Key Operations</h3>
            <ul>
                <li>Insertion: O(1) at head, O(n) elsewhere</li>
                <li>Deletion: O(1) at head, O(n) elsewhere</li>
                <li>Search: O(n)</li>
            </ul>
            
            <h3>Common Problems</h3>
            <p>Reverse Linked List, Detect Cycle, Merge Two Sorted Lists</p>
            
            <p><em>Add your learning notes here...</em></p>
        `
    },
    {
        id: 'queue',
        number: 6,
        title: 'Queue',
        description: 'FIFO data structure - used in BFS and task scheduling',
        content: `
            <h2>Queue</h2>
            <p>Queue follows First-In-First-Out (FIFO) principle. Like a line at a store.</p>
            
            <h3>Key Operations</h3>
            <ul>
                <li>enqueue() - Add to rear</li>
                <li>dequeue() - Remove from front</li>
                <li>peek() - View front element</li>
                <li>isEmpty() - Check if empty</li>
            </ul>
            
            <h3>Types</h3>
            <p>Simple Queue, Circular Queue, Priority Queue, Deque</p>
            
            <h3>Common Use Cases</h3>
            <p>BFS traversal, Task scheduling, Print queue, Level-order traversal</p>
            
            <h3>Example Code</h3>
            <pre><code>from collections import deque
queue = deque()
queue.append(1)  # enqueue
front = queue.popleft()  # dequeue</code></pre>
            
            <p><em>Add your learning notes here...</em></p>
        `
    }
];

/* ==========================================
   NAVIGATION GENERATION
   ========================================== */

function generateNavigation() {
    const navList = document.getElementById('navList');
    const mobileNavList = document.getElementById('mobileNavList');
    
    // Clear existing items
    navList.innerHTML = '';
    mobileNavList.innerHTML = '';
    
    // Add "Roadmap" as first item
    const roadmapItem = createNavItem('roadmap', '0. Roadmap');
    navList.appendChild(roadmapItem.desktop);
    mobileNavList.appendChild(roadmapItem.mobile);
    
    // Add all DSA topics
    dsaTopics.forEach(topic => {
        const navItem = createNavItem(topic.id, `${topic.number}. ${topic.title}`);
        navList.appendChild(navItem.desktop);
        mobileNavList.appendChild(navItem.mobile);
    });
}

function createNavItem(id, text) {
    // Desktop nav item
    const desktopLi = document.createElement('li');
    const desktopLink = document.createElement('a');
    desktopLink.href = '#';
    desktopLink.textContent = text;
    desktopLink.dataset.section = id;
    desktopLink.addEventListener('click', handleNavClick);
    desktopLi.appendChild(desktopLink);
    
    // Mobile nav item
    const mobileLi = document.createElement('li');
    const mobileLink = document.createElement('a');
    mobileLink.href = '#';
    mobileLink.textContent = text;
    mobileLink.dataset.section = id;
    mobileLink.addEventListener('click', handleNavClick);
    mobileLi.appendChild(mobileLink);
    
    return {
        desktop: desktopLi,
        mobile: mobileLi
    };
}

/* ==========================================
   ROADMAP GENERATION
   ========================================== */

function generateRoadmap() {
    const roadmapContainer = document.getElementById('roadmapContainer');
    roadmapContainer.innerHTML = '';
    
    // Add each topic to roadmap
    dsaTopics.forEach(topic => {
        const roadmapItem = createRoadmapItem(topic);
        roadmapContainer.appendChild(roadmapItem);
    });
    
    // Add end pointer
    const endPointer = createEndPointer();
    roadmapContainer.appendChild(endPointer);
}

function createRoadmapItem(topic) {
    const item = document.createElement('div');
    item.className = 'roadmap-item';
    item.dataset.topicId = topic.id;
    item.addEventListener('click', () => showTopic(topic.id));
    
    item.innerHTML = `
        <div class="roadmap-item-content">
            <div class="roadmap-item-number">Topic ${topic.number}</div>
            <h3 class="roadmap-item-title">${topic.title}</h3>
            <p class="roadmap-item-description">${topic.description}</p>
        </div>
    `;
    
    return item;
}

function createEndPointer() {
    const pointer = document.createElement('div');
    pointer.className = 'roadmap-end';
    pointer.innerHTML = `
        <div class="roadmap-pointer"></div>
        <p class="roadmap-end-text">You are here — more topics coming soon...</p>
    `;
    return pointer;
}

/* ==========================================
   VIEW SWITCHING
   ========================================== */

function showRoadmap() {
    // Update title
    document.getElementById('contentTitle').textContent = 'DSA Learning Roadmap';
    
    // Show roadmap view, hide topic view
    document.getElementById('roadmapView').style.display = 'block';
    document.getElementById('topicView').style.display = 'none';
    
    // Update active nav state
    updateActiveNav('roadmap');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showTopic(topicId) {
    // Find the topic data
    const topic = dsaTopics.find(t => t.id === topicId);
    if (!topic) return;
    
    // Update title
    document.getElementById('contentTitle').textContent = topic.title;
    
    // Load topic content
    document.getElementById('topicContent').innerHTML = topic.content;
    
    // Show topic view, hide roadmap view
    document.getElementById('roadmapView').style.display = 'none';
    document.getElementById('topicView').style.display = 'block';
    
    // Update active nav state
    updateActiveNav(topicId);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateActiveNav(sectionId) {
    // Update desktop nav
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Update mobile nav
    document.querySelectorAll('.mobile-nav-list a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });
}

/* ==========================================
   EVENT HANDLERS
   ========================================== */

function handleNavClick(e) {
    e.preventDefault();
    const section = e.target.dataset.section;
    
    if (section === 'roadmap') {
        showRoadmap();
    } else {
        showTopic(section);
    }
}

/* ==========================================
   INITIALIZATION
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Generate navigation menus
    generateNavigation();
    
    // Generate roadmap
    generateRoadmap();
    
    // Set roadmap as active by default
    showRoadmap();
    
    console.log('DSA Roadmap initialized successfully!');
    console.log(`Loaded ${dsaTopics.length} topics`);
});

/* ==========================================
   HOW TO ADD NEW TOPICS
   ========================================== 
   
   1. Add a new object to the dsaTopics array above
   2. Follow this structure:
   
   {
       id: 'topic-name',           // Unique identifier (lowercase, hyphenated)
       number: 7,                  // Sequential number
       title: 'Topic Name',        // Display title
       description: 'Short desc',  // Brief description for roadmap
       content: `                  // HTML content for documentation page
           <h2>Topic Name</h2>
           <p>Your content here...</p>
       `
   }
   
   3. Save the file - navigation and roadmap update automatically!
   
   ========================================== */