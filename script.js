var currentPage = 'home';
var skillsAnimated = false;

function showPage(page) {
  var pages = document.querySelectorAll('.page');
  pages.forEach(function(p) {
    p.classList.remove('active');
  });

  var links = document.querySelectorAll('.nav-link');
  links.forEach(function(l) {
    l.classList.remove('active');
  });

  var target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
  }

  var activeLink = document.querySelector('[data-page="' + page + '"]');
  if (activeLink) {
    activeLink.classList.add('active');
  }

  currentPage = page;

  var navLinks = document.getElementById('navLinks');
  navLinks.classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'about' && !skillsAnimated) {
    setTimeout(animateSkills, 400);
  }
}

function animateSkills() {
  var fills = document.querySelectorAll('.skill-fill');
  fills.forEach(function(fill) {
    var width = fill.getAttribute('data-width');
    fill.style.width = width + '%';
  });
  skillsAnimated = true;
}

function openModal(jobTitle) {
  var overlay = document.getElementById('modalOverlay');
  var content = document.getElementById('modalContent');

  content.innerHTML =
    '<h2>Apply for: ' + jobTitle + '</h2>' +
    '<p class="modal-sub">Fill in the form below and we will be in touch within 2 working days.</p>' +
    '<div class="modal-form">' +
      '<div class="form-group">' +
        '<label>Full Name</label>' +
        '<input type="text" id="applyName" placeholder="Your full name" />' +
      '</div>' +
      '<div class="form-group">' +
        '<label>Email Address</label>' +
        '<input type="email" id="applyEmail" placeholder="your@email.com" />' +
      '</div>' +
      '<div class="form-group">' +
        '<label>Phone Number</label>' +
        '<input type="tel" id="applyPhone" placeholder="07700 000 000" />' +
      '</div>' +
      '<div class="form-group">' +
        '<label>Why do you want to join Hot Beans?</label>' +
        '<textarea id="applyWhy" rows="4" placeholder="Tell us a bit about yourself..."></textarea>' +
      '</div>' +
      '<div class="form-group">' +
        '<label>Portfolio / LinkedIn URL</label>' +
        '<input type="url" id="applyUrl" placeholder="https://..." />' +
      '</div>' +
      '<button class="btn btn-primary btn-full" onclick="submitApplication(\'' + jobTitle + '\')">Submit Application</button>' +
    '</div>';

  overlay.classList.add('open');
}

function submitApplication(jobTitle) {
  var name = document.getElementById('applyName').value.trim();
  var email = document.getElementById('applyEmail').value.trim();

  if (!name || !email) {
    alert('Please fill in your name and email address.');
    return;
  }

  var content = document.getElementById('modalContent');
  content.innerHTML =
    '<div class="modal-success">' +
      '<div class="success-icon">🎉</div>' +
      '<h2>Application Sent!</h2>' +
      '<p>Thanks ' + name + '! Your application for <strong style="color:var(--orange)">' + jobTitle + '</strong> has been received. We will be in touch at <strong>' + email + '</strong> within 2 working days.</p>' +
    '</div>';
}

function enrollModal(courseName) {
  var overlay = document.getElementById('modalOverlay');
  var content = document.getElementById('modalContent');

  content.innerHTML =
    '<h2>Enrol: ' + courseName + '</h2>' +
    '<p class="modal-sub">Complete your enrolment below and we will confirm your place by email.</p>' +
    '<div class="modal-form">' +
      '<div class="form-group">' +
        '<label>Full Name</label>' +
        '<input type="text" id="enrollName" placeholder="Your full name" />' +
      '</div>' +
      '<div class="form-group">' +
        '<label>Email Address</label>' +
        '<input type="email" id="enrollEmail" placeholder="your@email.com" />' +
      '</div>' +
      '<div class="form-group">' +
        '<label>Experience Level</label>' +
        '<input type="text" id="enrollExp" placeholder="e.g. Complete beginner, Some experience..." />' +
      '</div>' +
      '<div class="form-group">' +
        '<label>Any questions or notes?</label>' +
        '<textarea id="enrollNotes" rows="3" placeholder="Optional..."></textarea>' +
      '</div>' +
      '<button class="btn btn-primary btn-full" onclick="submitEnrolment(\'' + courseName + '\')">Confirm Enrolment</button>' +
    '</div>';

  overlay.classList.add('open');
}

function submitEnrolment(courseName) {
  var name = document.getElementById('enrollName').value.trim();
  var email = document.getElementById('enrollEmail').value.trim();

  if (!name || !email) {
    alert('Please fill in your name and email address.');
    return;
  }

  var content = document.getElementById('modalContent');
  content.innerHTML =
    '<div class="modal-success">' +
      '<div class="success-icon">📚</div>' +
      '<h2>Enrolment Confirmed!</h2>' +
      '<p>Welcome aboard, ' + name + '! You have successfully enrolled in <strong style="color:var(--orange)">' + courseName + '</strong>. Check <strong>' + email + '</strong> for your course details.</p>' +
    '</div>';
}

function closeModal() {
  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
}

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

document.getElementById('hamburger').addEventListener('click', function() {
  var navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var page = this.getAttribute('data-page');
    showPage(page);
  });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var name = document.getElementById('contactName').value.trim();
  var email = document.getElementById('contactEmail').value.trim();
  var subject = document.getElementById('contactSubject').value.trim();
  var message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields.');
    return;
  }

  var overlay = document.getElementById('modalOverlay');
  var content = document.getElementById('modalContent');

  content.innerHTML =
    '<div class="modal-success">' +
      '<div class="success-icon">✉️</div>' +
      '<h2>Message Sent!</h2>' +
      '<p>Thanks ' + name + '! We have received your message about <strong style="color:var(--orange)">"' + subject + '"</strong>. We will reply to <strong>' + email + '</strong> very soon.</p>' +
    '</div>';

  overlay.classList.add('open');
  this.reset();
});

document.addEventListener('DOMContentLoaded', function() {
  showPage('home');
});
