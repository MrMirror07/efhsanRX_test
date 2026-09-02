/**
 * Condition pages for search and for patients. Each entry renders at
 * /conditions/<slug>/ through src/pages/conditions/[slug].astro. Copy is
 * written for a New Jersey, video only, self pay ObGyn practice: it explains
 * what a video visit can and cannot do, and never promises a prescription.
 * Every page is reviewed by Dr. Copur; update `reviewed` when the text changes.
 */
export type Condition = {
  slug: string;
  concern: string; // key used by /book?concern=
  name: string; // short condition name for headings
  title: string; // <title>, keep under 60 characters
  description: string; // meta description, under 160 characters
  h1: string;
  intro: string;
  eyebrow: string;
  symptoms: string[];
  whatWeDo: { title: string; body: string }[];
  prescribe: string[];
  inPerson: string[];
  faq: { q: string; a: string }[];
  related: string[]; // slugs
  medicalCondition: string; // schema.org MedicalCondition name
  reviewed: string;
  img: "menopause" | "hormone" | "birth-control" | "periods" | "intimacy" | "labs";
};

export const CONDITIONS: Condition[] = [
  {
    slug: "menopause-treatment-new-jersey",
    concern: "menopause",
    name: "Menopause and perimenopause",
    title: "Menopause Treatment Online in New Jersey | SheWellRX",
    description:
      "Perimenopause and menopause care by video in New Jersey. Hot flashes, sleep, mood, and dryness treated by a board certified ObGyn. $249 flat, no insurance.",
    h1: "Relief from perimenopause and menopause symptoms, by video, across New Jersey",
    eyebrow: "Menopause · New Jersey telehealth",
    intro:
      "Night sweats that interrupt sleep, hot flashes during the day, and changes in mood or memory are common signs of perimenopause, which often begins in the forties and can continue for years before periods stop. These symptoms are well understood and respond to treatment. SheWellRX offers thirty minute video visits with a board certified ObGyn with more than thirty five years of experience in menopause care, for women anywhere in New Jersey.",
    symptoms: [
      "Hot flashes or night sweats",
      "Waking at night and not getting back to sleep",
      "Irritability, anxiety, or low mood",
      "Difficulty with concentration or word finding",
      "Periods that come closer together, farther apart, or heavier",
      "Vaginal dryness or pain with sex",
      "New joint aches or palpitations",
      "Changes in weight distribution",
    ],
    whatWeDo: [
      {
        title: "Your history, reviewed before you meet",
        body: "Your intake asks about your cycle, your symptoms and how much they bother you, and the conditions that decide which treatments are safe. Your clinician reviews it before the visit begins, so the thirty minutes are spent on you.",
      },
      {
        title: "Diagnosis from your history, with testing only when it changes the plan",
        body: "For most women over forty five, perimenopause and menopause are diagnosed by symptoms and cycle history. Hormone levels swing day to day, so routine testing rarely helps. When thyroid, blood counts, or other labs would change the decision, we order them at a lab near you.",
      },
      {
        title: "Treatment matched to your risks and preferences",
        body: "Menopausal hormone therapy relieves hot flashes and night sweats better than any other treatment, and it is safe for many women when started at the right time. If it is not the right choice for you, non hormonal medications and vaginal estrogen are effective alternatives. Your care plan is written, and it is yours to keep.",
      },
      {
        title: "Follow-up that continues",
        body: "Two weeks of secure messaging are included with every visit, and follow-up visits are $149. Doses are adjusted, side effects are addressed, and your plan is reviewed at each step.",
      },
    ],
    prescribe: [
      "Menopausal hormone therapy: estradiol patches, gels, sprays, or tablets, with micronized progesterone when you have a uterus",
      "Non hormonal treatments for hot flashes, including fezolinetant, low dose paroxetine, gabapentin, and others when appropriate",
      "Vaginal estrogen creams, tablets, or rings for dryness and pain with sex",
      "Sleep and mood support as part of the same plan, with referral when specialist care is needed",
    ],
    inPerson: [
      "Bleeding after twelve months without a period, which always needs an in person evaluation",
      "A breast lump, new nipple discharge, or an abnormal mammogram",
      "Very heavy bleeding with dizziness or fainting",
      "Any concern that needs an examination, ultrasound, or biopsy; we arrange the referral and your records follow you",
    ],
    faq: [
      {
        q: "Can menopause really be treated over video?",
        a: "Yes. Perimenopause and menopause are diagnosed from your symptoms and cycle history, and most treatments are medications that a licensed New Jersey physician can prescribe after a live video visit. The exam matters for a few situations, such as bleeding after menopause, and we tell you plainly when that is the case.",
      },
      {
        q: "Do I need hormone tests first?",
        a: "Usually not. Hormone levels fluctuate widely in perimenopause, so a single blood test rarely changes the plan. Laboratory testing is ordered when it would change a decision, for example to rule out thyroid disease or anemia.",
      },
      {
        q: "Is hormone therapy safe?",
        a: "For many women who start within about ten years of their last period and before sixty, and who have no history of breast cancer, blood clots, stroke, or liver disease, the benefits outweigh the risks. Transdermal estradiol carries a lower clot risk than pills. Your history guides the decision, and the discussion is candid.",
      },
      {
        q: "How much does it cost?",
        a: "The initial video visit is $249 and follow ups are $149, paid once at booking. Medications and any labs are billed by your pharmacy or lab at their prices. SheWellRX does not participate with insurance; you can request an itemized superbill for out of network benefits.",
      },
      {
        q: "Do I have to be in New Jersey?",
        a: "Yes. Your clinician is licensed in New Jersey, and telehealth law follows where the patient is during the visit, so you need to be physically in the state at the time of your video visit. You can live anywhere in New Jersey.",
      },
    ],
    related: ["hormone-therapy-new-jersey", "vaginal-dryness-painful-sex-new-jersey", "pcos-irregular-periods-new-jersey"],
    medicalCondition: "Menopause",
    reviewed: "2026-09-02",
    img: "menopause",
  },
  {
    slug: "hormone-therapy-new-jersey",
    concern: "hormone-therapy",
    name: "Hormone therapy",
    title: "Hormone Therapy for Menopause in New Jersey | SheWellRX",
    description:
      "Menopausal hormone therapy by video in New Jersey. Estradiol and progesterone matched to your history by a board certified ObGyn. Second opinions welcome.",
    h1: "Hormone therapy for menopause, guided by a specialist and your own history",
    eyebrow: "Hormone therapy · New Jersey telehealth",
    intro:
      "Menopausal hormone therapy has been debated publicly for twenty years, and the evidence is clearer than the headlines suggest. Started at the right dose for the right patient, it can meaningfully improve daily life. SheWellRX begins, adjusts, and reviews hormone therapy by video for women across New Jersey, and offers second opinions when a previous answer came without a full discussion.",
    symptoms: [
      "Hot flashes or night sweats that disrupt work or sleep",
      "Symptoms that came back after stopping hormones",
      "A current prescription that has never been adjusted",
      "You were told hormone therapy was not an option, without a full explanation",
      "Early menopause or surgical menopause before forty five",
      "Vaginal dryness that moisturizers have not relieved",
    ],
    whatWeDo: [
      {
        title: "Screen for the conditions that matter",
        body: "Breast, uterine, or ovarian cancer, blood clots, stroke or heart attack, migraine with aura, liver disease, unexplained bleeding, and smoking are the history that shapes the choice. The intake asks about each of them, and your clinician reviews your answers before you meet.",
      },
      {
        title: "Choose the form and the dose",
        body: "Transdermal estradiol (patch, gel, or spray) is preferred for many women because it carries a lower clot risk than tablets. Women with a uterus take progesterone to protect the lining. Vaginal estrogen treats dryness with minimal absorption. Doses start low and are adjusted at follow ups.",
      },
      {
        title: "Explain benefits and risks in plain language",
        body: "Relief of hot flashes, better sleep, protection against bone loss, and treatment of vaginal symptoms on one side; small increases in clot, stroke, and breast cancer risk that depend on age, timing, type, and your history on the other. You leave with the figures that apply to you.",
      },
      {
        title: "Review at every step",
        body: "Follow ups check symptom control, bleeding, blood pressure, and side effects, and revisit whether to continue each year. Screening such as mammograms continues on schedule with your local providers.",
      },
    ],
    prescribe: [
      "Estradiol patches, gels, sprays, and tablets",
      "Micronized progesterone and other progestogens for uterine protection",
      "Low dose and ultra low dose regimens designed to start gently",
      "Vaginal estrogen and DHEA for genitourinary symptoms",
      "Non hormonal alternatives when hormone therapy is not appropriate",
    ],
    inPerson: [
      "Unexplained vaginal bleeding before starting, or new bleeding on therapy that persists, which needs evaluation with ultrasound or biopsy",
      "A breast lump or an abnormal mammogram",
      "Chest pain, shortness of breath, or a swollen painful leg while on estrogen, which is an emergency: call 911",
    ],
    faq: [
      {
        q: "Can hormone therapy be started by telehealth in New Jersey?",
        a: "Yes. Estradiol and progesterone are not controlled substances. After a live video visit in which your clinician reviews your history and confirms the treatment is appropriate, the prescription is sent electronically to your pharmacy. New Jersey law does not allow prescribing from a questionnaire alone, and SheWellRX follows that rule.",
      },
      {
        q: "Is compounded or bioidentical hormone therapy better?",
        a: "FDA approved estradiol and micronized progesterone are themselves bioidentical, and they come in tested doses. Compounded pellets and creams are not FDA approved and do not have reliable dosing, so we start with approved products. If there is a specific reason to compound, we discuss it openly.",
      },
      {
        q: "How soon will I feel better?",
        a: "Hot flashes often improve within a few weeks; sleep and mood follow. Doses are reviewed at the follow up visit and adjusted if needed. Results vary and no outcome is guaranteed.",
      },
      {
        q: "What does it cost?",
        a: "$249 for the initial video visit and $149 for follow ups, paid once at booking. Medications are billed by your pharmacy; generic estradiol and progesterone are usually inexpensive with or without insurance.",
      },
    ],
    related: ["menopause-treatment-new-jersey", "vaginal-dryness-painful-sex-new-jersey", "online-gynecologist-new-jersey"],
    medicalCondition: "Menopause",
    reviewed: "2026-09-02",
    img: "hormone",
  },
  {
    slug: "birth-control-online-new-jersey",
    concern: "birth-control",
    name: "Birth control",
    title: "Birth Control Online in New Jersey | SheWellRX",
    description:
      "Birth control by video in New Jersey: the pill, patch, or ring matched to your health by a board certified ObGyn and sent to your pharmacy the same day.",
    h1: "Birth control prescribed online, matched to your health and your plans",
    eyebrow: "Birth control · New Jersey telehealth",
    intro:
      "There is no single best contraceptive, only the one that fits your history and what you want the next few years to look like. In a thirty minute video visit, a board certified ObGyn walks through the options with you, checks the safety questions that matter, and sends the prescription to the New Jersey pharmacy you choose, the same day when it is appropriate.",
    symptoms: [
      "Starting birth control for the first time",
      "Switching because of side effects, bleeding, or mood",
      "Renewing a current prescription",
      "Preferring fewer or no periods",
      "Needing an estrogen free option because of migraines or blood pressure",
      "Questions about emergency contraception",
    ],
    whatWeDo: [
      {
        title: "Check the safety questions first",
        body: "Estrogen containing methods are not safe for everyone: migraine with aura, smoking after thirty five, uncontrolled high blood pressure, a history of blood clots or stroke, and some cancers rule them out. The intake asks each one, and a recent blood pressure reading is part of the plan.",
      },
      {
        title: "Match the method to your life",
        body: "A daily pill, a weekly patch, a monthly ring, or a progestin only option. Fewer periods, lighter periods, acne, or simplicity, whatever matters most to you shapes the choice.",
      },
      {
        title: "Send it to your pharmacy",
        body: "When a method is appropriate, the prescription goes electronically to the New Jersey pharmacy you choose, usually the same day. You leave with a plan for the first three months and what to expect.",
      },
      {
        title: "Refer for methods that require a procedure",
        body: "IUDs and the implant are excellent methods that require an in person procedure. If one of them is right for you, we say so and connect you with a local office.",
      },
    ],
    prescribe: [
      "Combined estrogen and progestin pills, including extended cycle regimens",
      "Progestin only pills for women who should avoid estrogen",
      "The contraceptive patch and vaginal ring",
      "Guidance on emergency contraception and where to get it quickly",
    ],
    inPerson: [
      "IUD or implant placement, which we refer to a local office",
      "Severe pelvic pain, very heavy bleeding, or a positive pregnancy test with pain or bleeding",
      "Sudden severe headache, chest pain, leg swelling, or vision changes on a hormonal method, which are emergencies: call 911",
    ],
    faq: [
      {
        q: "Can I get birth control online in New Jersey without an exam?",
        a: "Yes, for the pill, patch, and ring. Guidelines from the American College of Obstetricians and Gynecologists state that a pelvic exam and Pap test are not required to start hormonal contraception. What is required is a real history, a blood pressure check for estrogen methods, and a live visit with a New Jersey licensed clinician. Screening tests still happen on their normal schedule.",
      },
      {
        q: "How fast will my prescription be ready?",
        a: "When a method is appropriate, it is sent electronically during or right after your visit, and most pharmacies fill it the same day.",
      },
      {
        q: "Do you prescribe for minors?",
        a: "SheWellRX sees adults eighteen and older by video. Younger patients can be seen by pediatric and adolescent gynecology offices in New Jersey.",
      },
      {
        q: "What does it cost?",
        a: "$249 for the initial visit and $149 for follow ups and renewals, paid once at booking. The medication is billed by your pharmacy; many generic pills cost little with or without insurance.",
      },
    ],
    related: ["pcos-irregular-periods-new-jersey", "vaginal-dryness-painful-sex-new-jersey", "online-gynecologist-new-jersey"],
    medicalCondition: "Contraception",
    reviewed: "2026-09-02",
    img: "birth-control",
  },
  {
    slug: "pcos-irregular-periods-new-jersey",
    concern: "periods",
    name: "PCOS and period problems",
    title: "PCOS and Irregular Periods Treatment in NJ | SheWellRX",
    description:
      "Heavy, painful, or irregular periods and PCOS evaluated by video in New Jersey. Labs and imaging when needed, and a written plan from a board certified ObGyn.",
    h1: "Heavy, painful, or irregular periods, evaluated carefully and treated",
    eyebrow: "Periods and PCOS · New Jersey telehealth",
    intro:
      "Bleeding that is heavier than it should be, cramping that interrupts daily life, cycles that become irregular or stop for months, or a diagnosis of polycystic ovary syndrome (PCOS) that came without a plan. Your menstrual cycle reflects your overall health, and changes in it deserve a careful evaluation. A video visit with a board certified ObGyn is a structured assessment: the pattern, the causes to rule out, the tests that would change the answer, and a plan you can begin.",
    symptoms: [
      "Bleeding that soaks a pad or tampon every hour or two",
      "Periods lasting more than seven days or clots larger than a quarter",
      "Cycles shorter than twenty one or longer than thirty five days",
      "Fewer than eight periods a year",
      "Bleeding between periods or after sex",
      "Menstrual pain that does not respond to over the counter medicine",
      "Acne, excess hair growth, or scalp hair thinning with irregular cycles",
    ],
    whatWeDo: [
      {
        title: "Map the pattern",
        body: "How often, how heavy, how long, and since when. The intake collects a bleeding history so the visit begins with a clear picture.",
      },
      {
        title: "Rule out the causes that matter",
        body: "Thyroid disease, anemia, pregnancy, prolactin problems, clotting disorders, fibroids, polyps, and PCOS each have a different path. Labs are ordered at a lab near you and a pelvic ultrasound at a local imaging center when the story calls for it.",
      },
      {
        title: "Treat the cycle, not just the symptom",
        body: "Hormonal options regulate cycles and lighten bleeding. Tranexamic acid reduces heavy bleeding without hormones. PCOS care addresses cycles, androgen symptoms, and metabolic health together, with lifestyle support and medication when appropriate.",
      },
      {
        title: "Tell you clearly when in-person care is needed",
        body: "Some bleeding needs a biopsy or a procedure, and some pain needs an exam. We refer, send your records, and stay involved.",
      },
    ],
    prescribe: [
      "Cycle regulation with combined or progestin only hormonal options",
      "Tranexamic acid or hormonal treatment for heavy menstrual bleeding",
      "PCOS treatment plans, including options for irregular cycles, acne, and excess hair growth",
      "Lab orders (thyroid, blood count, hormone and metabolic panels) and pelvic ultrasound orders near your home",
    ],
    inPerson: [
      "Soaking a pad or tampon every hour for two hours or more, dizziness, or fainting: go to the emergency room",
      "Bleeding after menopause, or bleeding with a positive pregnancy test",
      "Persistent bleeding between periods after forty, which may need a biopsy",
      "Severe pelvic pain with fever",
    ],
    faq: [
      {
        q: "Can PCOS be diagnosed by telehealth?",
        a: "Often, yes. The diagnosis rests on cycle history, signs of excess androgens, and, when needed, labs and an ultrasound that can be ordered from a video visit and done near your home. Your clinician reviews the results with you and builds the plan.",
      },
      {
        q: "Will I need an ultrasound?",
        a: "Sometimes. Heavy or irregular bleeding after forty, bleeding between periods, or suspected fibroids or polyps usually call for a pelvic ultrasound, which is done at a local imaging center with an order from us.",
      },
      {
        q: "Is this an emergency?",
        a: "Bleeding that soaks protection every hour for two hours or more, fainting, or severe pain with fever requires emergency care rather than a video visit. Otherwise a prompt video visit is the right next step.",
      },
      {
        q: "What does it cost?",
        a: "$249 for the initial video visit and $149 for follow ups, paid at booking. Labs and imaging are billed by the lab or imaging center; we tell you what we are ordering and why before we order it.",
      },
    ],
    related: ["birth-control-online-new-jersey", "menopause-treatment-new-jersey", "online-gynecologist-new-jersey"],
    medicalCondition: "Polycystic ovary syndrome",
    reviewed: "2026-09-02",
    img: "periods",
  },
  {
    slug: "vaginal-dryness-painful-sex-new-jersey",
    concern: "intimacy",
    name: "Vaginal dryness, pain with intimacy, and low desire",
    title: "Vaginal Dryness and Painful Sex Treatment in NJ | SheWellRX",
    description:
      "Vaginal dryness, pain with intimacy, and low desire treated by video in New Jersey. Vaginal estrogen and comfort care from a board certified ObGyn, in private.",
    h1: "Vaginal dryness, pain with intimacy, and low desire are medical conditions, and they are treatable",
    eyebrow: "Sexual health · New Jersey telehealth",
    intro:
      "Dryness, burning, pain with intimacy, recurrent urinary symptoms, or a loss of desire that has not returned. These are medical conditions with established treatments, and they receive the same care and seriousness as any other diagnosis. A video visit is a private conversation from your own home with a board certified ObGyn, and treatment can often begin the same week.",
    symptoms: [
      "Vaginal dryness, itching, or burning",
      "Pain at entry or deep pain during intimacy",
      "Bleeding or tearing with intimacy",
      "Urgency, frequency, or repeated urinary infections after menopause",
      "Low sexual desire that concerns you",
      "Difficulty with arousal or orgasm",
    ],
    whatWeDo: [
      {
        title: "Name the cause",
        body: "After menopause, falling estrogen thins and dries vaginal tissue, a condition called genitourinary syndrome of menopause. Pain can also come from pelvic floor muscles, infections, skin conditions, or medications. The history sorts these out, and an exam is arranged locally when it would change the plan.",
      },
      {
        title: "Treat the tissue",
        body: "Low dose vaginal estrogen, as a cream, tablet, or ring, restores the tissue with minimal absorption into the body and is considered safe for most women, including many with a history of breast cancer after discussion with their oncologist. Vaginal moisturizers and lubricants that are known to be effective are part of the plan.",
      },
      {
        title: "Address desire with care",
        body: "Low desire has many inputs: pain, sleep, mood, medications such as antidepressants, hormones, and relationships. The visit looks at all of them. Medication options exist for some women, and referral to pelvic floor physical therapy or sex therapy is offered when it is the better answer.",
      },
      {
        title: "Follow-up in private",
        body: "Two weeks of secure messaging come with every visit so treatment can be adjusted without another appointment.",
      },
    ],
    prescribe: [
      "Vaginal estrogen creams, tablets, and rings",
      "Vaginal DHEA (prasterone) and ospemifene when appropriate",
      "Moisturizer and lubricant regimens that work",
      "Evaluation of medications that lower desire, and referral to pelvic floor physical therapy",
    ],
    inPerson: [
      "New bleeding after menopause",
      "A visible sore, lump, or persistent skin change that needs examination",
      "Pain that does not improve with treatment, which may need a pelvic exam and pelvic floor assessment",
    ],
    faq: [
      {
        q: "Can vaginal estrogen be prescribed by video?",
        a: "Yes. After a live video visit and a review of your history, your clinician can prescribe vaginal estrogen, which is sent electronically to your pharmacy. It is a local, low dose treatment that most women can use safely.",
      },
      {
        q: "I had breast cancer. Are there options?",
        a: "Often, yes. Non hormonal moisturizers and lubricants come first, and low dose vaginal estrogen is used by many survivors after a conversation with their oncologist. We coordinate with your oncology team.",
      },
      {
        q: "Is this visit private?",
        a: "Completely. You join from wherever you are comfortable, your health information lives only in our HIPAA compliant portal, and visits are never recorded.",
      },
      {
        q: "What does it cost?",
        a: "$249 for the initial visit and $149 for follow ups, paid once at booking. Prescriptions are billed by your pharmacy.",
      },
    ],
    related: ["menopause-treatment-new-jersey", "hormone-therapy-new-jersey", "online-gynecologist-new-jersey"],
    medicalCondition: "Genitourinary syndrome of menopause",
    reviewed: "2026-09-02",
    img: "intimacy",
  },
];

export const NJ_COUNTIES = [
  "Atlantic", "Bergen", "Burlington", "Camden", "Cape May", "Cumberland", "Essex", "Gloucester", "Hudson", "Hunterdon", "Mercer",
  "Middlesex", "Monmouth", "Morris", "Ocean", "Passaic", "Salem", "Somerset", "Sussex", "Union", "Warren",
];

export const NJ_CITIES = [
  "Newark", "Jersey City", "Paterson", "Elizabeth", "Clifton", "Edison", "Woodbridge", "Lakewood", "Toms River", "Hoboken",
  "Trenton", "Hackensack", "Montclair", "Morristown", "Princeton", "Cherry Hill", "Ridgewood", "Summit", "Red Bank", "Wayne",
];
