# Research: Pricing, Intake, and Data Architecture

Compiled 2026-08-24. Full sources cited inline.

## Pricing landscape (cash pay women's health telehealth)

| Company | Initial | Follow up | Model |
| --- | --- | --- | --- |
| Alloy Health | $49.95 one time consult | meds ~$50–150/mo | D2C, monetizes meds |
| MyMenopauseRx | $99 flat | ~$99 | Flat per visit |
| Midi Health | ~$250–350 cash | ~$150–250 | Specialist per visit |
| Maven Clinic | $18–120 by provider | same | Marketplace per visit |
| Sesame | $37–150 | per visit | Marketplace |
| PlushCare | $129/visit | $129 | + $19.99/mo membership |
| Evernow | $29–49/mo | included | Subscription |
| Winona | $0 consult | included | Meds only ($39–149/mo) |

- New patient gynecology consult without insurance averages ~$256 (median $250, range $100–425).
- Credible middle band for a physician led practice: **$149–199 initial / $79–99 follow up**.
- 75% of patients say clear website pricing increases trust; 55% abandon booking if pricing is unclear.
- Pricing page playbook: one bold number per visit type, itemized "what's included", HSA/FSA accepted callout, "no insurance needed, no surprise bills", superbill offer, clinician credentials adjacent to the price.

### Chosen structure (editable in `src/config.ts`)

- Initial specialist visit: **$149 one time** (45 to 60 minutes)
- Follow up visit: **$99 one time** (15 to 30 minutes)
- No membership at launch. Per visit converts skeptical first timers.

## Intake flow

**Marketing site (this repo): collects nothing beyond name, email, state.** No symptoms, no reason for visit, no health checkboxes. All signup CTAs link out to the portal.

**Secure portal (BAA covered platform) collects, in order:**
1. Demographics, ID verification, state of physical location at visit time (licensure requirement)
2. Chief concern and goals
3. Menstrual/menopause history, ideally with the Greene Climacteric Scale (21 items) or Menopause Rating Scale (11 items)
4. Obstetric history (gravida/para)
5. Screening history (last Pap, mammogram, pelvic exam)
6. Medications and supplements, current or prior hormone use
7. Allergies
8. Medical and surgical history with an explicit HRT contraindication screen: breast/uterine/ovarian cancer, DVT/PE, stroke/MI, unexplained bleeding, liver disease, migraine with aura, smoking
9. Family history
10. Lifestyle
11. Pharmacy preference
12. Consents (telehealth informed consent, privacy practices, self pay financial agreement, emergency plan). Required in 45+ states, e-signed and stored.

## Data architecture (HIPAA)

- **Cloudflare Pages static marketing site: zero PHI, no BAA needed.** Cloudflare only signs BAAs on Enterprise contracts, so never route the portal or intake through Cloudflare. Link out to the vendor's own hosted portal domain.
- **PHI system of record: IntakeQ Practice Management (~$60–85/mo, BAA on every plan)** — intake forms, e-signatures, scheduling, telehealth video, payments, patient portal. Upgrade path: Healthie ($69+/mo) for API access and multi provider growth.
- Marketing email list (name and email only) may live in a standard ESP; never sync patient data into it.
- Analytics pixels on the marketing site only, never inside the portal.
- Launch software cost: roughly $60 to $90 per month plus payment processing.

Key sources: intakeq.com/pricing, healthie sites, simplepractice.com/pricing, hint.com pricing, Cloudflare HIPAA trust hub, HIPAA Journal on the vacated OCR tracking guidance, CCHP consent requirements, StatPearls HRT contraindications, Washington University and Stanford OB-GYN intake forms, Mira Health and Zocdoc cost guides, VirtualCareFinder and Horiva pricing reviews.
