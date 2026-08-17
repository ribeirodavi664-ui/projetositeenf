// Menu Mobile
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  // Troca o ícone (Font Awesome)
  const icon = menuBtn.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Fechar menu ao clicar em um link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// Carrossel de Depoimentos
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let autoPlayInterval;

function showTestimonial(index) {
  testimonials.forEach(item => item.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
}

// Configura os dots para navegação manual
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    showTestimonial(index);
    resetAutoPlay();
  });
});

// Inicia o carrossel automático
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 4000);
}

// Reseta o temporizador ao interagir manualmente
function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Inicialização
showTestimonial(currentIndex);
startAutoPlay();

// Sombra dinâmica no Header durante o scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});