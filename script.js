// Comentários: sistema simples de comentários e dúvidas com armazenamento em localStorage

// Utilitário para formatar data/hora
function formatDateTime(date) {
  return date.toLocaleDateString("pt-BR") + " • " + date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* ------------------ COMENTÁRIOS ------------------ */

const commentForm = document.getElementById("comment-form");
const commentsListEl = document.getElementById("comments-list");

function loadComments() {
  const saved = localStorage.getItem("comentariosPoliciais");
  return saved ? JSON.parse(saved) : [];
}

function saveComments(comments) {
  localStorage.setItem("comentariosPoliciais", JSON.stringify(comments));
}

function renderComments() {
  const comments = loadComments();
  commentsListEl.innerHTML = "";

  if (comments.length === 0) {
    commentsListEl.innerHTML = "<p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>";
    return;
  }

  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
      <div class="comment-header">
        <span>${c.nome} • ${c.carreira}</span>
        <span>${c.data}</span>
      </div>
      <div class="comment-body">${c.mensagem}</div>
    `;
    commentsListEl.appendChild(div);
  });
}

if (commentForm) {
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const carreira = document.getElementById("carreira").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !mensagem) {
      alert("Preencha nome e comentário.");
      return;
    }

    const comments = loadComments();
    comments.unshift({
      nome,
      carreira,
      mensagem,
      data: formatDateTime(new Date())
    });
    saveComments(comments);
    renderComments();

    commentForm.reset();
  });

  renderComments();
}

/* ------------------ PERGUNTAS / DÚVIDAS ------------------ */

const questionForm = document.getElementById("question-form");
const questionsListEl = document.getElementById("questions-list");

function loadQuestions() {
  const saved = localStorage.getItem("duvidasPoliciais");
  return saved ? JSON.parse(saved) : [];
}

function saveQuestions(questions) {
  localStorage.setItem("duvidasPoliciais", JSON.stringify(questions));
}

function renderQuestions() {
  const questions = loadQuestions();
  questionsListEl.innerHTML = "";

  if (questions.length === 0) {
    questionsListEl.innerHTML = "<p>Nenhuma pergunta enviada ainda. Use o formulário acima para registrar sua dúvida.</p>";
    return;
  }

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question-item";
    div.innerHTML = `
      <div class="question-text">Q${index + 1}: ${q.texto}</div>
      <div class="answer-placeholder">
        Resposta: este espaço pode ser usado pelo administrador do site para responder manualmente às dúvidas (por exemplo, editando o conteúdo no painel do site).
      </div>
      <div class="comment-header" style="margin-top:4px;">
        <span>Enviada em ${q.data}</span>
      </div>
    `;
    questionsListEl.appendChild(div);
  });
}

if (questionForm) {
  questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = document.getElementById("pergunta").value.trim();

    if (!texto) {
      alert("Digite uma pergunta.");
      return;
    }

    const questions = loadQuestions();
    questions.unshift({
      texto,
      data: formatDateTime(new Date())
    });
    saveQuestions(questions);
    renderQuestions();

    questionForm.reset();
  });

  renderQuestions();
}
