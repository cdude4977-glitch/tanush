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
  number: number;
  title: string;
  subtitle: string;
  description: string;
  criteria?: string;
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
    time: 'From 11:00 AM IST onwards',
    timeNotice: 'Official gathering commences from 11:00 AM onwards',
    venue: 'Shalom Hills International School',
    hall: 'Main Auditorium & Amphitheatre Courtyard',
    address: 'Block C, Sushant Lok Phase I, Sector 43, Gurugram, Haryana 122002',
    dressCode: 'Smart Formal / Business Casual (School uniform for Students on Duty)',
    eligibility: 'Strictly for Alumni of Shalom Hills International School and designated Students on Duty only (Not open to students who are not on duty)',
    targetAudience: 'Alumni of Shalom Hills International School and designated Students on Duty',
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
      id: 'award-rising-star',
      number: 1,
      title: 'Shalom Rising Star Award',
      subtitle: 'Young Achiever',
      description: 'Notable early achievement and potential.',
      criteria: 'Recognising notable early-career milestones, creative spark, and promising potential of young alumni.',
      status: 'Nominations Open',
    },
    {
      id: 'award-academic',
      number: 2,
      title: 'Shalom Academic & Research Excellence Award',
      subtitle: 'Knowledge, Discovery and Research',
      description: 'Knowledge, discovery and research.',
      criteria: 'Contributions to higher academic research, scientific discoveries, advanced scholarship, and intellectual pursuit.',
      status: 'Nominations Open',
    },
    {
      id: 'award-emerging-pro',
      number: 3,
      title: 'Shalom Emerging Professional Award',
      subtitle: 'Early-Career Growth',
      description: 'and early-career growth.',
      criteria: 'Excellence in corporate, enterprise, and early-career professional leadership and execution.',
      status: 'Nominations Open',
    },
    {
      id: 'award-spark',
      number: 4,
      title: 'Shalom Spark Award',
      subtitle: 'Innovation & Entrepreneurship',
      description: 'Fresh ideas turned into ventures.',
      criteria: 'Transforming original ideas into viable enterprises, startups, product innovations, or game-changing business solutions.',
      status: 'Nominations Open',
    },
    {
      id: 'award-leadership',
      number: 5,
      title: 'Shalom Leadership & Collaboration Award',
      subtitle: 'Community Impact & Team Leadership',
      description: 'Community impact and team leadership.',
      criteria: 'Demonstrated team leadership, ethical management, collaborative impact, and organizational excellence.',
      status: 'Nominations Open',
    },
    {
      id: 'award-compassion',
      number: 6,
      title: 'Shalom Compassion & Community Impact Award',
      subtitle: 'Service to People & the Planet',
      description: 'Service to people and the planet.',
      criteria: 'Dedicated social impact, humanitarian work, sustainability initiatives, and community service.',
      status: 'Nominations Open',
    },
    {
      id: 'award-creative',
      number: 7,
      title: 'Shalom Creative Footprints Award',
      subtitle: 'Arts, Writing and Photography',
      description: 'Arts, writing and photography.',
      criteria: 'Distinction in creative fields including visual arts, photography, creative writing, filmmaking, and design.',
      status: 'Nominations Open',
    },
    {
      id: 'award-sports',
      number: 8,
      title: 'Shalom Sports & Resilience Award',
      subtitle: 'Athletics & Perseverance',
      description: 'Athletic achievement and perseverance.',
      criteria: 'Excellence in competitive sports, athletic leadership, resilience, and sportsmanship.',
      status: 'Nominations Open',
    },
    {
      id: 'award-global',
      number: 9,
      title: 'Shalom Global Perspectives Award',
      subtitle: 'Global Exposure & International Work',
      description: 'Global exposure and international work.',
      criteria: 'International academic or professional exposure, global research, cross-cultural collaboration, and global leadership.',
      status: 'Nominations Open',
    },
    {
      id: 'award-roots',
      number: 10,
      title: 'Shalom Roots Award',
      subtitle: 'Giving Back to Shalom',
      description: 'Giving back to the school community.',
      criteria: 'Honoring alumni who stay actively connected, mentor Shalom students, and give back to their alma mater.',
      status: 'Nominations Open',
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
      title: 'Main School Auditorium & Stage',
      subtitle: 'Shalom Hills International School',
      category: 'Event Venue',
      src: '/images/shalom_auditorium.png',
      aspect: 'landscape',
      objectPosition: 'object-center',
      caption: 'The official venue for Shalom Footprints 2026 — the school auditorium where inspiring keynote addresses and award presentations will unfold.',
    },
    {
      id: 'gallery-6',
      title: 'Shalom Hills International School Campus',
      subtitle: 'Peace · Progress · Prosperity',
      category: 'Alma Mater',
      src: '/assets/aistudio/DSC_2608_3b9f93ea.jpeg',
      aspect: 'landscape',
      objectPosition: 'object-center',
      caption: 'The iconic facade of Shalom Hills International School — where every Shalomite’s journey begins.',
    },
    {
      id: 'gallery-7',
      title: 'Campus Court & Sports Huddle',
      subtitle: 'Mentors & Athletics Spirit',
      category: 'Sports & Mentorship',
      src: '/assets/aistudio/85698b24-743d-4e81-92c6-5f40e0dc4468_4f991980.jpeg',
      aspect: 'portrait',
      objectPosition: 'object-[center_18%]',
      caption: 'Teamwork, strategy, and camaraderie on the campus courts — lessons in resilience that carry far beyond school.',
    },
    {
      id: 'gallery-8',
      title: 'Campus Athletics & Football Turf',
      subtitle: 'Outdoor Sports Arena',
      category: 'Campus Grounds',
      src: '/assets/aistudio/112ed0af-5be0-4db6-af56-bebcf96028a6_745e7cf7.jpeg',
      aspect: 'portrait',
      objectPosition: 'object-center',
      caption: 'Sunlit turf and goalposts where discipline, grit, and lifelong friendships are forged.',
    },
    {
      id: 'gallery-9',
      title: 'Cultural Showcase @ Shalom Stage',
      subtitle: 'Student Performers in Concert',
      category: 'Campus Culture',
      src: '/assets/aistudio/DSC_7221_4e580129.jpeg',
      aspect: 'landscape',
      objectPosition: 'object-[center_20%]',
      caption: 'Grace, expression, and vibrant cultural traditions brought to life on the Shalom Hills auditorium stage.',
    },
  ],

  faqs: [
    {
      id: 'faq-1',
      question: 'What is Shalom Footprints?',
      answer:
        'Shalom Footprints is the flagship alumni meet and mentorship initiative hosted by Shalom Hills International School under the theme "Tracing Roots, Embracing Wings". It brings alumni back to their alma mater to celebrate achievements, reconnect across generations, and guide students.',
      category: 'Event Overview',
      isConfirmed: true,
    },
    {
      id: 'faq-2',
      question: 'Who is eligible to attend the event on 14 November 2026?',
      answer:
        'Attendance is strictly reserved for Alumni of Shalom Hills International School and designated Students on Duty only. Students who are not on duty are not eligible to attend.',
      category: 'Attendance & Eligibility',
      isConfirmed: true,
    },
    {
      id: 'faq-3',
      question: 'What is the schedule and timing for Shalom Footprints?',
      answer:
        'The official event commences from 11:00 AM IST onwards on Saturday, 14 November 2026 at the Main Auditorium of Shalom Hills International School, Gurugram.',
      category: 'Timing & Schedule',
      isConfirmed: true,
    },
    {
      id: 'faq-4',
      question: 'Where will the event take place?',
      answer:
        'The event takes place at the campus of Shalom Hills International School, Block C, Sushant Lok Phase I, Sector 43, Gurugram, Haryana. The central gathering will be hosted in the Main Auditorium and campus courtyards.',
      category: 'Venue & Logistics',
      isConfirmed: true,
    },
    {
      id: 'faq-5',
      question: 'What is the motto and theme of Shalom Footprints 2026?',
      answer:
        'The 2026 meet is themed "Tracing Roots, Embracing Wings" with the spirit of "reconnect.relive.reunite" and the enduring Shalomite motto: "Once a Shalomite... Always a Shalomite!"',
      category: 'Theme & Ethos',
      isConfirmed: true,
    },
    {
      id: 'faq-6',
      question: 'What are the 10 official Alumni Awards 2026 categories?',
      answer:
        'The Alumni Awards 2026 recognize meaningful achievement across 10 categories: (1) Shalom Rising Star Award (Young Achiever), (2) Shalom Academic & Research Excellence Award, (3) Shalom Emerging Professional Award, (4) Shalom Spark Award (Innovation & Entrepreneurship), (5) Shalom Leadership & Collaboration Award, (6) Shalom Compassion & Community Impact Award, (7) Shalom Creative Footprints Award, (8) Shalom Sports & Resilience Award, (9) Shalom Global Perspectives Award, and (10) Shalom Roots Award (Giving Back to Shalom).',
      category: 'Alumni Awards 2026',
      isConfirmed: true,
    },
    {
      id: 'faq-7',
      question: 'Whom should I contact for queries or alumni assistance?',
      answer:
        'For queries, alumni assistance, or award nomination inquiries, you can reach the Shalom Footprints Organizing Secretariat at footprints@shalomhills.com or call (+91) 0124-257-0440.',
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
