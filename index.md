---
layout: default
title: Home
permalink: /
---
<section class="page">
  <header class="page-header">
    <p class="eyebrow">Xin chào!</p>
    <h1>Minimal green security notebook</h1>
    <p class="page-lede">
      A calm space to archive HackTheBox notes, CTF recaps, and tiny tools that keep investigations tidy.
    </p>
  </header>

  <div class="home-posts">
    {% assign latest = site.posts | sort: "date" | reverse %}
    {% for post in latest limit:6 %}
      <article class="card">
        <a href="{{ post.url | relative_url }}">
          <p class="eyebrow">{{ post.categories | array_to_sentence_string }}</p>
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
          <div class="post-meta">
            <span>{{ post.date | date: "%d %b %Y" }}</span>
            {% if post.tags %}
              <span>
                {% for tag in post.tags %}
                  <span class="tag">{{ tag }}</span>
                {% endfor %}
              </span>
            {% endif %}
          </div>
        </a>
      </article>
    {% endfor %}
  </div>
</section>
