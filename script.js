document.addEventListener('DOMContentLoaded', () => {
    // --- Script untuk Modal Video ---
    const fighterCards = document.querySelectorAll('.fighter-card');
    const modal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('fighter-video');
    const closeModalBtn = document.querySelector('.close-modal');

    function openModal(videoSrc) {
        if (videoSrc) {
            videoPlayer.src = videoSrc;
            modal.classList.add('show');
            videoPlayer.play();
        }
    }

    function closeModal() {
        modal.classList.remove('show');
        videoPlayer.pause();
        videoPlayer.src = ""; // Hentikan pemutaran dan reset sumber
    }

    fighterCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoSrc = card.dataset.videoSrc;
            openModal(videoSrc);
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (event) => {
            // Tutup modal hanya jika klik dilakukan pada overlay (latar belakang), bukan pada konten di dalamnya
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        // Tutup modal jika tombol 'Escape' ditekan
        if (event.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // --- Script BARU untuk Hamburger Menu ---
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});