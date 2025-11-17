// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenuToggles = document.querySelectorAll(".mobile-menu-toggle");
  const nav = document.querySelector(".nav");

  if (mobileMenuToggles.length && nav) {
    mobileMenuToggles.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        // Перемикаємо клас активності для цього toggle
        toggle.classList.toggle("active");

        // Відкриваємо/закриваємо меню
        nav.classList.toggle("mobile-menu-open");

        // Блокування скролу
        document.body.style.overflow = nav.classList.contains(
          "mobile-menu-open"
        )
          ? "hidden"
          : "";

        // Якщо потрібно, зняти активність з інших toggle
        mobileMenuToggles.forEach((otherToggle) => {
          if (otherToggle !== toggle) otherToggle.classList.remove("active");
        });
      });
    });

    // Закрити меню при кліку на nav links (але не на dropdown parent links)
    const navLinks = nav.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Don't close menu if this is a dropdown parent link in mobile view
        const isDropdownParent = link.parentElement.classList.contains("dropdown");
        const isMobileMenuOpen = nav.classList.contains("mobile-menu-open");
        
        if (isDropdownParent && isMobileMenuOpen) {
          // Let the dropdown handler manage this
          return;
        }
        
        mobileMenuToggles.forEach((toggle) =>
          toggle.classList.remove("active")
        );
        nav.classList.remove("mobile-menu-open");
        document.body.style.overflow = "";
      });
    });
    
    // Close menu when clicking on dropdown sub-items
    const dropdownSubItems = nav.querySelectorAll(".dropdown-menu a");
    dropdownSubItems.forEach((subItem) => {
      subItem.addEventListener("click", function () {
        mobileMenuToggles.forEach((toggle) =>
          toggle.classList.remove("active")
        );
        nav.classList.remove("mobile-menu-open");
        document.body.style.overflow = "";
      });
    });

    // Закрити меню при кліку поза ним
    document.addEventListener("click", function (e) {
      if (
        !nav.contains(e.target) &&
        ![...mobileMenuToggles].some((t) => t.contains(e.target))
      ) {
        mobileMenuToggles.forEach((toggle) =>
          toggle.classList.remove("active")
        );
        nav.classList.remove("mobile-menu-open");
        document.body.style.overflow = "";
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

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
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
  const cartBtn = document.querySelector(".cart-btn");
  const cartCount = document.querySelector(".cart-count");
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

  let cartItems = 1; // Initial cart count

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      cartItems++;
      cartCount.textContent = cartItems;

      // Add animation
      cartCount.style.transform = "scale(1.3)";
      setTimeout(() => {
        cartCount.style.transform = "scale(1)";
      }, 200);

      // Show success message
      showNotification("Товар додано до кошика!");
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
  const carouselControls = document.querySelectorAll(".carousel-controls");

  carouselControls.forEach((controls) => {
    const prevBtn = controls.querySelector(".carousel-btn--prev");
    const nextBtn = controls.querySelector(".carousel-btn--next");
    const section = controls.closest("section");
    const grid = section.querySelector(".certificates-grid, .masters-grid");

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

      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });

      nextBtn.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
        }
      });

      // Update on window resize
      window.addEventListener("resize", () => {
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
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Notification system
  function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement("div");
    notification.className = "notification";
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
      notification.style.transform = "translateX(0)";
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  // Form handling (if forms are added later)
  // const forms = document.querySelectorAll("form");
  // forms.forEach((form) => {
  //   form.addEventListener("submit", function (e) {
  //     e.preventDefault();

  //   });
  // });

  // Lazy loading for images
  const images = document.querySelectorAll("img[src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.3s ease";

        const newImg = new Image();
        newImg.onload = () => {
          img.style.opacity = "1";
        };
        newImg.src = img.src;

        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
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
window.addEventListener(
  "resize",
  debounce(() => {
    if (window.innerWidth > 768) {
      const mobileMenuToggles = document.querySelectorAll(
        ".mobile-menu-toggle"
      );
      const nav = document.querySelector(".nav");

      // Закриваємо меню
      mobileMenuToggles.forEach((toggle) => toggle.classList.remove("active"));

      if (nav) {
        nav.classList.remove("mobile-menu-open");
      }

      document.body.style.overflow = "";
    }
  }, 250)
);

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".iconCloseBurgerMenu");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

  if (closeBtn && mobileMenuToggle) {
    closeBtn.addEventListener("click", () => {
      mobileMenuToggle.click();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
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
  const nameInput = document.getElementById("nameBooking");
  const phoneInput = document.getElementById("phoneBooking");
  const successMessage = document.getElementById("successMessage");
  const closeBtn = document.getElementById("popupClose");
  const popup = document.getElementById("popup");
  const openBtns = document.querySelectorAll(".openPopup");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      popup.classList.add("active");
    });
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

  function formatPhoneMask(value) {
    let digits = value.replace(/[^\d]/g, "").replace(/^380/, "");
    digits = digits.slice(0, 9);
    return "+380" + digits;
  }

  phoneInput.addEventListener("focus", () => {
    if (phoneInput.value === "" || phoneInput.value === "+380") {
      phoneInput.value = formatPhoneMask("");
      setTimeout(() => {
        phoneInput.setSelectionRange(
          phoneInput.value.length,
          phoneInput.value.length
        );
      }, 0);
    }
  });

  phoneInput.addEventListener("input", () => {
    let digits = phoneInput.value.replace(/[^\d]/g, "").replace(/^380/, "");
    phoneInput.value = formatPhoneMask(digits);
    if (phoneInput.value.length < 4) {
      phoneInput.value = formatPhoneMask("");
    }
  });

  phoneInput.addEventListener("keydown", (e) => {
    if (
      phoneInput.selectionStart <= 4 &&
      (e.key === "Backspace" || e.key === "Delete")
    ) {
      e.preventDefault();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const digits = phoneInput.value.replace(/[^\d]/g, "").replace(/^380/, "");
    if (nameInput.value.trim() !== "" && digits.length === 9) {
      successMessage.innerHTML =
        "Ваш запис успішно прийнято.<br>Менеджер звяжеться з вами найближчим часом.";
      successMessage.style.display = "block";
      successMessage.style.color = "rgba(5, 5, 5, 1)";
      setTimeout(() => {
        popup.classList.remove("active");
        nameInput.value = "";
        phoneInput.value = formatPhoneMask("");
        successMessage.style.display = "none";
      }, 4000);
    } else {
      successMessage.textContent = "Будь ласка, заповніть всі поля коректно.";
      successMessage.style.display = "block";
      successMessage.style.color = "red";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 4000);
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
    {
      position: { lat: 49.2336, lng: 28.4689 },
      title: "м. Вінниця, вул. Соборна 58",
    },
    {
      position: { lat: 49.2348, lng: 28.4705 },
      title: "м. Вінниця, вул. Театральна 34",
    },
  ];

  locations.forEach((loc) => {
    new google.maps.Marker({
      position: loc.position,
      map: map,
      title: loc.title,
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".timeSlot").forEach((slotGroup) => {
    const items = slotGroup.querySelectorAll(".valueTime");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((el) => el.classList.remove("timeActive"));
        item.classList.add("timeActive");
      });
    });
  });
});

document.querySelectorAll(".nav-item").forEach((item) => {
  const link = item.querySelector(".nav-link");
  const submenuLinks = item.querySelectorAll(".dropdown-menu a");

  link.addEventListener("click", (e) => {
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    localStorage.setItem("activeMenu", link.textContent.trim());
  });

  submenuLinks.forEach((sublink) => {
    sublink.addEventListener("click", (e) => {
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      localStorage.setItem("activeMenu", link.textContent.trim());
    });
  });
});

const activeMenu = localStorage.getItem("activeMenu");
if (activeMenu) {
  document.querySelectorAll(".nav-link").forEach((l) => {
    if (l.textContent.trim() === activeMenu) {
      l.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  const nameInputFeedback = document.getElementById("nameFeedback");
  const surnameInputFeedback = document.getElementById("surnameFeedback");
  const DateGoingFeedback = document.getElementById("DateGoing");
  const messageFeedback = document.getElementById("message");
  const phoneInputFeedback = document.getElementById("phoneFeedback");
  const successMessageFeedback = document.getElementById(
    "successMessageFeedback"
  );

  function markError(input, hasError) {
    if (hasError) input.classList.add("input-error");
    else input.classList.remove("input-error");
  }

  nameInputFeedback.addEventListener("input", () => {
    nameInputFeedback.value = nameInputFeedback.value.replace(
      /[^a-zA-Zа-яА-ЯїЇєЄіІґҐ\s]/g,
      ""
    );

    markError(nameInputFeedback, nameInputFeedback.value.trim() === "");
  });

  surnameInputFeedback.addEventListener("input", () => {
    surnameInputFeedback.value = surnameInputFeedback.value.replace(
      /[^a-zA-Zа-яА-ЯїЇєЄіІґҐ\s]/g,
      ""
    );

    markError(surnameInputFeedback, surnameInputFeedback.value.trim() === "");
  });

  function formatPhoneMask(value) {
    let digits = value.replace(/[^\d]/g, "").replace(/^380/, "");
    digits = digits.slice(0, 9);
    return "+380" + digits;
  }

  phoneInputFeedback.addEventListener("focus", () => {
    if (
      phoneInputFeedback.value === "" ||
      phoneInputFeedback.value === "+380"
    ) {
      phoneInputFeedback.value = formatPhoneMask("");
      setTimeout(() => {
        phoneInputFeedback.setSelectionRange(
          phoneInputFeedback.value.length,
          phoneInputFeedback.value.length
        );
      }, 0);
    }
  });

  phoneInputFeedback.addEventListener("input", () => {
    let digitsFeedback = phoneInputFeedback.value
      .replace(/[^\d]/g, "")
      .replace(/^380/, "");
    phoneInputFeedback.value = formatPhoneMask(digitsFeedback);

    const isInvalid = digitsFeedback.length !== 9;
    markError(phoneInputFeedback, isInvalid);
  });

  phoneInputFeedback.addEventListener("keydown", (e) => {
    if (
      phoneInputFeedback.selectionStart <= 4 &&
      (e.key === "Backspace" || e.key === "Delete")
    ) {
      e.preventDefault();
    }
  });

  DateGoingFeedback.addEventListener("input", () => {
    let val = DateGoingFeedback.value.replace(/[^\d]/g, "");
    if (val.length > 2) val = val.slice(0, 2) + "." + val.slice(2);
    if (val.length > 5) val = val.slice(0, 5) + "." + val.slice(5);
    val = val.slice(0, 10);
    DateGoingFeedback.value = val;

    markError(DateGoingFeedback, val.length !== 10);
  });

  function isValidDateDDMMYYYY(str) {
    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(str)) return false;

    const [ddStr, mmStr, yyyyStr] = str.split(".");
    const day = parseInt(ddStr, 10);
    const month = parseInt(mmStr, 10);
    const year = parseInt(yyyyStr, 10);

    if (month < 1 || month > 12) return false;
    if (year < 1) return false;

    const d = new Date(year, month - 1, day);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month - 1 &&
      d.getDate() === day
    );
  }

  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const digits = phoneInputFeedback.value
      .replace(/[^\d]/g, "")
      .replace(/^380/, "");
    const dateVal = DateGoingFeedback.value;
    const messageVal = messageFeedback.value.trim();

    let valid = true;
    let errorMsg = "";

    if (nameInputFeedback.value.trim() === "") {
      markError(nameInputFeedback, true);
      valid = false;
      errorMsg = "Будь ласка, заповніть всі поля коректно.";
    }

    if (digits.length !== 9) {
      markError(phoneInputFeedback, true);
      valid = false;
      errorMsg = "Будь ласка, заповніть всі поля коректно.";
    }

    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateVal)) {
      markError(DateGoingFeedback, true);
      valid = false;
      errorMsg = "Введіть дату у форматі ДД.MM.РРРР.";
    } else if (!isValidDateDDMMYYYY(dateVal)) {
      markError(DateGoingFeedback, true);
      valid = false;
      errorMsg = "Будь ласка, заповніть всі поля коректно.";
    }

    if (messageVal === "") {
      markError(messageFeedback, true);
      valid = false;
      errorMsg = "Поле повідомлення обов'язкове.";
    } else {
      markError(messageFeedback, false);
    }

    if (valid) {
      successMessageFeedback.textContent = "Відгук відправлено";
      successMessageFeedback.style.display = "block";
      successMessageFeedback.style.color = "rgba(5, 5, 5, 1)";

      setTimeout(() => {
        nameInputFeedback.value = "";
        surnameInputFeedback.value = "";
        phoneInputFeedback.value = formatPhoneMask("");
        DateGoingFeedback.value = "";
        messageFeedback.value = "";

        document
          .querySelectorAll(".input-error")
          .forEach((el) => el.classList.remove("input-error"));

        successMessageFeedback.style.display = "none";
      }, 4000);
    } else {
      successMessageFeedback.textContent = errorMsg;
      successMessageFeedback.style.display = "block";
      successMessageFeedback.style.color = "red";

      setTimeout(() => {
        successMessageFeedback.style.display = "none";
      }, 4000);
    }
  });
});

