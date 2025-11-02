
AOS.init({
  duration: 1000,
  once: true,
  offset: 120,
});


const progresses = document.querySelectorAll('progress');

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

window.addEventListener('scroll', () => {
  progresses.forEach(progress => {
    if (isInViewport(progress) && !progress.classList.contains('animated')) {
      progress.classList.add('animated');
      let target = progress.dataset.value;
      let current = 0;

      const interval = setInterval(() => {
        if (current < target) {
          current++;
          progress.value = current;
        } else {
          clearInterval(interval);
        }
      }, 10);
    }
  });
});
