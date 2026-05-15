import type { Rule } from 'sanity';

export default {
  name: 'video',
  title: 'Videolar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Video Başlığı',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'artist',
      title: 'İlgili Sanatçı (Opsiyonel)',
      type: 'reference',
      to: [{ type: 'artist' }],
      description: 'Eğer bu bir sanatçı klibiyse buradan sanatçıyı seçebilirsiniz.'
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Music Video', value: 'music-video' },
          { title: 'Live Performance', value: 'live' },
          { title: 'Behind The Scenes', value: 'behind-the-scenes' },
          { title: 'Hermosa Original', value: 'original' },
        ]
      },
      initialValue: 'music-video'
    },
    {
      name: 'featured',
      title: 'Öne Çıkar (En Üstte Görünsün)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'releaseDate',
      title: 'Yayın Tarihi',
      type: 'date',
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artist.name',
    },
  },
};
