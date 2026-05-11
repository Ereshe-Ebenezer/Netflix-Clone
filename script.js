// ===== MOVIE DATA =====
const posters = [
  'https://images.unsplash.com/photo-1489599735734-79b4af4d5f33?w=600',
  'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600',
  'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600',
  'https://images.unsplash.com/photo-1518676590629-3dcba9c5a555?w=600',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600',
  'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=600',
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
  'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=600',
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600',
  'https://images.unsplash.com/photo-1500099817043-86d46000d58f?w=600',
  'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?w=600',
  'https://images.unsplash.com/photo-1542204625-ca960584462e?w=600',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
  'https://images.unsplash.com/photo-1517863280935-a8e44f5dbb87?w=600',
  'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=600'
];

const titles = [
  "Stranger Things", "Dark Horizon", "The Last Kingdom", "Money Heist",
  "Breaking Code", "Crown of Thorns", "Phantom City", "Silent Witness",
  "Shadow Hunter", "Blood Empire", "Lost in Tokyo", "The Crown",
  "Squid Game", "Wednesday", "Ozark", "Narcos",
  "Bridgerton", "Peaky Blinders", "Black Mirror", "The Witcher"
];

const genresList = [
  ["Sci-Fi", "Horror", "Drama"],
  ["Action", "Thriller"],
  ["Drama", "History"],
  ["Crime", "Heist", "Drama"],
  ["Tech", "Mystery"],
  ["Fantasy", "Royal"],
  ["Mystery", "Sci-Fi"],
  ["Crime", "Suspense"]
];

const synopsis = "When darkness descends upon a quiet city, an unlikely group of heroes must rise to confront an ancient evil that threatens to consume everything they hold dear. A gripping tale of courage, betrayal, and redemption.";

function randomMovie(i) {
  return {
    id: i,
    title: titles[i % titles.length],
    poster: posters[i % posters.length],
    match: 70 + Math.floor(Math.random() * 30),
    year: 2020 + Math.floor(Math.random() * 5),
    age: ['13+', '16+', '18+', 'TV-MA'][Math.floor(Math.random() * 4)],
    seasons: 1 + Math.floor(Math.random() * 5),
    genres: genresList[i % genresList.length],
    synopsis,
    cast: "John Smith, Emma Stone, Robert Downey, Mia Park",
    director: "Christopher Nolan"
  };
}

const rows = [
  { title: "Trending Now", count: 12 },
  { title: "Top Picks For You", count: 12 },
  { title: "Continue Watching", count: 8 },
  { title: "Netflix Originals", count: 12 },
  { title: "Action Movies", count: 12 },
  { title: "Popular This Week", count: 12 },
  { title: "Comedy Movies", count: 10 },
  { title: "Sci-Fi & Fantasy", count: 10 },
  { title: "Recently Added", count: 12 }
];

// ===== BUILD ROWS =====
const content = document.querySelector('.content');
const allMovies = [];

rows.forEach((row, rowIdx) => {
  const section = document.createElement('div');
  section.className = 'row reveal';

  const cards = Array.from({ length: row.count }, (_, i) => {
    const movie = randomMovie(rowIdx * 100 + i);
    allMovies.push(movie);
    return cardHTML(movie);
  }).join('');

  section.innerHTML = `
    <h2 class="row-title">${row.title}</h2>
    <div class="row-container">
      <button class="row-arrow prev" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
      <div class="row-track">${cards}</div>
      <button class="row-arrow next" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  `;
  content.appendChild(section);
});

