const nav = document.querySelector('.nav');
const navBar = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
const navToggle = document.querySelector('.nav-toggler');
const btnOpenModal = document.querySelectorAll('.btn-open-modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.modalClose');
const formInput = document.querySelectorAll('input');
const modal = document.querySelector('.modal');

const plans = document.querySelector('.plans');
const planItem = document.querySelectorAll('.plan-item');
const planItemDollar = document.querySelectorAll('.dollar');
const planItemLine = document.querySelectorAll('.line');
const planItemBtn = document.querySelectorAll('.btn-plan');
const scrollUpBtn = document.querySelector('.scroll-up');
const slides = document.querySelectorAll('.slider-item');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const grids = document.querySelector('.grid');
const gridsItem = document.querySelectorAll('.grids');
const gridLink = document.querySelectorAll('.section-2__readMore');

//Implementing page navigation
navLinks.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// modal.classList.add('section--hidden');
btnOpenModal.forEach((btn) => {
  btn.addEventListener('click', () => {
    overlay.classList.add('active');

    const revealModal = function (entries, observer) {
      const [entry] = entries;
      console.log(entry);
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    };

    const modalObserver = new IntersectionObserver(revealModal, {
      root: null,
      threshold: 0.1,
    });

    modalObserver.observe(modal);
    modal.classList.add('section--hidden');
  });
});
btnCloseModal.addEventListener('click', (e) => {
  e.preventDefault();
  formInput.forEach((el) => (el.value = ''));
  overlay.classList.remove('active');
});

plans.addEventListener('click', function (e) {
  const clicked = e.target.closest('.plan-item');
  if (!clicked) return;
  planItem.forEach((item) => {
    item.classList.remove('popular-active');
    clicked.classList.add('popular-active');
  });
});
//Revealing sectons on scroll
const allSectoins = document.querySelectorAll('.section');

const revealSections = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  rooT: null,
  threshold: 0.15,
});

allSectoins.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//Scroll up button
scrollUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('body').scrollIntoView({ behavior: 'smooth' });
});
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
  );
};
goToSlide(0);

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

console.log(grids);
grids.addEventListener('mouseover', function (e) {
  const click = e.target.closest('.grids');
  gridLink.forEach((el) => {
    el.style.color = 'white';
  });
});
console.log(gridLink);

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
});

//Accordion
class Accordion {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector('summary');
    this.content = el.querySelector('.faq-content');
    this.expandIcon = this.summary.querySelector('.expand-icon');
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';

    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: 'ease-out',
      },
    );

    this.animation.onfinish = () => {
      this.expandIcon.classList.add('.fa-plus');
      return this.onAnimationFinish(false);
    };
    this.animation.oncancel = () => {
      this.expandIcon.classList.add('.fa-plus');
      return (this.isClosing = false);
    };
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight
    }px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 350,
        easing: 'ease-out',
      },
    );

    this.animation.onfinish = () => {
      this.expandIcon.classList.add('.fa-minus');
      return this.onAnimationFinish(true);
    };
    this.animation.oncancel = () => {
      this.expandIcon.classList.add('.fa-minus');
      return (this.isExpanding = false);
    };
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});

//Sticky navigation
const section1 = document.getElementById('section--1');

const obsCallback = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0.1,
};
const navObserver = new IntersectionObserver(obsCallback, obsOptions);
navObserver.observe(section1);
