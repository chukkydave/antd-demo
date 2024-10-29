import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user.model";

export async function POST(req: Request) {
    try {
        // Log the connection attempt
        console.log('Attempting to connect to MongoDB...');
        await connectDB();
        console.log('Successfully connected to MongoDB');

        const { email, password, username } = await req.json();
        console.log('Received registration data:', { email, username }); // Don't log passwords

        // Validate input
        if (!email || !password || !username) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 12);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            username
        });

        const userWithoutPassword = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        return NextResponse.json(
            { user: userWithoutPassword, message: "User created successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        // Detailed error logging
        console.error('Registration error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
} 