const dialog = document.getElementById('plan-dialog');
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
const status = document.getElementById('brief-status');
const overview = document.querySelector('.report-preview');
const overviewToggle = document.createElement('button');
overviewToggle.type = 'button';
overviewToggle.className = 'overview-toggle';
overviewToggle.textContent = 'Pause animation';
overviewToggle.setAttribute('aria-label', 'Pause search overview animation');
overviewToggle.setAttribute('aria-pressed', 'false');
overview.append(overviewToggle);
overviewToggle.addEventListener('click', () => {
  const paused = overview.classList.toggle('is-paused');
  overviewToggle.setAttribute('aria-pressed', String(paused));
  overviewToggle.textContent = paused ? 'Resume animation' : 'Pause animation';
  overviewToggle.setAttribute('aria-label', paused ? 'Resume search overview animation' : 'Pause search overview animation');
});
document.querySelectorAll('[data-plan]').forEach(button => {
  button.addEventListener('click', () => {
    status.textContent = '';
    dialog.showModal();
  });
});
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }
});
document.getElementById('brief-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const brief = [
    'AI SEO - Planning brief',
    '',
    'Website: ' + data.get('website').trim(),
    'Priority: ' + data.get('priority'),
    '',
    'Goals:',
    data.get('goals').trim(),
    '',
    'Next steps: Review website, confirm scope, agree deliverables and pricing.'
  ].join('\n');
  const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ai-seo-brief.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Your brief has been prepared for download. Nothing was sent or submitted.';
});

