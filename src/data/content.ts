// Single source of truth for all portfolio copy.
// Every claim here is traceable to the CV, the store listings, or a certificate
// in the private workspace — nothing is invented. Keep it that way.
import collections from './collections.json';

export const profile = {
  name: 'Sayed Shalan',
  fullName: 'Sayed Samy Shalan',
  // Exact wording supplied by Sayed — do not edit.
  bio: 'Mobile Solutions Architect & Team Lead | Flutter, Android & iOS | AI-Powered Engineering',
  headline: 'I design and engineer secure, scalable, high-performance mobile solutions.',
  location: 'Cairo, Egypt',
  email: 'sayedshalan22@gmail.com',
  phone: { display: '+20 112 020 7774', tel: 'tel:+201120207774', whatsapp: 'https://wa.me/201120207774' },
  linkedin: 'https://www.linkedin.com/in/sayed-shalan',
  github: 'https://github.com/Sayed-Shalan',
  cv: { href: '/cv/Sayed-CV.pdf', filename: 'Sayed-CV.pdf' },
};

export const principles = [
  {
    title: 'Architecture first',
    body: 'Clean Architecture, feature-first modules and SOLID boundaries, so business rules stay independent of APIs and UI and a codebase stays changeable after the tenth feature.',
  },
  {
    title: 'Secure by default',
    body: 'SSL pinning, obfuscation and code shrinking, root/jailbreak detection and secure storage — applied to fintech, auctions and identity flows like NAFATH + OTP.',
  },
  {
    title: 'Performance is a feature',
    body: 'DevTools profiling, jank and memory analysis, widget-rebuild and rendering optimisation, tree-shaking and app-size work before users ever notice.',
  },
  {
    title: 'State, networking & platform',
    body: 'Predictable state with BLoC, Cubit and Riverpod; REST, GraphQL and real-time channels over Pusher, Socket.io and SignalR; native code through platform channels and Pigeon.',
  },
  {
    title: 'Reliability & code quality',
    body: 'Unit, integration and UI tests, enforced code reviews and SonarQube quality gates, so quality is checked on every change rather than at the end.',
  },
  {
    title: 'Release automation',
    body: 'Build flavors, fastlane, Codemagic, GitHub Actions, GitLab and Azure pipelines, and Shorebird code-push for fixes that cannot wait for store review.',
  },
];

export type Store = { play?: string; appStore?: string; web?: string };

/** A screenshot in a project's collection, by 1-based position. */
export type Shot = { n: number; alt: string };

