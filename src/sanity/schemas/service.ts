import type { Rule } from 'sanity';

export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears (e.g. 1, 2, 3)',
    }
  ],
};
