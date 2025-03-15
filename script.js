// Mobil menü toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Sayfa kaydırma animasyonu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Mobil menüyü kapat
            navLinks.classList.remove('active');
        }
    });
});

// Müşteri yorumları slider
const testimonialSlider = document.querySelector('.testimonials-slider');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;

function updateSlider() {
    testimonials.forEach((testimonial, index) => {
        if (index === currentSlide) {
            testimonial.style.display = 'block';
            testimonial.style.opacity = '1';
        } else {
            testimonial.style.display = 'none';
            testimonial.style.opacity = '0';
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateSlider();
});

// İlk yüklemede slider'ı güncelle
updateSlider();

// Sayı animasyonu
function animateNumbers() {
    const numbers = document.querySelectorAll('.number');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                number.textContent = Math.ceil(current) + (number.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target + (number.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateNumber();
    });
}

// Scroll animasyonları
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Sayı animasyonunu başlat
            if (entry.target.classList.contains('hero-stats')) {
                animateNumbers();
            }
        }
    });
}, {
    threshold: 0.1
});

// Animate edilecek elementleri seç
document.querySelectorAll('.service-card, .testimonial, .hero-stats, .about-image, .about-features').forEach((element) => {
    observer.observe(element);
});

// Form gönderimi
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Loading durumunu göster
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
    
    try {
        // Form verilerini al
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        // API çağrısını simüle et
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Form gönderildi:', formObject);
        
        // Formu temizle
        contactForm.reset();
        
        // Başarılı mesajı göster
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Gönderildi!';
        submitBtn.classList.add('success');
        
        // Alert yerine özel bildirim göster
        showNotification('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.', 'success');
        
        // Butonu resetle
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Gönder</span><i class="fas fa-paper-plane"></i>';
            submitBtn.classList.remove('success');
        }, 3000);
        
    } catch (error) {
        console.error('Form gönderimi başarısız:', error);
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Hata!';
        submitBtn.classList.add('error');
        
        showNotification('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Gönder</span><i class="fas fa-paper-plane"></i>';
            submitBtn.classList.remove('error');
        }, 3000);
    }
});

// Bildirim gösterme fonksiyonu
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Animasyon için setTimeout
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Bildirimi kaldır
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Telefon numarası formatı
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `+90 (${value}`;
        } else if (value.length <= 6) {
            value = `+90 (${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length <= 8) {
            value = `+90 (${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6)}`;
        } else {
            value = `+90 (${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8, 10)}`;
        }
    }
    e.target.value = value;
});

// Navbar scroll efekti
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', () => {
    // Hero section elementlerini seç
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons, .hero-stats');
    
    // Her elemente animasyon sınıfını ekle
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}); 