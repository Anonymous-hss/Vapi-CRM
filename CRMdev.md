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
- Create a project
- Enable Google Sheets API
- Create a service account and download the JSON key

7. **Set up environment variables**:

Backend (`backend/.env`):

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

Frontend (`.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 2. Creating the First Admin User

You can create the admin user via API, Prisma Studio, or a seed script.

### Seed Script

Create `backend/prisma/seed.ts`:

```ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Add to `package.json`:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Run it:

```bash
npx prisma db seed
```

## 3. API Endpoint Testing

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Customers

- `GET /api/customers`
- `POST /api/customers`

### Appointments

- `GET /api/appointments`
- `POST /api/appointments`

### Voice Calls

- `GET /api/voice-calls`
- `POST /api/voice-calls`

### Google Sheets

- `POST /api/google-sheet/configure`
- `POST /api/google-sheet/sync`
- `GET /api/google-sheet/status`

### Dashboard

- `GET /api/stats/dashboard`

## 4. Frontend Verification

1. Start frontend: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Log in and verify:
   - Dashboard loads
   - Customers list
   - Appointments and Voice Calls populate
   - Google Sheet integration connects

## 5. Adding Data

### Google Sheets Format

```csv
name,email,phone,status,source,notes
John,john@example.com,+1234567890,New,Website,Interested
Jane,jane@example.com,+0987654321,Active,Referral,Returning
```

### Sync Steps

- Share sheet with service account
- Connect in Settings > Integrations
- Click "Sync Now"

## 6. AI Call Setup

1. Sign up on [Vapi](https://vapi.ai)
2. Get API key
3. Add to `.env`
4. Configure webhooks:
   - `/api/vapi/webhook/call-started`
   - `/call-ended`, `/transcription`, `/appointment`
5. Make a test call via CRM UI

## 7. Removing Dummy Data

Make sure you're:

- Logged in
- Using real backend URL
- Backend is running
- Components use live endpoints

## 8. Developer Info

### Project Structure

```plaintext
crm-system/
├── app/
│   ├── customers/
│   ├── appointments/
│   ├── settings/
│   └── ...
├── components/
├── lib/
├── backend/
│   ├── prisma/
│   └── src/
└── .env.local
```

### Tech Stack

- Next.js 14
- Express.js
- Prisma + PostgreSQL
- Vapi AI
- Google Sheets API
