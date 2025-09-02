// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggles.length && nav) {
  mobileMenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      // Перемикаємо клас активності для цього toggle
      toggle.classList.toggle('active');

      // Відкриваємо/закриваємо меню
      nav.classList.toggle('mobile-menu-open');

      // Блокування скролу
      document.body.style.overflow = nav.classList.contains('mobile-menu-open') ? 'hidden' : '';
      
      // Якщо потрібно, зняти активність з інших toggle
      mobileMenuToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) otherToggle.classList.remove('active');
      });
    });
  });

  // Закрити меню при кліку на nav links
  const navLinks = nav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuToggles.forEach(toggle => toggle.classList.remove('active'));
      nav.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
    });
  });

  // Закрити меню при кліку поза ним
  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && ![...mobileMenuToggles].some(t => t.contains(e.target))) {
      mobileMenuToggles.forEach(toggle => toggle.classList.remove('active'));
      nav.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
    }
  });
}

  
  // Footer mobile menu
  // if (footerMobileMenuToggle && footerNavList) {
  //   footerMobileMenuToggle.addEventListener('click', function() {
  //     footerMobileMenuToggle.classList.toggle('active');
      
  //     if (footerNavList.classList.contains('mobile-menu-open')) {
  //       footerNavList.classList.remove('mobile-menu-open');
  //       footerNavList.classList.add('mobile-menu-collapsed');
  //       setTimeout(() => {
  //         footerNavList.classList.remove('mobile-menu-collapsed');
  //       }, 300);
  //     } else {
  //       footerNavList.classList.add('mobile-menu-open');
  //     }
  //   });
  // }

  // Handle navigation clicks
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  // const header = document.querySelector('.header');
  // let lastScrollTop = 0;

  // window.addEventListener('scroll', function() {
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
  //   if (scrollTop > lastScrollTop && scrollTop > 100) {
  //     // Scrolling down
  //     header.style.transform = 'translateY(-100%)';
  //   } else {
  //     // Scrolling up
  //     header.style.transform = 'translateY(0)';
  //   }
    
  //   lastScrollTop = scrollTop;
  // });

  // Cart functionality
  const cartBtn = document.querySelector('.cart-btn');
  const cartCount = document.querySelector('.cart-count');
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  
  let cartItems = 1; // Initial cart count

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      cartItems++;
      cartCount.textContent = cartItems;
      
      // Add animation
      cartCount.style.transform = 'scale(1.3)';
      setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
      }, 200);
      
      // Show success message
      showNotification('Товар додано до кошика!');
    });
  });

  // // CTA button functionality
  // const ctaButton = document.querySelector('.cta-button');
  // if (ctaButton) {
  //   ctaButton.addEventListener('click', function() {
  //     showNotification('Дякуємо за інтерес! Зв\'яжіться з нами для запису.');
  //   });
  // }

  // Carousel functionality
  const carouselControls = document.querySelectorAll('.carousel-controls');
  
  carouselControls.forEach(controls => {
    const prevBtn = controls.querySelector('.carousel-btn--prev');
    const nextBtn = controls.querySelector('.carousel-btn--next');
    const section = controls.closest('section');
    const grid = section.querySelector('.certificates-grid, .masters-grid');
    
    if (grid) {
      let currentIndex = 0;
      const items = grid.children;
      const itemsPerView = getItemsPerView();
      const maxIndex = Math.max(0, items.length - itemsPerView);
      
      function getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
      }
      
      function updateCarousel() {
        const translateX = -(currentIndex * (100 / itemsPerView));
        grid.style.transform = `translateX(${translateX}%)`;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
      }
      
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
      
      nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
        }
      });
      
      // Update on window resize
      window.addEventListener('resize', () => {
        const newItemsPerView = getItemsPerView();
        const newMaxIndex = Math.max(0, items.length - newItemsPerView);
        if (currentIndex > newMaxIndex) {
          currentIndex = newMaxIndex;
        }
        updateCarousel();
      });
      
      updateCarousel();
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Notification system
  function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 120px;
      right: 20px;
      background-color: #B0864A;
      color: #F0E9DF;
      padding: 16px 24px;
      border-radius: 8px;
      font-family: 'Poiret One', sans-serif;
      font-size: 16px;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  // Form handling (if forms are added later)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      showNotification('Форму відправлено! Ми зв\'яжемося з вами найближчим часом.');
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img[src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        const newImg = new Image();
        newImg.onload = () => {
          img.style.opacity = '1';
        };
        newImg.src = img.src;
        
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
  if (window.innerWidth > 768) {
    const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    // Закриваємо меню
    mobileMenuToggles.forEach(toggle => toggle.classList.remove('active'));

    if (nav) {
      nav.classList.remove('mobile-menu-open');
    }

    document.body.style.overflow = '';
  }
}, 250));


document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".iconCloseBurgerMenu");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

  if (closeBtn && mobileMenuToggle) {
    closeBtn.addEventListener("click", () => {
      mobileMenuToggle.click();
    });
  }
});


  document.addEventListener("DOMContentLoaded", function () {
  const langEls = document.querySelectorAll(".language-selector .language");

  langEls.forEach(function (langEl) {
    langEl.addEventListener("click", function () {
      const cur = langEl.textContent.trim();
      langEl.textContent = cur === "EN" ? "UA" : "EN";
    });
  });
});

  document.addEventListener("DOMContentLoaded", function () {
    const title = document.querySelector(".about-title");

    if (title) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              title.classList.add("visible");
              observer.unobserve(title);
            }
          });
        },
        { threshold: 0.2 } 
      );

      observer.observe(title);
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const successMessage = document.getElementById("successMessage");
  const closeBtn = document.getElementById("popupClose");
  const popup = document.getElementById("popup");
  const openBtn = document.querySelector(".cta-button");

  openBtn.addEventListener("click", () => {
    popup.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });

  nameInput.addEventListener("input", () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-ЯїЇєЄіІґҐ\s]/g, "");
  });

  phoneInput.addEventListener("input", () => {
    if (!phoneInput.value.startsWith("+380")) {
      phoneInput.value = "+380";
    }
    phoneInput.value = phoneInput.value.replace(/(?!^\+380)\D/g, "");
    if (phoneInput.value.length > 13) {
      phoneInput.value = phoneInput.value.slice(0, 13);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (nameInput.value.trim() !== "" && /^\+380\d{9}$/.test(phoneInput.value)) {
      successMessage.style.display = "block";
      setTimeout(()=> {
        popup.classList.remove("active");
        nameInput.value = "";
        phoneInput.value = "";
        successMessage.style.display = "none";
      }, 4000);
    } else {
      successMessage.style.display = "none";
      alert("Будь ласка, введіть коректні дані!");
    }
  });
});


function initMap() {
      const vinnytsia = { lat: 49.2331, lng: 28.4682 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: vinnytsia,
      });

      const locations = [
        { position: { lat: 49.2336, lng: 28.4689 }, title: "м. Вінниця, вул. Соборна 58" },
        { position: { lat: 49.2348, lng: 28.4705 }, title: "м. Вінниця, вул. Театральна 34" }
      ];

      locations.forEach(loc => {
        new google.maps.Marker({
          position: loc.position,
          map: map,
          title: loc.title,
        });
      });
    }


    document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.timeSlot').forEach(slotGroup => {
    const items = slotGroup.querySelectorAll('.valueTime');

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(el => el.classList.remove('timeActive'));
        item.classList.add('timeActive');
      });
    });
  });
});

