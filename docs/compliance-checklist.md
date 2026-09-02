# Compliance checklist: SheWellRX telehealth, self pay, New Jersey

Condensed 2026-09-01 from the full legal research report (kept at `docs/research/telehealth-law-2026-09.md`). This is research, not legal advice; items marked VERIFY need New Jersey health care counsel or the named agency before launch. REQUIRED = a statute, regulation, or binding rule; BEST PRACTICE = regulator or board expectation.

## Already handled on the website (2026-09-01)

- "Doctors" replaced by "clinicians"; the nurse midwife is described as a certified nurse midwife who is not a physician and is not yet booking (N.J.A.C. 13:35-6.10; FTC Act §5).
- Board certification names the certifying board (ABOG) and ABMS wherever it appears; "four decades" replaced with "more than 35 years".
- Non physician notice and the right to request the physician, clinician identity and credentials, and contact information are in the consent and on the booking flow (N.J.S.A. 45:1-62).
- Standalone HIPAA Notice of Privacy Practices page with the required header, rights, and complaint route (45 CFR 164.520); the website Privacy Policy no longer doubles as the NPP.
- Good Faith Estimate notice page and links on pricing, booking, and footer; out of network and "no Medicare or Medicaid billing" statements (45 CFR 149.610; N.J.S.A. 26:2SS).
- Consent page: no prescription from the questionnaire alone, no Schedule II by telehealth, identity and location verification before the first visit, e signed and dated copy in the portal, midwifery complaints to the Board of Medical Examiners (N.J.A.C. 13:35-6B.4, 6B.6, 6B.9).
- Accessibility statement (ADA Title III expectation) and a skip link.
- Emergency screen inside the booking flow, and 911 language on every legal page.
- The old interim booking form that collected a "reason for visit" without a BAA is gone; nothing on the site stores or transmits answers.
- Security headers (HSTS, CSP, no framing) so the marketing site cannot be used to leak data.

## REQUIRED before the first paid visit

1. **Telehealth consent e signature.** Load the current consent into OptiMantra's consent form with the inputs in `docs/intake-questionnaires.md`; patients sign and date before the first visit; NPP acknowledgment captured (N.J.A.C. 13:35-6B.9). Store in the chart.
2. **Identity and location.** Intake collects name, DOB, phone, address, photo ID; record the patient's originating site at every visit and the clinician's location in the note (N.J.A.C. 13:35-6B.4, 6B.5). Refuse or reschedule any visit where the patient is outside New Jersey.
3. **Clinician reviews the intake before initiating the visit** and documents that telehealth meets the standard of care, or refers in person and refunds (N.J.S.A. 45:1-62; N.J.A.C. 13:35-6B.3).
4. **No prescription from a questionnaire alone; video for initial visits; no Schedule II by telehealth** (N.J.S.A. 45:1-62; N.J.A.C. 13:35-6B.6; NJ in person rule for Schedule II in force since Feb 17, 2026, refined by A4852 of July 8, 2026). If testosterone or sleep aids will ever be prescribed: NJ CDS and DEA registrations at a real NJ address, NJPMP checks, EPCS with two factor, audio video only; DEA telemedicine flexibilities run through Dec 31, 2026 with a special registration final rule expected around November 2026. Decide the policy now and write it down.
5. **Good Faith Estimate at booking.** Generate the OptiMantra GFE within 1 business day of booking (3 business days if booked 10 or more days out, or on request), keep 6 years, keep the website notice (45 CFR 149.610).
6. **Medicare.** Menopause patients are often 65 or older. Either (a) Dr. Copur (and later the CNM) files a Medicare opt out affidavit with Novitas and every Medicare beneficiary signs a private contract before care (42 CFR 405.410 to 405.425), or (b) screen Medicare beneficiaries out at booking. Check PECOS enrollment first; opting out affects any hospital work billed to Medicare. VERIFY with counsel. Medicaid: screen out NJ FamilyCare enrollees or confirm the private pay rule with DMAHS. VERIFY.
7. **HIPAA program.** Signed OptiMantra BAA on file (part of the license); BAAs with any email provider used for PHI (Google Workspace or Microsoft 365 business, not free mail), IT help, migration help, e fax; written risk analysis and policies (HHS SRA tool); workforce training; two factor on every OptiMantra login; incident response plan naming who notifies patients, HHS, OptiMantra, and, under NJ law, the State Police before individuals (N.J.S.A. 56:8-163). Never connect the marketing site to a form processor without a BAA; Cloudflare only signs BAAs for Enterprise.
8. **Practice entity, name, and addresses.** Confirm SheWellRX is a licensee owned professional entity or a registered alternate name of the LLC (N.J.A.C. 13:35-6.16) and add the legal entity name to the footer (done: "telehealth practice of FirstChoice ObGyn LLC"; VERIFY the exact legal name, OptiMantra shows "FIRSTCHOICE OB GYN GROUP LLC"). Report the practice location change to the Board of Medical Examiners within 21 days of closing the office (N.J.A.C. 13:35-6.19); update NPPES within 30 days, NJ CDS and DEA (a real location, no PO box), the NJ physician profile, the malpractice carrier (confirm telehealth coverage and NJ minimums), and hospital medical staff offices.
9. **Closing the Clifton office.** Direct notice to every patient seen in the prior 6 months, newspaper notice monthly for 3 months naming where records live and how to get copies, copy to the Board (N.J.A.C. 13:35-6.5; VERIFY whether publication is required when the physician continues virtually); written termination and hand off letters to obstetric and procedural patients (N.J.A.C. 13:35-6.22); records kept 7 years from the last entry, obstetric charts longer per the carrier.
10. **NJ DOH telehealth organization registration.** Email TTRequests@doh.nj.gov for a written determination that a solo, end user telehealth practice is not a "telemedicine or telehealth organization" ($1,500 per year registration, N.J.S.A. 45:1-64). VERIFY and keep the answer on file.
11. **SMS consent.** Reminder texts only to the number the patient gave, minimal content, opt out honored; marketing texts need separate written consent (TCPA, FCC 2015 order). The consent form input covers reminders.
12. **Refund policy visible before payment.** Price, 24 hour cancellation, and refund terms shown on the booking flow and in OptiMantra's notice text (NJ Consumer Fraud Act; Refund Policy Disclosure Act).

