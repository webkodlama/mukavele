/**
 * MUKAVELEM - Kur'an-i Kerim Hatim Platformu
 * JavaScript Ana Dosyasi
 */

// ============================================
// DOMContentLoaded Event
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Loading ekranini hemen gizle
    hideLoadingScreen();
    
    // Diger fonksiyonlari baslat
    initNavigation();
    initScrollAnimations();
    initCounters();
    initBackToTop();
    initCuzCards();
    initVideoPlayer();
    initOkluTakip();
});

// ============================================
// Loading Screen - Basit ve Guvenilir
// ============================================
function hideLoadingScreen() {
    var loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // 500ms sonra gizle (kisa animasyon icin)
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Animasyon bittikten sonra tamamen kaldir
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 500);
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    var navbar = document.getElementById('navbar');
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var navMenu = document.getElementById('navMenu');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        var navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;
    
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var delay = entry.target.dataset.delay || 0;
                
                setTimeout(function() {
                    entry.target.classList.add('animated');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

// ============================================
// Counter Animation
// ============================================
function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;
    
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    var target = parseInt(element.dataset.count);
    var duration = 2000;
    var step = target / (duration / 16);
    var current = 0;
    
    function updateCounter() {
        current += step;
        
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('tr-TR');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('tr-TR');
        }
    }
    
    updateCounter();
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    var backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Cuz Cards Generation
// ============================================
function initCuzCards() {
    var cuzGrid = document.getElementById('cuzGrid');
    
    if (!cuzGrid) return;
    
    var cuzData = [
        { sure: 'Fatiha-Bakara', sayfa: '1-21' },
        { sure: 'Bakara', sayfa: '22-41' },
        { sure: 'Bakara', sayfa: '42-61' },
        { sure: 'Bakara-Al-i Imran', sayfa: '62-81' },
        { sure: 'Al-i Imran', sayfa: '82-101' },
        { sure: 'Al-i Imran-Nisa', sayfa: '102-121' },
        { sure: 'Nisa', sayfa: '122-141' },
        { sure: 'Nisa-Maide', sayfa: '142-161' },
        { sure: 'Maide-Enam', sayfa: '162-181' },
        { sure: 'Enam-Araf', sayfa: '182-201' },
        { sure: 'Araf', sayfa: '202-221' },
        { sure: 'Araf-Enfal', sayfa: '222-241' },
        { sure: 'Enfal-Tevbe', sayfa: '242-261' },
        { sure: 'Tevbe-Yunus', sayfa: '262-281' },
        { sure: 'Yunus-Hud', sayfa: '282-301' },
        { sure: 'Hud-Yusuf', sayfa: '302-321' },
        { sure: 'Yusuf-Rad', sayfa: '322-341' },
        { sure: 'Ibrahim-Hicr', sayfa: '342-361' },
        { sure: 'Nahl-Isra', sayfa: '362-381' },
        { sure: 'Kehf-Meryem', sayfa: '382-401' },
        { sure: 'Ta-Ha-Enbiya', sayfa: '402-421' },
        { sure: 'Hac-Furkan', sayfa: '422-441' },
        { sure: 'Suara-Neml', sayfa: '442-461' },
        { sure: 'Kasas-Ankebut', sayfa: '462-481' },
        { sure: 'Rum-Lokman', sayfa: '482-501' },
        { sure: 'Secde-Yasin', sayfa: '502-521' },
        { sure: 'Saffat-Sad', sayfa: '522-541' },
        { sure: 'Zumer-Fussilet', sayfa: '542-561' },
        { sure: 'Sura-Casiye', sayfa: '562-581' },
        { sure: 'Ahkam-Nas', sayfa: '582-604' }
    ];
    
    var html = '';
    cuzData.forEach(function(cuz, index) {
        var cuzNum = index + 1;
        var isCompleted = cuzNum <= 5;
        
        html += '<article class="cuz-card ' + (isCompleted ? 'completed' : '') + '" data-cuz="' + cuzNum + '" title="' + cuzNum + '. Cuz - ' + cuz.sure + '">' +
            '<span class="cuz-number">' + cuzNum + '</span>' +
            (isCompleted ? '<i class="fas fa-check cuz-check"></i>' : '') +
        '</article>';
    });
    
    cuzGrid.innerHTML = html;
    
    var cuzCards = cuzGrid.querySelectorAll('.cuz-card');
    cuzCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var cuzNum = this.dataset.cuz;
            window.location.href = 'kuran-hatmi.html?cuz=' + cuzNum;
        });
    });
}

// ============================================
// Video Player
// ============================================
function initVideoPlayer() {
    var playBtn = document.querySelector('.play-btn');
    var videoCard = document.querySelector('.video-card');
    
    if (playBtn && videoCard) {
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            window.location.href = 'video-takip.html';
        });
    }
    
    var videoListCards = document.querySelectorAll('.video-list-card');
    videoListCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var videoId = this.dataset.videoId;
            if (videoId) loadVideo(videoId);
        });
    });
}

