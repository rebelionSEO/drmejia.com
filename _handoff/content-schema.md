# Sanity Schemas — Dr. Mejía

> Define todos los schemas que viven en `sanity/schemas/`. Cada schema debe soportar localización ES/EN.
> Sanity v3 + TypeScript.

---

## Tipos custom (locale)

Crear estos primero en `sanity/schemas/objects/`. Permiten que cualquier campo de texto sea bilingüe.

### `localeString.ts`
```ts
import { defineType } from 'sanity'

export const supportedLanguages = [
  { id: 'es', title: 'Español', isDefault: true },
  { id: 'en', title: 'English' },
] as const

export const localeString = defineType({
  name: 'localeString',
  type: 'object',
  fieldsets: [{ name: 'translations', title: 'Traducciones', options: { collapsible: true } }],
  fields: supportedLanguages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
})
```

### `localeText.ts`
Igual que arriba pero `type: 'text'` (multi-line).

### `localeBlockContent.ts`
Array of blocks (rich text) con `type: 'array'` of `block`s. Uno por idioma.

---

## Singletons (uno solo en todo el dataset)

Configurar en `structure.ts` para que no se puedan duplicar.

### 1. `siteSettings`
```ts
{
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  fields: [
    { name: 'siteName', type: 'localeString' },
    { name: 'tagline', type: 'localeString' },
    { name: 'defaultMetaDescription', type: 'localeText' },
    { name: 'ogImage', type: 'image', options: { hotspot: true } },
    { name: 'logo', type: 'image' },
    { name: 'phone', type: 'string' },
    { name: 'whatsapp', type: 'string', description: 'Solo número, formato +505...' },
    { name: 'email', type: 'string' },
    { name: 'address', type: 'localeText' },
    { name: 'mapUrl', type: 'url' },
    { name: 'mapEmbed', type: 'text', description: 'iframe src de Google Maps' },
    {
      name: 'hours',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'day', type: 'localeString' },
          { name: 'time', type: 'string' },
        ],
      }],
    },
    {
      name: 'social',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url' },
        { name: 'facebook', type: 'url' },
        { name: 'linkedin', type: 'url' },
      ],
    },
  ],
}
```

### 2. `homePage`
```ts
{
  name: 'homePage',
  type: 'document',
  fields: [
    // Hero
    { name: 'heroEyebrow', type: 'localeString' },
    { name: 'heroTitle', type: 'localeString' },
    { name: 'heroLead', type: 'localeText' },
    { name: 'heroPortrait', type: 'image', options: { hotspot: true } },
    { name: 'heroCredentials', type: 'array', of: [{ type: 'localeString' }] },

    // Karyotype intro
    { name: 'karyotypeEyebrow', type: 'localeString' },
    { name: 'karyotypeTitle', type: 'localeString' },
    { name: 'karyotypeLead', type: 'localeText' },
    { name: 'karyotypeBullets', type: 'array', of: [{ type: 'localeString' }] },
    { name: 'karyotypeImage', type: 'image' },

    // Credentials section
    { name: 'credentialsTitle', type: 'localeString' },
    { name: 'credentialsItems', type: 'array', of: [
      { type: 'object', fields: [
        { name: 'institution', type: 'localeString' },
        { name: 'detail', type: 'localeString' },
        { name: 'year', type: 'string' },
      ]},
    ]},

    // Featured services (refs)
    { name: 'featuredServices', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }], validation: r => r.max(3) },

    // Blog teaser
    { name: 'featuredPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'post' }] }], validation: r => r.max(3) },

    // Final CTA
    { name: 'ctaTitle', type: 'localeString' },
    { name: 'ctaText', type: 'localeText' },

    // SEO
    { name: 'seo', type: 'seo' },
  ],
}
```

### 3. `aboutPage`
```ts
{
  name: 'aboutPage',
  type: 'document',
  fields: [
    { name: 'heroTitle', type: 'localeString' },
    { name: 'heroLead', type: 'localeText' },
    { name: 'portrait', type: 'image' },
    { name: 'philosophy', type: 'localeBlockContent' },
    {
      name: 'timeline',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'year', type: 'string' },
          { name: 'title', type: 'localeString' },
          { name: 'institution', type: 'localeString' },
          { name: 'description', type: 'localeText' },
        ],
      }],
    },
    { name: 'research', type: 'localeBlockContent' },
    { name: 'memberships', type: 'array', of: [{ type: 'localeString' }] },
    { name: 'seo', type: 'seo' },
  ],
}
```

### 4. `karyotypePage`
Similar — hero, qué es, por qué importa, proceso (steps), cuándo se indica, FAQ refs, CTA.

### 5. `contactPage`
Hero, instrucciones, FAQ corta sobre primera consulta.

### 6. `legalPage`
Privacy + cookies + términos en `localeBlockContent`.

### 7. `professionalsPage`
Para colegas que refieren pacientes — protocolos, documentos descargables.

