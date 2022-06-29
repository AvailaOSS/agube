export const environment = {
    production: true,
    appName: 'Agube',
    googleMapsApiKey: '',
    // docker-compose.yml contains port config
    authBackendUrl: 'http://localhost:30004/api/v1.0.0/auth',
    subscriptionBackendUrl: 'http://localhost:30001/api/v1.0.0/subscription',
    contactBookBackendUrl: 'http://localhost:30002/api/v1.0.0/contact-book',
    agubeBackendUrl: 'http://localhost:30003/api/v1.0.0/agube',
    // taskBackendUrl: 'http://localhost:8004/api/v1/task',
};
