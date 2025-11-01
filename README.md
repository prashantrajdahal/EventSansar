# Event Management Platform

A modern event management platform built with Next.js, TypeScript, and MongoDB. This application allows users to browse events and make bookings with a fully type-safe backend architecture.

## 🚀 Features

- **Event Management**: Create, view, and manage events with detailed information
- **Smart Booking System**: Book events with email validation and duplicate prevention
- **SEO-Friendly URLs**: Auto-generated slugs from event titles
- **Real-time Validation**: Pre-save hooks ensure data integrity
- **Type Safety**: Full TypeScript coverage across the entire application
- **Optimized Database**: Indexed queries for fast performance
- **Modern UI**: Built with Tailwind CSS and Lucide icons

## 📋 Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Analytics**: PostHog
- **UI Utilities**: clsx, class-variance-authority, tailwind-merge

## 📁 Project Structure

```
event-dev/
├── database/
│   ├── event.model.ts      # Event schema with slug generation
│   ├── booking.model.ts    # Booking schema with validation
│   └── index.ts            # Model exports
├── lib/
│   └── mongodb.ts          # MongoDB connection with caching
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/event-dev
   # or use MongoDB Atlas
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/event-dev
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Database Models

### Event Model

The `Event` model represents events with the following features:

- **Auto-generated slugs**: URL-friendly slugs created from event titles
- **Date normalization**: Dates stored in ISO format (YYYY-MM-DD)
- **Time validation**: 24-hour time format (HH:MM)
- **Mode validation**: Enum constraint (online, offline, hybrid)

**Fields:**
- `title`, `slug`, `description`, `overview`
- `image`, `venue`, `location`
- `date`, `time`, `mode`
- `audience`, `organizer`
- `agenda` (array), `tags` (array)
- `createdAt`, `updatedAt` (auto-generated)

### Booking Model

The `Booking` model handles event registrations with:

- **Event validation**: Ensures referenced events exist before booking
- **Email validation**: Regex-based email format checking
- **Indexed queries**: Fast lookups by event ID

**Fields:**
- `eventId` (reference to Event)
- `email`
- `createdAt`, `updatedAt` (auto-generated)

## 💻 Usage Examples

### Import Models

```typescript
import { Event, Booking } from '@/database';
import type { IEvent, IBooking } from '@/database';
```

### Connect to Database

```typescript
import connectDB from '@/lib/mongodb';

// In API routes or server components
await connectDB();
```

### Create an Event

```typescript
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';

await connectDB();

const event = await Event.create({
  title: 'React Conference 2025',
  description: 'Annual React developers conference',
  overview: 'Join us for talks, workshops, and networking',
  image: '/images/react-conf.jpg',
  venue: 'Tech Convention Center',
  location: 'San Francisco, CA',
  date: '2025-06-15',
  time: '09:00',
  mode: 'hybrid',
  audience: 'React developers and enthusiasts',
  agenda: ['Keynote', 'Technical Sessions', 'Networking'],
  organizer: 'React Community',
  tags: ['react', 'javascript', 'web-development']
});

// Slug is auto-generated: "react-conference-2025"
```

### Create a Booking

```typescript
import connectDB from '@/lib/mongodb';
import { Booking } from '@/database';

await connectDB();

const booking = await Booking.create({
  eventId: event._id,
  email: 'user@example.com'
});

// Validates that the event exists before creating
```

### Query Events

```typescript
// Find event by slug
const event = await Event.findOne({ slug: 'react-conference-2025' });

// Find upcoming events
const upcomingEvents = await Event.find({
  date: { $gte: new Date().toISOString().split('T')[0] }
}).sort({ date: 1 });

// Find events by tag
const reactEvents = await Event.find({ tags: 'react' });
```

### Query Bookings

```typescript
// Get all bookings for an event
const bookings = await Booking.find({ eventId: event._id });

// Count bookings
const bookingCount = await Booking.countDocuments({ eventId: event._id });
```

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Database Connection

The MongoDB connection is optimized for Next.js serverless environments:

- **Connection caching**: Reuses connections across requests
- **Hot-reload persistence**: Maintains connection during development
- **Error handling**: Automatic retry on connection failure
- **Serverless-ready**: Configured for Vercel and similar platforms

## 📝 Validation Rules

### Event Validation
- Title, description, and other text fields are trimmed
- Slug must be unique across all events
- Mode must be one of: `online`, `offline`, `hybrid`
- Agenda and tags must contain at least one item
- Date must be valid and is normalized to ISO format
- Time must be in HH:MM format (24-hour)

### Booking Validation
- Email must be valid format (example@domain.com)
- Event must exist in the database
- All fields are required

## 🚦 Best Practices

1. **Always connect to DB first**: Call `connectDB()` before any database operation
2. **Use TypeScript types**: Import `IEvent` and `IBooking` for type safety
3. **Handle errors**: Wrap database operations in try-catch blocks
4. **Index usage**: Leverage slug and eventId indexes for fast queries
5. **Environment variables**: Never commit `.env.local` to version control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🐛 Troubleshooting

### Connection Issues
- Verify `MONGODB_URI` in `.env.local`
- Check MongoDB server is running
- Ensure network access for MongoDB Atlas

### Model Errors
- Clear Next.js cache: `rm -rf .next`
- Restart development server
- Check for duplicate model registrations

### Type Errors
- Run `npm install` to ensure all types are installed
- Check TypeScript version compatibility

## 📧 Support

For questions or issues, please open an issue on the repository.

---

Built with ❤️ using Next.js and MongoDB
