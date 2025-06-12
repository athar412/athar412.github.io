// Menjalankan fungsi setelah seluruh halaman (termasuk gambar dan video) selesai dimuat
window.onload = function() {
    const overlay = document.getElementById('countdown-overlay');
    const countdownText = document.getElementById('countdown-text');
    const pageWrapper = document.getElementById('page-wrapper');
    const audio_fight = new Audio('assets/fight.mp3'); // Opsional: jika Anda punya file suara

    const sequence = [
        { text: "3", duration: 1000 },
        { text: "2", duration: 1000 },
        { text: "1", duration: 1000 },
        { text: "FIGHT!", duration: 1500, isFight: true }
    ];

    let currentIndex = 0;

    function runSequence() {
        if (currentIndex >= sequence.length) {
            // Sembunyikan overlay dan tampilkan konten utama
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            pageWrapper.classList.remove('hidden-on-load');
            return;
        }

        const currentStep = sequence[currentIndex];
        
        // Reset class animasi sebelumnya
        countdownText.className = '';
        
        // Memaksa browser untuk me-render ulang agar animasi bisa berjalan lagi
        void countdownText.offsetWidth; 

        countdownText.textContent = currentStep.text;

        if (currentStep.isFight) {
            countdownText.classList.add('fight-text');
            // audio_fight.play(); // Opsional: mainkan suara "FIGHT!"
        } else {
            countdownText.classList.add('zoom-in');
        }

        currentIndex++;
        setTimeout(runSequence, currentStep.duration);
    }

    // Mulai sekuens
    runSequence();
};

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