export type CaseStudy = {
  slug: keyof typeof collections;
  name: string;
  domain: string;
  summary: string;
  role: string;
  challenge: string;
  /** Heading for the list below; projects without CV detail describe product scope instead. */
  listTitle?: string;
  contributions: string[];
  stack: string[];
  platforms: string;
  highlight?: string;
  /** Descriptive alt text; the first three are shown on the card. */
  shots: Shot[];
  store: Store;
  extra?: Shot & { caption: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'vidume',
    name: 'Vidume',
    domain: 'Recruitment · Video',
    summary:
      'Video-résumé recruitment platform: candidates upload an introductory professional video, and recruiters pre-select from video profiles before spending time on interviews.',
    role: 'Delivered as Flutter Team Lead at More-creatives',
    challenge:
      'Two audiences share one app — companies posting jobs and job seekers presenting themselves on video — so each journey needs its own flows without duplicating the product.',
    listTitle: 'Product scope',
    contributions: [
      'Separate corporate and job-seeker journeys from a single onboarding choice.',
      'Job posts with applicants tracked through applied, shortlisted, accepted and rejected stages.',
      'Candidate profiles built around a video résumé, with chat and interview scheduling.',
      'Subscription packages for companies.',
    ],
    stack: ['Flutter', 'Video', 'In-app chat', 'Subscriptions'],
    platforms: 'Android · iOS',
    shots: [
      { n: 2, alt: 'Vidume company home with open jobs and recommended candidates' },
      { n: 4, alt: 'Vidume candidate profile with video résumé, chat and interview setup' },
      { n: 5, alt: 'Vidume job post with applicants grouped by hiring stage' },
      { n: 1, alt: 'Vidume onboarding: choose a corporate or job-seeker account' },
      { n: 3, alt: 'Vidume job-seeker search with filters' },
      { n: 6, alt: 'Vidume in-app chat between recruiter and candidate' },
      { n: 7, alt: 'Vidume subscription packages' },
    ],
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.morecreatives.vidume',
      appStore: 'https://apps.apple.com/qa/app/vidume/id1621281059',
    },
  },
  {
    slug: 'soumtech',
    name: 'SoumTech',
    domain: 'Online Auctions · GovTech',
    summary:
      'Licensed online auction platform of the Saudi Entrustment & Liquidation Center: browse auctions, bid in real time, manage a wallet funded through SADAD.',
    role: 'Engineered end to end',
    challenge:
      'Bids are time-critical and money-backed: identity must be strong, auction state must update instantly, and the clock must never lie.',
    contributions: [
      'National-identity sign-up through NAFATH plus OTP verification on login.',
      'Real-time auction and bid updates over Pusher so every bidder sees the same state.',
      'Wallet, SADAD recharge, withdrawals and transaction history wired to REST APIs.',
      'Clean Architecture with Cubit keeping auction, wallet and profile features decoupled.',
    ],
    stack: ['Flutter', 'Clean Architecture', 'Cubit', 'Pusher', 'NAFATH / OTP', 'REST'],
    platforms: 'Android · iOS',
    shots: [
      { n: 2, alt: 'SoumTech sign-in with NAFATH national identity verification' },
      { n: 3, alt: 'SoumTech browsing live auctions' },
      { n: 5, alt: 'SoumTech fast search and filters for auctions' },
      { n: 6, alt: 'SoumTech auction details with bid history' },
    ],
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.beetleware.soumtech',
      appStore: 'https://apps.apple.com/us/app/%D8%B3%D9%88%D9%85%D8%AA%D9%83/id6446899870',
    },
  },
  {
    slug: 'tal3eeb',
    name: 'Tal3eeb',
    domain: 'Gamified Learning · AR',
    summary:
      'Gamified learning and team-building: quests, leaderboards and rewards with QR, timed, GPS and augmented-reality challenges.',
    role: 'Led the team and architected the app',
    challenge:
      'Mixing camera, AR, location and timers in one game loop means hardware access, permissions and state have to be orchestrated carefully.',
    contributions: [
      'Architected a cross-platform Flutter app with an AR challenge experience.',
      'Multiple challenge engines — trivia, QR missions, timed races, GPS check-ins and AR hunts.',
      'Permissions for camera and location requested only when a challenge needs them.',
      'Led the team through code reviews and hands-on delivery on both stores.',
    ],
    stack: ['Flutter', 'Augmented Reality', 'GPS', 'QR scanning', 'Dark mode'],
    platforms: 'Android · iOS',
    shots: [
      { n: 1, alt: 'Tal3eeb quests screen with open seasons and points' },
      { n: 3, alt: 'Tal3eeb augmented-reality location hunt' },
      { n: 4, alt: 'Tal3eeb real-world game map with rounds' },
      { n: 7, alt: 'Tal3eeb reward screen after completing a challenge' },
    ],
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.beetleware.tal3eeb',
      appStore: 'https://apps.apple.com/tr/app/tal3eeb/id6760836315',
      web: 'https://tal3eeb.com/book?track=studio&game=itrush',
    },
    extra: {
      n: 8,
      alt: 'Tal3eeb product website hero inviting teams to book a design session',
      caption: 'Tal3eeb product website',
    },
  },
  {
    slug: 'rafah',
    name: 'Rfah',
    domain: 'HealthTech · Telehealth',
    summary:
      'Confidential psychological, family and social counselling: assessments, bookings, voice consultations and 24/7 written support — as separate client and counselor apps.',
    role: 'Led the team and built ~85% of the platform',
    challenge:
      'Two apps, one sensitive domain: privacy and anonymity are product requirements, and sessions, payments and bookings must stay in sync across both sides.',
    contributions: [
      'Separate client and counselor apps, with Mason templates for consistent feature scaffolding.',
      'Riverpod state management across bookings, assessments and consultation flows.',
      'Stripe payments for paid consultations.',
      'Shorebird code-push to ship fixes without waiting on store review.',
    ],
    stack: ['Flutter', 'Riverpod', 'Stripe', 'Mason', 'Shorebird'],
    platforms: 'Android · iOS · 2 apps',
    shots: [
      { n: 1, alt: 'Rfah client home with counselling services' },
      { n: 2, alt: 'Rfah psychological assessment results' },
      { n: 3, alt: 'Rfah list of certified counselors' },
      { n: 6, alt: 'Rfah counselor app managing consultation requests' },
    ],
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.beetleware.rafahcustomer',
      appStore: 'https://apps.apple.com/tr/app/rfah-client/id6455000122',
    },
  },
  {
    slug: 'watheeq',
    name: 'Watheeq Capital',
    domain: 'Fintech · Investment',
    summary:
      'E-services app for a CMA-licensed Saudi financial company: online registration, account opening, investment management and live investment opportunities.',
    role: 'Led architecture and built the app from scratch',
    challenge:
      'Regulated money movement and investor data demand a codebase where business rules are isolated, testable and hard to break by accident.',
    contributions: [
      'Structured the app on Clean Architecture so domain rules stay independent of APIs and UI.',
      'Modelled onboarding, portfolio and opportunity flows with Cubit for predictable, traceable state.',
      'Declarative navigation with GoRouter across multi-step account-opening journeys.',
      'Integrated secure payment flows for Android and iOS releases.',
    ],
    stack: ['Flutter', 'Clean Architecture', 'Cubit', 'GoRouter', 'Payments'],
    platforms: 'Android · iOS',
    shots: [
      { n: 1, alt: 'Watheeq portfolio dashboard showing total balance and investment opportunities' },
      { n: 2, alt: 'Watheeq list of diversified investment funds' },
      { n: 4, alt: 'Watheeq organised investment portfolio with transaction history' },
      { n: 6, alt: 'Watheeq investor profile and verified account settings' },
    ],
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.beetleware.watheeq',
      appStore: 'https://apps.apple.com/us/app/watheeq-capital-%D9%88%D8%AB%D9%8A%D9%82-%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A%D8%A9/id6745524318',
    },
  },
  {
    slug: 'sporting-qatar',
    name: 'Sporting Qatar',
    domain: 'Sports · Booking & Commerce',
    summary:
      'Booking and shopping platform for sport in Qatar: reserve courts and facilities, shop clothing and equipment, and book sports services, events and attractions.',
    role: 'Delivered as Flutter Team Lead at More-creatives',
    challenge:
      'Five service lines — playgrounds, store, consults, events and tourism — have to live under one home screen without the booking flow getting lost.',
    listTitle: 'Product scope',
    contributions: [
      'One home screen for playgrounds, the store, consults, events and sports tourism.',
      'Court discovery by sport, with provider details, a location map and contact options.',
      'Slot-based reservations with date and time selection and upcoming bookings.',
      'Email, Facebook and Google sign-in.',
    ],
    stack: ['Flutter', 'Maps', 'Bookings', 'E-commerce', 'Social sign-in'],
    platforms: 'Android · iOS',
    shots: [
      { n: 4, alt: 'Sporting Qatar home with playgrounds, store, consults, events and tourism' },
      { n: 6, alt: 'Sporting Qatar football courts with availability' },
      { n: 8, alt: 'Sporting Qatar reservation with date and time-slot selection' },
      { n: 1, alt: 'Sporting Qatar splash screen' },
      { n: 2, alt: 'Sporting Qatar onboarding for nearby playgrounds' },
      { n: 3, alt: 'Sporting Qatar sign-in with email, Facebook or Google' },
      { n: 5, alt: 'Sporting Qatar upcoming reservations and playground categories by sport' },
      { n: 7, alt: 'Sporting Qatar sports provider details with location map and contact options' },
    ],
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.morecreatives.sporting',
      appStore: 'https://apps.apple.com/qa/app/sporting-qatar/id1584547451',
    },
  },
  {
    slug: '01gov',
    name: '01Gov',
    domain: 'GovTech · AI',
    summary:
      'Official app of the Arab government-innovation platform: 3,000+ international practices, video library, reports, personal lists and subscription packages.',
    role: 'Built from scratch',
    challenge:
      'A large, constantly updated knowledge base needs fast browsing, personalisation and paid tiers without the app becoming a maze.',
    contributions: [
      'BLoC-driven feature modules over Clean Architecture for feeds, search, lists and notifications.',
      'Monthly and annual subscription e-payments for basic and comprehensive packages.',
      'Integrated AI-assisted features into the product experience.',
      'GoRouter navigation and REST integration across a content-heavy, RTL-first UI.',
    ],
    stack: ['Flutter', 'BLoC', 'Clean Architecture', 'GoRouter', 'REST', 'AI integration'],
    platforms: 'Android · iOS',
    shots: [
      { n: 1, alt: '01Gov home feed with story of the day and government practices' },
      { n: 3, alt: '01Gov list of international practices filtered by topic' },
      { n: 7, alt: '01Gov topic categories including artificial intelligence and data' },
      { n: 8, alt: '01Gov sign-in with social accounts or email' },
    ],
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.beetleware.govern01',
      appStore: 'https://apps.apple.com/us/app/01-gov/id6504727922',
    },
  },
  {
    slug: 'mihwar',
    name: 'Mihwar',
    domain: 'Lifestyle · Discovery',
    summary:
      'Discover entertainment venues, landmarks, brands, exhibitions and events across Saudi Arabia, with offers and personalised browsing.',
    role: 'Led delivery and code reviews',
    challenge:
      'Media-heavy discovery feeds have to stay smooth while pulling venues, offers and events from many sources.',
    contributions: [
      'Feature modules on Clean Architecture with GetX for state, routing and DI.',
      'Image- and video-rich feeds for malls, offers and events.',
      'Search and personalised browsing by interest.',
      'Owned code reviews and delivery for Android and iOS.',
    ],
    stack: ['Flutter', 'GetX', 'Clean Architecture', 'REST'],
    platforms: 'Android · iOS',
    shots: [
      { n: 1, alt: 'Mihwar home with featured influencers and offers' },
      { n: 2, alt: 'Mihwar shopping malls directory' },
      { n: 4, alt: 'Mihwar upcoming events' },
      { n: 5, alt: 'Mihwar venue details with offers' },
    ],
    store: {
      play: 'https://play.google.com/store/apps/details?id=com.beetleware.mihwar',
      appStore: 'https://apps.apple.com/us/app/mihwar-%D9%85%D8%AD%D9%88%D8%B1/id6670168460',
    },
  },
];

