# Development Setup

## Prerequisites

- Java 17
- Maven
- PostgreSQL
- Node.js and npm/yarn for frontend

## Backend setup

1. Copy `.env.example` to `.env`
2. Update `.env` values if needed
3. Run backend from `serviceease-backend`:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
4. Open API docs:
   - http://localhost:9090/swagger-ui.html
   - http://localhost:9090/v3/api-docs

## Frontend setup

1. Install dependencies from `serviceease-frontend`
   ```bash
   cd serviceease-frontend
   npm install
   ```
2. Start the frontend
   ```bash
   npm run dev
   ```

## Notes

- Backend uses environment variables for secrets and database settings.
- Swagger UI helps inspect and test the API.
- Use `npm run build` in frontend before production deployment.