function loadVideo(videoId) {
    console.log('Loading video:', videoId);
}

// ============================================
// Oklu Takip Sistemi
// ============================================
function initOkluTakip() {
    var takipContainer = document.querySelector('.oklu-takip-container');
    
    if (!takipContainer) return;
    
    var ayetler = [
        { arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', latin: 'Bismillahirrahmanirrahim', meal: 'Rahman ve Rahim olan Allahin adiyla.' },
        { arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', latin: 'Elhamdulillahi Rabbilalemin', meal: 'Hamd alemlerin Rabbi Allah mahsustur.' },
        { arabic: 'الرَّحْمَنِ الرَّحِيمِ', latin: 'Errahmanirrahim', meal: 'Rahman dir, Rahim dir O.' },
        { arabic: 'مَالِكِ يَوْمِ الدِّينِ', latin: 'Maliki yevmiddin', meal: 'Din gununun maliki O dur.' },
        { arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', latin: 'Iyyake nabudu ve iyyake nestein', meal: 'Yalniz sana ibadet ederiz ve yalniz senden yardim dileriz.' },
        { arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', latin: 'Ihdinessiratelmustakim', meal: 'Bizi dogru yola ilet.' },
        { arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', latin: 'Siratellezine en amte aleyhim gayril magdubi aleyhim ve leddallin', meal: 'Kendilerine nimet verdiginin yoluna, gazaba ugrayanlarin ve sapiklarinkine degil.' }
    ];
    
    var currentAyet = 0;
    var totalAyet = ayetler.length;
    
    var ayetArabic = takipContainer.querySelector('.ayet-arabic');
    var ayetLatin = takipContainer.querySelector('.ayet-latin');
    var ayetMeal = takipContainer.querySelector('.ayet-meal');
    var ayetCounter = takipContainer.querySelector('.ayet-counter');
    var prevBtn = takipContainer.querySelector('.takip-btn.prev');
    var nextBtn = takipContainer.querySelector('.takip-btn.next');
    
    function updateAyet(index) {
        var ayet = ayetler[index];
        
        if (ayetArabic) ayetArabic.style.opacity = '0';
        if (ayetLatin) ayetLatin.style.opacity = '0';
        if (ayetMeal) ayetMeal.style.opacity = '0';
        
        setTimeout(function() {
            if (ayetArabic) ayetArabic.innerHTML = '<span class="highlight">' + ayet.arabic + '</span>';
            if (ayetLatin) ayetLatin.textContent = ayet.latin;
            if (ayetMeal) ayetMeal.textContent = ayet.meal;
            if (ayetCounter) ayetCounter.textContent = (index + 1) + ' / ' + totalAyet;
            
            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === totalAyet - 1;
            
            if (ayetArabic) ayetArabic.style.opacity = '1';
            if (ayetLatin) ayetLatin.style.opacity = '1';
            if (ayetMeal) ayetMeal.style.opacity = '1';
        }, 200);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentAyet > 0) {
                currentAyet--;
                updateAyet(currentAyet);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentAyet < totalAyet - 1) {
                currentAyet++;
                updateAyet(currentAyet);
            }
        });
    }
    
    updateAyet(0);
}

// ============================================
// Local Storage Helper Functions
// ============================================
var Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    },
    
    get: function(key, defaultValue) {
        try {
            var item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    }
};

// ============================================
// Hatim Progress Tracker
// ============================================
var HatimTracker = {
    key: 'mukavelem_hatim_progress',
    
    getProgress: function() {
        return Storage.get(this.key, {
            completedCuzler: [],
            currentCuz: 1,
            startDate: null,
            completedDate: null
        });
    },
    
    saveProgress: function(progress) {
        Storage.set(this.key, progress);
    },
    
    completeCuz: function(cuzNum) {
        var progress = this.getProgress();
        if (progress.completedCuzler.indexOf(cuzNum) === -1) {
            progress.completedCuzler.push(cuzNum);
            progress.completedCuzler.sort(function(a, b) { return a - b; });
            
            if (progress.completedCuzler.length === 30) {
                progress.completedDate = new Date().toISOString();
            }
            
            this.saveProgress(progress);
        }
    },
    
    setCurrentCuz: function(cuzNum) {
        var progress = this.getProgress();
        progress.currentCuz = cuzNum;
        
        if (!progress.startDate) {
            progress.startDate = new Date().toISOString();
        }
        
        this.saveProgress(progress);
    },
    
    getCompletionPercentage: function() {
        var progress = this.getProgress();
        return Math.round((progress.completedCuzler.length / 30) * 100);
    },
    
    reset: function() {
        Storage.remove(this.key);
    }
};

// ============================================
// Export for module usage
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HatimTracker: HatimTracker, Storage: Storage };
}
