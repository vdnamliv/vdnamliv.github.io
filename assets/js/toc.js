document.addEventListener("DOMContentLoaded", () => {
  const tocPanel = document.querySelector("[data-toc]");
  const article = document.querySelector(".post-content");
  if (!tocPanel || !article) return;

  const headings = article.querySelectorAll("h2, h3, h4");
  if (!headings.length) {
    tocPanel.style.display = "none";
    return;
  }

  const tocList = tocPanel.querySelector(".toc-list");
  const list = document.createElement("ul");
  headings.forEach((heading) => {
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const li = document.createElement("li");
    li.className = `toc-level-${heading.tagName.toLowerCase()}`;
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    li.appendChild(link);
    list.appendChild(li);
  });

  tocList.appendChild(list);
});
