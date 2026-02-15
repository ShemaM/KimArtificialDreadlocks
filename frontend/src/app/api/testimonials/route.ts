import { NextResponse } from "next/server";

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3001/api";

export async function GET() {
  try {
    // Fetch approved reviews from Payload CMS
    const response = await fetch(
      `${PAYLOAD_API_URL}/reviews?where[isApproved][equals]=true&limit=10&sort=-createdAt`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      // Return fallback static testimonials if Payload is not available
      return NextResponse.json({
        docs: [],
        fallbackToStatic: true,
      });
    }

    const data = await response.json();

    return NextResponse.json({
      docs: data.docs || [],
      totalDocs: data.totalDocs || 0,
      fallbackToStatic: false,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    // Return fallback response
    return NextResponse.json({
      docs: [],
      fallbackToStatic: true,
    });
  }
}
