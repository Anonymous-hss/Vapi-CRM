### Complete Developer Guide for CRM System with Vapi AI Voice Integration

## 1. Getting Started with the Project

### Prerequisites

- Node.js (v16+)
- PostgreSQL database
- Google Cloud account (for Google Sheets API)
- Vapi account (for AI voice integration)

### Initial Setup

1. **Clone the repository**:

```bash
git clone <repository-url>
cd crm-system
```

2. **Install frontend dependencies**:

```bash
npm install
```

3. **Install backend dependencies**:

```bash
cd backend
npm install
cd ..
```

4. **Set up the database**:

   - Create a PostgreSQL database
   - Update the `DATABASE_URL` in `backend/.env`

5. **Run database migrations**:

```bash
cd backend
npx prisma migrate dev --name init
cd ..
```

6. **Create a Google Cloud project and enable Google Sheets API**:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Sheets API
   - Create a service account and download the JSON key file

7. **Set up environment variables**:

**backend/.env**:

```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/crm_database?schema=public"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="1d"
JWT_REFRESH_SECRET="your-jwt-refresh-secret"
JWT_REFRESH_EXPIRES_IN="7d"
GOOGLE_APPLICATION_CREDENTIALS="path/to/your/credentials.json"
GOOGLE_SHEET_ID="your-google-sheet-id"
GOOGLE_SHEET_NAME="Sheet1"
VAPI_API_KEY="your-vapi-api-key"
VAPI_WEBHOOK_SECRET="your-vapi-webhook-secret"
```

**frontend/.env.local**:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 2. Creating the First Admin User

Use any of the following methods:

### Method 1: API

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@example.com","password":"password123","role":"ADMIN"}'
```

### Method 2: Prisma Studio

```bash
cd backend
npx prisma studio
```

### Method 3: Seed Script

Create `backend/prisma/seed.ts` with hashed password logic, and add this to `package.json`:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Then run:

```bash
npx prisma db seed
```

## 3. API Endpoint Checks

**Auth:**

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

**Customers:**

- GET/POST `/api/customers`
- GET `/api/customers/:id`

**Appointments:**

- GET/POST `/api/appointments`
- GET `/api/appointments/:id`

**Voice Calls:**

- GET/POST `/api/voice-calls`
- GET `/api/voice-calls/:id`

**Google Sheet:**

- POST `/api/google-sheet/configure`
- POST `/api/google-sheet/sync`
- GET `/api/google-sheet/status`

**Dashboard:**

- GET `/api/stats/dashboard`

**Vapi Webhooks:**

- POST `/api/vapi/webhook/call-started`
- POST `/api/vapi/webhook/call-ended`
- POST `/api/vapi/webhook/transcription`
- POST `/api/vapi/webhook/appointment`

## 4. Frontend Integration

1. Run the frontend:

```bash
npm run dev
```

2. Navigate to `http://localhost:3000/login`
3. Login with `admin@example.com / password123`
4. Check if all pages load real-time data.

## 5. Adding First Data Entry

### Option 1: Frontend UI

- Customers page > Add Customer

### Option 2: Google Sheet

1. Structure:

```csv
name,email,phone,status,source,notes
John Smith,john@example.com,+1234567890,New,Website,Interested
```

2. Share sheet with service account
3. Trigger sync from CRM UI

## 6. Setting Up First AI Call

1. Sign up at [Vapi](https://vapi.ai)
2. Get API Key and add to `.env`
3. Set Webhook URLs (via Ngrok during dev)
4. Configure agent on Vapi
5. Use CRM UI to trigger call

## 7. Removing Dummy Data

Ensure your dashboard components fetch real data via:

- `/api/stats/dashboard`
- `/api/customers`
- `/api/appointments`
- `/api/voice-calls`

## 8. Developer Docs

### Structure

```plaintext
crm-system/
├── app/
├── components/
├── lib/
├── backend/
│   ├── prisma/
│   ├── src/
│   └── .env
├── .env.local
└── package.json
```

### Key Tech Stack

- Next.js (App Router)
- Express.js
- Prisma + PostgreSQL
- Vapi AI
- Google Sheets API
- JWT Auth
- Shadcn UI

---

This guide will help devs quickly get up and running with a full-featured CRM integrated with voice automation and spreadsheet sync. Keep your `.env` secrets safe!
