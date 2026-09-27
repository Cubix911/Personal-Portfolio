/**
 * Gallery JavaScript - Lightbox Modal & Category Filtering System
 * Kachi-Nwoga Uchechukwu Edward Hendrick - Personal Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Category Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class on buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 2. Lightbox Modal Functionality
  const lightboxModal = document.getElementById('lightbox-modal');
  if (!lightboxModal) return;

  const modalImg = lightboxModal.querySelector('.modal-img');
  const modalTitle = lightboxModal.querySelector('.modal-title');
  const modalCategory = lightboxModal.querySelector('.modal-category');
  const modalDesc = lightboxModal.querySelector('.modal-desc');
  const modalClose = lightboxModal.querySelector('.modal-close');
  const modalPrev = lightboxModal.querySelector('.modal-prev');
  const modalNext = lightboxModal.querySelector('.modal-next');

  let currentIndex = 0;
  const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

  const openLightbox = (index) => {
    const items = visibleItems();
    if (index < 0 || index >= items.length) return;
    
    currentIndex = index;
    const item = items[currentIndex];

    const imgSrc = item.getAttribute('data-src') || item.querySelector('img')?.src;
    const title = item.getAttribute('data-title') || item.querySelector('.gallery-title')?.textContent || '';
    const category = item.getAttribute('data-category-name') || item.querySelector('.gallery-category')?.textContent || '';
    const desc = item.getAttribute('data-desc') || '';

    if (modalImg && imgSrc) modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalDesc) modalDesc.textContent = desc;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach click events to gallery items
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const items = visibleItems();
      const index = items.indexOf(item);
      openLightbox(index);
    });
  });

  // Modal Controls
  if (modalClose) {
    modalClose.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  if (modalPrev) {
    modalPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      const items = visibleItems();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      openLightbox(currentIndex);
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', (e) => {
      e.stopPropagation();
      const items = visibleItems();
      currentIndex = (currentIndex + 1) % items.length;
      openLightbox(currentIndex);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      const items = visibleItems();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      openLightbox(currentIndex);
    }
    if (e.key === 'ArrowRight') {
      const items = visibleItems();
      currentIndex = (currentIndex + 1) % items.length;
      openLightbox(currentIndex);
    }
  });
});
