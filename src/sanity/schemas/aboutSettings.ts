

export default {
  name: 'aboutSettings',
  title: 'About Page Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'About Page Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'About Page Subtitle',
      type: 'string',
      description: 'Varsayılan: Hermosa Music & Entertainment'
    },
    {
      name: 'content',
      title: 'About Page Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
};