export type GalleryApp = { slug: keyof typeof collections; cover: number; name: string; domain: string; blurb: string; store: Store };

export const galleryApps: GalleryApp[] = [
  { slug: 'crew-sync', cover: 2, name: 'Crew SYNC', domain: 'Workforce', blurb: 'Attendance with face, voice and fingerprint verification plus location checks.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.attendify', appStore: 'https://apps.apple.com/tr/app/crew-sync-app/id6753706806' } },
  { slug: 'dcs-richmond', cover: 2, name: 'DCS & Richmond', domain: 'EdTech', blurb: 'All-in-one school app: fees, store, cafeteria, support and learning platform.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.school', appStore: 'https://apps.apple.com/tr/app/dcs-richmond/id6780412209' } },
  { slug: 'kidsware', cover: 1, name: 'Kidsware', domain: 'EdTech', blurb: 'Children’s e-learning with live sessions, schedules and progress tracking.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.kidsware', appStore: 'https://apps.apple.com/tr/app/kidsware/id6758140751' } },
  { slug: 'khairumma', cover: 2, name: 'Khairumma', domain: 'Education', blurb: 'Qur’an memorisation and recitation with certified teachers.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.khair_oma', appStore: 'https://apps.apple.com/tr/app/%D8%AE%D9%8A%D9%80%D8%B1-%D8%A3%D9%85%D9%80%D8%A9/id6478954684' } },
  { slug: 'moshaf-khairumma', cover: 3, name: 'Moshaf Khairumma', domain: 'Lifestyle', blurb: 'Qur’an reader with recitations, tafsir, smart search and prayer times.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.quran_khairummah', appStore: 'https://apps.apple.com/tr/app/%D9%85%D8%B5%D8%AD%D9%81-%D8%AE%D9%8A%D8%B1-%D8%A3%D9%85%D9%87/id6742570938' } },
  { slug: 'shipper-driver', cover: 6, name: 'Shipper', domain: 'Logistics', blurb: 'Trip management and coordination for drivers.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.shipperDriver' } },
  { slug: 'shipper-operation', cover: 2, name: 'Shipper Operation', domain: 'Logistics', blurb: 'Back-office app for operators assigning trips to drivers.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.shipperoperation', appStore: 'https://apps.apple.com/tr/app/shipper-operation/id6471913778' } },
  { slug: 'zahi-customer', cover: 2, name: 'Zahi', domain: 'On-demand', blurb: 'Laundry marketplace with delivery and secure payment — customer app.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.zahicustomer' } },
  { slug: 'zahi-laundry', cover: 2, name: 'Zahi Laundry', domain: 'On-demand', blurb: 'Partner app for laundries to manage incoming orders.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.zahilaundry' } },
  { slug: 'plans', cover: 3, name: 'Plans', domain: 'Entertainment', blurb: 'Event recommendations and ticket booking.', store: { play: 'https://play.google.com/store/apps/details?id=com.beetleware.plans' } },
  { slug: 'sba', cover: 2, name: 'SBA Academy', domain: 'EdTech', blurb: 'TVTC-accredited media training academy.', store: { play: 'https://play.google.com/store/apps/details?id=com.spc.sba', appStore: 'https://apps.apple.com/sa/app/sba-academy/id6749261521' } },
  { slug: 'tutorium', cover: 4, name: 'Tutorium', domain: 'EdTech', blurb: 'Class booking, school supplies and uniform tailoring for Qatar.', store: { play: 'https://play.google.com/store/apps/details?id=com.morecreatives.edriss', appStore: 'https://apps.apple.com/qa/app/tutorium/id6502885320' } },
  { slug: 'meet-eat', cover: 2, name: 'Meet & Eat', domain: 'Food & Dining', blurb: 'Restaurant discovery, table booking and meal pre-ordering in Qatar.', store: { play: 'https://play.google.com/store/apps/details?id=com.morecreatives.meeteat', appStore: 'https://apps.apple.com/qa/app/meet-eat-app/id1635725023' } },
  { slug: 'my-contento', cover: 5, name: 'My Contento', domain: 'Marketplace', blurb: 'Hire photographers, videographers, designers and food stylists.', store: { play: 'https://play.google.com/store/apps/details?id=com.morecreatives.mycontentopro', appStore: 'https://apps.apple.com/qa/app/my-contento/id1645072405' } },
  { slug: 'wepunch', cover: 1, name: 'WePunch', domain: 'Workforce', blurb: 'Location-based, tamper-proof attendance tracking.', store: { play: 'https://play.google.com/store/apps/details?id=com.morecreatives.wepunch', appStore: 'https://apps.apple.com/qa/app/wepunch/id6474134815' } },
  { slug: 'property-filter', cover: 3, name: 'Property Filter', domain: 'PropTech', blurb: 'Search, filter and message landlords for rent and sale listings.', store: { play: 'https://play.google.com/store/apps/details?id=com.morecreatives.propertyfilter', appStore: 'https://apps.apple.com/qa/app/property-filter/id6755927541' } },
  { slug: 'agzakhanh', cover: 4, name: 'Agzakhanh', domain: 'HealthTech', blurb: 'Online pharmacy: find medicine nearby, pay and get it delivered.', store: { play: 'https://play.google.com/store/apps/details?id=com.morecreatives.agzakhanh', appStore: 'https://apps.apple.com/qa/app/agzakhanh-%D8%A3%D8%AC%D8%B2%D8%AE%D8%A7%D9%86%D9%87/id1568955292' } },
];

