import React from 'react';
import { defineConfig, Studio } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from '../sanity/schemas';

const config = defineConfig({
  name: 'hermosa-studio',
  title: 'Hermosa Admin',
  basePath: '/admin',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'fk2dw421',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('İçerik Yönetimi')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Genel Site Ayarları')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            
            S.divider(),
            
            // Regular types
            S.documentTypeListItem('artist').title('Sanatçılar'),
            S.documentTypeListItem('event').title('Etkinlikler'),
            S.documentTypeListItem('blog').title('Blog Yazıları'),
            S.documentTypeListItem('service').title('Hizmetler'),
            S.documentTypeListItem('page').title('Özel Sayfalar'),
            S.documentTypeListItem('video').title('Videolar'),
            
            S.divider(),
            
            // Singletons for pages
            S.listItem()
              .title('Ajans Sayfası İçeriği')
              .id('agencySettings')
              .child(S.document().schemaType('agencySettings').documentId('agencySettings')),
            S.listItem()
              .title('Hakkımızda Sayfası İçeriği')
              .id('aboutSettings')
              .child(S.document().schemaType('aboutSettings').documentId('aboutSettings')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px' }}>
          <div style={{ 
            backgroundColor: '#ff5540', 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            color: 'white',
            boxShadow: '0 0 15px rgba(255, 85, 64, 0.4)'
          }}>H</div>
          <span style={{ 
            fontWeight: '800', 
            color: 'white', 
            letterSpacing: '1px',
            fontSize: '14px',
            textTransform: 'uppercase'
          }}>Hermosa Panel</span>
        </div>
      )
    }
  }
});

const Admin: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Studio config={config} />
    </div>
  );
};

export default Admin;

