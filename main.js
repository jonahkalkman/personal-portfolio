window.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
  }, observerOptions);

  current_mode = localStorage.getItem('dark-mode');

  // Based on device setting set mode, only first time
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkScheme.matches && current_mode == undefined) {
    localStorage.setItem('dark-mode', JSON.stringify(true));
    current_mode = localStorage.getItem('dark-mode');
  } else if(current_mode == undefined) {
    localStorage.setItem('dark-mode', JSON.stringify(false));  
    current_mode = localStorage.getItem('dark-mode');
  }

  if(JSON.parse(current_mode)) {
    document.documentElement.setAttribute('dark-mode', true);  
  } else {
    document.documentElement.removeAttribute('dark-mode');  
  }

  const items = Array.from(document.getElementsByClassName('fadeup'));
  
  items.forEach(item => {
    observer.observe(item);
  });

  const toggleMode = document.querySelector('.icon--mode');

  toggleMode.addEventListener('click', () => {
    mode = localStorage.getItem('dark-mode');
    if(mode != undefined) {
      localStorage.setItem('dark-mode', !(JSON.parse(mode)));
    } else {
      localStorage.setItem('dark-mode', JSON.stringify(true));
    }

    document.documentElement.toggleAttribute('dark-mode');  
  });

  const text = document.querySelector('.contact__mail');
  if(text) {
    text.addEventListener('mousemove', function(e) {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;
      e.target.style.setProperty('--x', `${ x }px`)
      e.target.style.setProperty('--y', `${ y }px`)
    });
  }

  const cookieNotice = document.querySelector('.cookie-notice');
  const allowButton = document.getElementById('cookie-notice__allow');
  const declineButton = document.getElementById('cookie-notice__decline');
  const cookieChoice = localStorage.getItem('cookie-notice');
  
  if(cookieChoice !== null) {
    cookieNotice.hidden = true;
    if(JSON.parse(cookieChoice)) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-EPLZ2MQZ84";
      const script2 = document.createElement("script");
      script2.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-EPLZ2MQZ84');";
      document.body.appendChild(script);
      document.body.appendChild(script2);
    }
  }
  allowButton.addEventListener('click', () => {
    localStorage.setItem('cookie-notice', JSON.stringify(true));
    cookieNotice.hidden = true;

    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-EPLZ2MQZ84"; 
    const script2 = document.createElement("script");
    script2.innerHTML = "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-EPLZ2MQZ84');";
    document.body.appendChild(script); 
    document.body.appendChild(script2);  
  });
  declineButton.addEventListener('click', () => {
    localStorage.setItem('cookie-notice', JSON.stringify(false));
    cookieNotice.hidden = true;
  });
});