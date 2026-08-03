import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GlassCard } from './GlassCard';

export const DatePlannerModal: React.FC = () => {
  const { datePlannerOpen, setDatePlannerOpen, activeChatProfileId } = useAppStore();
  const [selectedVenue, setSelectedVenue] = useState('Le Meurice Alain Ducasse, Paris');
  const [selectedDate, setSelectedDate] = useState('2026-08-15');
  const [selectedTime, setSelectedTime] = useState('07:30 PM');
  const [submitted, setSubmitted] = useState(false);

  if (!datePlannerOpen) return null;

  const venues = [
    { name: 'Le Meurice Alain Ducasse', city: 'Paris', style: '3-Star Michelin Luxury Dining', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80' },
    { name: 'The Ritz Mayfair Terrace', city: 'London', style: 'Royal Champagne High Tea', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80' },
    { name: 'Villa d’Este Lakeside Private Pavilion', city: 'Lake Como', style: 'Romantic Private Waterfront Dinner', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=400&q=80' },
  ];

  const handlePropose = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDatePlannerOpen(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#0E453F] border border-[#D6A24A]/40 rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
        {/* Background glowing gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#D6A24A]/20 blur-3xl" />

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D6A24A]" />
            <h3 className="font-serif text-xl font-bold text-white">VIP Luxury Date Planner</h3>
          </div>
          <button
            onClick={() => setDatePlannerOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-scale-up">
            <CheckCircle2 className="w-16 h-16 text-[#D6A24A] animate-bounce" />
            <h4 className="font-serif text-2xl font-bold text-white mt-4">Invitation Sent</h4>
            <p className="text-xs text-emerald-200 mt-2 max-w-xs">
              Your personalized date invitation to <span className="text-[#D6A24A] font-semibold">{selectedVenue}</span> has been dispatched via Éternité Concierge.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <p className="text-xs text-gray-300">
              Propose an exclusive experience for your match. Our VIP Concierge manages reservations and security verification seamlessly.
            </p>

            {/* Select Venue */}
            <div>
              <label className="block text-xs font-semibold text-[#D6A24A] mb-2 uppercase tracking-wider">
                Select Michelin Venue
              </label>
              <div className="space-y-2">
                {venues.map((v) => (
                  <div
                    key={v.name}
                    onClick={() => setSelectedVenue(v.name)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      selectedVenue === v.name
                        ? 'border-[#D6A24A] bg-[#062E2A]/90 shadow-gold-glow'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <img src={v.image} alt={v.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white">{v.name}</h4>
                      <p className="text-[11px] text-gray-300">{v.city} • {v.style}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#D6A24A] mb-1">Date</label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs">
                  <Calendar className="w-4 h-4 text-[#D6A24A]" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-white focus:outline-none w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#D6A24A] mb-1">Time</label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs">
                  <Clock className="w-4 h-4 text-[#D6A24A]" />
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="bg-transparent text-white focus:outline-none w-full"
                  >
                    <option value="06:30 PM" className="bg-[#062E2A]">06:30 PM</option>
                    <option value="07:30 PM" className="bg-[#062E2A]">07:30 PM</option>
                    <option value="08:30 PM" className="bg-[#062E2A]">08:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handlePropose}
              className="w-full mt-3 py-3.5 rounded-full bg-gradient-to-r from-[#B88432] via-[#D6A24A] to-[#F8E8CD] text-[#062E2A] font-bold text-sm shadow-gold-halo hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-[#062E2A]" />
              Send Invitation via VIP Concierge
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
