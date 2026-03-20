// Configurações
const careersData = [
  {
    title: "Polícia Militar",
    icon: "fas fa-hard-hat",
    image: "https://images.pexels.com/photos/14642351/pexels-photo-14642351.jpeg",
    description: "Segurança ostensiva e preservação da ordem pública",
    requirements: ["Ensino Médio", "TAF rigoroso", "Idade 18-30 anos", "Altura mínima"]
  },
  {
    title: "Polícia Civil",
    icon: "fas fa-search",
    image: "https://images.pexels.com/photos/14642343/pexels-photo-14642343.jpeg",
    description: "Investigação de crimes dolosos contra a vida",
    requirements: ["Superior completo", "Provas discursivas", "Investigação social"]
  },
  {
    title: "Polícia Federal",
    icon: "fas fa-globe",
    image: "https://images.pexels.com/photos/14642359/pexels-photo-14642359.jpeg",
    description: "Crimes federais e fronteiras",
    requirements: ["Qualquer graduação", "Curso na academia PF", "TAF nível federal"]
  },
  {
    title: "PRF",
    icon: "fas fa-road",
    image: "https://images.pexels.com/photos/10546577/pexels-photo-10546577.jpeg",
    description: "Policiamento rodoviário federal",
    requirements: ["Superior qualquer área", "CNH categoria B", "TAF específico"]
  },
  {
    title: "Policial Penal",
    icon: "fas fa-unlock",
    image: "https://images.pexels.com/photos/22220259/pexels-photo-22220259.jpeg",
    description: "Custódia e segurança penitenciária",
    requirements: ["Ensino Médio/Superior", "TAF adaptado", "Estabilidade"]
  },
  {
    title: "Perícia Oficial",
    icon: "fas fa-microscope",
    image: "https://images.pexels.com/photos/14025776/pexels-photo-14025776.jpeg",
    description: "Análises técnico-científicas",
    requirements: ["Formação específica", "Provas técnicas", "Laboratorial"]
  }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  initLoader();
  initNavigation();
  initScrollAnimations();
  initCareers();
  initTabs();
  initForms();
});

// Loader
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').style.opacity = '0';
      setTimeout(() => document.getElementById('loader').style.display = 'none', 500);
    }, 800);
  });
}

// Navegação
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const menuToggle = document.querySelector('.menu-toggle');
  
  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  
  // Mobile menu (futuro)
}

// Animações de scroll
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.career-card, .section').forEach(el => {
    observer.observe(el);
  });
}

// Careers
function initCareers() {
  const grid = document.getElementById('careers-grid');
  careersData.forEach((career, index) => {
    const card = document.createElement('div');
    card.className = 'career-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="career-image">
        <img src="${career.image}" alt="${career.title}" loading="lazy">
      </div>
      <div class="career-header">
        <div class="career-icon">
          <i class="${career.icon}"></i>
        </div>
        <h3 class="career-title">${career.title}</h3>
      </div>
      <p>${career.description}</p>
      <div class="career-requirements">
        ${career.requirements.map(req => `
          <div class="requirement">
            <i class="fas fa-check"></i>
            ${req}
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
}

// Tabs
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      
      // Update active tab
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(targetTab + '-tab').classList.add('active');
    });
  });
}

// Forms
function initForms() {
  // Comments
  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', handleCommentSubmit);
  }
  
  // Questions
  const questionForm = document.getElementById('question-form');
  if (questionForm) {
    questionForm.addEventListener('submit', handleQuestionSubmit);
  }
}

function handleCommentSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const comment = {
    nome: document.getElementById('nome').value,
    carreira: document.getElementById('carreira').value,
    mensagem: document.getElementById('mensagem').value,
    data: new Date().toLocaleString('pt-BR')
  };
  
  let comments = JSON.parse(localStorage.getItem('policeComments') || '[]');
  comments.unshift(comment);
  localStorage.setItem('policeComments', JSON.stringify(comments.slice(0, 50))); // Limite 50
  
  renderComments();
  e.target.reset();
  showToast('Comentário publicado!');
}

function handleQuestionSubmit(e) {
  e.preventDefault();
  const pergunta = document.getElementById('pergunta').value;
  
  let questions = JSON.parse(localStorage.getItem('policeQuestions') || '[]');
  questions.unshift({
    texto: pergunta,
    data: new Date().toLocaleString('pt-BR'),
    respondida: false
  });
  localStorage.setItem('policeQuestions', JSON.stringify(questions.slice(0, 50)));
  
  renderQuestions();
  e.target.reset();
  showToast('Dúvida enviada!');
}

function renderComments() {
  const container = document.getElementById('comments-list');
  const comments = JSON.parse(localStorage.getItem('policeComments') || '[]');
  
  if (comments.length === 0) {
    container.innerHTML = '<p class="no-data">Nenhum comentário ainda. Seja o primeiro!</p>';
    return;
  }
  
  container.innerHTML = comments.map(c => `
    <div class="comment-item">
      <div class="comment-header">
        <div class="comment-author">
          <i class="fas fa-user-circle"></i>
          <span>${c.nome} • ${c.carreira}</span>
        </div>
        <span>${c.data}</span>
      </div>
      <div class="comment-body">${c.mensagem}</div>
    </div>
  `).join('');
}

function renderQuestions() {
  const container = document.getElementById('questions-list');
  const questions = JSON.parse(localStorage.getItem('policeQuestions') || '[]');
  
  if (questions.length === 0) {
    container.innerHTML = '<p class="no-data">Nenhuma dúvida registrada. Envie a sua!</p>';
    return;
  }
  
  container.innerHTML = questions.map((q, i) => `
    <div class="question-item">
      <div class="question-text">Q${i+1}: ${q.texto}</div>
      <div style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">
        Enviada em ${q.data} ${q.respondida ? '• <span style="color: var(--success);">Respondida</span>' : '• Aguardando resposta'}
      </div>
    </div>
  `).join('');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(16,185,129,0.4);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.style.transform = 'translateX(0)', 100);
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// Render inicial
renderComments();
renderQuestions();
