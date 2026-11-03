const searchIllustration = document.querySelector('.art-keywords');
const searchToggle = document.querySelector('.search-toggle');
searchToggle.addEventListener('click', () => {
  const paused = searchIllustration.classList.toggle('is-paused');
  searchToggle.setAttribute('aria-pressed', String(paused));
  searchToggle.textContent = paused ? 'Resume search animation' : 'Pause search animation';
});
const workflow = document.querySelector('.pipeline');
const workflowToggle = document.querySelector('.workflow-toggle');
workflowToggle.addEventListener('click', () => {
  const paused = workflow.classList.toggle('is-paused');
  workflowToggle.setAttribute('aria-pressed', String(paused));
  workflowToggle.textContent = paused ? 'Resume animation' : 'Pause animation';
});

const nicheExamples = {
  hair: ['hair salon near me', 'balayage specialist near me', 'hair extensions pricing', 'hair colorist in [city]'],
  medspa: ['medspa near me', 'skin treatment consultation', 'laser hair removal pricing', 'medspa in [city]'],
  dental: ['dentist near me', 'dental implant consultation', 'teeth whitening pricing', 'emergency dentist in [city]'],
  hvac: ['HVAC repair near me', 'heat pump repair near me', 'AC replacement pricing', 'furnace repair in [city]'],
  remodeling: ['remodeler near me', 'kitchen remodel contractor', 'bathroom remodeling cost', 'home renovation in [city]']
};
const nicheSelect = document.getElementById('niche-example');
function updateNiche() {
  const [query, ...suggestions] = nicheExamples[nicheSelect.value];
  const queryElement = searchIllustration.querySelector('.search-query');
  queryElement.textContent = query;
  queryElement.style.setProperty('--query-width', query.length + 'ch');
  queryElement.style.setProperty('--query-steps', query.length);
  searchIllustration.querySelector('.search-box').setAttribute('aria-label', 'Someone typing ' + query);
  searchIllustration.querySelectorAll('.keyword-table > div > span').forEach((span, index) => {
    span.textContent = suggestions[index];
  });
  // Restart the shared timeline so each new example types before suggestions appear.
  searchIllustration.getAnimations({ subtree: true }).forEach(animation => {
    animation.currentTime = 0;
  });
}
nicheSelect.addEventListener('change', updateNiche);
updateNiche();

document.getElementById('audit-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const brief = [
    'Free SEO / GEO / AEO audit request',
    'Prepared locally. Not submitted or booked.',
    '',
    'Name: ' + data.get('name').trim(),
    'Email: ' + data.get('email').trim(),
    'Website: ' + data.get('website').trim(),
    'Industry: ' + data.get('industry'),
    'Service area: ' + data.get('location').trim(),
    'Paid ads interest: ' + (data.has('ads') ? 'Yes' : 'No'),
    '',
    'Goals:',
    data.get('goals').trim()
  ].join('\n');
  const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'seo-audit-request.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('audit-status').textContent =
    'Your audit request is ready to download. Nothing was submitted; delivery is not connected yet.';
});

