# SHALOM FOOTPRINTS — Official Event Website

> **“They've Walked the Path. Now, They'll Help You Find Yours.”**  
> Alumni Mentorship & Guidance Event hosted by **Shalom Hills International School** on **14 November 2026**.

---

## 🚀 Deploying to Vercel

This project is built with **Vite + React + TypeScript + Tailwind CSS** and is pre-configured for instant zero-configuration deployment to [Vercel](https://vercel.com).

### Option A: Deploy via GitHub / GitLab / Bitbucket
1. Push this repository to GitHub or your preferred Git provider.
2. In the [Vercel Dashboard](https://vercel.com/new), click **"Add New Project"** and import the repository.
3. Vercel automatically detects the Vite framework settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `vite build` (or `npm run build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## ⚙️ Configuration & Content Updates

All event information, alumni profiles, schedule times, registration URLs, and FAQs are managed in a single central configuration file:

📁 **`src/config/eventConfig.ts`**

Key configurable items:
- `EVENT_CONFIG.schedule`: Event date, venue address, timing, and dress code.
- `EVENT_CONFIG.registration.externalUrl`: Direct registration link (e.g., your official Google Form or school portal).
- `EVENT_CONFIG.alumniProfiles`: List of alumni speakers and mentors, graduation cohorts, biographies, and mentorship domains.
- `EVENT_CONFIG.awardCategories`: Prize categories, nomination criteria, and honorees.
- `EVENT_CONFIG.faqs`: Frequently asked questions and answers.
- `EVENT_CONFIG.contact`: School desk email, helpline numbers, and Google Maps location URL.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
├── public/                 # Static assets copied directly to dist (images, favicon)
│   ├── favicon.svg
│   └── images/             # High-resolution campus and mentorship photography
├── src/
│   ├── components/         # Modular React UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── StorySection.tsx
│   │   ├── AlumniSection.tsx
│   │   ├── MentorshipSection.tsx
│   │   ├── EventHighlightsSection.tsx
│   │   ├── RecognitionSection.tsx
│   │   ├── JourneyTimelineSection.tsx
│   │   ├── EventDetailsSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── RegistrationSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── RegistrationModal.tsx
│   │   └── AlumniDetailModal.tsx
│   ├── config/             # Central event configuration
│   │   └── eventConfig.ts
│   ├── App.tsx             # Root application assembly
│   ├── index.css           # Tailwind CSS and gold/glass design tokens
│   └── main.tsx            # Application entrypoint
├── index.html              # HTML entrypoint with typography & OpenGraph tags
├── vercel.json             # Vercel SPA routing and caching headers
└── vite.config.ts          # Vite build configuration
```
