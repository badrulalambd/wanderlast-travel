# 🌍 Wanderlast Travel
### Discover Historic Destinations. Plan Your Next Adventure.
Wanderlast Travel is a full-stack travel booking web application that helps travelers explore historical destinations, discover travel packages, and manage their reservations. Users can browse available destinations, view package details, book trips, and manage their bookings through a simple, responsive interface.

The platform also allows authorized users to add new destination packages with detailed information, images, travel durations, and pricing. Built with Next.js, Node.js, Express.js, MongoDB, and Better Auth, Wanderlast Travel combines modern web technologies to deliver a convenient travel booking experience.
### 🔗 Project Links
- Live Website: [Wanderlast Travel](https://wanderlast-frontend-nine.vercel.app/)
- Backend Repository: [wanderlast-travel-server](https://github.com/badrulalambd/wanderlast-travel-server)

<img width="1000" height="700" alt="wanderlast-travel" src="https://github.com/user-attachments/assets/8095c35c-442d-4fc7-b4da-bb4d846fe764" />

# 🛠️ Technologies Used
### Frontend
- **Next.js** — React framework for application development, routing, and rendering.
- **React** — Building interactive and reusable UI components.
- **TypeScript** — Improving code reliability with static type checking.
- **Tailwind CSS** — Creating responsive layouts and modern styling.
- **shadcn/ui** — Building reusable and customizable interface components.
- **Lucide React** — Providing icons for interface elements.
### Backend
- **Node.js** — JavaScript runtime for server-side development.
- **Express.js** — Building RESTful APIs and handling HTTP requests.
- **MongoDB** — Storing destination packages and booking information.
- **Better Auth** — Managing user authentication, sessions, sign-up, and sign-in.
- 
# ✨ Key Features
### 1. 🏛️ Explore Historical Destinations
- Browse available travel packages on the Home and Destinations pages.
- Discover historical places and travel opportunities.
- View destination images, descriptions, prices, and travel information.
- Explore destinations through a clean and responsive interface.
### 2. ➕ Add Destination Packages
- Allow authorized users to create new travel packages.
- Add destination names, countries, categories, prices, durations, images, and descriptions.
- Submit destination information through the backend API.
- Store destination data in MongoDB.
### 3. 🔐 Authentication and Protected Routes
- Register an account and sign in using Better Auth.
- Sign out of the application.
- Restrict protected pages to authenticated users.
- Protect destination details, destination creation, and booking management.
### 4. 🧳 Book Travel Packages
- Access detailed destination information after signing in.
- Book preferred travel packages from their detail pages.
- Save booking information to the backend.
- Associate bookings with the relevant user account.
### 5. 📋 Manage and Cancel Bookings
- View personal reservations on the My Bookings page.
- Review booked destinations and package details.
- Cancel existing bookings when needed.
- Manage reservations through backend API operations.

**Access control:** Visitors can browse the Home and Destinations pages without signing in. Authentication is required for destination details, adding packages, and managing bookings. Booking cancellation should be restricted to the owner of the booking.

# 📦 Dependencies Used
### Frontend Dependencies
```bash
next, react, react-dom, better-auth, @better-auth/mongo-adapter, mongodb, shadcn, @shadcn/react, @base-ui/react, class-variance-authority, cmdk, cn, date-fns, dotenv, embla-carousel-react, input-otp, lucide-react, react-day-picker, react-resizable-panels, recharts, shiki, tw-animate-css
```

### Backend Dependencies
```bash
express, mongodb, jose, cors, dotenv
```

# 💻 How to Run the Project Locally
Follow these instructions to set up and run Wanderlast Travel on your local machine.

### 1. Clone the Repositories

**Frontend**
```bash
git clone https://github.com/badrulalambd/wanderlast-travel.git
cd wanderlast-travel
npm install
```

**Backend**
Open a new terminal and run
```bash
git clone https://github.com/badrulalambd/wanderlast-travel-server.git
cd wanderlast-travel-server
npm install
```

### 2. Configure Environment Variables
Create a .env file in the frontend root directory:
```bash
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_url
NEXT_PUBLIC_DESTINATIONS_API_BASE_URL=http://localhost:5000
```

Create a .env file in the backend root directory:
```bash
CLIENT_URL=http://localhost:3000
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
```

Replace the placeholder values with your own credentials. Keep your secrets private and never commit .env files to GitHub.

### 3. Start the Backend Server

From the backend project directory, run:
```bash
npm start
```

Make sure your backend package.json defines the appropriate start script.

### 4. Start the Frontend Application

From the frontend project directory, run:
```bash
npm run dev
```

### 5. Open the Application

**Visit http://localhost:3000** in your browser to access Wanderlast Travel.




