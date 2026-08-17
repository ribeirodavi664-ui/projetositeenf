// Menu Mobile
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

if (nav) {
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
}

// Sombra dinâmica no Header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Métodos de Pagamento
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const paymentMethods = document.querySelectorAll('.payment-method');

paymentRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    paymentMethods.forEach(method => method.classList.remove('active'));
    const selectedMethod = document.querySelector(`.payment-method[data-method="${e.target.value}"]`);
    if (selectedMethod) {
      selectedMethod.classList.add('active');
    }
  });
});

// Gerar QR Code PIX
window.addEventListener('load', () => {
  const pixKey = '5571984734856';
  const qrcodeDiv = document.getElementById('qrcode');

  if (qrcodeDiv && qrcodeDiv.innerHTML === '') {
    new QRCode(qrcodeDiv, {
      text: pixKey,
      width: 250,
      height: 250,
      colorDark: '#1A7A3C',
      colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
});

// Copiar Chave PIX
function copyPixKey() {
  const pixKey = '(71) 98473-4856';
  const copyBtn = document.querySelector('.copy-btn');

  navigator.clipboard.writeText(pixKey).then(() => {
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    copyBtn.disabled = true;

    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
      copyBtn.disabled = false;
    }, 2000);
  });
}

// Formatar CPF
document.getElementById('boleioCPF')?.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  e.target.value = value;
});

// Formatar Número do Cartão
document.getElementById('cardNumber')?.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\s/g, '');
  value = value.replace(/(\d{4})/g, '$1 ').trim();
  e.target.value = value;
});

// Formatar Validade
document.getElementById('cardExpiry')?.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4);
  }
  e.target.value = value;
});

// Formatar CVV (apenas números)
document.getElementById('cardCvv')?.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
});

// Confirmar Pagamento
function confirmPayment(method) {
  const methodName = {
    'pix': 'PIX',
    'card': 'Cartão de Crédito',
    'boleto': 'Boleto'
  };

  // Validações básicas
  if (method === 'card') {
    const name = document.getElementById('cardName').value.trim();
    const number = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('cardExpiry').value.trim();
    const cvv = document.getElementById('cardCvv').value.trim();

    if (!name) {
      alert('Por favor, insira o nome do titular do cartão');
      return;
    }
    if (!number || number.length < 19) {
      alert('Por favor, insira um número de cartão válido');
      return;
    }
    if (!expiry || expiry.length < 5) {
      alert('Por favor, insira a validade do cartão');
      return;
    }
    if (!cvv || cvv.length < 3) {
      alert('Por favor, insira o CVV do cartão');
      return;
    }
  }

  if (method === 'boleto') {
    const name = document.getElementById('boletoName').value.trim();
    const cpf = document.getElementById('boleioCPF').value.trim();
    const email = document.getElementById('boletoEmail').value.trim();

    if (!name) {
      alert('Por favor, insira seu nome completo');
      return;
    }
    if (!cpf) {
      alert('Por favor, insira seu CPF');
      return;
    }
    if (!email) {
      alert('Por favor, insira seu email');
      return;
    }
  }

  // Simulação de processamento
  alert(`Obrigado!\n\nSeu pagamento de R$ 1,00 será processado via ${methodName[method]}.\n\nEmbreve você receberá um email de confirmação com seu acesso ao curso.`);
}

// FAQ
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.closest('.faq-item');
    const isOpen = faqItem.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('open');
    });

    if (!isOpen) {
      faqItem.classList.add('open');
    }
  });
});