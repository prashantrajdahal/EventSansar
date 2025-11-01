import { Schema, model, models, Document, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          // Standard email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create index on eventId for faster queries when fetching bookings by event
BookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook to validate that the referenced Event exists
 * - Prevents orphaned bookings by ensuring eventId references a valid event
 * - Only performs check when eventId is new or modified
 */
BookingSchema.pre('save', async function (next) {
  // Only validate if eventId is new or modified
  if (this.isModified('eventId')) {
    try {
      // Import Event model dynamically to avoid circular dependency issues
      const Event = models.Event || (await import('./event.model')).default;
      
      // Check if the event exists
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        return next(
          new Error('Cannot create booking: Event does not exist')
        );
      }
    } catch (error) {
      return next(
        new Error(`Event validation failed: ${(error as Error).message}`)
      );
    }
  }

  next();
});

// Use existing model if it exists (prevents OverwriteModelError in development)
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
