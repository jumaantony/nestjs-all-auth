import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      email1: "jumaantony@outlook.com",
      email2: "jumaantony840@gmail.com",
      password: "hellojuma@123",
      token: "eyJhbGciOiJIUzI1NiIsImtpZCI6IkRyajEvc1N3eThrQkV6S2giLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjk2NTc0NTc0LCJpYXQiOjE2OTU5Njk3NzQsImlzcyI6Imh0dHBzOi8vYmdhdG9xcG1heXpwbWhzYmxmb24uc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjJmOGYyYjFmLWQyYWItNGY4Yi1hOWIyLTZhYWI3YmM2MzI4YSIsImVtYWlsIjoianVtYWFudG9ueTg0MEBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY5NTk2OTc3NH1dLCJzZXNzaW9uX2lkIjoiMDc2ZTNmMzAtMzYzOS00M2FkLThjZTQtZjUzOWNiZDM0MDZlIn0.JNHZLBNTG4z_FD8H4abpQejJG7V9Twd7UBWUIs8GtOQ"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
