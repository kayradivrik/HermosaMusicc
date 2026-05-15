import type { Rule } from 'sanity';

export default {
  name: 'siteSettings',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Başlığı',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'platformTitle',
      title: 'Platform Dynamics Title',
      type: 'string',
    },
    {
      name: 'platformSubtitle',
      title: 'Platform Dynamics Subtitle',
      type: 'text',
    },
    {
      name: 'bentoArtist',
      title: 'Bento: Artist Card',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string' },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'link', title: 'Target Link (e.g. /artists)', type: 'string' },
      ]
    },
    {
      name: 'bentoEvent',
      title: 'Bento: Event Card',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string' },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'link', title: 'Target Link (e.g. /events)', type: 'string' },
      ]
    },
    {
      name: 'bentoService',
      title: 'Bento: Service Card',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'link', title: 'Target Link (e.g. /services)', type: 'string' },
      ]
    },
    {
      name: 'bentoAgency',
      title: 'Bento: Agency Card',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'link', title: 'Target Link (e.g. /agency)', type: 'string' },
      ]
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'tiktokUrl',
      title: 'TikTok URL',
      type: 'url',
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    },
    {
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'twitterUrl',
      title: 'X (Twitter) URL',
      type: 'url',
    },
    {
      name: 'showExploreButton',
      title: 'Show Explore Button on Home Page',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'navItems',
      title: 'Navigation Bar Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'path', title: 'Path (e.g. /artists or https://...)', type: 'string' },
          ]
        }
      ]
    },
    {
      name: 'siteLogo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'siteFavicon',
      title: 'Site Favicon (PNG/ICO)',
      type: 'image',
    },
    {
      name: 'agencyLinks',
      title: 'Agency Section Links',
      type: 'object',
      fields: [
        { name: 'artistLink', title: 'Artist Grid Link', type: 'string', initialValue: '/artists' },
        { name: 'eventLink', title: 'Event Grid Link', type: 'string', initialValue: '/events' },
        { name: 'serviceLink', title: 'Service Grid Link', type: 'string', initialValue: '/services' },
        { name: 'agencyLink', title: 'Agency Grid Link', type: 'string', initialValue: '/agency' },
      ]
    },
    {
      name: 'videoPageTitle',
      title: 'Video Sayfası Başlığı',
      type: 'string',
      description: 'Varsayılan: Visual Stage',
    },
    {
      name: 'videoPageSubtitle',
      title: 'Video Sayfası Açıklaması',
      type: 'text',
      description: 'Varsayılan: Immersive music videos and exclusive performances from the Hermosa ecosystem.',
    },
    {
      name: 'footerDescription',
      title: 'Footer Şirket Açıklaması',
      type: 'text',
      description: 'Varsayılan: A high-energy entertainment platform rising from the dark...'
    },
    {
      name: 'footerLinks',
      title: 'Footer Linkleri (Privacy, Terms, vb.)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Link Yazısı', type: 'string' },
            { name: 'url', title: 'Link URL', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'contactPageTitle',
      title: 'İletişim Sayfası Başlığı',
      type: 'string',
      description: 'Varsayılan: CONTACT US'
    },
    {
      name: 'contactPageSubtitle',
      title: 'İletişim Sayfası Alt Başlığı',
      type: 'text',
      description: 'Varsayılan: Fill out the form below to contact our agency...'
    },
    {
      name: 'contactAddress',
      title: 'Merkez Adresi',
      type: 'string',
      description: 'Varsayılan: Istanbul, Turkey'
    },
    {
      name: 'contactMapImage',
      title: 'İletişim Harita Görseli',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'artistsPageTitle',
      title: 'Sanatçılar Sayfası Başlığı',
      type: 'string',
      description: 'Varsayılan: ARTISTS'
    },
    {
      name: 'eventsPageTitle',
      title: 'Etkinlikler Sayfası Başlığı',
      type: 'string',
      description: 'Varsayılan: EVENTS'
    },
    {
      name: 'blogPageTitle',
      title: 'Blog Page Title',
      type: 'string',
      initialValue: 'BLOGS',
    },
    {
      name: 'servicesPageTitle',
      title: 'Services Page Title',
      type: 'string',
      initialValue: 'OUR SERVICES',
    },
    {
      name: 'seo',
      title: 'Global SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Global Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Global Meta Description', type: 'text' },
        { name: 'keywords', title: 'Global Keywords', type: 'string' },
        { name: 'shareImage', title: 'Default Social Share Image', type: 'image' },
      ]
    }
  ],
};
