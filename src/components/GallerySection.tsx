import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % EVENT_CONFIG.gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + EVENT_CONFIG.gallery.length) % EVENT_CONFIG.gallery.length
      );
    }
  };

  return (
    <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMUNITY &amp; CAMPUS MOMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA]">
              Moments of Connection
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] mt-3 max-w-2xl font-light">
              Visual glimpses of campus spaces, mentorship dialogues, and the enduring spirit of Shalom Hills International School.
            </p>
          </div>
          <div className="text-xs text-[#71717A] md:text-right">
            Click on any image to open the editorial gallery view
          </div>
        </div>

        {/* Gallery Grid (Mixed Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CONFIG.gallery.map((item, index) => {
            const isWide = index === 0 || index === 3;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative rounded-lg overflow-hidden border border-white/10 bg-[#121214] cursor-pointer shadow-lg hover:border-[#C9A227]/50 transition-all duration-300 ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

                  {/* Hover icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#080808]/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#FAFAFA] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#C9A227]" />
                  </div>

                  {/* Caption bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A227]">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif-editorial font-bold text-[#FAFAFA] mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] mt-1 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-[#71717A]">
          *Visual representations illustrate campus life and mentorship environments. Official photo records from 14 Nov 2026 will be archived here post-event.
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-[#FAFAFA] flex items-center justify-center transition-colors cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-[#FAFAFA] flex items-center justify-center transition-colors cursor-pointer z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-[#FAFAFA] flex items-center justify-center transition-colors cursor-pointer z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[90vh] flex flex-col items-center"
          >
            <img
              src={EVENT_CONFIG.gallery[activeLightboxIndex].src}
              alt={EVENT_CONFIG.gallery[activeLightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-2xl border border-white/10"
            />
            <div className="mt-6 text-center max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A227]">
                {EVENT_CONFIG.gallery[activeLightboxIndex].category}
              </span>
              <h4 className="text-xl font-serif-editorial font-bold text-[#FAFAFA] mt-1">
                {EVENT_CONFIG.gallery[activeLightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-2">
                {EVENT_CONFIG.gallery[activeLightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
