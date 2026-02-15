import { NextRequest, NextResponse } from "next/server";

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3001/api";

interface ReviewPayload {
  bookingId: string;
  customerName: string;
  rating: number;
  comment: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ReviewPayload = await request.json();
    const { bookingId, customerName, rating, comment } = body;

    // Validate required fields
    if (!bookingId || !customerName || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Submit review to Payload CMS
    const response = await fetch(`${PAYLOAD_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booking: bookingId,
        customerName,
        rating,
        comment,
        isApproved: false, // Reviews start as unapproved
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Payload API error:", errorData);
      return NextResponse.json(
        { error: "Failed to submit review" },
        { status: 500 }
      );
    }

    const reviewData = await response.json();

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
      reviewId: reviewData.doc?.id,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
