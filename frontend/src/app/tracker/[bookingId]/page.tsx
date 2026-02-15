"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Check, Clock, Scissors, Sparkles, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { BookingStatus } from "@/types";

interface BookingData {
  id: string;
  customerName: string;
  status: BookingStatus;
  bookingDate: string;
  service?: {
    title: string;
  };
}

// Status configuration for the tracker
const statusConfig: Record<
  BookingStatus,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  Pending: {
    label: "Pending Confirmation",
    icon: Clock,
    color: "text-yellow-500",
  },
  Accepted: {
    label: "Booking Accepted",
    icon: Check,
    color: "text-blue-500",
  },
  "In Progress": {
    label: "Service In Progress",
    icon: Scissors,
    color: "text-pink",
  },
  Served: {
    label: "Service Completed",
    icon: Sparkles,
    color: "text-green-500",
  },
  Declined: {
    label: "Booking Declined",
    icon: X,
    color: "text-red-500",
  },
};

const statusOrder: BookingStatus[] = [
  "Pending",
  "Accepted",
  "In Progress",
  "Served",
];

export default function BookingTrackerPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch initial booking data
  const fetchBooking = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("id, customerName, status, bookingDate, service:services(title)")
        .eq("id", bookingId)
        .single();

      if (error) throw error;

      if (data) {
        setBooking(data as unknown as BookingData);
        // Show review form if status is Served
        if (data.status === "Served") {
          setShowReviewForm(true);
        }
      }
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError("Unable to find this booking. Please check your booking ID.");
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  // Subscribe to realtime changes
  useEffect(() => {
    fetchBooking();

    // Set up realtime subscription
    const channel = supabase
      .channel(`booking-${bookingId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "bookings",
          filter: `id=eq.${bookingId}`,
        },
        (payload) => {
          const newStatus = payload.new.status as BookingStatus;
          setBooking((prev) =>
            prev
              ? {
                  ...prev,
                  status: newStatus,
                  customerName: payload.new.customerName || prev.customerName,
                }
              : null
          );

          // Show review form when status changes to Served
          if (newStatus === "Served") {
            setTimeout(() => setShowReviewForm(true), 1000);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId, fetchBooking]);

  // Submit review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: booking.id,
          customerName: booking.customerName,
          rating,
          comment,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      setReviewSubmitted(true);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get current status index for progress bar
  const getCurrentStatusIndex = () => {
    if (!booking) return -1;
    if (booking.status === "Declined") return -1;
    return statusOrder.indexOf(booking.status);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-charcoal-light">Loading your booking...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <Card variant="elevated" padding="lg" className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-charcoal mb-2">
            Booking Not Found
          </h1>
          <p className="text-charcoal-light mb-6">
            {error || "We couldn't find a booking with this ID."}
          </p>
          <Button onClick={() => (window.location.href = "/booking")}>
            Book an Appointment
          </Button>
        </Card>
      </div>
    );
  }

  // Show thank you + review form when served
  if (showReviewForm && !reviewSubmitted) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <Card variant="elevated" padding="lg" className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full gradient-pink flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">
                Thank You, {booking.customerName}!
              </h1>
              <p className="text-charcoal-light">
                We hope you loved your {booking.service?.title || "service"}!
                We&apos;d love to hear about your experience.
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  How would you rate your experience?
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transform transition-transform hover:scale-110"
                    >
                      <Star
                        className={cn(
                          "w-10 h-10 transition-colors",
                          star <= rating
                            ? "text-rasta-yellow fill-rasta-yellow"
                            : "text-gray-300"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-charcoal mb-2"
                >
                  Share your experience
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you loved about your visit..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-pink-light/50 focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={submitting}
              >
                Submit Review
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // Show thank you message after review submitted
  if (reviewSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-white px-4">
        <Card variant="elevated" padding="lg" className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">
            Thank You!
          </h1>
          <p className="text-charcoal-light mb-6">
            Your review has been submitted. We appreciate your feedback and look
            forward to seeing you again!
          </p>
          <Button onClick={() => (window.location.href = "/")}>
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  // Declined status view
  if (booking.status === "Declined") {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <Card variant="elevated" padding="lg" className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <X className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">
              Booking Declined
            </h1>
            <p className="text-charcoal-light mb-6">
              We&apos;re sorry, but we couldn&apos;t accommodate this booking.
              Please contact us or try booking a different time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+254716867526">
                <Button variant="outline">Call Us</Button>
              </a>
              <Button onClick={() => (window.location.href = "/booking")}>
                Book Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Main tracker view
  const currentIndex = getCurrentStatusIndex();

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
            Live Booking Tracker
          </span>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal mb-2">
            Hi, {booking.customerName}!
          </h1>
          <p className="text-charcoal-light">
            Track your {booking.service?.title || "booking"} status in real-time
          </p>
        </div>

        {/* Progress Tracker */}
        <Card variant="elevated" padding="lg" className="max-w-3xl mx-auto">
          {/* Current Status Badge */}
          <div className="text-center mb-8">
            <span
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-lg",
                "bg-gradient-to-r from-pink-light/30 to-pink-light/10"
              )}
            >
              {(() => {
                const config = statusConfig[booking.status];
                const Icon = config.icon;
                return (
                  <>
                    <Icon className={cn("w-6 h-6", config.color)} />
                    <span className={config.color}>{config.label}</span>
                  </>
                );
              })()}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full mx-8" />

            {/* Progress Line */}
            <div
              className="absolute top-8 left-0 h-1 gradient-pink rounded-full mx-8 transition-all duration-1000 ease-out"
              style={{
                width: `calc(${statusOrder.length > 1 ? (currentIndex / (statusOrder.length - 1)) * 100 : 0}% - 4rem)`,
              }}
            />

            {/* Status Steps */}
            <div className="relative flex justify-between">
              {statusOrder.map((status, index) => {
                const config = statusConfig[status];
                const Icon = config.icon;
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={status} className="flex flex-col items-center">
                    {/* Icon Circle */}
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                        isCompleted
                          ? "gradient-pink shadow-lg"
                          : "bg-gray-200",
                        isCurrent && "ring-4 ring-pink-light animate-pulse"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-7 h-7 transition-colors",
                          isCompleted ? "text-white" : "text-gray-400"
                        )}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={cn(
                        "mt-3 text-xs sm:text-sm font-medium text-center max-w-[80px]",
                        isCompleted ? "text-charcoal" : "text-charcoal-light"
                      )}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Message */}
          <div className="mt-12 p-4 bg-cream rounded-xl text-center">
            <p className="text-sm text-charcoal-light">
              {booking.status === "Pending" &&
                "Your booking is being reviewed. We'll confirm shortly!"}
              {booking.status === "Accepted" &&
                "Great news! Your booking is confirmed. See you soon!"}
              {booking.status === "In Progress" &&
                "Your service is underway. Sit back and relax!"}
              {booking.status === "Served" &&
                "Your service is complete. We hope you loved it!"}
            </p>
          </div>

          {/* Contact */}
          <div className="mt-6 text-center">
            <p className="text-sm text-charcoal-light mb-2">
              Questions? Contact us:
            </p>
            <a
              href="tel:+254716867526"
              className="text-pink font-medium hover:underline"
            >
              +254 716 867 526
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
