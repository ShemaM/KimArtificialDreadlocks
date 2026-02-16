"use client";

import { useState } from "react";
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatBookingDate } from "@/lib/utils";
import { createBooking } from "@/actions/booking";
import type { BookingFormData } from "@/types";

// Services for the dropdown - will be replaced with data from Payload CMS
const services = [
  { id: "1", title: "Artificial Dreadlocks", category: "Hair" },
  { id: "2", title: "Box Braids", category: "Hair" },
  { id: "3", title: "Cornrows & Patterns", category: "Hair" },
  { id: "4", title: "Twists & Locs", category: "Hair" },
  { id: "5", title: "Nail Art & Extensions", category: "Nails" },
  { id: "6", title: "Pedicure Services", category: "Nails" },
  { id: "7", title: "Hair Treatments", category: "Other" },
  { id: "8", title: "Wig Services", category: "Hair" },
];

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: "",
    email: "",
    phone: "",
    serviceId: "",
    bookingDate: "",
    bookingTime: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the server action to create the booking
      const result = await createBooking(formData);

      if (result.success) {
        // Show success toast
        toast.success("Booking submitted successfully!", {
          description: `Your appointment for ${formatBookingDate(formData.bookingDate)} has been received.`,
        });
        setIsSubmitted(true);
      } else {
        toast.error("Failed to submit booking", {
          description: result.message,
        });
      }
    } catch {
      toast.error("Failed to submit booking", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  if (isSubmitted) {
    return (
      <section className="py-20 min-h-[80vh] flex items-center bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full gradient-pink flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-charcoal mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-charcoal-light mb-6">
              Thank you, <span className="font-semibold">{formData.customerName}</span>! Your appointment request has been submitted successfully.
            </p>
            <div className="bg-cream rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-charcoal mb-4">Booking Details:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-pink" />
                  <span>{formatBookingDate(formData.bookingDate)}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-pink" />
                  <span>{services.find(s => s.id === formData.serviceId)?.title}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-pink" />
                  <span>{formData.email}</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-charcoal-light mb-6">
              We will contact you shortly to confirm your appointment. A confirmation has been sent to your email and WhatsApp.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Book Another Appointment
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-light/30 text-pink font-medium text-sm mb-4">
              Book Now
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-6">
              Schedule Your Appointment
            </h1>
            <p className="text-lg text-charcoal-light">
              Ready for your transformation? Fill out the form below to book your appointment. We&apos;ll confirm your booking via email and WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card variant="elevated" padding="lg">
                <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6">
                  Booking Details
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="customerName"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                        <input
                          type="text"
                          id="customerName"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:bg-white focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:bg-white focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone & Service Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+254 7XX XXX XXX"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:bg-white focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all"
                        />
                      </div>
                      <p className="text-xs text-charcoal-light mt-1">
                        Include country code (e.g., +254)
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="serviceId"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Select Service *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                        <select
                          id="serviceId"
                          name="serviceId"
                          value={formData.serviceId}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:bg-white focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Choose a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.title} ({service.category})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="bookingDate"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                        <input
                          type="date"
                          id="bookingDate"
                          name="bookingDate"
                          value={formData.bookingDate}
                          onChange={handleChange}
                          required
                          min={today}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:bg-white focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="bookingTime"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
                        <input
                          type="time"
                          id="bookingTime"
                          name="bookingTime"
                          value={formData.bookingTime}
                          onChange={handleChange}
                          required
                          min="08:00"
                          max="20:00"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:bg-white focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Operating Hours Info */}
                  <div className="bg-cream rounded-xl p-4">
                    <div className="flex items-start gap-2 text-charcoal-light">
                      <Clock className="w-5 h-5 text-pink flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-charcoal mb-1">Operating Hours:</p>
                        <p>Mon-Sat: 8:00 AM – 8:00 PM</p>
                        <p className="text-xs mt-1">Sundays: Special Requests & Emergencies Only (Please call to confirm)</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-charcoal mb-2"
                    >
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your preferred style, any specific requests, or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/50 focus:bg-white focus:border-pink focus:ring-2 focus:ring-pink/20 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Book Appointment"}
                    </Button>
                    
                    <a href="tel:+254716867526" className="w-full">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        Urgent? Call Us Directly
                      </Button>
                    </a>
                  </div>

                  <p className="text-xs text-center text-charcoal-light">
                    By submitting this form, you agree to receive booking confirmation via email and WhatsApp.
                  </p>
                </form>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card variant="elevated" padding="md">
                <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
                  Need Help?
                </h3>
                <p className="text-sm text-charcoal-light mb-4">
                  Have questions about our services or need to make changes to an existing booking?
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+254716867526"
                    className="flex items-center gap-3 text-charcoal hover:text-pink transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-light/30 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-pink" />
                    </div>
                    <span className="font-medium">+254 716 867 526</span>
                  </a>
                  <a
                    href="mailto:shemamanase992@gmail.com"
                    className="flex items-center gap-3 text-charcoal hover:text-pink transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-light/30 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-pink" />
                    </div>
                    <span className="font-medium text-sm">shemamanase992@gmail.com</span>
                  </a>
                </div>
              </Card>

              {/* Why Book Card */}
              <Card variant="elevated" padding="md" className="gradient-pink-soft">
                <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
                  Why Book With Us?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Expert stylists with 5+ years experience",
                    "Premium quality products & materials",
                    "Instant WhatsApp confirmation",
                    "Flexible scheduling options",
                    "Satisfaction guaranteed",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-charcoal-light">
                      <CheckCircle2 className="w-5 h-5 text-pink flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
