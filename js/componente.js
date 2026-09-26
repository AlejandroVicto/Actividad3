/**
 * VISUAL COMPONENTS LIBRARY
 * A Vanilla JavaScript library for interactive visual components.
 */

// ==========================================================================
// 1. LIGHTBOX GALLERY
// ==========================================================================

class LightboxGallery {
    /**
     * @param {Object} options Configuration options
     * @param {string} options.selector The CSS selector for gallery images (default: '.vg-gallery-item')
     */
    constructor(options = {}) {
        this.selector = options.selector || '.vg-gallery-item';
        this.images = Array.from(document.querySelectorAll(this.selector));
        this.currentIndex = 0;
        this.isOpen = false;

        if (this.images.length === 0) {
            console.warn(`LightboxGallery: No images found for selector "${this.selector}"`);
            return;
        }

        this.init();
    }

    init() {
        this.createDOM();
        this.attachEvents();
    }

    createDOM() {
        // Create Overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'vg-lightbox-overlay';

        // Close Button
        this.closeBtn = document.createElement('button');
        this.closeBtn.className = 'vg-lightbox-btn vg-lightbox-close';
        this.closeBtn.innerHTML = '&times;';
        this.closeBtn.setAttribute('aria-label', 'Cerrar');

        // Prev Button
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'vg-lightbox-btn vg-lightbox-prev';
        this.prevBtn.innerHTML = '&#10094;';
        this.prevBtn.setAttribute('aria-label', 'Anterior');

        // Next Button
        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'vg-lightbox-btn vg-lightbox-next';
        this.nextBtn.innerHTML = '&#10095;';
        this.nextBtn.setAttribute('aria-label', 'Siguiente');

        // Content Container
        this.content = document.createElement('div');
        this.content.className = 'vg-lightbox-content';

        // Main Image
        this.lightboxImg = document.createElement('img');
        this.lightboxImg.className = 'vg-lightbox-image';

        // Assemble
        this.content.appendChild(this.lightboxImg);
        this.overlay.appendChild(this.closeBtn);
        this.overlay.appendChild(this.prevBtn);
        this.overlay.appendChild(this.nextBtn);
        this.overlay.appendChild(this.content);

        document.body.appendChild(this.overlay);
    }

    attachEvents() {
        // Image Click Events
        this.images.forEach((img, index) => {
            img.addEventListener('click', () => this.open(index));
        });

        // Controls
        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.navigate(-1); });
        this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.navigate(1); });

        // Close on background click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay || e.target === this.content) {
                this.close();
            }
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });
    }

    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        this.isOpen = true;
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
        
        // Clear src after transition to avoid seeing old image on next open
        setTimeout(() => {
            if(!this.isOpen) this.lightboxImg.src = '';
        }, 300);
    }

    navigate(direction) {
        this.currentIndex += direction;
        
        // Loop around
        if (this.currentIndex >= this.images.length) {
            this.currentIndex = 0;
        } else if (this.currentIndex < 0) {
            this.currentIndex = this.images.length - 1;
        }

        this.updateImage();
    }

    updateImage() {
        const sourceImg = this.images[this.currentIndex];
        // Use data-highres if available, otherwise fallback to src
        const highResSrc = sourceImg.getAttribute('data-highres') || sourceImg.src;
        this.lightboxImg.src = highResSrc;
        this.lightboxImg.alt = sourceImg.alt || `Imagen ${this.currentIndex + 1}`;
    }
}

// ==========================================================================
// 2. SKELETON LOADER
// ==========================================================================

class SkeletonLoader {
    /**
     * @param {string|HTMLElement} container Selector or Element where skeleton will be injected
     * @param {Object} options
     * @param {string} options.type Type of preset: 'profile', 'card', 'list', 'custom'
     * @param {number} options.count Number of items to generate (for list/card presets)
     */
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.type = options.type || 'card';
        this.count = options.count || 1;
        
        if (!this.container) {
            console.warn('SkeletonLoader: Invalid container provided.');
            return;
        }
    }

    /**
     * Starts the loading animation by rendering skeletons
     */
    show() {
        this.container.innerHTML = ''; // Clear current content
        
        const wrapper = document.createElement('div');
        wrapper.className = 'vg-skeleton-container';

        for (let i = 0; i < this.count; i++) {
            wrapper.appendChild(this._generatePreset(this.type));
        }

        this.container.appendChild(wrapper);
        this.container.setAttribute('data-loading', 'true');
    }

    /**
     * Removes the skeleton loader
     */
    hide() {
        const skeleton = this.container.querySelector('.vg-skeleton-container');
        if (skeleton) {
            skeleton.remove();
        }
        this.container.removeAttribute('data-loading');
    }

    _generatePreset(type) {
        const fragment = document.createDocumentFragment();

        if (type === 'profile') {
            const profile = document.createElement('div');
            profile.className = 'vg-skeleton-profile';
            
            profile.innerHTML = `
                <div class="vg-skeleton circle"></div>
                <div class="vg-skeleton-profile-content">
                    <div class="vg-skeleton text"></div>
                    <div class="vg-skeleton text-short"></div>
                </div>
            `;
            fragment.appendChild(profile);
        } else if (type === 'card') {
            const card = document.createElement('div');
            card.className = 'vg-skeleton-card';
            
            card.innerHTML = `
                <div class="vg-skeleton image"></div>
                <div class="vg-skeleton title" style="margin-top: 15px;"></div>
                <div class="vg-skeleton text"></div>
                <div class="vg-skeleton text-short"></div>
            `;
            fragment.appendChild(card);
        } else if (type === 'text') {
             const textBlock = document.createElement('div');
             textBlock.style.display = 'flex';
             textBlock.style.flexDirection = 'column';
             textBlock.style.gap = '10px';

             textBlock.innerHTML = `
                <div class="vg-skeleton title"></div>
                <div class="vg-skeleton text"></div>
                <div class="vg-skeleton text"></div>
                <div class="vg-skeleton text-short"></div>
             `;
             fragment.appendChild(textBlock);
        }

        return fragment;
    }
}

// Export globally if needed (for browser usage without modules)
window.LightboxGallery = LightboxGallery;
window.SkeletonLoader = SkeletonLoader;
