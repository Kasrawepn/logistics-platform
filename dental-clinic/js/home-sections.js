/* Renders the sections whose content was extracted from the practice site:
   the full treatment spectrum, the team and the opening hours. */

import { SERVICES, TEAM, GALLERY, PRACTICE } from './content.js';
import { initTilt } from './tilt.js';

function serviceCard(service) {
  const media = service.image
    ? `<div class="service-media"><img src="${service.image}" alt="${service.fa}" loading="lazy" decoding="async" /></div>`
    : '';

  const foot = service.bookable
    ? `<span class="service-price">${service.price}</span>
       <a href="#/booking" class="btn btn-primary btn-sm">رزرو نوبت</a>`
    : `<span class="service-price muted">با مشاوره</span>
       <span class="service-note">${service.de}</span>`;

  return `
    <article class="service-card${service.bookable ? ' is-bookable' : ''} reveal">
      <div class="tilt-inner" data-tilt>
        ${media}
        <span class="service-icon" aria-hidden="true">${service.icon}</span>
        <h3>${service.fa}</h3>
        <p class="service-de" dir="ltr">${service.de}</p>
        <p>${service.text}</p>
        <div class="service-foot">${foot}</div>
      </div>
    </article>`;
}

function teamCard(member) {
  return `
    <article class="team-card reveal">
      <div class="tilt-inner" data-tilt>
        <div class="team-photo">
          <img src="${member.image}" alt="${member.name}" loading="lazy" decoding="async" />
        </div>
        <div class="team-body">
          <h3>${member.name}</h3>
          <p class="team-role">${member.role}</p>
          <p>${member.text}</p>
        </div>
      </div>
    </article>`;
}

export function renderHomeSections() {
  const grid = document.getElementById('service-grid-more');
  if (grid) grid.innerHTML = SERVICES.map(serviceCard).join('');

  const teamGrid = document.getElementById('team-grid');
  if (teamGrid) teamGrid.innerHTML = TEAM.map(teamCard).join('');

  const hours = document.getElementById('practice-hours');
  if (hours) {
    hours.innerHTML = PRACTICE.hours
      .map((row) => `<li><span>${row.day}</span><strong>${row.time}</strong></li>`)
      .join('');
  }

  initTilt();
}

/* Flat photo grid, used only when WebGL is unavailable. */
export function renderGalleryFallback(stage) {
  if (!stage) return;
  const grid = document.createElement('div');
  grid.className = 'gallery-flat';
  grid.innerHTML = GALLERY.map(
    (item) => `<figure><img src="${item.src}" alt="${item.label}" loading="lazy" /><figcaption>${item.label}</figcaption></figure>`,
  ).join('');
  stage.appendChild(grid);
}
