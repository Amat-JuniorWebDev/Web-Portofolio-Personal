// Mobile navigation toggle
const mobileBtn = document.getElementById('mobile-menu-trigger');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Interactive Accordion for History Section
const accordionItems = document.querySelectorAll('.history-item');

accordionItems.forEach(item => {
  item.addEventListener('click', () => {
    const isCurrentOpen = item.getAttribute('data-open') === 'true';

    // Reset all items to closed state
    accordionItems.forEach(other => {
      other.setAttribute('data-open', 'false');
      other.className = 'history-item cursor-pointer rounded-[14px] bg-[#FFFFFF] text-primary p-5 border border-[#EEEEEE] transition-all duration-200 select-none shadow-none';
      
      const period = other.querySelector('.history-period');
      if (period) {
        period.className = 'history-period text-[14px] text-[#636363] font-[\'Inter\'] whitespace-nowrap';
      }

      const title = other.querySelector('.history-title');
      if (title) {
        title.className = 'history-title text-[16px] text-black font-semibold font-[\'Inter_Tight\']';
      }

      const tag = other.querySelector('.history-tag');
      if (tag) {
        tag.className = 'history-tag text-xs font-[\'Inter\'] px-2.5 py-0.5 rounded-full border border-[#EEEEEE] text-[#636363]';
      }

      const chevron = other.querySelector('.history-chevron');
      if (chevron) {
        chevron.className = 'material-symbols-outlined history-chevron text-[16px] text-[#636363] transition-transform duration-200';
      }

      const content = other.querySelector('.history-content');
      if (content) {
        content.classList.add('hidden');
      }
    });

    // If previously not open, open this item
    if (!isCurrentOpen) {
      item.setAttribute('data-open', 'true');
      item.className = 'history-item cursor-pointer rounded-[14px] bg-[#0F0F0F] text-white p-[22px] md:p-[24px] border border-transparent transition-all duration-200 select-none shadow-none';
      
      const period = item.querySelector('.history-period');
      if (period) {
        period.className = 'history-period text-[14px] text-[#A0A0A0] font-[\'Inter\'] whitespace-nowrap';
      }

      const title = item.querySelector('.history-title');
      if (title) {
        title.className = 'history-title text-[16px] text-white font-semibold font-[\'Inter_Tight\']';
      }

      const tag = item.querySelector('.history-tag');
      if (tag) {
        tag.className = 'history-tag text-xs font-[\'Inter\'] px-2.5 py-0.5 rounded-full border border-neutral-700 text-[#A0A0A0]';
      }

      const chevron = item.querySelector('.history-chevron');
      if (chevron) {
        chevron.className = 'material-symbols-outlined history-chevron text-[16px] text-white transition-transform duration-200 rotate-180';
      }

      const content = item.querySelector('.history-content');
      if (content) {
        content.classList.remove('hidden');
      }
    }
  });
});

// CERTIFICATE SLIDER & PROGRESS RAIL LOGIC
const certSlider = document.getElementById('cert-slider');
const certPrevBtn = document.getElementById('cert-prev-btn');
const certNextBtn = document.getElementById('cert-next-btn');
const certProgressThumb = document.getElementById('cert-progress-thumb');

if (certSlider && certProgressThumb) {
  const updateProgress = () => {
    const scrollLeft = certSlider.scrollLeft;
    const maxScroll = certSlider.scrollWidth - certSlider.clientWidth;
    if (maxScroll <= 0) {
      certProgressThumb.style.width = '100%';
      certProgressThumb.style.left = '0%';
      return;
    }
    const visibleRatio = certSlider.clientWidth / certSlider.scrollWidth;
    const thumbWidthPercent = Math.max(visibleRatio * 100, 18);
    const scrollFraction = scrollLeft / maxScroll;
    const maxLeftPercent = 100 - thumbWidthPercent;
    const currentLeft = scrollFraction * maxLeftPercent;

    certProgressThumb.style.width = `${thumbWidthPercent}%`;
    certProgressThumb.style.left = `${currentLeft}%`;
  };

  certSlider.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if (certPrevBtn) {
    certPrevBtn.addEventListener('click', () => {
      const cardWidth = certSlider.querySelector('.cert-card')?.offsetWidth || 380;
      certSlider.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    });
  }

  if (certNextBtn) {
    certNextBtn.addEventListener('click', () => {
      const cardWidth = certSlider.querySelector('.cert-card')?.offsetWidth || 380;
      certSlider.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    });
  }
}

// CERTIFICATE LIGHTBOX LOGIC
const certLightbox = document.getElementById('cert-lightbox');
const certBackdrop = document.getElementById('cert-lightbox-backdrop');
const certCloseBtn = document.getElementById('cert-lightbox-close');
const modalTitle = document.getElementById('modal-cert-title');
const modalIssuer = document.getElementById('modal-cert-issuer');
const modalId = document.getElementById('modal-cert-id');

const openLightbox = (data) => {
  if (modalTitle) modalTitle.textContent = data.title;
  if (modalIssuer) modalIssuer.textContent = data.issuer;
  if (modalId) modalId.textContent = data.id;
  if (certLightbox) {
    certLightbox.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
};

const closeLightbox = () => {
  if (certLightbox) {
    certLightbox.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
};

document.querySelectorAll('.cert-image-trigger, .cert-link').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const parentTrigger = trigger.classList.contains('cert-image-trigger') 
      ? trigger 
      : trigger.closest('.cert-card')?.querySelector('.cert-image-trigger');
    
    if (parentTrigger) {
      openLightbox({
        title: parentTrigger.getAttribute('data-title') || 'Sertifikat',
        issuer: parentTrigger.getAttribute('data-issuer') || '',
        id: parentTrigger.getAttribute('data-id') || 'VERIFIED-01'
      });
    }
  });
});

if (certCloseBtn) certCloseBtn.addEventListener('click', closeLightbox);
if (certBackdrop) certBackdrop.addEventListener('click', closeLightbox);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certLightbox && !certLightbox.classList.contains('hidden')) {
    closeLightbox();
  }
});