document.querySelectorAll(".faq-question").forEach((item) => {
  item.addEventListener("click", () => {
    const faqItem = item.closest(".faq-item");
    faqItem.classList.toggle("active");
    const icon = item.querySelector(".toggle-icon");
    if (faqItem.classList.contains("active")) {
      icon.textContent = "-";
    } else {
      icon.textContent = "+";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-background video.hero-image");
  if (!video) return;

  video.removeAttribute("controls");

  video.setAttribute("autoplay", "");
  video.setAttribute("loop", "");
  video.muted = true;
  video.play().catch(() => {
    console.warn("Autoplay заблоковано користувачем");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".about-background video.about-image");
  if (!video) return;

  video.removeAttribute("controls");

  video.setAttribute("autoplay", "");
  video.setAttribute("loop", "");
  video.muted = true;
  video.play().catch(() => {
    console.warn("Autoplay заблоковано користувачем");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdownLinks = document.querySelectorAll(
    ".nav-item.dropdown > .nav-link"
  );

  dropdownLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Check if mobile menu is open (mobile view)
      const nav = document.querySelector(".nav");
      const isMobileMenuOpen = nav && nav.classList.contains("mobile-menu-open");
      
      if (isMobileMenuOpen || window.innerWidth <= 1250) {
        e.preventDefault();
        e.stopPropagation();

        const parent = link.parentElement;
        const dropdown = parent.querySelector(".dropdown-menu");

        // Close other open dropdowns
        document
          .querySelectorAll(".nav-item.dropdown.open")
          .forEach((openItem) => {
            if (openItem !== parent) {
              openItem.classList.remove("open");
              const otherDropdown = openItem.querySelector(".dropdown-menu");
              if (otherDropdown) {
                otherDropdown.style.maxHeight = "0";
              }
            }
          });

        // Toggle current dropdown
        parent.classList.toggle("open");

        if (dropdown) {
          if (parent.classList.contains("open")) {
            dropdown.style.maxHeight = dropdown.scrollHeight + "px";
          } else {
            dropdown.style.maxHeight = "0";
          }
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((select) => {
    const optionsContainer = select.querySelector(".options");

    if (optionsContainer) {
      const labels = optionsContainer.querySelectorAll("label");

      if (labels.length === 0) {
        const noFiltersMsg = document.createElement("div");
        noFiltersMsg.classList.add("no-filters");
        noFiltersMsg.textContent = "Немає фільтрів";
        optionsContainer.appendChild(noFiltersMsg);
      }
    }
  });
});