type CollectionItem = { key: string; group?: string };

/** Every published screenshot for a project, in order, with alt text and an optional group label. */
export function screenshotsFor(slug: keyof typeof collections, name: string, shots: Shot[] = []) {
  const items = collections[slug] as CollectionItem[];
  return items.map((item, i) => {
    const described = shots.find((s) => s.n === i + 1)?.alt;
    return {
      key: item.key,
      alt: described ?? `${name}${item.group ? ` ${item.group.toLowerCase()}` : ''} — screenshot ${i + 1} of ${items.length}`,
      caption: item.group,
    };
  });
}

export function shotKey(slug: keyof typeof collections, n: number) {
  return (collections[slug] as CollectionItem[])[n - 1].key;
}

export const skillGroups = [
  { title: 'Architecture & System Design', items: ['Clean Architecture', 'Feature-first & modular design', 'SOLID', 'MVVM · MVI · MVP · MVC', 'Design patterns', 'Dependency injection', 'Reusable components', 'Design systems & tokens', 'Adaptive / responsive UI'] },
  { title: 'Flutter & Dart', items: ['Dart', 'Widget / Element / Render trees', 'Custom widgets & animations', 'Localization (ARB)', 'Isolates', 'Impeller', 'GoRouter', 'Dio', 'Hive', 'SQLite', 'Secure storage'] },
  { title: 'Native Android', items: ['Kotlin', 'Java', 'Jetpack Compose', 'ViewModel · LiveData · StateFlow', 'WorkManager', 'Navigation', 'Room · Realm', 'Coroutines · Flow', 'RxJava · RxKotlin', 'Retrofit · OkHttp', 'Services & broadcast receivers', 'Gradle & build flavors'] },
  { title: 'State & DI', items: ['BLoC', 'Cubit', 'Riverpod', 'Provider', 'GetX', 'GetIt', 'Injectable', 'Hilt', 'Koin', 'Dagger'] },
  { title: 'Security & Performance', items: ['SSL pinning', 'Obfuscation & R8/ProGuard', 'Root / jailbreak detection', 'Secure storage', 'DevTools profiling', 'Jank & memory analysis', 'Rebuild & rendering optimisation', 'Tree-shaking & app size'] },
  { title: 'Networking & Integrations', items: ['REST & GraphQL', 'Firebase (FCM, Firestore, RTDB, Analytics)', 'Pusher · Socket.io · SignalR', 'Stripe · Paymob · HyperPay · SADAD', 'NAFATH / OTP', 'Agora · Twilio', 'Google Maps & geocoding', 'Deep links · Branch.io', 'Platform channels · Pigeon'] },
  { title: 'Testing, CI/CD & Release', items: ['Unit, integration & UI tests', 'SonarQube', 'fastlane', 'Codemagic', 'GitHub Actions', 'GitLab CI', 'Azure Pipelines', 'Shorebird', 'FVM', 'Mason', 'Docker', 'App Store & Google Play'] },
  { title: 'AI-Powered Engineering', items: ['Claude Code', 'Anthropic API', 'Model Context Protocol (MCP)', 'Agent skills', 'AI feature integration'] },
  { title: 'Leadership & Beyond', items: ['Technical leadership', 'Mentoring', 'Code reviews', 'Technical decision-making', 'Stakeholder communication', 'Agile / Scrum', 'PHP / Laravel', 'DevLake & Grafana'] },
];

