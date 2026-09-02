/**
 * Central site configuration and verified practice data.
 * Every fact here was checked against public sources on 2026-08-24.
 * See docs/ for the underlying research reports.
 */

/**
 * OptiMantra is the system of record: booking, consents, intake, payment,
 * video visits, and the chart all live there under a signed BAA. This site
 * never stores or transmits health information; it only guides the visitor
 * to the right OptiMantra service.
 *
 * Every URL below was captured from the practice's live OptiMantra account on
 * 2026-09-01. The per service links land directly on the date and time step
 * with that service preselected (sid = OptiMantra's encrypted service id).
 * Never append quiz answers or health details to these URLs.
 */
const OM_PID = "bXNNTmxZTG9lMSt3RXlUbmpyaW1HQT09";
const OM_LID = "d0lHZEVzR0JTeG5ucWgya2RRNm93QT09";
const OM_BASE = "https://www.optimantra.com/optimus/patient/patientaccess";

export const OPTIMANTRA = {
  /** Full service menu (both visit types). */
  bookingUrl: `${OM_BASE}/servicesall?pid=${OM_PID}&lid=${OM_LID}`,
  /** Existing patients sign in here for messages, forms, results, and visits. */
  portalLoginUrl:
    "https://www.optimantra.com/optimus/om/patient/login?accessPoint=L1YvN0JQYzk1ZnRsdlFXNEhOOXJWUT09",
  services: {
    initial: {
      name: "Initial Telehealth Visit",
      url: `${OM_BASE}/practsNslotsNEW?sid=dnFWenUvMC9rVGt3bG40cGlSRCtqUT09&pid=${OM_PID}&lid=${OM_LID}`,
    },
    followUp: {
      name: "Follow Up Telehealth Visit",
      url: `${OM_BASE}/practsNslotsNEW?sid=UmpQSlh2b3czTkUxOW1aUGlqY2Yzdz09&pid=${OM_PID}&lid=${OM_LID}`,
    },
  },
} as const;

/** Kept for older imports; the full menu link above is the same page. */
export const OPTIMANTRA_BOOKING_URL = OPTIMANTRA.bookingUrl;

/**
 * Every "Book a visit" button opens the guided start on this site, which ends
 * by handing the visitor to the matching OptiMantra service. Keep this as a
 * site route so the safety and eligibility check always runs first.
 */
export const PORTAL_URL = "/book";

/**
 * Flip to true once Dr. Copur's online booking availability exists in
 * OptiMantra (Settings > Scheduling > Online Booking > Availability) and a
 * payment processor is connected. Until then the final step shows the interim
 * "we will schedule you by email" path instead of an empty calendar.
 */
export const PORTAL_LIVE = true;

/**
 * Federal rules stop a Medicare enrolled physician from taking cash from a
 * Medicare beneficiary for covered care unless he has opted out and the
 * patient signs a private contract. Until Dr. Copur's Medicare status is
 * confirmed, the guided start asks about Medicare and Medicaid and routes
 * those visitors to email instead of online booking. Set to false once an
 * opt out (with the private contract loaded in OptiMantra) is in place.
 */
export const SCREEN_MEDICARE = true;

/** Per concern entry points into the guided start (used by tiles and the home page picker). */
export const BOOKING_BY_CONCERN: Record<string, string> = {
  menopause: "/book?concern=menopause",
  "hormone-therapy": "/book?concern=hormone-therapy",
  "birth-control": "/book?concern=birth-control",
  intimacy: "/book?concern=intimacy",
  periods: "/book?concern=periods",
  labs: "/book?concern=labs",
  else: "/book?concern=else",
};

export const SITE = {
  name: "SheWellRX",
  url: "https://shewellrx.com",
  email: "njobgyn@gmail.com",
} as const;

export const DOCTOR = {
  name: "Huseyin Copur, MD",
  shortName: "Dr. Copur",
  credentials: "MD, FACOG",
  practice: "FirstChoice ObGyn LLC",
  specialty: "Obstetrics & Gynecology",
  boardCertifiedSince: 1989,
  practicingSince: 2002, // private practice in northern NJ
  languages: ["English"],
  memberships: [
    "American Medical Association",
    "American College of Obstetricians and Gynecologists",
    "American Association of Gynecologic Laparoscopists",
    "American Society for Reproductive Medicine",
    "American Institute of Ultrasound in Medicine",
    "Association of Professors of Gynecology and Obstetrics",
  ],
  // TODO: confirm current hospital affiliations with Dr. Copur before launch.
  // Verified via the practice site plus the Hackensack Meridian directory.
  affiliations: [
    "Hackensack University Medical Center",
    "Hackensack Meridian Mountainside Medical Center",
  ],
} as const;

/**
 * Second clinician. Verified 2026-08-24 via the NPI registry (1093543399),
 * the St. Joseph's Health directory, and the Rutgers University Libraries
 * repository. She is a doctorally prepared certified nurse midwife, not an
 * MD, and the site is careful to say so accurately.
 * TODO: confirm bio wording, languages, and her role at SheWellRX with her
 * directly before launch.
 */
