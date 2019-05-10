# Text Container

When dealing with structured text (with headings, paragraphs and lists), there is a simple CSS class that help maintaining the same spacings accross the entire site.

## The `text-container`

Simply add the class `text-container` to a container and add structured content manually or load the text that has been composed using our editor.

```HTML
<div class="example-module">
  <div class="example-module__content text-container">
      <!-- Entered manually -->
      <h2>Heading exmplae</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
      <ul>
        <li>Liste item</li>
        <li>Liste item</li>
        <li>Liste item</li>
      </ul>
      <!-- Load text from database -->
      {{object.text|safe}}
  </div>
</div>
```

## Defining spacings

Should you want to adjust the spacings of structure elements, open `static/scss/base/variables/text-container.scss` and search for `=text` to jump to the section.
