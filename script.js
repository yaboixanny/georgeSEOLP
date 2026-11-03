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