export const experience = [
  {
    company: 'Beetleware',
    title: 'Mobile Team Lead',
    period: 'Apr 2023 — Present',
    points: [
      'Own mobile architecture and system design: Clean Architecture, feature-first modularisation, SOLID and design patterns, with standardised state management (BLoC/Cubit, Riverpod, GetX) and dependency injection (GetIt, Injectable).',
      'Architected and delivered flagship apps from scratch — Watheeq, SoumTech and 01Gov — with payments, NAFATH/OTP security, real-time updates over Pusher and AI feature integration.',
      'Established CI/CD pipelines (fastlane, GitHub Actions, GitLab, Codemagic) and SonarQube quality gates; track delivery and quality with DevLake and Grafana.',
      'Introduced AI-assisted development workflows (Claude Code) and integrated AI-powered features into products.',
      'Lead and mentor the mobile team through code reviews, technical decisions and release quality; contribute to PHP/Laravel backends and DevOps.',
    ],
  },
  {
    company: 'Web7soft',
    title: 'Flutter Team Lead',
    period: 'Apr 2023 — Jun 2024',
    points: ['Owned architecture and code review for cross-platform Flutter applications for US-based clients, and mentored engineers on Clean Architecture and state management.'],
  },
  {
    company: 'More-creatives',
    title: 'Flutter Team Lead',
    period: 'Nov 2020 — Apr 2024',
    points: ['Led delivery of cross-platform Android and iOS apps — including Vidume and Sporting Qatar — from architecture through App Store and Google Play release, on a reusable, maintainable component architecture.'],
  },
  {
    company: 'Hitchhicker',
    title: 'Senior Android Developer',
    period: 'Oct 2019 — Nov 2020',
    points: ['Built the Hitchhiker and ReTag native Android apps in Kotlin/Java, owning feature delivery, performance and release.'],
  },
  {
    company: 'Wimo',
    title: 'Senior Mobile Developer',
    period: 'Jan 2019 — Oct 2019',
    points: ['Engineered shipping and logistics apps in Flutter and Android covering the full logistics cycle.'],
  },
  {
    company: 'KWN-Digital',
    title: 'Android Developer',
    period: 'Feb 2018 — Jan 2019',
    points: ['Delivered native Android e-learning applications for the Omani government.'],
  },
  {
    company: 'Swever',
    title: 'Android Developer',
    period: 'Jun 2016 — Feb 2018',
    points: ['Built the Swever native Android e-commerce app from requirements through Google Play release.'],
  },
];

