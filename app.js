document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const loadingState = document.getElementById('loading-state');
    const landingView = document.getElementById('landing-view');
    const dashboardView = document.getElementById('dashboard-view');
    const videoFilename = document.getElementById('video-filename');
    
    // Tooltip logic
    const tooltip = document.getElementById('global-tooltip');
    document.querySelectorAll('.segment').forEach(seg => {
        seg.addEventListener('mouseenter', (e) => {
            const text = e.target.getAttribute('data-tooltip');
            if (text) {
                tooltip.textContent = text;
                tooltip.classList.remove('hidden');
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width/2) - (tooltip.offsetWidth/2) + 'px';
                tooltip.style.top = rect.top - 30 + 'px';
            }
        });
        seg.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        });
    });

    // Handle Drag & Drop styling
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    // Handle Button Click Upload
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    function handleFileUpload(file) {
        if (!file.type.startsWith('video/')) {
            alert('Please upload a valid video file.');
            return;
        }

        dropZone.classList.add('hidden');
        loadingState.classList.remove('hidden');
        
        setTimeout(() => {
            videoFilename.textContent = file.name;
            
            landingView.classList.remove('active');
            landingView.classList.add('hidden');
            
            dashboardView.classList.remove('hidden');
            dashboardView.classList.add('active');
            
            animateScore(72);
        }, 2000); 
    }
});

// Score Animation
function animateScore(targetScore) {
    const scoreEl = document.getElementById('main-score');
    let current = 0;
    const duration = 1500; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = targetScore / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
            current = targetScore;
            clearInterval(timer);
        }
        scoreEl.textContent = Math.floor(current);
    }, stepTime);
}

// Interactive Highlights
function highlightSegment(element, targetIndex) {
    // Reset all highlights
    document.querySelectorAll('.segment').forEach(seg => {
        seg.classList.remove('active-highlight');
        seg.style.opacity = '0.4';
    });
    
    // Highlight specific segment
    const timeline = document.getElementById('retention-timeline');
    const targetSeg = timeline.children[targetIndex];
    if (targetSeg) {
        targetSeg.classList.add('active-highlight');
        targetSeg.style.opacity = '1';
    }
    
    // After 3 seconds, reset opacities back to normal
    setTimeout(() => {
        document.querySelectorAll('.segment').forEach(seg => {
            seg.classList.remove('active-highlight');
            seg.style.opacity = '';
        });
    }, 3000);
}

// Global function to reset the app
function resetApp() {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const loadingState = document.getElementById('loading-state');
    const landingView = document.getElementById('landing-view');
    const dashboardView = document.getElementById('dashboard-view');
    const scoreEl = document.getElementById('main-score');

    fileInput.value = '';
    scoreEl.textContent = '0';
    
    dashboardView.classList.remove('active');
    dashboardView.classList.add('hidden');
    
    landingView.classList.remove('hidden');
    landingView.classList.add('active');
    
    loadingState.classList.add('hidden');
    dropZone.classList.remove('hidden');
}
