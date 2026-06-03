const sections = [
  { id: 'header', path: 'sections/header.html' },
  { id: 'hero', path: 'sections/hero.html' },
  { id: 'about', path: 'sections/about.html' },
  { id: 'process', path: 'sections/process.html' },
  { id: 'projects', path: 'sections/projects.html' },
  { id: 'contact', path: 'sections/contact.html' },
  { id: 'footer', path: 'sections/footer.html' },
];

async function loadSection({ id, path }) {
  const container = document.getElementById(id);
  if (!container) return;

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Không thể tải ${path}`);
  }

  container.innerHTML = await response.text();
}

async function loadSections() {
  try {
    await Promise.all(sections.map(loadSection));
    document.dispatchEvent(new Event('sectionsLoaded'));
  } catch (error) {
    console.error('Lỗi khi tải sections:', error);
  }
}

loadSections();
