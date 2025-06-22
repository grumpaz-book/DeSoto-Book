export function initPanelRouter() {
  document.querySelectorAll('.menu-option').forEach(option => {
    option.addEventListener('click', () => {
      const action = option.dataset.action;
      triggerPanelTransition(`${action}-panel`);
    });
  });
}

function triggerPanelTransition(panelId) {
  const mainContent = document.getElementById('main-content');
  mainContent.classList.add('fade-out');

  setTimeout(() => {
    // Hide all panels
    document.querySelectorAll('.panel').forEach(panel => {
      panel.classList.remove('visible');
      panel.classList.add('hidden');
    });

    // Show the selected panel
    const target = document.getElementById(panelId);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('visible');
    }

    mainContent.classList.remove('fade-out');
  }, 500);
}