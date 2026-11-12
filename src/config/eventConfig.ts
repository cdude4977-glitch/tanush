/**
 * SHALOM FOOTPRINTS — CENTRAL EVENT CONFIGURATION
 * 
 * All changeable event details, registration links, alumni lists, schedule,
 * prizes, and FAQs are maintained here for single-source updates.
 */

import { REGISTERED_ALUMNI, RegisteredAlumnus } from '../data/registeredAlumni.ts';

export type AlumniProfile = RegisteredAlumnus;

export interface AwardCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  eligibility: string;
  criteria: string;
  recipientPlaceholder: string;
  status: 'Pending Official Announcement' | 'Nominations Open' | 'Confirmed';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isConfirmed: boolean;
}

export interface TimelineStage {
  step: string;
  title: string;
  tagline: string;
  description: string;
}

export const EVENT_CONFIG = {
  brand: {
    name: 'SHALOM FOOTPRINTS',
    eyebrow: 'SHALOM HILLS INTERNATIONAL SCHOOL PRESENTS',
    host: 'Shalom Hills International School',
    tagline: "They've Walked the Path. Now, They'll Help You Find Yours.",
    supportingTagline: 'Every journey leaves a footprint. Every footprint can guide a future.',
    closingQuote: "Your journey is your own. You don't have to walk it alone.",
    heroDescription:
      'An evening of alumni stories, meaningful mentorship, shared experiences, and possibilities for the future.',
  },

  schedule: {
    date: '14 November 2026',
    dayOfWeek: 'Saturday',
    time: '04:30 PM – 08:30 PM IST',
    timeNotice: 'Schedule subject to final confirmation by school organizing committee',
    venue: 'Shalom Hills International School',
    hall: 'Main Auditorium & Amphitheatre Courtyard',
    address: 'Block C, Sushant Lok Phase I, Sector 43, Gurugram, Haryana 122002',
    dressCode: 'Smart Formal / Business Casual',
    eligibility: 'Students of Grades 9–12, Parents, and Alumni of Shalom Hills International School',
    targetAudience: 'High school students seeking career direction and alumni eager to mentor',
  },

  registration: {
    // Official dummy link specified in prompt, easy to replace with Google Form or custom URL
    externalUrl: 'https://example.com/shalom-footprints-registration',
    deadlineNotice: 'Advance registration recommended to ensure reserved seating in mentorship clusters.',
    capacityNotice: 'Limited seating available across thematic alumni breakout rooms.',
  },

  story: {
    eyebrow: 'MORE THAN A REUNION',
    headline: 'Every Journey Leaves Something Behind.',
    bodyP1:
      'Every alumnus was once a student with questions, ambitions, and a future waiting to unfold. Today, having travelled their own paths, they return with experiences that cannot be found in textbooks alone.',
    bodyP2:
      'Shalom Footprints brings these journeys together, creating an opportunity for students to learn from the people who once stood where they stand today.',
    corePillars: [
      {
        word: 'Experience.',
        description: 'First-hand insights from navigating higher education, careers, and personal growth.',
      },
      {
        word: 'Guidance.',
        description: 'Candid perspectives that cut through academic ambiguity and industry noise.',
      },
      {
        word: 'Possibility.',
        description: 'Realizing that the path from classroom to life purpose is open, valid, and achievable.',
      },
    ],
  },

  mentorshipPillars: [
    {
      id: 'career-clarity',
      number: '01',
      title: 'Career Clarity',
      description:
        'Learn about emerging professional fields, non-linear career trajectories, and the true day-to-day realities of different global industries.',
      takeaways: ['Industry trends & future outlooks', 'University degree selection advice', 'Demystifying entrance exams & portfolios'],
    },
    {
      id: 'beyond-classroom',
      number: '02',
      title: 'Lessons Beyond the Classroom',
      description:
        'Hear first-hand experiences, setbacks embraced, decisive turning points, and hard-earned wisdom that textbooks cannot impart.',
      takeaways: ['Resilience in the face of uncertainty', 'Developing cross-functional leadership', 'Navigating college transitions smoothly'],
    },
    {
      id: 'community-gives-back',
      number: '03',
      title: 'A Community That Gives Back',
      description:
        'Build enduring bridges with alumni who deeply understand the Shalom ethos and are invested in empowering the generations that follow.',
      takeaways: ['Long-term mentorship networks', 'Alumni directory access', 'Peer-to-peer inspiration and solidarity'],
    },
  ],

  highlights: [
    {
      title: 'Alumni Conversations',
      description: 'Intimate fireside dialogues exploring pivotal choices, collegiate journeys, and real-world milestones.',
      metric: 'Keynote & Panels',
    },
    {
      title: 'Career Insights',
      description: 'Unfiltered deep-dives into Technology, Law, Healthcare, Creative Arts, Finance, and Public Administration.',
      metric: '10+ Domains',
    },
    {
      title: 'Mentorship & Guidance',
      description: 'Thematic breakout circles allowing students to ask candid questions in structured small groups.',
      metric: 'Roundtable Format',
    },
    {
      title: 'Shared Experiences',
      description: 'Reflective storytelling bridging the nostalgic halls of Shalom with present-day professional achievements.',
      metric: 'Intergenerational',
    },
    {
      title: 'Recognition & Prizes',
      description: 'Honoring exceptional alumni contributions and celebrating standout student initiatives and aspirations.',
      metric: 'Special Honors',
    },
    {
      title: 'Community Connections',
      description: 'High-value networking reception uniting students, proud parents, faculty mentors, and returning graduates.',
      metric: 'Alumni Network',
    },
  ],

  journeyStages: [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Reflect & Align',
      description: 'Identify your personal questions, target fields of study, and areas where seasoned guidance matters most.',
    },
    {
      step: '02',
      title: 'Register',
      tagline: 'Reserve Your Seat',
      description: 'Confirm attendance through the registration portal and submit your priority questions for the alumni panels.',
    },
    {
      step: '03',
      title: 'Connect',
      tagline: 'Meet the Mentors',
      description: 'Arrive at the campus auditorium to engage in keynote exchanges and find your sector-specific breakout pod.',
    },
    {
      step: '04',
      title: 'Learn',
      tagline: 'Unfiltered Dialogue',
      description: 'Participate in candid conversations, gain tactical advice, and demystify college and career crossroads.',
    },
    {
      step: '05',
      title: 'Celebrate',
      tagline: 'Honor the Legacy',
      description: 'Witness the awards ceremony, celebrate generational impact, and stay plugged into the lifelong Shalom network.',
    },
  ],

  awardCategories: [
    {
      id: 'award-mentorship',
      title: 'Excellence in Mentorship Citation',
      subtitle: 'Alumni Leadership',
      description: 'Recognizing alumni who have dedicated significant time, effort, and insight to guide students forward.',
      eligibility: 'Alumni of Shalom Hills International School actively mentoring or contributing to youth guidance.',
      criteria: 'Demonstrated dedication to student empowerment, thought leadership, and institutional engagement.',
      recipientPlaceholder: 'Official recipient to be announced during the evening ceremony on 14 Nov 2026',
      status: 'Pending Official Announcement',
    },
    {
      id: 'award-trailblazer',
      title: 'Young Trailblazer Recognition',
      subtitle: 'Professional Impact',
      description: 'Celebrating an alumnus who has achieved extraordinary pioneering milestones early in their professional journey.',
      eligibility: 'Alumni graduated within the past 10 years demonstrating impact in their chosen domain.',
      criteria: 'Innovation, societal impact, leadership, or groundbreaking research and creative distinction.',
      recipientPlaceholder: 'Official nomination shortlist pending committee review',
      status: 'Nominations Open',
    },
    {
      id: 'award-visionary',
      title: 'Next-Gen Student Aspirant Citation',
      subtitle: 'Student Honors',
      description: 'Commending current senior students who exemplify proactive inquiry, character, and visionary ambition.',
      eligibility: 'Enrolled Grades 11–12 students participating in Shalom Footprints mentorship programs.',
      criteria: 'Active participation, insightful dialogue contributions, and collaborative leadership.',
      recipientPlaceholder: 'To be conferred by the Alumni Board & School Leadership',
      status: 'Pending Official Announcement',
    },
  ] as AwardCategory[],

  categories: [
    'All',
    'Medicine & Healthcare',
    'Engineering & Technology',
    'Law & Legal Studies',
    'Business & Management',
    'Higher Education & Research',
    'Alumni Leadership',
    'General Mentorship',
  ],

  // Real verified registered alumni responses for Shalom Footprints 2026
  alumniProfiles: REGISTERED_ALUMNI,

  gallery: [
    {
      id: 'gallery-1',
      title: 'The Path Forward',
      subtitle: 'The Golden Trail of Mentorship',
      category: 'Symbol of Journey',
      src: '/images/hero_footprints_trail_1793295219663.jpg',
      aspect: 'landscape',
      caption: 'Every journey leaves a footprint. The illuminated pathway leading to the horizon represents guidance and legacy.',
    },
    {
      id: 'gallery-2',
      title: 'Corridors of Memory & Ambition',
      subtitle: 'Colonnade Courtyard',
      category: 'Campus Architecture',
      src: '/images/story_corridor_path_1793295220463.jpg',
      aspect: 'portrait',
      caption: 'Where alumni once walked as students, and where current students now prepare for their next steps.',
    },
    {
      id: 'gallery-3',
      title: 'Generational Dialogue',
      subtitle: 'Mentorship Circle',
      category: 'Mentorship in Action',
      src: '/images/gallery_alumni_dialogue_1793295221068.jpg',
      aspect: 'landscape',
      caption: 'Authentic conversations where real advice replaces assumptions and doubts turn into direction.',
    },
    {
      id: 'gallery-4',
      title: 'Evening at Shalom Hills',
      subtitle: 'Twilight Campus Landscape',
      category: 'School Community',
      src: '/images/gallery_campus_evening_1793295221689.jpg',
      aspect: 'landscape',
      caption: 'A vibrant campus that continues to serve as an anchor for alumni worldwide.',
    },
    {
      id: 'gallery-5',
      title: 'Auditorium Celebration',
      subtitle: 'Stage & Keynotes',
      category: 'Event Stage',
      src: '/images/gallery_celebration_stage_1793295221108.jpg',
      aspect: 'landscape',
      caption: 'The main auditorium setting where inspiring keynote addresses and award presentations will unfold.',
    },
  ],

  faqs: [
    {
      id: 'faq-1',
      question: 'What is Shalom Footprints?',
      answer:
        'Shalom Footprints is a flagship alumni mentorship and guidance initiative hosted by Shalom Hills International School. It brings accomplished alumni back to their alma mater to share their real-world experiences, provide career and academic guidance, and inspire the next generation of students.',
      category: 'Event Overview',
      isConfirmed: true,
    },
    {
      id: 'faq-2',
      question: 'Who can attend the event on 14 November 2026?',
      answer:
        'The event is open to high school students (particularly Grades 9 through 12), their parents, alumni across graduating batches, and school faculty. Prior registration is required to ensure adequate seating and thematic pod assignment.',
      category: 'Attendance & Eligibility',
      isConfirmed: true,
    },
    {
      id: 'faq-3',
      question: 'How do I register for Shalom Footprints?',
      answer:
        'You can register online using the "Register Now" button on this website. It connects to the official event registration portal. Alternatively, students can register through the designated internal school coordinator desk.',
      category: 'Registration',
      isConfirmed: true,
    },
    {
      id: 'faq-4',
      question: 'Where will the event take place?',
      answer:
        'The event takes place at the campus of Shalom Hills International School, Block C, Sushant Lok Phase I, Sector 43, Gurugram. The plenary talks will be in the Main Auditorium, followed by breakout sessions across dedicated seminar halls.',
      category: 'Venue & Logistics',
      isConfirmed: true,
    },
    {
      id: 'faq-5',
      question: 'What activities and formats are planned?',
      answer:
        'The evening comprises keynote alumni journeys, sector-wise interactive mentorship circles (Technology, Medicine, Law, Finance, Design, Civil Services, etc.), open Q&A sessions, awards recognition, and an alumni-student networking reception.',
      category: 'Program & Schedule',
      isConfirmed: true,
    },
    {
      id: 'faq-6',
      question: 'Will there be prizes or recognition at the event?',
      answer:
        'Yes. Shalom Footprints includes an official recognition ceremony honoring distinguished alumni contributions to mentorship, as well as citations acknowledging visionary student ambition and initiatives.',
      category: 'Awards & Honors',
      isConfirmed: true,
    },
    {
      id: 'faq-7',
      question: 'Whom should I contact for assistance or alumni participation queries?',
      answer:
        'For queries, alumni speaker registration, or student inquiries, you can reach the Shalom Footprints Organizing Secretariat at footprints@shalomhills.com or contact the school administrative desk at (+91) 0124-257-0440.',
      category: 'Contact & Support',
      isConfirmed: true,
    },
  ] as FaqItem[],

  contact: {
    email: 'footprints@shalomhills.com',
    phone: '+91 124 257 0440 / 0441',
    address: 'Shalom Hills International School, Block C, Sushant Lok Phase I, Sector 43, Gurugram, Haryana 122002',
    mapsUrl: 'https://maps.google.com/?q=Shalom+Hills+International+School+Gurugram',
    schoolWebsite: 'https://shalomhills.com',
  },
};
