const careers = [
  {img:"https://images.pexels.com/photos/14642351/pexels-photo-14642351.jpeg?w=400",title:"Polícia Militar",desc:"Patrulhamento ostensivo",req:["Ensino Médio","TAF rigoroso","Idade 18-30"]},
  {img:"https://images.pexels.com/photos/14642343/pexels-photo-14642343.jpeg?w=400",title:"Polícia Civil",desc:"Investigação criminal",req:["Superior completo","Provas discursivas"]},
  {img:"https://images.pexels.com/photos/14642359/pexels-photo-14642359.jpeg?w=400",title:"Polícia Federal",desc:"Crimes federais",req:["Qualquer graduação","Curso PF"]},
  {img:"https://images.pexels.com/photos/10546577/pexels-photo-10546577.jpeg?w=400",title:"PRF",desc:"Rodovias federais",req:["Superior","CNH B"]},
  {img:"https://images.pexels.com/photos/22220259/pexels-photo-22220259.jpeg?w=400",title:"Policial Penal",desc:"Segurança prisional",req:["Médio/Superior"]},
  {img:"https://images.pexels.com/photos/14025776/pexels-photo-14025776.jpeg?w=400",title:"Perícia Oficial",desc:"Análise técnica",req:["Formação específica"]}
];

document.addEventListener('DOMContentLoaded',()=>{
  
  // Render careers
  document.getElementById('careers-grid').innerHTML=careers.map(c=>`
    <div class="card">
      <img src="${c.img}" alt="${c.title}" loading="lazy">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <ul>${c.req.map(r=>`<li>${r}</li>`).join('')}</ul>
    </div>
  `).join('');
  
  // Main tabs
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.onclick=()=>{
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    };
  });
  
  // Sub-tabs
  document.querySelectorAll('.sub-tab').forEach(st=>{
    st.onclick=()=>{
      document.querySelectorAll('.sub-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.subtab-content').forEach(c=>c.classList.remove('active'));
      st.classList.add('active');
      document.getElementById(st.dataset.subtab+'-subtab').classList.add('active');
    };
  });
  
  // Forms
  document.getElementById('comment-form').onsubmit=e=>{
    e.preventDefault();
    const c={n:document.getElementById('nome').value,car:document.getElementById('carreira').value,msg:document.getElementById('msg').value,d:new Date().toLocaleDateString('pt-BR')};
    let comments=JSON.parse(localStorage.getItem('comments')||'[]');
    comments.unshift(c); localStorage.setItem('comments',JSON.stringify(comments.slice(0,30)));
    renderComments(); e.target.reset();
  };
  
  document.getElementById('duvida-form').onsubmit=e=>{
    e.preventDefault();
    const d={text:document.getElementById('duvida').value,date:new Date().toLocaleDateString('pt-BR')};
    let duvidas=JSON.parse(localStorage.getItem('duvidas')||'[]');
    duvidas.unshift(d); localStorage.setItem('duvidas',JSON.stringify(duvidas.slice(0,30)));
    renderDuvidas(); e.target.reset();
  };
  
  renderComments();
  renderDuvidas();
});

function renderComments(){
  const c=JSON.parse(localStorage.getItem('comments')||'[]');
  document.getElementById('comments-list').innerHTML=c.length? c.map(x=>`<div class="post"><strong>${x.n} (${x.car})</strong> • ${x.d}<p>${x.msg}</p></div>`).join('') : '<div class="post empty">Nenhum comentário</div>';
}

function renderDuvidas(){
  const d=JSON.parse(localStorage.getItem('duvidas')||'[]');
  document.getElementById('duvidas-list').innerHTML=d.length? d.map(x=>`<div class="post"><strong>Dúvida:</strong> ${x.text}<br><small>${x.date}</small></div>`).join('') : '<div class="post empty">Nenhuma dúvida</div>';
}
