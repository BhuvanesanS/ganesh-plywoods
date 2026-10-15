import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const primaryPhone = '9698303090';
const alternatePhone = '9698383835';
const whatsappUrl = `https://wa.me/91${primaryPhone}`;
const mapUrl = 'https://maps.google.com/maps/search/Shree%20Ganesh%20Glass%20Plywoods%20and%20Hardwares/@12.97337556,79.95424085,17z?hl=en';
const mapEmbed = 'https://www.google.com/maps?q=12.97337556,79.95424085&z=17&output=embed';

const categories = [
  { tag: '01 / Sheet materials', title: 'Plywood for every build', text: 'Normal, colour and waterproof plywood options for furniture, cabinetry and interior work.', image: '/assets/products/plywood.png', products: ['Normal plywood', 'Colour plywoods', 'Waterproof plywoods'] },
  { tag: '02 / Glass & mirrors', title: 'Light, clarity and detail', text: 'Explore glass, mirrors and design-led choices for homes, stores and interiors.', image: '/assets/products/glass-mirror.png', products: ['Normal glass', 'Custom design glass', 'Mirrors'] },
  { tag: '03 / Doors', title: 'Everyday door choices', text: 'Simple and designer PVC doors paired with the hardware needed to complete the installation.', image: '/assets/products/pvc-doors.png', products: ['Normal PVC doors', 'Designer PVC doors', 'Door fittings'] },
  { tag: '04 / Hardware', title: 'The finishing layer', text: 'Handles, locks, Fevicol and tapes for the details that make a space work well.', image: '/assets/products/hardware.png', products: ['Designer handles', 'Door handles & locks', 'Fevicol & tapes'] }
];

const inspiration = [
  { label: 'Plywood & boards', title: 'A strong foundation for every build.', image: '/assets/products/plywood.png' },
  { label: 'Glass & mirrors', title: 'Bring light, depth and clarity in.', image: '/assets/products/glass-mirror.png' },
  { label: 'Doors & fittings', title: 'Make the everyday entrance better.', image: '/assets/products/pvc-doors.png' }
];

const showroomScenes = [
  { label: 'Plan', title: 'Bring a photo, sketch or simple measurement.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85', fallback: '/assets/products/plywood.png' },
  { label: 'Compare', title: 'See the material direction before you decide.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85', fallback: '/assets/products/glass-mirror.png' },
  { label: 'Build', title: 'Move forward with a clearer product enquiry.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85', fallback: '/assets/products/pvc-doors.png' }
];

