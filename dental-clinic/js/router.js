/* Tiny hash router: #/ (home), #/booking, #/bookings */

const ROUTES = ['home', 'booking', 'bookings'];

export function parseRoute(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '').replace(/\/+$/, '');
  return ROUTES.includes(raw) ? raw : 'home';
}

export function navigate(route) {
  const target = route === 'home' ? '#/' : `#/${route}`;
  if (window.location.hash === target) return;
  window.location.hash = target;
}

export function initRouter(onChange) {
  const apply = () => {
    const route = parseRoute();
    document.querySelectorAll('[data-view]').forEach((view) => {
      view.hidden = view.dataset.view !== route;
    });
    document.querySelectorAll('[data-nav]').forEach((link) => {
      link.classList.toggle('is-active', link.dataset.nav === route);
    });
    onChange(route);
  };

  window.addEventListener('hashchange', apply);
  apply();
  return apply;
}
