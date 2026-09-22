// Toggle Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('hidden');
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Modal Controls
const modal = document.getElementById('bookingModal');

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  const msg = document.getElementById('modalMessage');
  if (msg) msg.classList.add('hidden');
}

// Close Modal when clicking background overlay
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Form Submit
function handleFormSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('modalMessage');
  if (msg) {
    msg.classList.remove('hidden');
    setTimeout(() => {
      closeModal();
    }, 2500);
  }
}

// --- Gallery Sliders ---
function initGallery(trackId, dotsId) {
  const track = document.getElementById(trackId);
  const dotsContainer = document.getElementById(dotsId);
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.gallery__slide');
  const prevBtn = track.parentElement.querySelector('.gallery__btn--prev');
  const nextBtn = track.parentElement.querySelector('.gallery__btn--next');

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery__dot' + (i === 0 ? ' gallery__dot--active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => {
      slides[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.gallery__dot');

  function updateDots() {
    const scrollLeft = track.scrollLeft;
    const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(track).gap) || 16;
    const activeIndex = Math.round(scrollLeft / slideWidth);
    dots.forEach((d, i) => d.classList.toggle('gallery__dot--active', i === activeIndex));
  }

  // Debounced scroll listener
  let ticking = false;
  track.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateDots(); ticking = false; });
      ticking = true;
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(track).gap) || 16;
      track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(track).gap) || 16;
      track.scrollBy({ left: slideWidth, behavior: 'smooth' });
    });
  }
}

initGallery('bags1Track', 'bags1Dots');
initGallery('bags2Track', 'bags2Dots');
initGallery('bags3Track', 'bags3Dots');
initGallery('bags4Track', 'bags4Dots');
initGallery('shoes1Track', 'shoes1Dots');
initGallery('shoes2Track', 'shoes2Dots');
initGallery('shoes3Track', 'shoes3Dots');
initGallery('shoes4Track', 'shoes4Dots');

// --- Lightbox ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.body.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if (!img || !img.src) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  lightbox.classList.add('lightbox--open');
  document.body.style.overflow = 'hidden';
});

function closeLightbox() {
  lightbox.classList.remove('lightbox--open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('lightbox--open')) closeLightbox();
});