---

## Documents (múltiples instancias)

### `service`
```ts
{
  name: 'service',
  type: 'document',
  fields: [
    { name: 'title', type: 'localeString' },
    { name: 'slug', type: 'slug', options: { source: 'title.es' } },
    { name: 'icon', type: 'string', description: 'Lucide icon name (ej. "stethoscope")' },
    { name: 'shortDescription', type: 'localeText' },
    { name: 'longDescription', type: 'localeBlockContent' },
    { name: 'duration', type: 'localeString' },
    { name: 'price', type: 'localeString', description: 'Texto libre, ej. "Desde C$1,500"' },
    { name: 'whatToExpect', type: 'array', of: [{ type: 'localeString' }] },
    { name: 'image', type: 'image' },
    { name: 'order', type: 'number' },
    { name: 'seo', type: 'seo' },
  ],
}
```

### `post` (blog)
```ts
{
  name: 'post',
  type: 'document',
  fields: [
    { name: 'title', type: 'localeString' },
    { name: 'slug', type: 'slug', options: { source: 'title.es' } },
    { name: 'excerpt', type: 'localeText' },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'readTime', type: 'number', description: 'Minutos' },
    { name: 'body', type: 'localeBlockContent' },
    { name: 'seo', type: 'seo' },
  ],
  orderings: [{ title: 'Más reciente', name: 'recent', by: [{ field: 'publishedAt', direction: 'desc' }] }],
}
```

### `author`
```ts
{
  name: 'author',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'title', type: 'localeString' },
    { name: 'bio', type: 'localeText' },
    { name: 'photo', type: 'image' },
  ],
}
```

### `category`
```ts
{
  name: 'category',
  type: 'document',
  fields: [
    { name: 'title', type: 'localeString' },
    { name: 'slug', type: 'slug', options: { source: 'title.es' } },
    { name: 'description', type: 'localeText' },
    { name: 'color', type: 'string', options: { list: ['brand', 'accent', 'warn'] } },
  ],
}
```

### `faq`
```ts
{
  name: 'faq',
  type: 'document',
  fields: [
    { name: 'question', type: 'localeString' },
    { name: 'answer', type: 'localeBlockContent' },
    { name: 'topic', type: 'string', options: { list: ['general', 'karyotype', 'consultation', 'genetics', 'billing'] } },
    { name: 'order', type: 'number' },
  ],
}
```

### `testimonial` (opcional, si se incluyen)
```ts
{
  name: 'testimonial',
  type: 'document',
  fields: [
    { name: 'quote', type: 'localeText' },
    { name: 'authorName', type: 'string' },
    { name: 'authorRole', type: 'localeString' },
    { name: 'photo', type: 'image' },
    { name: 'featured', type: 'boolean' },
  ],
}
```

---

## Object types reutilizables

### `seo.ts`
```ts
{
  name: 'seo',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'localeString' },
    { name: 'metaDescription', type: 'localeText' },
    { name: 'ogImage', type: 'image' },
    { name: 'noIndex', type: 'boolean', initialValue: false },
  ],
}
```

---

## Custom desk structure (singletons)

```ts
// sanity/structure.ts
import { StructureBuilder } from 'sanity/structure'

const SINGLETONS = ['siteSettings', 'homePage', 'aboutPage', 'karyotypePage', 'contactPage', 'legalPage', 'professionalsPage']

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem().title('⚙️ Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem().title('🏠 Home').child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem().title('👨‍⚕️ Sobre').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem().title('🧬 Tamizaje').child(S.document().schemaType('karyotypePage').documentId('karyotypePage')),
      S.listItem().title('📞 Contacto').child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.listItem().title('⚖️ Legal').child(S.document().schemaType('legalPage').documentId('legalPage')),
      S.listItem().title('🩺 Profesionales').child(S.document().schemaType('professionalsPage').documentId('professionalsPage')),
      S.divider(),
      S.documentTypeListItem('service').title('Servicios'),
      S.documentTypeListItem('post').title('Blog Posts'),
      S.documentTypeListItem('category').title('Categorías'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('author').title('Autores'),
    ])
```

---

## GROQ queries clave

```ts
// sanity/lib/queries.ts
export const homePageQuery = `*[_type == "homePage"][0]{
  ...,
  featuredServices[]->{ title, slug, shortDescription, icon },
  featuredPosts[]->{ title, slug, excerpt, coverImage, publishedAt, "category": categories[0]->title }
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->,
  categories[]->,
}`

export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc){
  title, slug, excerpt, coverImage, publishedAt, readTime,
  "category": categories[0]->{ title, color }
}`

export const faqsByTopicQuery = `*[_type == "faq" && topic == $topic] | order(order asc)`
```

---

## TypeScript types (sanity-codegen o sanity-typegen)

Generar automáticamente con `sanity typegen generate` después de definir schemas. Tipa los resultados de las queries.
