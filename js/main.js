// Svaran — main.js

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initSmoothScroll();
  initFadeInOnScroll();
  initContactForm();
});

// --------------------------------------------------------------------------
// Mobile nav toggle
// --------------------------------------------------------------------------
function initNavToggle() {
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) {
    return;
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --------------------------------------------------------------------------
// Smooth scroll for in-page anchor links (accounts for sticky header height)
// --------------------------------------------------------------------------
function initSmoothScroll() {
  var header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');

      if (!targetId || targetId.length < 2) {
        return;
      }

      var target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      var headerHeight = header ? header.offsetHeight : 0;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// --------------------------------------------------------------------------
// Scroll-triggered fade-in animations
// --------------------------------------------------------------------------
function initFadeInOnScroll() {
  var elements = document.querySelectorAll('.fade-in');

  if (!elements.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

// --------------------------------------------------------------------------
// Contact form: client-side validation + Formspree submission
// --------------------------------------------------------------------------
function initContactForm() {
  var form = document.getElementById('contact-form');

  if (!form) {
    return;
  }

  var successEl = document.getElementById('form-success');
  var statusEl = document.getElementById('form-status');

  var fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: function (value) {
        return value.trim().length > 0 ? '' : 'Please enter your name.';
      }
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: function (value) {
        if (value.trim().length === 0) {
          return 'Please enter your email.';
        }
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value.trim()) ? '' : 'Please enter a valid email address.';
      }
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: function (value) {
        return value.trim().length > 0 ? '' : 'Please enter a message.';
      }
    }
  };

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    field.input.addEventListener('blur', function () {
      validateField(field);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    hideStatus();

    var isValid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(fields[key])) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    submitForm();
  });

  function validateField(field) {
    var message = field.validate(field.input.value);
    var group = field.input.closest('.form-group');

    field.error.textContent = message;
    field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (group) {
      group.classList.toggle('has-error', Boolean(message));
    }

    return message === '';
  }

  function submitForm() {
    var submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(function (response) {
        if (response.ok) {
          showSuccess();
        } else {
          showStatus("Something went wrong sending your message. Please try again or email me directly.");
        }
      })
      .catch(function () {
        showStatus("Something went wrong sending your message. Please try again or email me directly.");
      })
      .finally(function () {
        submitButton.disabled = false;
      });
  }

  function showSuccess() {
    form.hidden = true;
    successEl.hidden = false;
  }

  function showStatus(message) {
    statusEl.textContent = message;
    statusEl.hidden = false;
  }

  function hideStatus() {
    statusEl.hidden = true;
    statusEl.textContent = '';
  }
}
