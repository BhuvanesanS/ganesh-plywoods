const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const whatsappButton = document.createElement('a');
whatsappButton.className = 'whatsapp-float';
whatsappButton.href = 'https://wa.me/919698303090';
whatsappButton.target = '_blank';
whatsappButton.rel = 'noopener';
whatsappButton.textContent = 'WhatsApp';
whatsappButton.setAttribute('aria-label', 'Chat with Shree Ganesh on WhatsApp');
document.body.append(whatsappButton);

const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  const productField = quoteForm.elements.product;
  const selectedProduct = new URLSearchParams(window.location.search).get('product');
  if (selectedProduct && [...productField.options].some((option) => option.value === selectedProduct)) productField.value = selectedProduct;

  const buildQuoteMessage = () => {
    const data = new FormData(quoteForm);
    return `Hello Shree Ganesh, I would like a quote.\n\nName: ${data.get('name')}\nMobile: ${data.get('phone')}\nEmail: ${data.get('email')}\nProduct: ${data.get('product')}\nQuantity / size: ${data.get('size') || 'Not specified'}\nPreferred contact: ${data.get('contactMethod')}\nRequirement: ${data.get('details') || 'Not specified'}`;
  };

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    window.open(`https://wa.me/919698303090?text=${encodeURIComponent(buildQuoteMessage())}`, '_blank', 'noopener');
    document.getElementById('form-status').textContent = 'Your WhatsApp quote message is ready to send.';
  });

  document.getElementById('email-quote').addEventListener('click', () => {
    if (!quoteForm.reportValidity()) return;
    const subject = `Quote request: ${productField.value}`;
    window.location.href = `mailto:ganeshglassspr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildQuoteMessage())}`;
    document.getElementById('form-status').textContent = 'Your email request is ready to send.';
  });
}
