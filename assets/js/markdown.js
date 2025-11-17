(function () {
  function applyMarkdown(container, text) {
    if (window.marked) {
      marked.setOptions({ breaks: true, gfm: true });
      container.innerHTML = marked.parse(text);
    } else {
      container.innerHTML = '<p style="color:#c0392b;">Markdown renderer is missing.</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-markdown-src]').forEach(function (target) {
      var src = target.getAttribute('data-markdown-src');
      if (!src) return;

      target.innerHTML = '<p style="color: var(--muted);">Loading content...</p>';

      fetch(src)
        .then(function (resp) {
          if (!resp.ok) throw new Error('Failed to load ' + src);
          return resp.text();
        })
        .then(function (text) {
          applyMarkdown(target, text);
        })
        .catch(function (err) {
          console.error(err);
          target.innerHTML = '<p style="color:#c0392b;">Could not load this markdown file.</p>';
        });
    });
  });
})();
