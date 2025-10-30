

   const courses = [
     {id:1,title:'Espadas e Estratégia — Nível Iniciante',price:49.90,desc:'Introdução às técnicas e história das espadas medievais.'},
     {id:2,title:'Herbalismo Antigo — Remédios e Poções',price:39.90,desc:'Plantas, receitas e práticas seguras do herbalismo tradicional.'},
     {id:3,title:'Caligrafia & Iluminura',price:29.90,desc:'Aprenda caligrafia medieval e técnicas de ilustração em manuscritos.'}
   ];


   const coursesList = document.getElementById('coursesList');
   const cartSummary = document.getElementById('cartSummary');
   const modal = document.getElementById('modal');
   const modalCourseTitle = document.getElementById('modalCourseTitle');
   const confirmPay = document.getElementById('confirmPay');
   const closeModal = document.getElementById('closeModal');
   const cancelPay = document.getElementById('cancelPay');
   const subscribeBtn = document.getElementById('subscribeBtn');
   const manageSubs = document.getElementById('manageSubs');
   const statusBadge = document.getElementById('statusBadge');


   function saveState(state){ localStorage.setItem('ap_state', JSON.stringify(state)); }
   function loadState(){ return JSON.parse(localStorage.getItem('ap_state')||'{}'); }


   function renderCourses(){
     coursesList.innerHTML = '';
     courses.forEach(c=>{
       const el = document.createElement('article');
       el.className='course-card';
       el.innerHTML = `
         <div class="course-thumb">🏰</div>
         <div class="course-body">
           <div style="display:flex;justify-content:space-between;align-items:center">
             <div>
               <div style="font-weight:800;color:#3b1100">${c.title}</div>
               <div class="meta">${c.desc}</div>
             </div>
             <div style="text-align:right">
               <div class="price">R$ ${c.price.toFixed(2)}</div>
               <button class="cta-btn" data-buy="${c.id}" style="margin-top:8px">Comprar</button>
             </div>
           </div>
         </div>
       `;
       coursesList.appendChild(el);
     });


     document.querySelectorAll('[data-buy]').forEach(btn=>{
       btn.addEventListener('click',()=>openBuyModal(btn.getAttribute('data-buy')));
     });
   }


   let selectedCourse = null;
   function openBuyModal(courseId){
     selectedCourse = courses.find(x=>x.id==courseId);
     modalCourseTitle.textContent = selectedCourse.title + ' — R$ ' + selectedCourse.price.toFixed(2);
     modal.style.display='block';
     modal.setAttribute('aria-hidden','false');
   }
   closeModal.addEventListener('click',closeBuyModal);
   cancelPay.addEventListener('click',closeBuyModal);
   function closeBuyModal(){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }
   confirmPay.addEventListener('click',()=>{
     const name = document.getElementById('buyerName').value || 'Comprador Anônimo';
     const email = document.getElementById('buyerEmail').value || 'sem@email';
         const state = loadState();
     state.purchases = state.purchases||[];
     state.purchases.push({courseId:selectedCourse.id,name,email,price:selectedCourse.price,date:new Date().toISOString()});
     saveState(state);
     updateUI();
     alert('Pagamento simulado concluído — obrigado, ' + name + '!');
     closeBuyModal();
   });


   subscribeBtn.addEventListener('click',()=>{
     const state = loadState();
     state.subscription = {status:'active',plan:'monthly',start:new Date().toISOString()};
     saveState(state);
     updateUI();
     alert('Assinatura simulada ativada. Obrigado!');
   });


   manageSubs.addEventListener('click',()=>{
     const state = loadState();
     if(state.subscription && state.subscription.status==='active'){
       if(confirm('Cancelar assinatura simulada?')){
         state.subscription.status='cancelled';
         saveState(state);
         updateUI();
         alert('Assinatura cancelada.');
       }
     } else {
       alert('Nenhuma assinatura ativa. Clique em "Assinar agora" para ativar.');
     }
   });


   function updateUI(){
     const state = loadState();
     const purchases = state.purchases||[];
     if(purchases.length===0){ cartSummary.textContent='Nenhuma compra adicionada.' }
     else {
       const names = purchases.map(p=>courses.find(c=>c.id==p.courseId).title + ' — R$ '+p.price.toFixed(2));
       cartSummary.innerHTML = '<strong>Compras:</strong><ul style="margin-top:6px">' + names.map(n=>'<li>'+n+'</li>').join('') + '</ul>';
     }


     if(state.subscription && state.subscription.status==='active'){
       statusBadge.textContent = 'Assinante';
     } else {
       statusBadge.textContent = 'Visitante';
     }
   }


   document.getElementById('year').textContent = new Date().getFullYear();
   renderCourses();
   updateUI();
   document.addEventListener('keydown',e=>{
     if(e.key==='Escape') closeBuyModal();
   });



