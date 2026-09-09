document.addEventListener('DOMContentLoaded', () => {
  initCurrentYear();
  initMobileMenu();
  initActiveNavSpy();
  initTerminalSnippet();
  initProjectModals();
  initContactForm();
});

/* 1. Dynamic Footer Year */
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* 2. Accessible Mobile Menu Drawer */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function closeMenu() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.remove('open');
  }

  function openMenu() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.classList.add('open');
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking any nav anchor link
  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });
}

/* 3. Active Navigation Spy on Scroll */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* 4. Terminal Snippet Copy Feature */
function initTerminalSnippet() {
  const copyBtn = document.getElementById('copyTerminalBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const textToCopy = `const developer = {
  name: "Ganesh Khamkar",
  role: "Web-Developer",
  coreStack: ["HTML5", "CSS3", "JavaScript", "MySQL"],
  aiWorkflows: ["Gemini", "Claude", "ChatGPT"],
  focus: "Building performant, structured web solutions",
  status: "Ready to build"
};`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    } catch (err) {
      copyBtn.textContent = 'Failed';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    }
  });
}

/* 5. Case Study Modal Data & Handlers */
const PROJECT_CASE_STUDIES = {
  'modal-project-1': {
    title: '[PROJECT NAME 1]',
    category: 'Web Application / Frontend & MySQL',
    overview: '[Overview: Complete description of this web project, its design parameters, and core intent.]',
    problem: '[Problem: The operational problem, repetitive manual step, or business inefficiency this application addresses.]',
    approach: '[Approach: Modular component breakdown using pure JavaScript and structured MySQL schema design.]',
    technology: ['HTML5', 'CSS3', 'JavaScript', 'MySQL'],
    implementation: '[Implementation: Key architecture decisions, event listeners, query sanitization, and state synchronization.]',
    challenges: '[Challenges: Main technical roadblock encountered during development (e.g., query efficiency, asynchronous rendering).]',
    solution: '[Solution: How the roadblock was resolved with technical reasoning.]',
    result: '[Result: Measured outcome, reliability benchmark, or functional capability.]',
    githubUrl: '[GITHUB URL 1]',
    liveUrl: '[LIVE DEMO URL 1]'
  },
  'modal-project-2': {
    title: '[PROJECT NAME 2]',
    category: 'AI-Assisted Web Tool',
    overview: '[Overview: What this AI tool automates, generates, or inspects for the user.]',
    problem: '[Problem: Time-consuming repetitive analysis or text processing tasks.]',
    approach: '[Approach: Crafting rigid JSON prompt schemas sent to Gemini/Claude APIs and handling responses in JavaScript.]',
    technology: ['JavaScript', 'Gemini / Claude', 'CSS3'],
    implementation: '[Implementation: Error fallback handling for LLM timeouts, payload validation, and UI states.]',
    challenges: '[Challenges: Handling non-deterministic model output and maintaining accurate data presentation.]',
    solution: '[Solution: System instruction formatting and strict client-side validation logic.]',
    result: '[Result: Completed workflow with reliable turnaround time.]',
    githubUrl: '[GITHUB URL 2]',
    liveUrl: '[LIVE DEMO URL 2]'
  },
  'modal-project-3': {
    title: '[PROJECT NAME 3]',
    category: 'Relational Database Concept',
    overview: '[Overview: Web interface managing relational database records, persistent forms, and dynamic tables.]',
    problem: '[Problem: Lack of structured tracking for transactional user data.]',
    approach: '[Approach: Normalized MySQL relational database design paired with responsive JavaScript front-end.]',
    technology: ['HTML', 'JavaScript', 'MySQL'],
    implementation: '[Implementation: Parametric SQL queries, input sanitation, and dynamic table redraws.]',
    challenges: '[Challenges: Synchronizing front-end state without whole-page browser reloads.]',
    solution: '[Solution: Fetch-based async requests with granular DOM updates.]',
    result: '[Result: Functional CRUD pipeline verified against sample datasets.]',
    githubUrl: '[GITHUB URL 3]',
    liveUrl: '[LIVE DEMO URL 3]'
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-dynamic-content');
  const triggerButtons = document.querySelectorAll('.open-modal-btn');

  if (!modalBackdrop || !modalCloseBtn || !modalContent) return;

  function renderModal(data) {
    modalContent.innerHTML = `
      <div class="modal-case-study">
        <h3 id="modal-project-title">${escapeHtml(data.title)}</h3>
        <span class="modal-category-tag font-mono">// ${escapeHtml(data.category)}</span>

        <div class="case-section">
          <h4 class="case-heading font-mono">&gt; Overview</h4>
          <p class="case-body">${escapeHtml(data.overview)}</p>
        </div>

        <div class="case-section">
          <h4 class="case-heading font-mono">&gt; Problem</h4>
          <p class="case-body">${escapeHtml(data.problem)}</p>
        </div>

        <div class="case-section">
          <h4 class="case-heading font-mono">&gt; Approach</h4>
          <p class="case-body">${escapeHtml(data.approach)}</p>
        </div>

        <div class="case-section">
          <h4 class="case-heading font-mono">&gt; Technologies Used</h4>
          <div class="project-tech-tags font-mono">
            ${data.technology.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>

        <div class="case-section">
          <h4 class="case-heading font-mono">&gt; Implementation Details</h4>
          <p class="case-body">${escapeHtml(data.implementation)}</p>
        </div>

        <div class="case-section">
          <h4 class="case-heading font-mono">&gt; Technical Challenges &amp; Solution</h4>
          <p class="case-body"><strong>Challenge:</strong> ${escapeHtml(data.challenges)}</p>
          <p class="case-body" style="margin-top: 6px;"><strong>Solution:</strong> ${escapeHtml(data.solution)}</p>
        </div>

        <div class="case-section">
          <h4 class="case-heading font-mono">&gt; Result</h4>
          <p class="case-body">${escapeHtml(data.result)}</p>
        </div>

        <div class="case-links font-mono">
          <a href="${escapeHtml(data.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Launch Demo &rarr;</a>
          <a href="${escapeHtml(data.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">GitHub Repository &nearr;</a>
        </div>
      </div>
    `;
  }

  function openModal(modalKey) {
    const data = PROJECT_CASE_STUDIES[modalKey];
    if (!data) return;

    renderModal(data);
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
    modalCloseBtn.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  // Close when clicking outside of modal card
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* 6. Form Validation & Submittal States */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');
  const statusBox = document.getElementById('form-status');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(inputElement, errorElementId, isError) {
    const parent = inputElement.closest('.form-group');
    if (isError) {
      parent.classList.add('has-error');
    } else {
      parent.classList.remove('has-error');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    let hasErrors = false;

    // Name Validation
    if (nameVal.length < 2) {
      setFieldError(nameInput, 'name-error', true);
      hasErrors = true;
    } else {
      setFieldError(nameInput, 'name-error', false);
    }

    // Email Validation
    if (!validateEmail(emailVal)) {
      setFieldError(emailInput, 'email-error', true);
      hasErrors = true;
    } else {
      setFieldError(emailInput, 'email-error', false);
    }

    // Message Validation (min 15 chars)
    if (messageVal.length < 15) {
      setFieldError(messageInput, 'message-error', true);
      hasErrors = true;
    } else {
      setFieldError(messageInput, 'message-error', false);
    }

    if (hasErrors) return;

    // Form submission state
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    statusBox.className = 'form-status-message';
    statusBox.textContent = '';

    try {
      /*
        NOTE FOR GANESH:
        To connect a real backend service, replace this mock timeout with your endpoint:
        
        const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ name: nameVal, email: emailVal, message: messageVal })
        });
      */
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Success State
      statusBox.classList.add('success');
      statusBox.textContent = '✓ Message validated and ready. Connect your email service endpoint in script.js to start receiving inquiries.';
      form.reset();
    } catch (error) {
      // Error State
      statusBox.classList.add('error');
      statusBox.textContent = '✕ An error occurred. Please try reaching out via direct email.';
    } finally {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
  });

  // Clear errors on input
  [nameInput, emailInput, messageInput].forEach(field => {
    field.addEventListener('input', () => {
      const parent = field.closest('.form-group');
      if (parent.classList.contains('has-error')) {
        parent.classList.remove('has-error');
      }
    });
  });
}

// Minimal sanitization helper
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
