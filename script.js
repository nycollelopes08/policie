const careers = [
  {img:"https://images.pexels.com/photos/14642351/pexels-photo-14642351.jpeg",title:"Polícia Militar",desc:"Patrulhamento ostensivo",req:["Médio","TAF","18-30a"]},
  {img:"https://images.pexels.com/photos/14642343/pexels-photo-14642343.jpeg",title:"Polícia Civil",desc:"Investigação criminal",req:["Superior","Provas","Social"]},
  {img:"https://images.pexels.com/photos/14642359/pexels-photo-14642359.jpeg",title:"Polícia Federal",desc:"Crimes federais",req:["Graduação","Academia PF","TAF"]},
  {img:"https://images.pexels.com/photos/10546577/pexels-photo-10546577.jpeg",title:"PRF",desc:"Rodovias federais",req:["Superior","CNH B","TAF"]},
  {img:"https://images.pexels.com/photos/22220259/pexels-photo-22220259.jpeg",title:"Policial Penal",desc:"Segurança prisional",req:["Médio/Superior","TAF"]},
  {img:"https://images.pexels.com/photos/14025776/pexels-photo-14025776.jpeg",title:"Perícia",desc:"Análise criminalística",req:["Formação específica","Provas técnicas"]}
];

document.addEventListener('DOMContentLoaded',()=>{
  
  // Cards
  document.getElementById('careers-grid').innerHTML=careers.map(c=>`
    <div class="card">
      <img src="${c.img}" alt="${c.title}">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <ul>${c.req.map(r=>`<li>${r}</li>`).join('')}</ul>
    </div>
  `).join('');
  
  // Navegação
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelectorAll('.nav-active').forEach(x=>x.classList.remove('nav-active'));
      a.classList.add('nav-active');
      document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
  });
  
  // Tabs
  document.querySelectorAll('.tab').forEach(t=>{
    t.addEventListener('click',()=>{
      document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById(t.dataset.tab+'-tab').classList.add('active');
    });
  });
  
  // Forms
  document.getElementById('comment-form').addEventListener('submit',e=>{
    e.preventDefault();
    const c={nome:document.getElementById('nome').value,carreira:document.getElementById('carreira').value,msg:document.getElementById('msg').value,data:new Date().toLocaleDateString()};
    let comments=JSON.parse(localStorage.getItem('comments')||'[]');
    comments.unshift(c); localStorage.setItem('comments',JSON.stringify(comments.slice(0,20)));
    renderComments(); e.target.reset();
  });
  
  document.getElementById('question-form').addEventListener('submit',e=>{
    e.preventDefault();
    const q={text:document.getElementById('pergunta').value,data:new Date().toLocaleDateString()};
    let questions=JSON.parse(localStorage.getItem('questions')||'[]');
    questions.unshift(q); localStorage.setItem('questions',JSON.stringify(questions.slice(0,20)));
    renderQuestions(); e.target.reset();
  });
  
  renderComments();
  renderQuestions();
});

function renderComments(){
  const c=JSON.parse(localStorage.getItem('comments')||'[]');
  document.getElementById('comments-list').innerHTML=c.length? c.map(x=>`<div class="comment"><strong>${x.nome} (${x.carreira})</strong> • ${x.data}<p>${x.msg}</p></div>`).join('') : '<div>Nenhum comentário</div>';
}

function renderQuestions(){
  const q=JSON.parse(localStorage.getItem('questions')||'[]');
  document.getElementById('questions-list').innerHTML=q.length? q.map(x=>`<div class="comment"><strong>Dúvida:</strong> ${x.text} <br><small>${x.data}</small></div>`).join('') : '<div>Nenhuma dúvida</div>';
}
