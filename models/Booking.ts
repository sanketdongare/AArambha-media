import mongoose, { Document, Model } from 'mongoose';

export interface IBooking extends Document {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    eventDate: Date;
    eventType: string;
    eventLocation?: string;
    packageSelected: 'bronze' | 'silver' | 'gold' | 'platinum' | 'pre-wedding-34000' | 'pre-wedding-16000';
    packagePrice: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    createdBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema = new mongoose.Schema<IBooking>(
    {
        customerName: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
        },
        customerEmail: {
            type: String,
            required: [true, 'Customer email is required'],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        customerPhone: {
            type: String,
            required: [true, 'Customer phone is required'],
            trim: true,
        },
        eventDate: {
            type: Date,
            required: [true, 'Event date is required'],
        },
        eventType: {
            type: String,
            required: [true, 'Event type is required'],
            trim: true,
        },
        eventLocation: {
            type: String,
            trim: true,
        },
        packageSelected: {
            type: String,
            required: [true, 'Package selection is required'],
            enum: ['bronze', 'silver', 'gold', 'platinum', 'pre-wedding-34000', 'pre-wedding-16000'],
        },
        packagePrice: {
            type: Number,
            required: [true, 'Package price is required'],
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'completed', 'cancelled'],
            default: 'pending',
        },
        notes: {
            type: String,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for better query performance
BookingSchema.index({ customerEmail: 1 });
BookingSchema.index({ eventDate: 1 });
BookingSchema.index({ status: 1 });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
