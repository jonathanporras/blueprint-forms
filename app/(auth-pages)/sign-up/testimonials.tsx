import React from "react";

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah W.",
    title: "Landlord, Oakland CA",
    quote:
      "QuickForm Pro saved me hours of paperwork. I had my lease signed and sent in minutes!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Jason M.",
    title: "Real Estate Investor, San Francisco",
    quote: "The sign-up process was seamless, and the templates are incredibly helpful.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily R.",
    title: "Property Manager, Chicago",
    quote:
      "I've tried several platforms, but QuickForm Pro is the fastest and most intuitive by far.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const StarRating = () => (
  <div className="flex mb-2">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.626a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.157 2.293a1 1 0 00-.364 1.118l1.18 3.63c.3.922-.755 1.688-1.54 1.118l-3.162-2.293a1 1 0 00-1.176 0L6.41 16.112c-.784.57-1.838-.196-1.539-1.118l1.18-3.63a1 1 0 00-.364-1.118L2.53 8.053c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.178-3.626z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-3xl mx-auto mt-16">
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.title}</p>
                <StarRating />
              </div>
            </div>
            <p className="text-gray-700 italic">&ldquo;{t.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
}