function cardHTML(m) {
  return `
    <div class="card" data-id="${m.id}" onclick="openModal(${m.id})">
      <img src="${m.poster}" alt="${m.title}" loading="lazy" />
      <div class="card-info">
        <div class="card-actions">
          <button class="icon-btn play" onclick="event.stopPropagation()"><i class="fa-solid fa-play"></i></button>
          <button class="icon-btn" onclick="event.stopPropagation(); toggleAdd(this)"><i class="fa-solid fa-plus"></i></button>
          <button class="icon-btn" onclick="event.stopPropagation(); toggleLike(this)"><i class="fa-regular fa-thumbs-up"></i></button>
          <button class="icon-btn info" onclick="event.stopPropagation(); openModal(${m.id})"><i class="fa-solid fa-chevron-down"></i></button>
        </div>
        <div class="card-meta">
          <span class="match">${m.match}% Match</span>
          <span class="age">${m.age}</span>
          <span>${m.seasons} Seasons</span>
        </div>
        <div class="card-genres">
          ${m.genres.map(g => `<span>${g}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

// ===== ROW ARROW SCROLLING =====
document.querySelectorAll('.row-container').forEach(container => {
  const track = container.querySelector('.row-track');
  const prev = container.querySelector('.prev');
  const next = container.querySelector('.next');
  const scrollAmt = () => track.clientWidth * 0.85;
  prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmt(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: scrollAmt(), behavior: 'smooth' }));
});

// ===== STICKY NAVBAR =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ===== SEARCH BOX =====
const searchBox = document.getElementById('searchBox');
const searchIcon = document.getElementById('searchIcon');
const searchInput = document.getElementById('searchInput');
searchIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  searchBox.classList.toggle('active');
  if (searchBox.classList.contains('active')) searchInput.focus();
});
document.addEventListener('click', (e) => {
  if (!searchBox.contains(e.target)) searchBox.classList.remove('active');
});

// ===== PROFILE DROPDOWN =====
const profile = document.getElementById('profile');
profile.addEventListener('click', (e) => {
  e.stopPropagation();
  profile.classList.toggle('open');
});
document.addEventListener('click', () => profile.classList.remove('open'));

// ===== ADD / LIKE TOGGLES =====
function toggleAdd(btn) {
  const i = btn.querySelector('i');
  i.classList.toggle('fa-plus');
  i.classList.toggle('fa-check');
}
function toggleLike(btn) {
  const i = btn.querySelector('i');
  i.classList.toggle('fa-regular');
  i.classList.toggle('fa-solid');
}

// ===== MODAL =====
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

function openModal(id) {
  const movie = allMovies.find(m => m.id === id) || allMovies[0];
  const related = allMovies
    .filter(m => m.id !== movie.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  modalContent.innerHTML = `
    <div class="modal-hero" style="background-image: url('${movie.poster}')">
      <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      <div class="modal-hero-content">
        <h2 class="modal-title">${movie.title}</h2>
        <div class="modal-buttons">
          <button class="btn btn-play"><i class="fa-solid fa-play"></i> Play</button>
          <button class="icon-btn" style="width:42px;height:42px;font-size:14px"><i class="fa-solid fa-plus"></i></button>
          <button class="icon-btn" style="width:42px;height:42px;font-size:14px"><i class="fa-regular fa-thumbs-up"></i></button>
          <button class="icon-btn" style="margin-left:auto;width:42px;height:42px;font-size:14px"><i class="fa-solid fa-volume-xmark"></i></button>
        </div>
      </div>
    </div>

    <div class="modal-body">
      <div class="modal-body-grid">
        <div>
          <div class="modal-meta">
            <span class="match">${movie.match}% Match</span>
            <span>${movie.year}</span>
            <span class="age-tag">${movie.age}</span>
            <span>${movie.seasons} Seasons</span>
            <span class="hd-tag">HD</span>
          </div>
          <p class="modal-synopsis">${movie.synopsis}</p>
        </div>
        <div class="modal-info">
          <p><strong>Cast:</strong> ${movie.cast}</p>
          <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
          <p><strong>Director:</strong> ${movie.director}</p>
        </div>
      </div>

      <div class="modal-related">
        <h3>More Like This</h3>
        <div class="modal-related-grid">
          ${related.map(r => `
            <div class="related-card" onclick="openModal(${r.id})">
              <img src="${r.poster}" alt="">
              <div class="related-info">
                <h4>${r.title}</h4>
                <span class="match">${r.match}% Match</span> • ${r.year}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));