export const environment = {
  production: true,
  appName: "Agube",
  apiUrl: "http://localhost:4000",
  googleMapsApiKey: '',
  // docker-compose.yml contains port config
  authBackendUrl: "http://localhost:8000/api/v1/auth",
  subscriptionBackendUrl: "http://localhost:8001/api/v1/subscription",
  contactBookBackendUrl: "http://localhost:8002/api/v1/contact-book",
  agubeBackendUrl: "http://localhost:8003/api/v1/agube",
  taskBackendUrl: "http://localhost:8004/api/v1/task",
};