export const DOCTOR2 = {
  /** Not yet bookable. She is added as an OptiMantra practitioner later. */
  status: "joining" as const,
  name: "Nurefsan Copur, DNP, CNM",
  shortName: "Nurefsan Copur",
  credentials: "DNP, CNM",
  specialty: "Midwifery & Women's Health",
  languages: ["English", "Spanish (intermediate)"],
  npi: "1093543399",
  education: "Doctor of Nursing Practice, Rutgers School of Nursing, 2024",
  affiliation: "St. Joseph's University Medical Center, Paterson, NJ",
  research:
    "Published doctoral research on supporting healthy gestational weight through app based pregnancy tracking (Rutgers University, 2024)",
  bio: "Nurefsan Copur is a doctorally prepared certified nurse midwife. Her side of the practice is the everyday fabric of women's health: contraception counseling, cycle concerns, and the questions that feel too small for an appointment but too big to ignore. She sees patients in English and speaks intermediate Spanish.",
} as const;

/** Treatment areas shown as visual tiles. Slugs anchor to /services. */
export const TREATMENTS = [
  {
    slug: "birth-control",
    title: "Birth control",
    blurb: "Find the method that fits your body and your plans, prescribed in one visit.",
    examples: ["Combined pills", "Progestin only pills", "Patch and ring options"],
  },
  {
    slug: "menopause",
    title: "Menopause relief",
    blurb: "Hot flashes, night sweats, and sleep that fell apart. There are real treatments.",
    examples: ["Hormone therapy", "Non hormonal options", "Sleep and mood support"],
  },
  {
    slug: "hormone-therapy",
    title: "Hormone therapy",
    blurb: "Estrogen and progesterone care matched to your history, started safely.",
    examples: ["Estradiol patches", "Micronized progesterone", "Low dose regimens"],
  },
  {
    slug: "sexual-health",
    title: "Sexual health",
    blurb: "Dryness, discomfort, and low desire are medical concerns, not embarrassments.",
    examples: ["Vaginal estrogen", "Moisturizers and comfort care", "Libido evaluation"],
  },
  {
    slug: "periods",
    title: "Period problems",
    blurb: "Heavy, painful, or unpredictable cycles deserve answers, not a shrug.",
    examples: ["Cycle regulation", "Bleeding evaluation", "PCOS care"],
  },
  {
    slug: "labs",
    title: "Labs and screenings",
    blurb: "Targeted lab work ordered when your plan truly calls for it, near your home.",
    examples: ["Hormone panels", "Thyroid testing", "Preventive screenings"],
  },
] as const;

/**
 * The physical office is closing; SheWellRX is a fully virtual practice.
 * Keep the address here for records and the Google listing link only.
 * Never display the street address on any page or invite office visits.
 */
export const PRACTICE = {
  address: "1115 Clifton Ave, Suite 104, Clifton, NJ 07013",
  phone: "(201) 441-9300",
  phoneHref: "tel:+12014419300",
  website: "https://firstchoiceobgyn.com",
  googleMapsUrl:
    "https://www.google.com/maps/place/FirstChoice+ObGyn+LLC:+Copur+Huseyin+MD/@40.8600465,-74.166835,17z",
} as const;

/**
 * Review data verified live on Google Maps and other platforms, 2026-08-24.
 * TODO for "real time": wire a Cloudflare Pages Function to the Google Places
 * API (needs the owner's API key) and refresh these numbers on a schedule.
 */
export const REVIEWS = {
  google: { rating: 4.9, count: 228, asOf: "August 2026" },
  healthgrades: { rating: 4.6, count: 35 },
  zocdoc: { rating: 5.0, count: 7 },
  vitals: { rating: 4.5, count: 24 },
  quotes: [
    {
      name: "Julie",
      when: "December 2025",
      text: "Dr. Copur delivered both of my boys, and I couldn't have asked for a better OB-GYN. He always took the time to answer all of my questions and made sure I felt informed and at ease. During my birthing experiences, his calm and reassuring presence truly gave me peace of mind. He is exceptional!",
    },
    {
      name: "ilknur",
      when: "May 2026",
      text: "Dr. Çopur Hüseyin is an amazing OB-GYN doctor. He is kind, professional, patient, and always makes me feel comfortable during my appointments. He takes the time to explain everything clearly and truly cares about his patients.",
    },
    {
      name: "Demet",
      when: "March 2026",
      text: "Dr. Huseyin Copur is an excellent OB-GYN—professional, knowledgeable, and very caring. He takes the time to listen and makes you feel comfortable and confident in his care. The office staff are also wonderful.",
    },
    {
      name: "Mujgan",
      when: "December 2025",
      text: "From the very first day, he has been incredibly understanding, patient, and genuinely caring. One thing I really appreciate is that the office has an on-site ultrasound, which brings so much peace of mind.",
    },
  ],
} as const;

/**
 * Flat cash pricing. One time payment per visit, no insurance, no membership.
 * Chosen from market research (see docs/pricing-intake-data-research.md).
 */
export const PRICING = {
  initial: {
    price: 249,
    label: "Initial visit",
    duration: "30 minutes",
    includes: [
      "A full video visit with our doctors, never a chatbot",
      "Review of your complete health history",
      "A written treatment plan you keep",
      "Prescriptions sent to your pharmacy when appropriate",
      "Lab orders when your plan calls for them",
      "Message follow up for 14 days after your visit",
    ],
  },
  followUp: {
    price: 149,
    label: "Follow up visit",
    duration: "30 minutes",
    includes: [
      "A video visit with the clinician who already knows you",
      "Progress review and plan adjustments",
      "Prescription renewals when appropriate",
      "Message follow up for 14 days after your visit",
    ],
  },
} as const;
