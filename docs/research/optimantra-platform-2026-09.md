# OptiMantra for SheWellRX: integration research report

Prepared 2026-09-01 for shewellrx.com (Astro static site on Cloudflare Pages), Dr. Huseyin Copur, MD. Self-pay telehealth. Desired flow: website -> pick symptom/reason -> screening questions -> pick a time -> pay at the end -> confirmation -> video visit -> follow-ups. Plus a 36 GB legacy-records import.

## How to read the evidence tags

- **[KB]** OptiMantra's official Knowledge Base at `https://optimantra.zendesk.com/hc/en-us` (223 articles). The HTML pages return HTTP 403 to non-browser clients, but the public Zendesk JSON API (`/api/v2/help_center/en-us/articles.json`) is open; every KB article cited below was pulled in full through that API on 2026-09-01. Article URLs are of the form `https://optimantra.zendesk.com/hc/en-us/articles/<id>-<slug>`.
- **[WEB]** optimantra.com marketing/legal pages.
- **[OBS]** Observed directly on live, public OptiMantra booking pages and their HTML/JavaScript on 2026-09-01 (no forms were submitted).
- **[ADMIN]** Verified by you inside the practice's live OptiMantra admin (per your message); used as-is, not re-researched.
- **[3P]** Third-party source (review sites, partners, press).
- **[UNVERIFIED]** Could not be confirmed from any primary source; treat as a hypothesis to test in the trial account.

Note on a decoy: Google still indexes an older help center at `optimantrainc.zendesk.com` (article IDs 4234...). That host now shows Zendesk's "Help Center Closed" page; the live KB is `optimantra.zendesk.com` (IDs 5368...). `optimantra.freshdesk.com` also exists but redirects to a login page; its contents could not be verified.

---

## 1. What OptiMantra is, company status, pricing and tiers (2026)

