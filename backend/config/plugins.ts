
export default ({ env }) => ({
  'google-auth': {
    enabled: true,
  },
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'noreply@senliteratura.com.br',
        defaultReplyTo: 'carolinaribeirodacol@gmail.com',
      },
    },
  },
});
