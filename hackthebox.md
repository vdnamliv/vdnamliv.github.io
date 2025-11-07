---
title: HackTheBox Writeups
permalink: /hackthebox/
eyebrow: "Writeups"
subtitle: "Field notes for each box and challenge on HackTheBox."
---
{% assign htb_posts = site.categories.hackthebox | default: site.categories.HTB %}
{% if htb_posts %}
  <div class="home-posts">
    {% for post in htb_posts %}
      <article class="card">
        <a href="{{ post.url | relative_url }}">
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
          <div class="post-meta">
            <span>{{ post.date | date: "%d %b %Y" }}</span>
            <span>Difficulty: {{ post.difficulty | default: "?" }}</span>
          </div>
        </a>
      </article>
    {% endfor %}
  </div>
{% else %}
  <p>No writeups yet. Check back soon!</p>
{% endif %}