## BEST PRACTICE (do within the first 90 days)

- Keep dated screenshots of every version of the website and every OptiMantra email template for 3 years (NJ advertising record rule, N.J.A.C. 13:35-6.10).
- Never solicit reviews with incentives or gate them by sentiment (FTC review rule, 16 CFR 465); OptiMantra's automated review add on must be configured neutrally.
- Analytics, if ever added: cookieless or consent gated, no ad pixels on booking or condition pages, never pass symptom or service choices to Google or Meta (FTC GoodRx/BetterHelp/NextMed; HHS tracking bulletin as narrowed by AHA v. Becerra).
- WCAG 2.2 AA audit of the site and a check of OptiMantra's portal accessibility; interpreter access on request.
- Written prescribing policy, telehealth technology failure protocol (audio plus store and forward fallback, documented), and a fraud and abuse protocol for patient authentication (N.J.A.C. 13:35-6B.8).
- Mailing address of record for correspondence on legal pages (a registered address is fine); the CDS/DEA/BME address must be a real location.
- Substantiation file for every claim on the site (pricing comparisons, "treatment exists, it works").

## Adding Nurefsan Copur, DNP, CNM (before she sees a patient)

- Licensed and disciplined by the Board of Medical Examiners' Midwifery Liaison Committee, not the Board of Nursing.
- REQUIRED: written consulting agreement with a qualified NJ physician (Dr. Copur; VERIFY he still meets the "operative OB GYN privileges or equivalent" criterion after leaving the office) and written clinical guidelines covering scope, consultation and referral triggers, formulary, physician availability, and periodic chart review (N.J.A.C. 13:35-2A.6); prescriptive authorization from the Board with a formulary in the guidelines (13:35-2A.14); her own NJ CDS and DEA registrations plus a joint protocol for any controlled substances.
- Scope: well woman care including gynecologic screening, assessment, treatment, and contraceptive services (13:35-2A.13); define in the guidelines when menopause hormone therapy is co managed.
- The 2026 APN law (S2996) does not change the midwifery rules. VERIFY.
- Add her to the malpractice policy, Medicare opt out if applicable, OptiMantra as a practitioner with her own eRx identity, and update the booking notice and website (`DOCTOR2.status` in `src/config.ts`).

## Open questions for counsel or agencies

1. NJ DOH written determination on telehealth organization registration.
2. BME: trade name registration for SheWellRX; whether newspaper notice is required when the physician continues virtually.
3. Midwifery Liaison Committee: consulting physician qualification, formulary scope for hormone therapy.
4. Medicare: PECOS status; opt out versus exclude beneficiaries. Medicaid private pay rule.
5. Malpractice minimums and telehealth coverage confirmation.
6. Retention policy for legacy obstetric charts.
7. Which controlled substances, if any, the practice will prescribe by telehealth after Dec 31, 2026.
