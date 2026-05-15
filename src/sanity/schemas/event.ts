import type { Rule } from 'sanity';

export default {
  name: 'event',
  title: 'Etkinlikler',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'date',
      title: 'Date and Time',
      type: 'datetime',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Event Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
    },
    {
      name: 'isPast',
      title: 'Past Event?',
      type: 'boolean',
      description: 'Mark this if the event has already ended.',
      initialValue: false,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'metaTitle',
      title: 'SEO: Meta Title',
      type: 'string',
    },
    {
      name: 'metaDescription',
      title: 'SEO: Meta Description',
      type: 'text',
    },
  ],
};
