# Arcadia Editions slides

Slidev decks about Arcadia Editions and ZenWave. Theme in `packages/theme-arcadia/`, one folder per talk in `talks/`.

```bash
npm install
npm run dev:theme-showcase
```

Per talk add `dev:/build:/export:<name>` scripts in `package.json` and set `theme: ../../packages/theme-arcadia` in the deck frontmatter.

## License

- **Code** (theme, components, grammars, build scripts): [MIT](LICENSE), same as the rest of Arcadia Editions.
- **Content** (slide text, diagrams and the images made for these talks): [CC BY 4.0](LICENSE-CONTENT). Reuse it freely, with attribution.
- **Third-party material keeps its own license** and is not covered by the above:
  - logos and trademarks (Java, Spring, Kotlin, OpenAPI, AsyncAPI, GitHub, Miro, EventCatalog...), including the ones visible inside screenshots;
  - `magnifying-glass.png` and `magnifying-glass-transparent.webp`.
