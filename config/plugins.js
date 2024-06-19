module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
    translate: {
      enabled: true,
      config: {
        // Add the name of your provider here (for example 'deepl' for strapi-provider-translate-deepl or the full package name)
        provider: 'deepl',
        providerOptions: {
          // your API key - required and wil cause errors if not provided
          apiKey: '5d57ce1c-5833-4388-985c-85d77d842c17:fx',
          // use custom api url - optional
          apiUrl: 'https://api-free.deepl.com',
          // use custom locale mapping (for example 'en' locale is deprecated so need to choose between 'EN-GB' and 'EN-US')
          localeMap: {
          // use uppercase here!
          EN: 'EN-US',
          ES: 'ES',
        },
        // Which field types are translated (default string, text, richtext, components and dynamiczones)
        // Either string or object with type and format
        // Possible formats: plain, markdown, html (default plain)
        translatedFieldTypes: [
          'string',
          { type: 'text', format: 'plain' },
          { type: 'richtext', format: 'markdown' },
          'component',
          'dynamiczone',
        ],
        // If relations should be translated (default true)
        translateRelations: true,
        },
      },
    },
  });
