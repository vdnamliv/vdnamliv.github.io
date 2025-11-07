---
title: CTF Writeup
permalink: /ctf/
eyebrow: "CTF"
subtitle: "Grouped by technique and tournament tags."
---
{% assign ctf_posts = site.posts | where_exp: "post", "post.categories contains 'ctf'" %}
{% if ctf_posts and ctf_posts.size > 0 %}
  {% for segment in site.ctf_segments %}
    {% assign group = ctf_posts | where_exp: "post", "post.tags contains segment.tag" %}
    <section class="ctf-cluster">
      <h2>{{ segment.title }}</h2>
      {% if group and group.size > 0 %}
        <div class="home-posts">
          {% for post in group %}
            <article class="card">
              <a href="{{ post.url | relative_url }}">
                <p class="eyebrow">{{ post.event | default: "CTF" }}</p>
                <h3>{{ post.title }}</h3>
                <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
                <div class="post-meta">
                  <span>{{ post.date | date: "%d %b %Y" }}</span>
                  {% if post.event %}<span>{{ post.event }}</span>{% endif %}
                </div>
              </a>
            </article>
          {% endfor %}
        </div>
      {% else %}
        <p class="muted">No writeup in this track yet.</p>
      {% endif %}
    </section>
  {% endfor %}
{% else %}
  <p>No CTF posts are live yet.</p>
{% endif %}
