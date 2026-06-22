// ESTATE & CO — shared scripts
document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Generic chip filter toggling (visual only, demo logic)
  document.querySelectorAll('.chip-row').forEach(function (row) {
    row.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      row.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
    });
  });

  // Simple front-end form validation (sign up / sign in / contact)
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var errorEl = input.closest('.field').querySelector('.error-msg');
        var ok = input.value.trim().length > 0;
        if (input.type === 'email' && ok) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }
        if (input.id === 'confirmPassword' && ok) {
          var pw = form.querySelector('#password');
          if (pw) ok = pw.value === input.value;
        }
        if (!ok) {
          valid = false;
          input.style.borderColor = '#7A4632';
          if (errorEl) errorEl.style.display = 'block';
        } else {
          input.style.borderColor = '';
          if (errorEl) errorEl.style.display = 'none';
        }
      });
      var feedback = form.querySelector('.form-success');
      if (valid) {
        if (feedback) {
          feedback.style.display = 'block';
          form.reset();
          setTimeout(function () { feedback.style.display = 'none'; }, 4000);
        }
      }
    });
  });

  // Gallery thumbnail swap on listing-detail page
  document.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var main = document.querySelector('[data-gallery-main]');
      if (main) {
        var tmp = main.src;
        main.src = thumb.src;
        thumb.src = tmp;
      }
    });
  });

  // Set active nav link based on current page
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

});
