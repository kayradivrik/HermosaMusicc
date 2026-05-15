import type { Rule } from 'sanity';

export default {
  name: 'page',
  title: 'Özel Sayfalar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Sayfa Linki (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Kapak Görseli (Opsiyonel)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Sayfa İçeriği',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1 (Dev)', value: 'h1' },
            { title: 'H2 (Büyük)', value: 'h2' },
            { title: 'H3 (Orta)', value: 'h3' },
            { title: 'H4 (Küçük)', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'color',
                title: 'Text Color',
                type: 'object',
                fields: [
                  {
                    name: 'hex',
                    title: 'Hex Color',
                    type: 'string',
                    description: 'Örn: #ff5540 veya red',
                  },
                ],
              },
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ],
          },
        },
        { 
          type: 'image', 
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'fullWidth',
              type: 'boolean',
              title: 'Full Width Display',
              initialValue: false
            }
          ]
        },
        {
          name: 'youtube',
          type: 'object',
          title: 'YouTube Video',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube Video URL'
            }
          ]
        },
        {
          name: 'break',
          type: 'object',
          title: 'Separator Line',
          fields: [
            {
              name: 'style',
              type: 'string',
              title: 'Line Style',
              options: {
                list: [
                  { title: 'Thin Line', value: 'thin' },
                  { title: 'Neon Glow', value: 'neon' },
                ]
              }
            }
          ]
        }
      ],
    },
    {
      name: 'seo',
      title: 'SEO Ayarları',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Başlığı', type: 'string' },
        { name: 'metaDescription', title: 'Meta Açıklaması', type: 'text' },
      ],
    },
  ],
};
