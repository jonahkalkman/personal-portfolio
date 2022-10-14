const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
      }
  });
}, observerOptions);

window.addEventListener('DOMContentLoaded', () => {
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

  let text = document.querySelector('.text');

  text.addEventListener('mousemove', function(e) {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', `${ x }px`)
    e.target.style.setProperty('--y', `${ y }px`)
  });
});