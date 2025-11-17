(function () {
  function slugify(text, counts) {
    var base = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!base) base = "section";
    counts[base] = (counts[base] || 0) + 1;
    return counts[base] > 1 ? base + "-" + counts[base] : base;
  }

  function buildTOC(container) {
    var layout = container.closest(".article-layout");
    if (!layout) return;
    var tocWrapper = layout.querySelector("[data-toc]");
    if (!tocWrapper) return;

    var headings = container.querySelectorAll("h1, h2, h3");
    if (!headings.length) {
      tocWrapper.innerHTML = '<p class="muted">Chưa có mục lục.</p>';
      return;
    }

    var counts = {};
    var list = document.createElement("ul");
    list.className = "toc-list";

    headings.forEach(function (heading) {
      var level = parseInt(heading.tagName.slice(1), 10);
      var text = heading.textContent.trim();
      if (!text) return;

      var id = heading.id || slugify(text, counts);
      heading.id = id;

      var item = document.createElement("li");
      item.className = "toc-item level-" + level;

      var link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = text;

      item.appendChild(link);
      list.appendChild(item);
    });

    tocWrapper.innerHTML = "";
    tocWrapper.appendChild(list);
  }

  function applyMarkdown(container, text) {
    if (window.marked) {
      marked.setOptions({ breaks: true, gfm: true });
      container.innerHTML = marked.parse(text);
      buildTOC(container);
    } else {
      container.innerHTML = '<p style="color:#c0392b;">Markdown renderer is missing.</p>';
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-markdown-src]").forEach(function (target) {
      var src = target.getAttribute("data-markdown-src");
      if (!src) return;

      target.innerHTML = '<p style="color: var(--muted);">Loading content...</p>';

      fetch(src)
        .then(function (resp) {
          if (!resp.ok) throw new Error("Failed to load " + src);
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
