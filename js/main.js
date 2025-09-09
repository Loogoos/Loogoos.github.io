// Simple client-side router for static site
const routes = {
  '/home': {
    title: 'Home',
    content: `<h1>Learn Security</h1><p>This site aims to teach practical security concepts in a clear, hands-on way. Use the navigation above to explore sections.</p>`
  },
  '/topics': {
    title: 'Topics',
    content: `<h1>Security Topics</h1><ul><li>Authentication</li><li>Authorization</li><li>Encryption</li><li>Web Security</li></ul>`
  },
  '/resources': {
    title: 'Resources',
    content: `<h1>Resources</h1><ul><li><a href='https://owasp.org'>OWASP</a></li><li><a href='https://www.cisa.gov'>CISA</a></li></ul>`
  },
  '/about': {
    title: 'About',
    content: `<h1>About</h1><p>This site is a static educational resource for learning security concepts.</p>`
  }
};

function renderRoute(path) {
  // Redirect / to /home
  if (path === '/' || path === '') {
    window.history.replaceState({}, '', '/home');
    path = '/home';
  }
  const main = document.querySelector('main.container');
  if (routes[path]) {
    document.title = 'Security Learning - ' + routes[path].title;
    main.innerHTML = routes[path].content;
    setActiveNav(path);
  } else {
    document.title = 'Security Learning - Not Found';
    main.innerHTML = `<h1>404 - Not Found</h1><p>The page you requested does not exist.</p>`;
    setActiveNav(null);
  }
}

function setActiveNav(path) {
  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

function handleNavClick(e) {
  const href = e.target.getAttribute('href');
  if (routes[href]) {
    e.preventDefault();
    window.history.pushState({}, '', href);
    renderRoute(href);
    closeNav();
  }
}

document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', handleNavClick);
});

window.addEventListener('popstate', () => {
  renderRoute(window.location.pathname);
});

// Initial route render
renderRoute(window.location.pathname);

// Navigation toggle logic (from previous inline script)
const nav = document.getElementById('mainNav');
const btn = document.getElementById('navToggle');
function openNav(){
  nav.classList.add('open');
  nav.setAttribute('aria-hidden','false');
  btn.setAttribute('aria-expanded','true');
}
function closeNav(){
  nav.classList.remove('open');
  nav.setAttribute('aria-hidden','true');
  btn.setAttribute('aria-expanded','false');
}
if(btn && nav){
  btn.addEventListener('click', ()=>{
    if(nav.classList.contains('open')) closeNav(); else openNav();
  });
  document.addEventListener('keydown',(e)=>{
    if(e.key === 'Escape') closeNav();
  });
  document.addEventListener('click',(e)=>{
    if(nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) closeNav();
  });
}