function formatPhone(phone) {
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

function ReliableImage({ src, fallback, alt = '', ...props }) {
  const [imageSrc, setImageSrc] = useState(src);
  return <img src={imageSrc} alt={alt} {...props} onError={() => {
    if (imageSrc !== fallback) setImageSrc(fallback);
  }}/>;
}

function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [form, setForm] = useState({ name: '', phone: '', material: 'Plywood', details: '' });

  const navigate = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const requestQuote = (material = selectedCategory.title) => {
    const text = `Hello Shree Ganesh, I would like a quote.\n\nMaterial: ${material}\nName: ${form.name || 'Not specified'}\nMobile: ${form.phone || 'Not specified'}\nRequirement: ${form.details || 'Please share available options and current pricing.'}`;
    window.open(`${whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return <>
    <div className="utility-bar"><div className="frame utility-content"><span>Glass, plywood &amp; interior hardware in Sriperumbudur</span><span><a href={`tel:+91${primaryPhone}`}>{formatPhone(primaryPhone)}</a><b>•</b><a href={`tel:+91${alternatePhone}`}>{formatPhone(alternatePhone)}</a></span></div></div>
    <header className="site-header">
      <div className="frame nav-wrap">
        <button className="brand" onClick={() => navigate('home')} aria-label="Shree Ganesh home"><img src="/assets/shree-ganesh-logo.png" alt="Shree Ganesh logo"/><span>Shree Ganesh<small>Glass, Plywoods &amp; Hardwares</small></span></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <button className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}>Home</button>
          <button className={page === 'products' ? 'active' : ''} onClick={() => navigate('products')}>Products</button>
          <button className={page === 'trade' ? 'active' : ''} onClick={() => navigate('trade')}>Trade desk</button>
          <button className={page === 'contact' ? 'active' : ''} onClick={() => navigate('contact')}>Contact</button>
        </nav>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a>
      </div>
    </header>
    {page === 'home' && <Home navigate={navigate} requestQuote={requestQuote} />}
    {page === 'products' && <Products selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} requestQuote={requestQuote} />}
    {page === 'trade' && <Trade navigate={navigate} />}
    {page === 'contact' && <Contact form={form} setForm={setForm} requestQuote={requestQuote} />}
    <Footer navigate={navigate} />
    <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer">✦ <span>WhatsApp</span></a>
  </>;
}

function Home({ navigate, requestQuote }) {
  return <main>
    <section className="hero"><div className="frame hero-grid"><div className="hero-copy"><p className="eyebrow">For homes, shops &amp; interiors</p><h1>Materials that make every <em>detail matter.</em></h1><p>One practical destination for plywood, glass, PVC doors, fittings and interior hardware—made for people planning, building and finishing spaces.</p><div className="action-row"><button className="primary-button" onClick={() => navigate('products')}>Explore products <span>↓</span></button><a className="quiet-link" href={mapUrl} target="_blank" rel="noreferrer">Get directions <span>↗</span></a></div><div className="hero-proof"><span>01</span><p>Ask for the right material, the right size and the current price—directly with our team.</p></div></div><div className="hero-visual"><div className="ply-panel panel-one"/><div className="ply-panel panel-two"/><div className="glass-panel"/><div className="hero-label"><b>Shree<br/>Ganesh</b><span>Build with better choices</span></div></div></div></section>
    <section className="frame quick-grid"><div><b>01</b><span>Plywood &amp; boards</span></div><div><b>02</b><span>Glass &amp; mirrors</span></div><div><b>03</b><span>Doors &amp; hardware</span></div><div><b>04</b><span>Direct quote support</span></div></section>
    <section className="section light-section"><div className="frame"><SectionHeading eyebrow="Core categories" title={<>Everything for a<br/><em>finished space.</em></>} copy="See the core materials we can discuss with you. For exact styles, sizes and current availability, send a WhatsApp enquiry."/><div className="category-grid">{categories.map((item) => <article className="category-card" key={item.title}><img src={item.image} alt=""/><div><p>{item.tag}</p><h3>{item.title}</h3><span>{item.text}</span><button onClick={() => { requestQuote(item.title); }}>Ask for today&apos;s price <b>↗</b></button></div></article>)}</div></div></section>
    <section className="section inspiration-section"><div className="frame"><SectionHeading eyebrow="See the possibilities" title={<>Interior ideas,<br/><em>made tangible.</em></>} copy="A few visual directions to help you start a conversation about your next home or project."/><div className="inspiration-grid">{inspiration.map((item, index) => <article className={index === 0 ? 'inspiration-card wide' : 'inspiration-card'} key={item.title}><ReliableImage src={item.image} fallback="/assets/products/plywood.png" alt={item.title}/><div><p>{item.label}</p><h3>{item.title}</h3></div></article>)}</div><p className="visual-note">Photos are visual inspiration. Product selection and availability are confirmed by the Shree Ganesh team.</p></div></section>
    <ExperienceCenter navigate={navigate}/>
    <section className="local-section"><div className="frame local-grid"><div><p className="eyebrow light">Visit the shop</p><h2>A local partner for<br/><em>better interiors.</em></h2><p>Whether you are fixing a single door or planning a complete interior, start with a clear material enquiry. We will help you take the next step.</p><button className="outline-button" onClick={() => navigate('contact')}>Contact the team <span>↗</span></button></div><div className="shop-card"><img src="/assets/shree-ganesh-card.png" alt="Shree Ganesh business card"/><span>Sriperumbudur, Tamil Nadu</span></div></div></section>
    <section className="section map-section"><div className="frame map-layout"><div><p className="eyebrow">Find us easily</p><h2>Come in with a plan.<br/><em>Leave with clarity.</em></h2><p>Open the live map for directions to Shree Ganesh Glass, Plywoods &amp; Hardwares in Sriperumbudur.</p><div className="number-grid"><a href={`tel:+91${primaryPhone}`}><small>Primary mobile</small>{formatPhone(primaryPhone)}</a><a href={`tel:+91${alternatePhone}`}><small>Alternate mobile</small>{formatPhone(alternatePhone)}</a></div><a className="primary-button inline-button" href={mapUrl} target="_blank" rel="noreferrer">Open Google Maps <span>↗</span></a></div><div className="map-box"><iframe title="Shree Ganesh location" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div></div></section>
  </main>;
}

function ExperienceCenter({ navigate }) {
  return <section className="experience-section"><div className="frame"><div className="experience-heading"><div><p className="eyebrow light">A better way to begin</p><h2>Come with an idea.<br/><em>Leave with direction.</em></h2></div><p>For a room, a renovation or a site requirement, a good material conversation starts with the practical details.</p></div><div className="experience-grid">{showroomScenes.map((scene, index) => <article className="experience-card" key={scene.label}><ReliableImage src={scene.image} fallback={scene.fallback} alt={scene.title}/><div className="experience-number">0{index + 1}</div><div className="experience-copy"><p>{scene.label}</p><h3>{scene.title}</h3></div></article>)}</div><div className="experience-footer"><p><b>Visiting for a project?</b> Share the material, approximate size, quantity and a reference photo if you have one.</p><button className="outline-button" onClick={() => navigate('contact')}>Plan your enquiry <span>↗</span></button></div></div></section>
}

function Products({ selectedCategory, setSelectedCategory, requestQuote }) {
  const selectedIndex = categories.findIndex((item) => item.title === selectedCategory.title);
  const nextCategory = categories[(selectedIndex + 1) % categories.length];

  return <main className="product-page">
    <section className="product-hero product-hero-immersive">
      <div className="hero-grid-3d frame">
        <div className="product-hero-copy"><p className="eyebrow">Interactive product showroom</p><h1>Explore materials<br/>in <em>another dimension.</em></h1><p>Tap a collection to reveal the product range. Every image is served directly from the website, so the catalogue stays dependable on every device.</p><div className="showcase-stats"><span><b>04</b> core collections</span><span><b>01</b> direct quote channel</span></div></div>
        <div className="hero-product-stack" aria-label="Layered Shree Ganesh product showcase">
          <div className="stack-shadow"/><ReliableImage className="stack-card stack-card-back" src={nextCategory.image} fallback="/assets/products/plywood.png" alt=""/><ReliableImage className="stack-card stack-card-mid" src="/assets/products/hardware.png" fallback="/assets/products/plywood.png" alt=""/><div className="stack-card stack-card-front"><ReliableImage src={selectedCategory.image} fallback="/assets/products/plywood.png" alt={selectedCategory.title}/><span>Now viewing <b>{selectedIndex + 1}/4</b></span></div><div className="orbit-ring orbit-ring-one"/><div className="orbit-ring orbit-ring-two"/>
        </div>
      </div>
    </section>
    <section className="section catalogue showroom-section"><div className="frame">
      <div className="showroom-kicker"><p className="eyebrow">Choose a collection</p><p>Click a material card to update the full-size product showcase.</p></div>
      <div className="catalogue-tabs material-selector" role="tablist">{categories.map((item, index) => <button key={item.title} className={selectedCategory.title === item.title ? 'selected' : ''} onClick={() => setSelectedCategory(item)}><ReliableImage src={item.image} fallback="/assets/products/plywood.png" alt=""/><span>0{index + 1}</span><strong>{item.title}</strong><i>View collection ↗</i></button>)}</div>
      <div className="product-stage">
        <div className="stage-light"/><div className="stage-image"><ReliableImage src={selectedCategory.image} fallback="/assets/products/plywood.png" alt={selectedCategory.title}/><span className="image-badge">Product image</span></div>
        <div className="stage-details"><p className="eyebrow">{selectedCategory.tag}</p><h2>{selectedCategory.title}</h2><p>{selectedCategory.text}</p><div className="product-list">{selectedCategory.products.map((product, index) => <span key={product}><b>0{index + 1}</b>{product}</span>)}</div><button className="primary-button" onClick={() => requestQuote(selectedCategory.title)}>Request a WhatsApp quote <span>↗</span></button></div>
      </div>
    </div></section>
    <section className="section product-gallery material-gallery"><div className="frame"><SectionHeading eyebrow="Material library" title={<>Built for the way<br/><em>you actually live.</em></>} copy="A clear product-first view of the materials you can discuss with our Sriperumbudur team."/><div className="material-grid">{categories.map((item, index) => <button className={selectedCategory.title === item.title ? 'material-tile is-active' : 'material-tile'} onClick={() => setSelectedCategory(item)} key={item.title}><ReliableImage src={item.image} fallback="/assets/products/plywood.png" alt={item.title}/><span className="tile-number">0{index + 1}</span><div><small>{item.tag.split('/')[1]}</small><h3>{item.title}</h3><p>{item.products.join(' · ')}</p></div><i>↗</i></button>)}</div><p className="visual-note">Images show product categories available for enquiry. Please contact the shop for current designs, sizes and stock.</p></div></section>
    <section className="section quote-strip"><div className="frame"><div><p className="eyebrow light">Need an exact price?</p><h2>Tell us the material,<br/><em>size and quantity.</em></h2></div><button className="primary-button" onClick={() => requestQuote(selectedCategory.title)}>Start a quote <span>↗</span></button></div></section>
  </main>;
}

function Trade({ navigate }) {
  return <main><section className="product-hero trade-hero"><div className="frame"><p className="eyebrow">Trade desk</p><h1>For the people<br/>who <em>build daily.</em></h1><p>Carpenters, contractors, fabricators, builders and interior designers can share an upcoming project requirement in one clear WhatsApp enquiry.</p></div></section><section className="section trade-page"><div className="frame trade-cards"><article><b>01</b><h2>Send your project list.</h2><p>Share the materials, quantities, dimensions and any finish preferences you have.</p></article><article><b>02</b><h2>Discuss the options.</h2><p>Use your enquiry to begin a direct conversation on plywood, glass, PVC doors and hardware.</p></article><article><b>03</b><h2>Confirm the next step.</h2><p>Get the current product and availability details you need before finalising a purchase.</p></article></div></section><section className="section trade-cta"><div className="frame"><div><p className="eyebrow">Plan your next job</p><h2>Let&apos;s start with a<br/><em>clear requirement.</em></h2></div><button className="primary-button" onClick={() => navigate('contact')}>Start a trade enquiry <span>↗</span></button></div></section></main>;
}

function Contact({ form, setForm, requestQuote }) {
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  return <main><section className="product-hero contact-hero"><div className="frame"><p className="eyebrow">Contact Shree Ganesh</p><h1>Make the next<br/><em>material choice easier.</em></h1><p>Call, WhatsApp or send a quick requirement. Include the product, size, quantity and use case for a more useful response.</p></div></section><section className="section contact-page"><div className="frame contact-layout"><div className="contact-details"><p className="eyebrow">Direct contact</p><h2>Talk to the<br/><em>shop team.</em></h2><a href={`tel:+91${primaryPhone}`}><small>Primary mobile</small>{formatPhone(primaryPhone)}</a><a href={`tel:+91${alternatePhone}`}><small>Alternate mobile</small>{formatPhone(alternatePhone)}</a><a href={whatsappUrl} target="_blank" rel="noreferrer"><small>WhatsApp</small>Send a message ↗</a><a href={mapUrl} target="_blank" rel="noreferrer"><small>Shop location</small>Sriperumbudur ↗</a></div><form className="quote-form" onSubmit={(event) => { event.preventDefault(); requestQuote(form.material); }}><p className="eyebrow">Get a quote</p><h2>Share the basics.</h2><label>Your name<input name="name" value={form.name} onChange={update} placeholder="Enter your name" required/></label><label>Mobile number<input name="phone" value={form.phone} onChange={update} inputMode="tel" placeholder="Enter mobile number" required/></label><label>Material<select name="material" value={form.material} onChange={update}>{categories.map((item) => <option key={item.title}>{item.title}</option>)}</select></label><label>Requirement<textarea name="details" value={form.details} onChange={update} placeholder="Example: waterproof plywood, 10 sheets, for kitchen cabinets" rows="4"/></label><button className="primary-button" type="submit">Send on WhatsApp <span>↗</span></button><p className="form-helper">Your message opens in WhatsApp for you to review and send.</p></form></div></section><section className="section map-section contact-map"><div className="frame map-layout"><div><p className="eyebrow">Location</p><h2>Find the shop<br/><em>on the map.</em></h2><p>Use the embedded map or open Google Maps for live directions.</p><a className="primary-button inline-button" href={mapUrl} target="_blank" rel="noreferrer">Get directions <span>↗</span></a></div><div className="map-box"><iframe title="Directions to Shree Ganesh" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div></div></section></main>;
}

function SectionHeading({ eyebrow, title, copy }) { return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><p>{copy}</p></div>; }

function Footer({ navigate }) { return <footer><div className="frame footer-grid"><button className="brand footer-brand" onClick={() => navigate('home')}><img src="/assets/shree-ganesh-logo.png" alt="Shree Ganesh logo"/><span>Shree Ganesh<small>Glass, Plywoods &amp; Hardwares</small></span></button><div><p>Primary mobile</p><a href={`tel:+91${primaryPhone}`}>{formatPhone(primaryPhone)}</a></div><div><p>Alternate mobile</p><a href={`tel:+91${alternatePhone}`}>{formatPhone(alternatePhone)}</a></div><div><p>Visit us</p><a href={mapUrl} target="_blank" rel="noreferrer">Sriperumbudur ↗</a></div></div><div className="frame footer-bottom">© {new Date().getFullYear()} Shree Ganesh Glass, Plywoods &amp; Hardwares. All rights reserved.</div></footer>; }

createRoot(document.getElementById('root')).render(<App />);
