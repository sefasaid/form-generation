# Form Assignment

A comprehensive dynamic form and survey management system built with modern web technologies. This application enables users to create complex, conditional forms with branching logic, real-time updates, and automated evaluation systems.

## 🚀 Features

### Form Management
- **Dynamic Form Builder**: Create forms with multiple step types (TEXT, NUMBER, RADIO, CHECKBOX, COMPUTED, FINAL)
- **Conditional Branching**: Define complex branching rules based on user answers with multiple operators (EQ, NEQ, GT, GTE, LT, LTE, INCLUDES, NOT_INCLUDES, COUNT_GTE)
- **Computed Steps**: Calculate values dynamically using JavaScript expressions based on previous answers
- **Form Versioning**: Support for form versioning to track changes over time
- **Optional Rules**: Define form-level optional rules that evaluate across multiple steps

### Evaluation System
- **Automated Evaluation**: Forms automatically evaluate user responses and provide results:
  - **ELIGIBLE**: User meets all criteria
  - **INELIGIBLE**: User does not meet requirements
  - **CLINICAL_REVIEW**: Requires manual review
- **Priority-based Rules**: Branch rules are evaluated by priority, allowing complex decision trees
- **Result Reasons**: Track specific reasons for evaluation outcomes

### Real-time Features
- **WebSocket Integration**: Real-time updates using Socket.IO for live form session management
- **Session Tracking**: Monitor form completion progress in real-time

### Admin Panel
- **Form Creation & Management**: Full CRUD operations for forms via admin interface
- **Session Management**: View and monitor all form sessions
- **Authentication**: Secure admin access with JWT-based authentication

### User Experience
- **Responsive Design**: Mobile-first, responsive UI built with Tailwind CSS
- **Dark Mode**: Default in dark mode, light mode fully sported
- **Modern UI**: Clean, intuitive interface with smooth transitions

## 🛠️ Tech Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: Latest React version
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Sonner**: Toast notifications
- **Socket.IO Client**: Real-time communication

### Backend
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe backend development
- **Prisma**: Modern ORM for database management
- **PostgreSQL**: Relational database
- **Socket.IO**: WebSocket server for real-time features
- **Passport JWT**: Authentication strategy
- **bcrypt**: Password hashing

### Infrastructure & Tools
- **Nx**: Monorepo tooling and build system
- **Prisma**: Database schema management and migrations
- **Jest**: Testing framework
- **Cypress**: End-to-end testing
- **ESLint**: Code linting
- **Webpack**: Module bundling for API

## 📁 Project Structure

```
form/
├── apps/
│   ├── api/              # NestJS backend API
│   ├── frontend/         # Next.js frontend application
│   └── frontend-e2e/     # Cypress E2E tests
├── libs/
│   ├── nextFetch/        # Shared fetch utilities
│   └── prismaModule/     # Prisma client module
├── packages/
│   └── prisma-client-types/  # Prisma type generator
└── prisma/               # Database schema and migrations
```

## 🏃 Getting Started

### Prerequisites
- Node.js (v20+)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd form
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
# Configure your database connection in prisma/schema.prisma
# Then run migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

4. **Start the development servers**

```bash
# Start API server
nx serve api

# Start frontend (in another terminal)
nx dev frontend
```

The API will be available at `http://localhost:3001` (or configured port) and the frontend at `http://localhost:3001` (or configured port).

## 📚 How It Works

### Form Flow

1. **Form Creation**: Admins create forms with steps, options, and branching rules
2. **Session Start**: Users start a survey session, creating a new `FormSession`
3. **Step Navigation**: Users answer questions, and the system:
   - Validates answers
   - Evaluates branch rules
   - Computes computed steps
   - Determines next step or evaluation result
4. **Real-time Updates**: Changes are broadcast via WebSocket to connected clients
5. **Evaluation**: Forms automatically evaluate eligibility based on configured rules

### Branching Logic

Forms support complex conditional branching:
- **Step-level branches**: Each step can have multiple branch rules evaluated by priority
- **Operators**: Support for comparison operators (EQ, GT, LT, etc.) and array operations
- **Early termination**: Rules can end the form with INELIGIBLE or CLINICAL_REVIEW results
- **Dynamic navigation**: Next step determined by matching branch rules

### Computed Steps

Steps can compute values using JavaScript expressions:
```javascript
// Example: BMI calculation
step.computeExpr = "(weight / (height * height)) * 703"
```

The system provides access to previous answers via step keys in the expression context.

## 🔐 Authentication

Admin routes are protected with JWT authentication:
- Login endpoint: `POST /auth/login`
- Protected routes require `Authorization: Bearer <token>` header
- Admin guard validates JWT tokens

## 🧪 Testing

```bash
# Run unit tests
nx test api
nx test frontend

# Run E2E tests
nx e2e frontend-e2e
```

## 📝 API Endpoints

### Public Endpoints
- `GET /` - Get all active forms
- `GET /:id` - Get form by ID
- `POST /forms/start` - Start a new form session
- `GET /forms/session/:id` - Get session details
- `POST /forms/session/:id/answer` - Submit an answer

### Admin Endpoints (Protected)
- `GET /admin/forms` - List all forms
- `POST /admin/forms` - Create a new form
- `PUT /admin/forms/:key` - Update a form
- `GET /admin/forms/:key` - Get form by key
- `GET /admin/sessions` - List all sessions
- `GET /admin/sessions/:id` - Get session details

### Auth Endpoints
- `POST /auth/login` - Admin login

## 🌐 WebSocket Events

- **RELOAD**: Sent to clients when session state changes
- Socket ID is tracked for targeted message delivery

## 📦 Building for Production

```bash
# Build API
nx build api

# Build frontend
nx build frontend
```

## Other things to mention

- Created custom type builder for frontend. When using ```prisma generate``` it automatically builds prisma types for frontend to keep typesafe between projects. ( I tried using prisma browser but it doesn't contain nested fields)
- To create initial database use  ```prisma db seed```. It will create the form and user. Username and password is  ```admin```. But this is for test purposes only.
- In api I created custom decorator for getting sender socket id. that way only non sender socket will refresh the session.
- For testing with docker just create .env file (you can copy paste env.example) put the db url and run with  ```docker compose up -d```. 