export const aiPillars = [
  {
    title: 'AI-assisted delivery',
    body: 'Introduced Claude Code into the team’s development workflow — for scaffolding, refactoring and review — while architecture decisions and code-quality gates stay human-owned.',
  },
  {
    title: 'AI inside the product',
    body: 'Integrated AI-assisted features into production apps such as 01Gov, treating the model as one more dependency behind a clean interface.',
  },
  {
    title: 'Protocols & agents',
    body: 'Building with the Anthropic API, the Model Context Protocol and agent skills to connect tools, codebases and delivery pipelines.',
  },
];

export type Certificate = {
  image: string;
  title: string;
  issuer: string;
  date?: string;
  note?: string;
  verify?: string;
  group: 'AI' | 'Mobile' | 'Leadership';
};

// Titles, issuers and dates as printed on each certificate.
export const certificates: Certificate[] = [
  { image: 'cert-claude-code', title: 'Claude Code in Action', issuer: 'Anthropic', date: 'Apr 2026', verify: 'https://verify.skilljar.com/c/y5apqn7joicc', group: 'AI' },
  { image: 'cert-anthropic-api', title: 'Claude with the Anthropic API', issuer: 'Anthropic', date: 'Apr 2026', verify: 'https://verify.skilljar.com/c/g69yjr4cpqcu', group: 'AI' },
  { image: 'cert-mcp', title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', date: 'Apr 2026', verify: 'https://verify.skilljar.com/c/wcihgc57ko4m', group: 'AI' },
  { image: 'cert-agent-skills', title: 'Introduction to Agent Skills', issuer: 'Anthropic', date: '2026', verify: 'https://verify.skilljar.com/c/nk7gostk63p5', group: 'AI' },
  { image: 'cert-mal', title: 'Developing Android Apps', issuer: 'Mobile Application Launchpad · Google & Udacity', date: 'Dec 2016', group: 'Mobile' },
  { image: 'cert-holol', title: 'Android Development Internship', issuer: 'Holol', date: 'Jul — Aug 2016', note: 'One-month programme', group: 'Mobile' },
  { image: 'cert-oman', title: 'Certificate of Appreciation', issuer: 'Ministry of Civil Service, Sultanate of Oman', note: 'National Project for Accelerating Government Performance · awarded as Android Developer', group: 'Mobile' },
  { image: 'cert-pmp', title: 'Project Management Professional (PMP) course — 35 contact hours', issuer: 'PM Tricks', date: 'Aug 2026', group: 'Leadership' },
  { image: 'cert-leadership', title: 'Leadership Skills Training Program — 20 hours', issuer: 'Beetleware L&D', date: 'Mar — May 2026', group: 'Leadership' },
];

export const education = [
  { title: 'B.Sc. Computer Science', place: 'Faculty of Computers & Informatics, Benha University', period: '2013 — 2017', note: 'Very Good (83%) · Excellent in graduation project' },
  { title: 'DevOps Internship', place: 'Beetleware', period: 'May — Sep 2025', note: 'CI/CD pipelines, Docker, automated deployments, cloud integration and release management' },
];

export const nav = [
  { id: 'profile', label: 'Profile' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'ai', label: 'AI' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];
