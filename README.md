# Pattern: figure image

A system-agnostic HTML pattern for a figure element containing an image

## What is it?

A `figure` element with an `img` element and an optional `figcaption`.

```
<figure class="figure--foo">
  <img src="https://unsplash.it/200/300" alt="Foo Image">
  <figcaption>Foo image caption</figcaption>
</figure>
```

## npm scripts

* `npm run lint` - lints Javascript
* `npm run ava` - runs unit tests
* `npm run nyc` - runs unit tests, then runs code coverage
* `npm test` - runs `npm pretest` first, which runs the linting, then ava, then nyc
