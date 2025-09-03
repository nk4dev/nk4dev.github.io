import { createClient } from 'microcms-js-sdk';

const client = createClient({
    serviceDomain: 'nknighta-github',
    apiKey: process.env.CMS_API_KEY,
});

export default client;