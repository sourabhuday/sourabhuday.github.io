// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Load dynamic content
  loadPhotos();
  loadBlog();

  // Set up tab navigation
  setupTabs();
});

// Tab navigation between sections
function setupTabs() {
  const navLinks = document.querySelectorAll('.nav-link');
  const panels = document.querySelectorAll('.tab-panel');

  function activateTab(tabId) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.tab === tabId);
    });
    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const tabId = this.dataset.tab;
      activateTab(tabId);
      history.replaceState(null, '', '#' + tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Honor the hash on load (e.g. someone shares /#blog)
  const initial = window.location.hash.replace('#', '');
  if (initial && document.getElementById(initial) &&
      document.getElementById(initial).classList.contains('tab-panel')) {
    activateTab(initial);
  }
}

// Load photography from JSON
function loadPhotos() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;
  fetch('photos.json')
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => {
      const photos = data.photos || [];
      if (!photos.length) {
        grid.innerHTML = '<p>No photos yet. Add some to <code>photos.json</code>.</p>';
        return;
      }
      photos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.onclick = () => openModal(photo.src, photo.caption || '');

        const img = document.createElement('img');
        img.src = photo.thumb || photo.src;
        img.alt = photo.caption || 'Photo';
        img.loading = 'lazy';
        item.appendChild(img);

        if (photo.caption) {
          const cap = document.createElement('div');
          cap.className = 'photo-caption';
          cap.textContent = photo.caption;
          item.appendChild(cap);
        }
        grid.appendChild(item);
      });
    })
    .catch(() => {
      grid.innerHTML = '<p>Could not load photos.</p>';
    });
}

// Load blog posts from JSON
function loadBlog() {
  const list = document.getElementById('blog-list');
  if (!list) return;
  fetch('blog.json')
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => {
      const posts = data.posts || [];
      if (!posts.length) {
        list.innerHTML = '<p>No posts yet. Add some to <code>blog.json</code>.</p>';
        return;
      }
      posts.forEach(post => {
        const el = document.createElement('article');
        el.className = 'blog-post';

        const date = document.createElement('div');
        date.className = 'blog-date';
        date.textContent = post.date || '';
        el.appendChild(date);

        const title = document.createElement('div');
        title.className = 'blog-title';
        if (post.url) {
          const a = document.createElement('a');
          a.href = post.url;
          if (/^https?:/.test(post.url)) { a.target = '_blank'; a.rel = 'noopener'; }
          a.textContent = post.title;
          title.appendChild(a);
        } else {
          title.textContent = post.title;
        }
        el.appendChild(title);

        if (post.excerpt) {
          const ex = document.createElement('p');
          ex.className = 'blog-excerpt';
          ex.textContent = post.excerpt;
          el.appendChild(ex);
        }
        list.appendChild(el);
      });
    })
    .catch(() => {
      list.innerHTML = '<p>Could not load blog posts.</p>';
    });
}

// Modal functionality for viewing original images
function openModal(imageSrc, caption) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  modal.style.display = "block";
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  modalImg.src = imageSrc;
  if (modalCaption) modalCaption.textContent = caption || '';
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Close modal with the Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// Close modal when clicking outside the image
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
}
