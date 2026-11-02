const dialog = document.getElementById('plan-dialog');
const status = document.getElementById('brief-status');
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

