

export default {
  name: 'agencySettings',
  title: 'Agency Page Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Agency Page Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Agency Page Description',
      type: 'text',
      description: 'The description text shown on the agency page.',
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