**What it is.** A cloud EMR + practice-management + patient-engagement platform for integrative/wellness/functional/behavioral/DPC/medspa practices; founded 2011, Nashville TN. [WEB: https://www.optimantra.com/about-us]

**Company status (important).** Cerbo (MD HQ) and OptiMantra announced a merger on 2025-12-03 under new CEO Jeff Hindman; stated roadmap: AI, CRM, payments. [3P: https://www.prnewswire.com/news-releases/cerbo-and-optimantra-announce-merger-under-new-ceo-jeff-hindman-302631426.html] A third-party scorecard states "the products remain operationally separate today." [3P: https://olihealth.ai/blog/best-ehr-functional-naturopathic-medicine-2026/] OptiMantra's own Dec-2025 incident report says the outages were "not related in any way to the recent merger with Cerbo." [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685162582683--December-15-2025-OptiMantra-Incident-Report]

**There is one plan, priced per provider, plus add-ons (no feature tiers).**

| Item | Price | Source |
|---|---|---|
| First full-time provider | $99/mo | [WEB: https://www.optimantra.com/pricing] [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684513095835-Understand-pricing] [ADMIN] |
| Each additional full-time provider | $49/mo | same |
| Part-time provider (<50 interactions/mo; interaction = chart note, appointment or superbill) | 30% off ($69 first / $34.30 additional) | [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684254114843-OptiMantra-Subscription-Payment-FAQs] [ADMIN] |
| Clinical staff (MA/PA/RN who chart but do not see own patients) | $25/mo full-time, $18 part-time | [KB Understand pricing] [ADMIN] |
| Office/clerical staff | Free | [WEB pricing] |
| Supervising physician / chart co-signer | Free | [KB Understand pricing; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684305366939-Co-signing-chart-notes] |
| eRx (MDToolbox/Surescripts) incl. EPCS | $38/mo per prescriber (+ optional $50 hardware token + $5/mo) | [KB Understand pricing] [WEB: https://www.optimantra.com/blog/how-to-set-up-and-use-e-prescribing-erx-in-optimantra] |
| Fax number (Sfax) | $25/mo, 250 pages incl., 8c/page after | [KB Understand pricing] |
| Two-way texting (adds 2-hour same-day reminders + automated reviews) | $75/mo for 1,500 segments, 3c/segment after | [KB Understand pricing] |
| Group texting (requires 2-way) | $100/mo for 2,000 segments | [KB Understand pricing] |
| Insurance billing | $0.25/claim, $0.13/eligibility check | [KB Understand pricing] |
| Discounts (not stackable) | Students 50%, part-time/community 30%, NPs & PAs 20% | [WEB pricing] |
| Trial | 15 days, full platform, no card | [WEB: https://www.optimantra.com/trial] |
| Cancellation | 30-day notice; access for 30 more days | [KB Subscription Payment FAQs] |
| Read-only plan | $15/mo | [KB Subscription Payment FAQs] |
| Express Onboarding | $250 (group, multi-hour) | [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685019767195-Onboarding-Resources] |
| Managed Onboarding | $500 solo; $750-$1,000+ group; ~3 weeks | same |
| Data export on leaving | First free (4 weeks notice, PDFs); $500 each thereafter | [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684553980571-Export-data-out-of-OptiMantra] |

**Included in the base subscription (no extra cost):** online booking, patient portal + kiosk, intake/consent/questionnaire builder, built-in telehealth video (Twilio), one-way text reminders 1+ days ahead, email reminders/templates, superbills, packages/memberships/recurring billing, gift cards, invoicing, Good Faith Estimates, outbound CRM webhooks, Google/Outlook calendar sync, labs (integrated labs no extra charge), mobile apps, analytics, basic data import. [KB Understand pricing; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684947273883-Onboarding-Setup-Guide] Note: "until the subscription has been started, add-on features such as eRx, Fax, Two-way texting, Labs integration, etc. cannot be added i.e. these features are not available during the trial period." [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685129093915-Configure-Business]

**Stripe processing:** 2.9% + $0.30. Fiserv: negotiated. [WEB: https://www.optimantra.com/faq]

---

## 2. Online booking (public self-scheduling)

### 2.1 Where it lives and how you get the link/embed
- Settings > Scheduling > Online Booking > Location Settings: scheduler appearance (colors, logo, notice text), text confirmations, online payments, **Confirmation Page** URL, and "Preview Online Booking" -> "Copy Booking URL to Clipboard". One link per location. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684552315547-Configure-and-Troubleshoot-Online-Booking] [ADMIN]
- Two official ways to add to a website: (a) a button linking to the URL; (b) an iframe. Official snippet: `<iframe frameborder="0" height="100%" scrolling="no" src="https://www.optimantra.com/optimus/patient/patientaccess/add_your_unique_link_here" width="100%"></iframe>`. OptiMantra explicitly "does not assist with website or booking-link setup." [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685098610331-Configure-Scheduling; KB Configure and Troubleshoot Online Booking]
- The marketing blog describes a "pop-up iFrame" approach so "clients feel like they've never left your site." [WEB: https://www.optimantra.com/blog/how-to-brand-your-optimantra-or-other-emr-booking-link-for-a-seamless-client-experience]
- [OBS] The booking page returns no `X-Frame-Options` or `Content-Security-Policy` header, so it is frame-able from shewellrx.com. It is served behind Cloudflare, sets an `OPTIMUSSESSION` cookie (`SameSite=Lax`), and loads Google reCAPTCHA v3 (reCAPTCHA is applied to public pages: booking, gift cards, invoice payment [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685241900059-May-23rd-2026-Release-Notes]).

### 2.2 URL families (all under `https://www.optimantra.com/optimus/patient/patientaccess/`)
| Page | URL pattern | Evidence |
|---|---|---|
| Full service list (step 1) | `servicesall?pid=<enc>&lid=<enc>` | [ADMIN] [OBS] |
| Modality landing (extra first step) | `modalities?pid=&lid=` | [KB Configure and Troubleshoot Online Booking] [OBS] |
| Service list filtered to a modality | `/optimus/om/patientaccess/servicesallV2?...&mid=<n>&pid=&lid=` | [OBS] |
| Date/time (step 2) | `practsNslotsNEW?sid=<enc>&unCryptedSid=<n>&pid=&lid=...` | [ADMIN] [OBS] |
| Patient info + card (step 3) | `patientDetails?...` (route seen in page JS) | [OBS] |
| Confirmation page | `appointment-created-details?pid=&lid=&serviceName=&practName=&apptTime=&apptDate=&first=&last=&email=...` | [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684653628059-Configure-marketing-conversion-tracking] |
| Prospect registration form | `prospects?pid=<enc>` | [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684441066267-Create-a-prospect-registration-form-on-your-website] [OBS] |
| Patient portal login | `https://www.optimantra.com/optimus/om/patient/login` (optionally `?accessPoint=<enc>`) | [KB portal articles] [OBS] |
| Public questionnaire link (per patient) | `/optimus/om/public/customQuestionnaireForm?did=&uid=&pid=&custQustId=` | [OBS] |

### 2.3 URL parameters
**Officially documented prefill parameters** (for CRM links; they work on the `servicesall` link): `src` (required, e.g. `booking`, `GHL`, `ZOHO`), `srcid` (your ID for the person), `first`, `last`, `email`, `ph`, `dob`, `address`, `city`, `state`, `zip`. "Our Online Booking will read the URLs and pre-populate the patient demographics." [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684773173275-Auto-populated-online-booking-CRM-connector-links]

**UTM passthrough** (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) is preserved through to the confirmation page for GA4; your site must append them dynamically (websites "do not automatically pass UTM parameters to third party sites"). [KB Configure marketing conversion tracking]

**Additional parameters seen in the scheduler's own JavaScript** [OBS]; undocumented, test before relying on them: `sid`/`unCryptedSid` (service), `uid` (practitioner user id; the code comment says a provider-specific link "carr[ies] the practitioner through as `pract`... so the next step pre-selects them"), `mid` (modality), `addOnSids`, `hideHeaderInFrame`, `hideFooterInFrame`, `comments`, `selPatId`, `additionalReqParamJson`, `isMobileApp`, `clienttzoffset`, `tzId`, `date`, `min`, `version=v2`.
- [OBS] `&hideHeaderInFrame=1&hideFooterInFrame=1` removed the practice header (name/address/phone) and OptiMantra footer from the step-1 page; the values `true` and `Y` did nothing. Useful inside an iframe. [UNVERIFIED whether this is officially supported.]
- Passing `&comments=` to prefill "Reason for Visit or Comments" is plausible from the code but [UNVERIFIED].

**Per-service deep links.** Both you [ADMIN] and the live pages [OBS] show step-2 URLs carrying `sid`. The KB's sanctioned way to expose only some services is the Modalities view plus "pull the URL specific to the page you'd like to privately embed" with "Practitioner Selector" set to No. [KB Configure Scheduling] Whether `sid` values are stable over time is [UNVERIFIED]; re-check after editing a service.

### 2.4 Payment at booking
Location-level setting under Location Settings > Payment Deposits (you saw it labelled "Payment For Booking" with four options: Not Required / Just Save Card On File / A Deposit Is Required / Full Payment Is Required [ADMIN]; the KB article lists three and separately mentions "When full payment is required"). Behaviour [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684498461595-Requiring-Deposits-for-Online-Booking]:
- Not Required: no payment section on the booking page.
- Save Card on File: card tokenized and stored, nothing charged; the patient is told "their card was saved and their appointment was secured" (wording fixed Oct 2025 [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684836204699-Release-Notes-October-10-2025-Version-History-Release-Notes]).
- Deposit Required: **one deposit amount for all services** ("cannot be varied by service"); the deposit "will create a credit memo for the patient to use on the day of the visit."
- Full payment: "the paid in full superbill will correlate with a superbill dated the Date of Visit."
- Per-service override (service > Payments tab > Payment Policy Override): only "Require No Payment" or "No Saved Card Required". You cannot set a different deposit per service.
- "If you have set any payment requirements this will be required each time the patient books an appointment" (a Capterra reviewer complains patients must enter a card every time [3P: https://www.capterra.com/p/159365/OptiMantra/reviews/]).
- Superbills are no longer created if the card is declined (fixed Jan 2026). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685165335835-January-31-2026-Release-Notes]
- Multiple practitioners with different Stripe accounts are supported in online booking; the booked provider's account is charged. [KB Oct 10 2025 version history]
- For your "pay at the end" flow: set **Full Payment Is Required**; each service then charges its own listed price at step 3. (Deposit mode cannot vary by service.)

### 2.5 What the patient sees, step by step [OBS, cross-checked with KB "Patient's View of Online Booking"]
1. **Step 1 of 3 - Select a Service.** Practice header (name, address, phone; can be hidden in frame, or "set your Header Background and Practice Address to the same color to hide your address" for telehealth-only [KB Onboarding Setup Guide]), your notice text ("Show full text" toggle), optional "Filter by Practitioner" dropdown, then service cards: name, description, duration (can be hidden), type label ("Office Visit"/"Procedure" - service types are only Office Visit / Procedure / Laboratory / Other [ADMIN]), price, optional "Suggested Add-Ons", and a **Proceed** button. Services must be flagged "Available for Online Booking" and assigned to practitioners/locations. [KB Configure and Troubleshoot Online Booking]
2. **Step 2 of 3 - Select a Date and Time.** "Slots time are in Eastern zone" style note (slots show in the browser's time zone [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684956420251-Time-Zone-selector-Explanation]); practitioner cards with "Next opening: ..."; a week grid of time buttons; "Sorry, they're booked / Go to next available date"; "Practitioner info" panel; **Proceed**. If only one practitioner offers the slot, selecting a time auto-advances. Availability comes from Availability by Shift (recommended) or by Week; anything on the calendar blocks online slots. A "gap in days" setting (now with 14 and 21) controls how far out patients can book. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685238187035-March-28-2026-Release-Notes]
3. **Step 3 of 3 - Complete Booking.** Summary line ("<service> With: <practitioner> At: 01:40 pm On Thu, 10 Sep 2026"), then a banner such as "A deposit of $50.00 will be charged." An **"Already A Client?"** button for returning patients. New-patient fields: First/Last/Preferred name, Email, Preferred Contact Number, **"Opt-in to text reminders" checkbox** (TCPA-style opt-in [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684419798299-Opt-out-and-in-management-for-text-messaging]), DOB (YYYY/MM/DD boxes), Sex at Birth, Ethnicity, Preferred Language, Race, Address/City/State (US states + Canadian provinces)/Zip, "Drivers License/State ID" (Personal ID, optional), "Reason For Visit Or Comments (Optional)". Which optional fields appear is controlled by Settings > Communications > Patient Portal and Kiosk > **Demographics Profile** (you can hide Insurance, Payment info, Gender identity, Race, Ethnicity, Pronouns from patient-facing surfaces). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685283090459-Demographics-Profile-Setup-and-Usage] Then the payment block: "A Deposit Will Be Charged With The Booking", name on card ("Copy From Demographics"), billing address, country, phone, **Card Details** (card.js form, reCAPTCHA v3). **No password is created at this step**; there is no portal account creation in the booking flow.
4. **Confirmation page** (`appointment-created-details...`) or redirect to your **Custom Confirmation Page** URL (e.g. `https://shewellrx.com/booking-confirmed`). Google Tag Manager conversion tags fire on this page; Facebook Pixel is "no longer support[ed]... as it is not HIPAA-compliant." [KB Configure marketing conversion tracking]
5. **Confirmation email** = the email template assigned to that service (Settings > Services > Services (Fee Schedule) > More Options > Assign Email Template To Service): "If you allow self-scheduling, this email template will serve as the automated email confirmation." It can contain intake/consent/questionnaire links, the portal sign-up instructions, and the `VIDEO_CHAT_LINK`. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685212099099-Patient-Communications-FAQs] Confirmation text is optional (Location Settings). Bookings can auto-confirm or require manual confirmation (a bug where manual-confirm bookings auto-confirmed was fixed 2026-05-01 [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685209575579-May-9th-2026-Release-Notes]). [WEB: https://www.optimantra.com/video-transcript]

### 2.6 New-patient account creation
Booking creates the patient record but not a portal login. Portal access requires the "Access to Patient Portal" checkbox in the patient's profile; the patient then uses **"New Sign Up"** on the login page to receive a set-password link, and must match email + first name + DOB exactly. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685261618971-Troubleshooting-Patient-Portal-Login-Issues-A-Guide-for-Clinics; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684749146139-How-Patients-Can-Complete-Forms-in-OptiMantra] Whether online-booked patients get the access box ticked automatically is [UNVERIFIED] - test in the trial. Family members can share one login (same email, then choose by first name + DOB). Accounts lock after 10 failed attempts. Portal support: portalsupport@optimantra.com.

### 2.7 Reminders / confirmations
- Reminder Email (per practitioner; days-in-advance; keywords incl. `VIDEO_CHAT_LINK`, `PATIENT_LINK_FOR_PRECONSULT_FORM`, `PATIENT_LINK_FOR_DEMOGRAPHICS`, `PATIENT_LINK_FOR_CLINICAL_PROFILE`, consent/questionnaire link keywords) and Reminder Text (days-in-advance; "Automated texts are sent at 10AM Eastern for Eastern, Central and Mountain time and 10AM PST for Pacific"; keep under 160 chars). Same-day 2-hour texts need the $75 two-way add-on. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684953866395-Set-up-Patient-Communications-in-OptiMantra-basic-set-up] [ADMIN]
- Email is sent from support@optimantra.com / no-reply@optimantra.com via OptiMantra's domain with opportunistic TLS; **a Reply-To on every user is mandatory** (blank reply-to breaks emails and patient form submissions). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684477020187-Troubleshoot-email-delivery-and-other-email-FAQs; KB Patient Communications FAQs]
- Cancellation email/text templates and a cancellation workflow exist; portal self-cancel window is set in Patient Portal settings. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684357610011-Email-and-text-your-cancellations]

### 2.8 Prospect Registration (the "screen before you book" tool)
Settings > Scheduling > Prospect Registration: choose services of interest, auto-tag (e.g. "website lead"), auto confirmation email, optional payment, custom instructions, notify up to 2 staff. Embeds as a button link; colors inherit from Online Booking Location Settings; **the patient must verify with their cell number** ("to verify they are a real person"). Registration creates a patient record and emails you (some details redacted). [KB Create a prospect registration form] [OBS: the live form shows demographics + insurance + a "Service" picker such as "New Patient - Email Link to Reserve an Appointment".]

---

## 3. Intake forms, consents and questionnaires

**Form types** (Settings > Forms): Consent Forms; Clinical Profile (personal/family history); Chart Note/Intake Form (the chart's Subjective sections double as the intake form); Custom Questionnaires; Patient Handouts (images, PDF, Excel, CSV, Word); Letter Templates. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685035307035-Configure-Forms] [ADMIN]

**Questionnaire builder.** Sections + questions; answer types **Text (short), Paragraph, Numeric, Radio, Checkbox, Dropdown, Matrix** (your admin shows "Word(s)" for short text); "Allow Resume Later"; weighted **subtotal/grand-total scoring** for numeric/radio answers; trending over time; shared Questionnaire Library (PHQ, GAD-7 etc.). **No conditional/branching logic is documented** [UNVERIFIED - none found in any article]. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684970764827-Create-and-Use-Consent-Forms-and-Custom-Questionnaires; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684618935451-Using-Questionnaires-to-Trend-Data]

**Consent forms.** Read-only body text + "Add An Input Line Item" fields (multiple choice, single answer, paragraph, numeric, text - all required); **date, patient signature and IP address are captured automatically** ("Please DO NOT add line items for date and patient signature"); signature can be drawn or typed (ADA); signed PDFs "reflect the text at the time of signing" (Jan 2026); practitioner co-signature of consents added March 2026; 1,000+ template library incl. telehealth/HIPAA/financial/cancellation consents (per marketing). [KB Create and Use Consent Forms...; KB Jan 31 2026 and March 28 2026 release notes; WEB: https://www.optimantra.com/blog/everything-your-combined-consent-and-practice-policies-need-to-cover-for-clinics]

**Tying forms to services / sending automatically.**
- Settings > Communications > Patient Portal and Kiosk: (a) consents "Required For All Clients"; (b) by appointment type: initial vs follow-up (from the service's Initial/Follow-up designation) - use the chart-note intake and/or a questionnaire; (c) **"Configure a Questionnaire" / "Configure A Consent Form" mapped to specific service(s)**. Forms then appear on the portal "until the appointment is completed" and only when "scheduled for a future appointment". Kiosk uses the same config. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685059017243-Configure-and-use-the-Patient-Portal-for-Forms-Messaging-and-more] [ADMIN]
- Email/text: insert form keywords into the service's confirmation template and reminder templates ("When sent: Code becomes a unique patient-specific link"; links are per patient - do not share). Text templates lack the form buttons (paste links manually). `PATIENT_LINK_FOR_PRECONSULT_FORM` sends the intake (Subjective) form. [KB Create and Use Consent Forms...; KB Configure Forms]
- Portal: patient logs in and completes; app supports the same.
- Kiosk: "allow patients who have not completed their forms ahead of time to complete them in the office" (tablet). Not useful for telehealth.

**Can completion be required before the visit?** There is **no hard gate** (no setting blocks the visit/video link if forms are incomplete) [UNVERIFIED as absent; nothing in KB]. Enforcement is by workflow: notification when intakes/questionnaires are completed (Settings > Communications > Reminder Email > Notification Email Destination; fixed May 2026), "Show notifications for all users", Shortcuts > Review Patient Forms, the red flag on the chart's Questionnaire button, the Notifications list at the top of the menu ("When patients have filled out intake forms, they are already showing in Shortcuts > Review Patient Forms and in each Patient Actions box > Submitted Intakes"; dismissing a notification dismisses it for all users) [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684502088987-Understand-notifications-list-above-OptiMantra-menu], and the pre-visit "Submitted Intakes" check. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684694379675-Viewing-Patient-Submitted-Forms; KB: https://optimantra.zendesk.com/hc/en-us/articles/54959696185755-Clinical-Workflow-Quick-Reference-Guide]

**Mapping answers into the chart.** Intake (Subjective) responses import into the chart's S sections ("Click the blue 'S' button"); questionnaire answers can be dropped "into your S,O,A,P or G sections", viewed as PDF, trended. Demographics/Clinical Profile forms write directly to the record. [KB Viewing Patient Submitted Forms; KB Patient Communications FAQs]

**Public/anonymous form links?** Not supported as anonymous: every emailed form URL "includes that patient's Patient ID" [KB Create and Use Consent Forms...]. The `customQuestionnaireForm?did=&uid=&pid=&custQustId=` URL seen in the wild [OBS] is such a patient-bound link. Writable/fillable PDFs can be uploaded and auto-filled with `@` fields. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685282175515-Writable-PDFs-in-OptiMantra]

**Pushing a website-hosted questionnaire's results into OptiMantra.** No inbound API, no inbound webhook, no Zapier action, no email-to-chart. Only routes: (1) the booking-link prefill parameters (demographics only); (2) Prospect Registration (creates the record; captures service interest); (3) OptiMantra's own questionnaire sent after booking; (4) manual/bulk CSV via support ticket (onboarding only); (5) upload a PDF of the answers to the patient's Documents (manual, 26 MB limit). "Optimantra does not support inbound webhooks. That means you can't push external data into the system." [3P: https://www.nexamed.us/post/how-to-connect-optimantra-to-your-crm-a-step-by-step-webhook-tutorial] Forms support will build your existing PDF/Word forms for you (live accounts only; 3-5 business days). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685259907227-How-to-Request-Specific-Forms-in-OptiMantra]

---

## 4. Telehealth

Source unless noted: [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685260811547-Telehealth-Video-Calls] (updated 2026-08-19) and the June 13 2026 release notes [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685279552923-June-13th-2026-Release-Notes].

- Built-in, included, **Twilio Video** for 1:1 and group (Zoom "is no longer used for group sessions"). Features: pre-session lobby (name, camera/mic preview, background blur, 7 virtual backgrounds - no custom uploads), in-session text chat, screen share (practitioner only), "End call for all". **No recording.** Links "are tokenized so they cannot be reused after the session ends"; media streams encrypted.
- **Limits:** 1:1 max 5 participants, 3 hours; group max 20, 3 hours (per participant clock).
- **Joining:** no app, plugin or account; browser only (current Chrome/Edge/Safari/Firefox; the disclaimer says Chrome). Patient link goes "directly to the video chat lobby" - no portal login needed. Deliver via `VIDEO_CHAT_LINK` in confirmation/reminder email and SMS templates, or the "Email Link / Text Link to Patient" buttons on the Video Chat page. Patients can also join from the patient login page ("Direct Access To Video Chat" with a meeting room number formatted like xxx-xxxxx) [OBS on https://www.optimantra.com/optimus/om/patient/login]. Mobile browser video was fixed April 2026.
- **Starting:** Patients or Scheduling > Actions menu > Video Chat (bottom of Point of Sale column) > Start Video Chat. Chart in a second window. Every invite text is logged in the messaging audit trail.
- **Gotcha:** "The practitioner and patient share a unique meeting room number. If a staff member other than the practitioner sends the video link, the room numbers will not match and the call will fail" - send from the practitioner account or via Save & Notify with `VIDEO_CHAT_LINK`.
- Also available: "Start a Video Chat" from the practitioner mobile app. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684429360667-OptiMantra-Mobile-App]
- **Virtual "eclinic":** there is no virtual-location type; you create a normal Location (Settings > Business > Locations) and for telehealth-only "set your Header Background and Practice Address to the same color to hide your address in online booking." Set the location time zone (Appointment Booking Time Zone) so patient reminders convert to the patient's time zone. Create separate services e.g. "New Patient Telehealth" vs in-office. [KB Onboarding Setup Guide; KB Time Zone selector Explanation]
- **Provider availability:** Settings > Scheduling > Online Booking > Availability by Shift (drag to create, choose which services are bookable in the block, recurrence; edit single occurrence supported since April 2026). Calendar blocks/appointments remove slots. Google or Outlook (one only) can block online booking; sync is OptiMantra -> calendar, with "Send minimum information" for PHI. [KB Configure Scheduling; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684331235355-Connect-your-Google-Calendar-to-OptiMantra]
- Zoom: superseded for group; Spakinect integration is for med-spa Good Faith Exams (not relevant). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685147714331-Connect-with-Spakinect-for-virtual-Good-Faith-Exams]
- Bandwidth guidance: at least 5 Mbps down / 2.5 up ("and more if you plan to do video chat"). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684429642267-Using-an-online-program-FAQs]

---

## 5. Payments

Sources: [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684852274331-Configure-Set-Up-Integrated-Payment-Processing; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684165253019-Setup-Payment-Processor-Stripe]

- **Processors:** Fiserv/CardPointe (recommended; terminals; negotiated rates), **Stripe Express** (2.9% + 30c; no terminals; "you need to create your account through our interface"; verification call + driver's license; NPI phone check), Authorize.net (bring your own merchant), Blue Ridge Payment Partners (high-risk). Configured at Settings > Payments > Processors [ADMIN]. No Square/PayPal (reviewer complaint [3P Software Advice]).
- **Telehealth caveat (important for SheWellRX):** "If you offer services such as peptides, ketamine, CBD, **telehealth**, or pharmacy shipping, you may need to use Authorize.net" and, for Fiserv, "Telehealth clinics selling supplements and medications are not supported." A Dec-2025 vendor press release claims OptiMantra telehealth/GLP-1 practices face Stripe freezes [3P marketing: https://finance.yahoo.com/news/optimantra-based-online-pharmacies-using-135700195.html]. Raise this in the processor ticket before go-live.
- **Card on file:** tokenized (PCI, since 2025), multiple cards per patient, invalid/expired flagged; captured automatically at online booking or via "Save card details for future use". [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684182643611-Product-Update-Tokenization-of-Patient-Credit-Cards]
- **Charging at booking vs after:** see 2.4. After the visit: superbill (from chart note, Checkout page, appointment "Checkout > Charge for Booking", or patient menu) > "Take Card Payment" (saved card auto-fills). Deposit credit memos apply on the day-of-visit superbill. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684485916443-Superbills-Four-Ways-to-Create-a-Superbill; KB: https://optimantra.zendesk.com/hc/en-us/articles/53685245402139-Processing-and-Recording-Payments-within-OptiMantra]
- **Invoicing:** Settings > Payments > Patient Invoicing; email with pay link + attached superbill; status in Shortcuts > Admin > Invoicing; documented no-show-fee workflow (create "Patient No Show" service hidden from online booking, blank superbill, Send Email). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684493257371-Configure-Patient-Invoicing]
- **Superbills for self-pay:** the superbill is the receipt; turn on the CPT section "if you don't take insurance, your patients may seek insurance reimbursement"; customize sections; patients can see superbills in the portal and pay bills there ("Yes, only one at a time" / "multiple"). [KB Onboarding Setup Guide; KB Patient Portal config]
- **Packages/memberships:** service packages with counters; recurring payments (service, package or credit) from Take Card Payment > Create Recurring Payment; Fiserv or Stripe only (Authorize.net cannot do installments); subscription dashboard with Suspended/Overdue/Declined states; weekly review recommended. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684386650011-Manage-recurring-billing-payments-for-memberships-and-subscriptions; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684679264539-Schedule-Installment-Payments-scheduled-automatic-payments-from-a-Superbill]
- **Refunds:** void within 24h (avoids fees) or refund after; recorded via negative-quantity blank superbill; partial refunds and credit memos supported; visible in Daily Deposit analytics. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684797635483-How-to-Process-and-Record-a-Void-or-Refund-in-OptiMantra]
- **Good Faith Estimate (No Surprises Act):** Settings > Payments > Good Faith Estimate Templates [ADMIN]; generate per patient at Shortcuts > Admin > Good Faith Estimates (practitioner, location, patient, products/services, sales tax) > PDF; **one-click share to the patient portal since 2026-05-09**; packages fix March 2026. OptiMantra's guidance: "For patients booking online for a discrete service with a published price point, a Good Faith Estimate is not needed" (their reading, not legal advice). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684501216539-Create-and-send-Good-Faith-Estimates; KB May 9 2026 release notes]
- Coupons, gift cards (configurable expiry), cash discounts also exist.

---

## 6. Patient portal

Source: [KB Configure and use the Patient Portal...; KB: https://optimantra.zendesk.com/hc/en-us/articles/53685225882267-Patient-Portal-Messaging; KB Mobile App]

- Patients can: update demographics/insurance/payment cards; maintain medications/supplements; complete Clinical Profile, intake, consents, questionnaires; view treatment plans (all or signed only) and superbills; pay bills; view/upload documents and handouts; secure messaging (rich text since April 2026; clinic can limit frequency/length, set out-of-office, banner text); book/reschedule/cancel (respecting your cancellation window; can be hidden); join telehealth; set their time zone. Same in the iOS/Android app (App Store 3.3/5, 34 ratings [3P: https://apps.apple.com/us/app/optimantra/id6478689374]; Google Play 4.4/5, 13 reviews, 5K+ downloads, updated 2026-08-12 [OBS]).
- **Branding:** one logo for the portal (Settings > Communications > Patient Portal and Kiosk); separate logo/colors for online booking (Location Settings); provider-level header/logo on PDFs. "we do not support multiple brands under the same account." No custom domain/white-label URL - the portal is always `https://www.optimantra.com/optimus/om/patient/login`. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685280356379-Setting-Up-Your-Clinic-Logo-and-Header-Information] [UNVERIFIED: any custom-domain option - none found.]
- **Login flow:** email + password ("I accept the Terms of Use"), or "New Sign Up"/"Reset Password" -> emailed link (or SMS code if mobile on file); shared-email families choose first name + DOB; multi-clinic patients pick the clinic. [OBS login page; KB portal troubleshooting]
- **Linking from the website:** use "your unique portal URL found in settings > communications > patient portal & kiosk" (it carries `?accessPoint=<enc>`, seen on a live prospect page [OBS]); OptiMantra's suggested patient copy is in the "How Patients Can Complete Forms" article. [KB Patient Portal Messaging]

---

## 7. Integrations and API

- **Public REST API: none.** Nothing on optimantra.com, in the 223 KB articles, or in the ONC disclosures describes an API, API keys, FHIR endpoints or developer program. [WEB: https://www.optimantra.com/integrations; WEB: https://www.optimantra.com/onc-disclosures] A generic vendor page claiming "40+ API endpoints, API Key authentication" [3P: https://cevi.ai/integrations/optimantra] is boilerplate and contradicted by the primary sources - treat as false. Keragon lists only a "Generic trigger: Manually set up a webhook trigger in your OptiMantra dashboard." [3P: https://www.keragon.com/integrations/optimantra] Jotform's "integration" is Keragon calendar data one way. [3P: https://www.jotform.com/integrations/optimantra]
- **Outbound webhooks (yes):** Settings > Marketing > Other CRM Integration [ADMIN] ("CRM Integration"): Add Outbound Hook > name, URL, **trigger = Booking, Cancellation, Check-out, Superbill**, map fields (up to 20; a bug with 10+ mappings fixed June 2026), ping with a test action; payload includes patient demographics, tags, Location, Provider ID/Name, Appointment ID, Patient DOB; superbill payload fields listed (firstName, lastName, email, phone, dateOfVisit, diagnosisCodes, procedures, total...). Failed calls in Shortcuts > Webhook Log. Method shown as PUT in a third-party tutorial [3P Nexamed]. No auth/signature documented [UNVERIFIED]. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684750328987-Use-Webhooks-to-send-OM-data-back-to-your-CRM; KB Oct 10 2025 version history]
- **Zapier/Make:** no native app; catch outbound webhooks with Webhooks by Zapier / Make / Keragon; nothing can be written back.
- **CRM inbound:** only the prefilled booking links (section 2.3). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685072997275-The-Basics-of-OptiMantra-and-CRM-integrations]
- **Conversion tracking:** Google Tag Manager on the confirmation page; UTM passthrough; Facebook Pixel removed. [KB Configure marketing conversion tracking]
- **eRx:** MDToolbox (Surescripts), EPCS with VIP Access app token, PDMP, compounds; identity proofing ~30 min; requires a fax number on file; supervising physicians added under the eRx add-on. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684722303259-e-prescribing-eRx-FAQs; WEB eRx blog]
- **Labs:** direct interfaces (Labcorp, Quest, Access, Evexia, CPL, Vibrant, etc.; 6-12 weeks, some require volume), Rupa (legacy; Rupa acquired by Fullscript), in-house labs. [KB Onboarding Setup Guide; 3P: https://www.rupahealth.com/integrations/optimantra]
- **Supplements:** Fullscript (OAuth from Patients > Actions > Fullscript) and Wholescripts. [3P: https://support.fullscript.com/articles/optimantra-integration; KB Oct 10 2025]
- **AI scribe:** DeepCura beta via a DeepCura-issued User ID + Security Key entered at Settings > Clinical Integrations > DeepCura (partner integration, not a public API); $99/mo with code `optimantra`. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684256506907-Speed-up-your-Charting-with-AI-DeepCura-beta]
- **Fax:** Sfax add-on; send records by fax or passcode-protected secure links. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684255455259-Send-Records-Charts-Documents-To-3rd-Parties]
- **Email/SMS:** transactional email from OptiMantra's domain (SendGrid; your own SendGrid can be connected for group emails); one-way SMS included, two-way/group via Twilio numbers (add-on). [KB Set-up Patient Communications; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684550339867-Use-2-way-two-way-automated-reviews-and-group-texting]
- **Calendar:** Google or Outlook (one), Settings > Scheduling > Provider Calendar. [KB Connect your Google Calendar]
- **Devices:** Caretaker VitalStream, InBody, Fitbit; Spakinect. [ADMIN] [WEB integrations]
- **Post-merger note:** Cerbo has a documented REST API + webhooks (`https://{tenant}.md-hq.com/api/v1/`, BASIC auth, credentials from support@cer.bo) [3P: https://docs.cer.bo/]. This does **not** apply to OptiMantra accounts today; whether it will is [UNVERIFIED].

---

## 8. Data migration (36 GB of legacy records)

Primary sources: [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684835222555-Import-your-Practice-Data-into-OptiMantra; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684680981403-Exporting-Data-from-Another-EMR-Practice-Management-or-Scheduling-System (updated 2026-08-31)]

- **Who does it / cost:** OptiMantra support imports for you via a ticket ("Uploads" category); "Most practices can have their existing data imported free of charge" [WEB: https://www.optimantra.com/blog/how-to-switch-behavioral-health-emr-platforms-without-losing-patient-data]; "No fee for standard migration" [WEB FAQ]. Onboarding@optimantra.com; phone 866-868-5070.
- **Accepted inputs:** Excel/CSV for **Patient Demographics (required before appointments), Product list, Services list, Contact list, Appointments** (templates attached to the KB article; "Excel or CSV format for charts notes" also listed in the Setup Guide); **PDF for charts and documents**; **C-CDA** for medical summaries (stored "as reference documents - similar to PDFs of your old charts"; not parsed into active workflow). Packages: manual. **Billing history/AR is not imported** (recreate balances as superbill adjustments).
- **Where it lands:** CSV -> Patient List / Inventory / Fee Schedule / Contacts / Schedule. PDFs, C-CDAs, labs -> each patient's **Patient Action Menu > Documents** ("will not go in to same section as newly created charts/labs").
- **Matching documents to patients:** by file name. Recommended pattern: `John_Doe_DOB-19990101_IVTherapy-20250101.pdf` ("name the file in a way that we can accurately identify the patient record"; ChiroTouch/Vagaro sections). Zip all PDFs into one archive.
- **Delivery of large files:** Google Drive folder shared (Viewer) with dave@optimantra.com, Dropbox link with password + 7-14 day expiry, or request a secure upload link in the ticket ("for very large files"). Turn off local cloud sync while handling exports; delete local copies afterwards.
- **Timing/one-shot:** weekday export, weekend load, limited slots; "we cannot predict how long the data load will take"; "The import process is a single upload" - re-uploads skip patients matched on name+DOB and skip existing files; **appointments cannot be re-imported**.
- **Limits & disclaimer:** manual uploads through the UI are "limited to 26mbs" per file (no MP3/MP4) [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684559542939-Upload-Documents-and-Usage]; the migration page's **Document Retention Notice**: "Due to technical limitations, file size restrictions, unsupported formats, or platform constraints, we may not be able to upload or migrate every document... completeness of the upload is not guaranteed... practices should... retain independent backups." No published cap on total volume - **36 GB is [UNVERIFIED] as acceptable; ask in the ticket before exporting.**
- **Paper/scans:** "scan them directly into the patient chart under the patient's Documents", or fax to the integrated number (8c/page over plan). Ask patients to re-enter demographics, re-sign consents, medications and Clinical Profile digitally.
- **PHI + AI warning:** OptiMantra explicitly cautions against pasting PHI into consumer AI tools without a BAA; use de-identified samples to derive the format.
- **Reviewer experience:** "When I transferred from my previous EMR a lot of patient information was left out" [3P Capterra p2]; "Lost all of our forms", "Took 4 months to get live" (2024 reviewer) [3P Software Advice]. The Express ($250) or Managed ($500) onboarding include "OptiMantra-generated tickets to streamline your data".
- **Practical plan for 36 GB:** (1) build one demographics CSV (name, DOB, sex, phone, email, address, patient ID) and import first; (2) consolidate each patient's legacy records into one or a few PDFs named per the convention, ideally under 26 MB each, and keep the original archive offline; (3) de-duplicate and consider importing active/recent patients first; (4) ask support for a secure upload link and confirm volume/format acceptance in writing; (5) verify sample patients after the load; (6) recreate open balances as adjustments.
- **Getting data out later:** first export free (PDFs named `PATIENTNAME_ID_Document.pdf`; consents/questionnaires downloaded manually), $500 after; C-CDA/PDF/CSV EHI export per patient by admins. [KB Export data out; WEB: https://optimantra.com/onc-disclosures/ehi-export]

---

## 9. Adding a second provider later (Nurefsan Copur)

Source: [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685120553115-Add-a-new-Practitioner-user-Practitioner-Setup-and-Settings; KB: https://optimantra.zendesk.com/hc/en-us/articles/53685124152347-Set-up-and-manage-add-or-delete-users; KB: https://optimantra.zendesk.com/hc/en-us/articles/53685223902491-User-Management-and-OptiMantra-Subscription-Page-FAQs]

1. Settings > Business > User Management > Add New User (unique email - use a `+alias` if the person already has an OptiMantra login elsewhere [KB aliases]); mark Practitioner; set Admin/Analytics/Portal messaging; choose co-signer/supervisor; "Copy Details" from Dr. Copur; **Reply-To email required**; enable 2FA (email or SMS code; IP allow-list to skip). [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685102786843-Enable-two-factor-authentication]
2. Settings > Business > OptiMantra Subscription: add to provider count (full-time $49 / part-time $34.30 / clinical staff $25) - "critical to secure charting access". NP/PA 20% discount per website (not stackable). A "provider" is anyone who charts, schedules or bills.
3. Settings > Business > Provider Settings: credentials (10-char limit incl. commas), NPI, signature, header/logo, **Description = online-booking bio**.
4. Settings > Services > Services (Fee Schedule) > More > Assign services.
5. Settings > Scheduling > Provider Calendar (color, Google/Outlook, hide from calendar if supervising only) and Online Booking > Availability by Shift for her own slots.
6. Forms/templates/reminder email/reminder text access per practitioner.
7. Payments: her own processor account if payouts differ (separate Stripe accounts per provider are supported in online booking).
- **Per-provider booking pages:** enable "Filter by Practitioner" in Location Settings; or share a provider-specific link (the `uid`/`pract` parameter [OBS]) or a private modality page with Practitioner Selector = No [KB Configure Scheduling].
- **Supervising physician / co-signing:** one co-signer per practitioner; "Request Signature from Co-signer" creates a Task; co-signer can be hidden from the calendar; supervisor role is mainly for insurance claims; no charge for supervising physicians. [KB Co-signing chart notes; KB: https://optimantra.zendesk.com/hc/en-us/articles/53684488529179-Billing-with-supervising-providers]
- **Roles:** Admin, Practitioner, Staff; "Manage Access for User" per section; Settings Access Roles for non-admins (one reviewer said they could not block staff from Settings [3P Capterra]); Analytics roles. Deactivate (never delete/rename) departing providers.

---

## 10. Compliance

- **HIPAA/BAA:** the User Agreement includes "Attachment A (Business Associate Agreement)"; signed at Settings > Business > OptiMantra Subscription when starting the subscription; "Business Associates agreement provided as part of license." [WEB: https://www.optimantra.com/optimus/useragreement.html; WEB FAQ; KB Configure Business]
- **Hosting/security (from the User Agreement):** card and identity data "stored securely on a database behind firewalls... on a data center (AWS) that is Level 1 service provider under... PCI DSS"; SSL; "our application provides the ability to provide audit reports with user activities"; unique logins. Privacy policy lists AWS, Cloudflare, Stripe, Twilio/Segment, SendGrid as processors; in-app lab result files auto-removed after 30 days; card details retained deactivated for audit. [WEB: https://www.optimantra.com/privacy-policy-new] Data-center region not stated [UNVERIFIED]; PHIPA (Canada) compliance is claimed.
- **Controls you configure:** 2FA per user (email/SMS), trusted-IP bypass, session timeouts, role/section access, chart access restriction, superbill version history with editor, messaging audit trail for video invites, email/text logs (Shortcuts > Logs), webhook log. [KB 2FA; KB Telehealth; KB Oct 2025 notes]
- **ONC certification:** OptiMantra 2026.02.01 certified 2026-07-20 by SLI Compliance, CHPL ID 15.11.05.3272.OPTI.01.00.1.260720 (ambulatory); EHI export in C-CDA R2.1, PDF, CSV. [WEB: https://www.optimantra.com/onc-disclosures; https://optimantra.com/onc-disclosures/ehi-export]
- **SOC 2 / HITRUST:** no attestation found anywhere [UNVERIFIED - assume none unless OptiMantra provides a report].
- **Consent capture:** automatic date, signature (draw/typed) and IP; signed-text snapshot in PDF; co-sign; telehealth consent should be a consent form mapped to your telehealth services and to "Required For All Clients". Template library includes telehealth/HIPAA/financial consents per marketing [WEB consent blog]; exact template names [UNVERIFIED].
- **Reliability:** 99.9% historic uptime claimed; documented outages 2025-07-22 (2h), 2025-12-15 (82 min), and a January 2026 apology letter promising a status page and pre-release notices. [KB: https://optimantra.zendesk.com/hc/en-us/articles/53685195895323-Regarding-Recent-Service-Interruptions; KB July 22 2025 and Dec 15 2025 incident reports]
- **Marketing pixels:** Facebook Pixel intentionally unsupported for HIPAA reasons; GTM only. [KB Configure marketing conversion tracking]

---

## 11. Setup checklist for the SheWellRX flow (ordered, with admin paths)

Paths are from [ADMIN] and the KB Onboarding Setup Guide [KB: https://optimantra.zendesk.com/hc/en-us/articles/53684947273883-Onboarding-Setup-Guide]. Use Chrome; clear cache after releases.

1. **Trial -> subscription.** Settings > Business > OptiMantra Subscription: 1 full-time provider, add-ons (eRx $38, fax $25 if prescribing - "A fax number on file is required for eRX"), card, sign User Agreement + BAA, Start Subscription. Add-ons are unavailable until the subscription starts.
2. **Business > Locations.** Edit Org (display name), one location "SheWellRX Virtual Clinic" (address needed for records; hide it in booking via matching header color), phone, NPI, **Appointment Booking Time Zone** on.
3. **Business > User Management.** Dr. Copur = Admin + Practitioner; Reply-To email; 2FA; IP allow-list. Add clerical staff (free) if any.
4. **Business > Provider Settings.** Full name + credentials "MD", NPI, DEA (email DEA card), state licenses, e-signature, Header Info + Header Logo, Description (booking bio), superbill display options.
5. **Services > Services (Fee Schedule).** Create telehealth-only services per reason for visit, e.g. "New Patient Telehealth Consult - 45 min - $X", "Follow-up Telehealth - 20 min - $Y", each: type Office Visit, price, duration, buffers, Initial/Follow-up designation, "Available for Online Booking", assigned practitioner + location, optional CPT for superbills, optional add-ons. Optionally group into Modalities (Define modalities) so the site can deep-link to a category. Create hidden "No-Show Fee" and "Late Cancellation" services (not online).
6. **Services > Packages / Group templates** (later, for follow-up bundles or memberships).
7. **Payments > Processors.** Open a ticket to be introduced to Fiserv or Stripe Express (disclose telehealth/GLP-1/pharmacy shipping up front; Authorize.net or Blue Ridge if declined). Payments > Customize Superbill (turn CPT on). Payments > Patient Invoicing (template, cadence). Payments > Good Faith Estimate Templates (paste CMS disclaimer text). Gift Card Config optional.
8. **Forms > Consent Forms.** Telehealth informed consent, HIPAA NPP acknowledgment, financial/cancellation/no-show policy, (state-specific) - from Template Library or paste; add input line items for initials; do not add date/signature.
9. **Forms > Clinical Profile** (enable relevant history sections). **Forms > Chart Note/Intake Form** (choose Subjective sections that double as intake). **Forms > Custom Questionnaire**: one screening questionnaire per reason for visit (sections, Radio/Checkbox/Numeric, scoring if useful, Allow Resume Later = No for one-off screens). Or send your PDFs/Word forms to support to build (live accounts, 3-5 days).
10. **Communications > Patient Portal and Kiosk.** Logo; Demographics Profile (hide Insurance and, if not needed, Race/Ethnicity/Gender identity/Pronouns to shorten step 3); consents Required For All Clients; Initial/Follow-up intake mapping; **map each questionnaire + telehealth consent to its service(s)**; Treatment Plans/Superbills visible; portal booking on (modalities or all services) with cancellation window (e.g. 24h, no staff approval); Allow Payment of Bills = Yes.
11. **Communications > Email Templates.** "Booking Confirmation - New Patient Telehealth" (portal sign-up instructions from the KB copy, consent + questionnaire keyword links, `VIDEO_CHAT_LINK`, `LOCATION_PHONE_NO`), a follow-up variant, cancellation confirmation, welcome. Assign each to its service: Services (Fee Schedule) > More Options > Assign Email Template To Service.
12. **Communications > Reminder Email / Reminder Text.** Enable for the practitioner; e.g. email 2 days before with `VIDEO_CHAT_LINK` + `PATIENT_LINK_FOR_PRECONSULT_FORM`; text 1 day before (<160 chars) with the video link; set **Notification Email Destination** for intake-complete alerts. Consider 2-way texting ($75) for 2-hour reminders and replies. Cancellation Templates. Birthday optional.
13. **Scheduling > Org Settings.** Calendar hours/slot length (set slot to the smallest service length; 15-min minimum granularity is a known limitation [3P Capterra]), reminder/policy options ("use email template on appointment if available"), colors. **Scheduling > Provider Calendar**: Google/Outlook sync with "Send minimum information" and "Block online booking" if you keep personal events there.
14. **Scheduling > Online Booking > Location Settings.** Colors/logo/fonts to match shewellrx.com, notice text (residency/state eligibility + cancellation policy), Filter by Practitioner (off for solo), show duration, text confirmation, auto-confirm, **Payment For Booking = Full Payment Is Required** (or Deposit), gap-in-days, **Confirmation Page = https://shewellrx.com/booking-confirmed**; copy the Booking URL and Modalities URL.
15. **Scheduling > Online Booking > Availability by Shift.** Create recurring telehealth shifts, selecting the telehealth services allowed in each.
16. **Scheduling > Prospect Registration** (optional lead/screening form) with tag "website lead", confirmation email, notify staff.
17. **Marketing > Conversion Tracking.** GTM container ID; trigger on page URL containing `appointment-created-details?pid=...&lid=...`. **Marketing > Other CRM Integration**: outbound webhooks (Booking, Cancellation, Check-out, Superbill) to your automation endpoint if desired.
18. **Clinical Templates / Clinical Integrations.** SOAP/dot-phrase templates, favorite ICD groups, lab templates; DeepCura if wanted; labs request early (6-12 weeks).
19. **Website (Astro on Cloudflare Pages).** Build the symptom picker as static routes; each symptom card links to the matching service deep link (or modality URL). Two integration styles: (a) button/new tab to `servicesall?pid&lid` (simplest, OptiMantra-recommended); (b) an iframe of the same URL with `&hideHeaderInFrame=1&hideFooterInFrame=1`, full width, tall fixed min-height (cross-origin, no auto-resize; `scrolling="no"` in the official snippet will clip on small screens - prefer `scrolling="auto"` or just link out on mobile). Append `utm_*` dynamically; optionally prefill `first/last/email/ph` if the visitor already gave them and always `src=website`. Link "Patient portal" to the unique portal URL; "Join video visit" to the patient login page's Direct Access. Add `/booking-confirmed` page. Keep any website screening non-PHI (eligibility yes/no) since answers cannot be pushed into OptiMantra; move real screening into the service-mapped questionnaire that fires after booking.
20. **Test end to end** with a test patient from a logged-out browser/phone: book -> pay -> confirmation page + email -> portal New Sign Up -> forms appear -> reminder email/text -> video link -> practitioner Start Video Chat -> chart, import questionnaire -> superbill applies prepayment -> refund test.
21. **Data import** (section 8) in parallel: demographics CSV first, then documents.
22. **Second provider** (section 9) when needed.

---

## 12. Limitations, complaints and gotchas relevant to this flow

- **No inbound API/webhooks/Zapier actions**; website questionnaires cannot write to the chart. [KB webhooks; 3P Nexamed; 3P Keragon]
- **Booking order is fixed: service -> time -> details+card.** Intake/screening questions come after booking (portal/email), not before time selection. There is no branching logic in questionnaires and no hard "forms complete" gate. [KB forms articles]
- **Deposit amount is location-wide** (one amount for all services); use Full Payment for per-service pricing. Card is requested on every booking when any payment policy is on. [KB Requiring Deposits; 3P Capterra]
- **Stripe/Fiserv may not underwrite telehealth practices** that ship meds/supplements; Authorize.net/Blue Ridge fallback; "Do not reach out to Fiserv or Stripe separately." [KB Stripe; KB payment processing]
- **Booking widget UX complaints:** "can only do 15 minute increments"; "Scheduling interface can feel less intuitive"; possible double-book "when clients have the page in their browser too long" (a slot-no-longer-available popup bug was fixed June 2026); calendar readability; Google Calendar sync "inconsistent". [3P Capterra p1-3; 3P Software Advice; KB June 2026 notes]
- **Forms:** patients found health-history/ROS forms "too long"; formatting glitch where apostrophes become question marks (also visible as "?" in live service descriptions [OBS]); "Lost all of our forms" (2024). [3P Capterra; 3P Software Advice]
- **Portal login friction:** exact-match first name/DOB, case-sensitive in the app, duplicates block login, 10-attempt lockout, no SSO/magic link; patients "overwhelmed and confused" early on. [KB portal troubleshooting; 3P Capterra]
- **Telehealth:** no recording, 3-hour/5-participant caps, Chrome preferred, room mismatch if staff sends the link; older reviews complain about video quality (pre-Twilio upgrade). [KB Telehealth; 3P Capterra p2]
- **Email deliverability:** all mail comes from support@/no-reply@optimantra.com (no custom sending domain); no bounce/spam tracking; ask patients to whitelist. [KB email FAQs]
- **SMS:** one shared number; STOP unsubscribes from reminders too; no opt-out list; 2-hour reminders cost extra; texts at fixed 10 AM send time. [KB opt-out; KB communications]
- **Mobile:** practitioner app cannot send prescriptions (reviewer, 2025); app ratings middling. [3P Capterra p2; 3P App Store]
- **Branding:** no custom domain for booking/portal; one portal logo; "OptiMantra" appears on patient-facing pages/emails.
- **Support/onboarding:** praised by most; some say "seldom able to actually solve issues", "onboarding was long"; self-onboarding "can feel overwhelming"; OptiMantra will not touch your website. [3P Capterra; 3P Software Advice; KB online booking]
- **Reliability:** two documented outages in 2025 and a Jan-2026 apology; status page "being explored". [KB incident reports]
- **Data:** migration completeness not guaranteed; 26 MB per manual upload; billing history not imported; leaving costs $500 after the first export; 4 weeks notice. [KB migration/export]
- **Merger risk:** roadmap consolidation with Cerbo is unknown; ask sales about product continuity before signing a long data-migration effort. [3P PRNewswire; 3P Oli Health]
- **Reviews snapshot:** Capterra 4.8/5 (87 reviews) [3P: https://www.capterra.com/p/159365/OptiMantra/reviews/]; Software Advice 4.8/5 (87) [3P: https://www.softwareadvice.com/medical/optimantra-profile/]; G2 blocked to automated access [UNVERIFIED]; no substantive Reddit threads found.

---

## Appendix A - Quick URL/keyword cheat-sheet

- Practice login: `https://www.optimantra.com/optimus/om/public/login`
- Patient portal: `https://www.optimantra.com/optimus/om/patient/login` (+ Direct Access To Video Chat)
- Booking: `.../optimus/patient/patientaccess/servicesall?pid=&lid=` ; modality view `.../modalities?pid=&lid=` ; prospect form `.../prospects?pid=`
- Confirmation page for GTM trigger: `.../optimus/patient/patientaccess/appointment-created-details?pid=&lid=`
- Prefill params: `src, srcid, first, last, email, ph, dob, address, city, state, zip, utm_*` ; observed: `uid, sid, mid, hideHeaderInFrame=1, hideFooterInFrame=1, comments`
- Email/text keywords: `VIDEO_CHAT_LINK`, `PATIENT_LINK_FOR_PRECONSULT_FORM`, `PATIENT_LINK_FOR_FOLLOWUP_PRECONSULT_FORM`, `PATIENT_LINK_FOR_PRECONSULT_FORM_NOCONSENT`, `PATIENT_LINK_FOR_DEMOGRAPHICS`, `PATIENT_LINK_FOR_CLINICAL_PROFILE`, `FIRST_NAME_OR_NICK_NAME`, `APPOINTMENT_START_DATE_TIME`, `APPOINTMENT_SERVICE_NAME`, `LOCATION_NAME`, `LOCATION_ADDRESS`, `LOCATION_PHONE_NO`, consent/questionnaire codes like `CFID_xxxxx`
- Support: support@optimantra.com (tickets land in Zendesk), portalsupport@optimantra.com, onboarding@optimantra.com, dave@optimantra.com (data share), 866-868-5070 (8:30-8:30 ET M-F), daily office hours 1-2 pm ET, 1:1 booking `https://calendly.com/optimantra-onboarding/basics-1on1`

## Appendix B - Primary sources consulted (all fetched 2026-09-01)

optimantra.com: `/`, `/pricing`, `/faq`, `/features`, `/integrations`, `/trial`, `/onboarding`, `/about-us`, `/privacy-policy-new`, `/user-agreement`, `/optimus/useragreement.html`, `/onc-disclosures`, `/onc-disclosures/ehi-export`, `/video-transcript`, blog posts on booking-link branding, scheduling (3), patient portal, telehealth (3), packages, superbills, hybrid practices, switching EMRs, behavioral-health migration, support options, AI charting + Zoom, eRx setup, no-show policy, cancellation, HIPAA, consent policies, virtual GFE; modality pages (behavioral health, DPC, integrative, multi-modality); news (Outlook integration).
Knowledge Base (optimantra.zendesk.com, via API): full index of 223 articles; the ~45 articles cited inline above.
Live pages: several practices' public `servicesall`, `modalities`, `servicesallV2`, `practsNslotsNEW`, `patientDetails`, `prospects`, `customQuestionnaireForm`, and both login pages (read-only; nothing submitted).
Third party: Capterra (pages 1-3), Software Advice, Software Finder, GetApp, SelectHub, Oli Health, Nexamed, Keragon, Jotform, cevi.ai, Fullscript support, Rupa, DeepCura, docs.cer.bo, PRNewswire, Yahoo Finance/Organic Payment Gateways, Apple App Store, Google Play.
