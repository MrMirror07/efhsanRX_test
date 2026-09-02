# SheWellRX intake questionnaires and consent inputs for OptiMantra

Written 2026-09-01. Built for OptiMantra's Custom Questionnaire builder (Settings > Forms > Custom Questionnaire), which supports these answer types only: Word(s), Numeric, Paragraph, Radio (single answer), Checkbox (multiple answers), Matrix, Dropdown. There is no conditional logic, so each section opens with a one line instruction telling the patient when to skip it. Every questionnaire ties to a service in Settings > Communications > Patient Portal and Kiosk > "Questionnaire Specific To Appointment Services".

Design rules: the public website asks nothing clinical that is stored; everything below is collected inside the portal after booking and before the visit. Questions are written for a New Jersey, self pay, video only OB GYN practice run by Dr. Copur, and they screen for the things that change what he can safely prescribe by video (estrogen and progestin contraindications, red flags that need in person care, pregnancy). Answer choices that carry numeric weights (0 to 3) use OptiMantra's "Calculate Subtotals" so symptom scores trend across visits.

Legend: R = Radio, C = Checkbox, W = Word(s), P = Paragraph, N = Numeric, D = Dropdown, M = Matrix. * = All Questions Required for that section.

---

## Questionnaire 1: "SheWellRX Initial Intake" (tie to Initial Telehealth Visit; Allow Resume Later = Yes)

### Section 1. Your visit* 
Instructions: "Your clinician reads every answer before you connect. Short answers are fine."
1. In your own words, what would you like help with at this visit? (P)
2. How long has this been going on? (R) Less than 1 month / 1 to 6 months / 6 to 12 months / More than a year
3. What would make this visit a success for you? (C) A prescription if it is right for me / Understanding what is going on / A second opinion / A plan I can follow / Lab work / Reassurance / Something else
4. Anything else you want your clinician to know before the visit? (P)
5. Where will you physically be during this video visit? (R) In New Jersey / Outside New Jersey (we cannot see you outside NJ; please reschedule)
6. Street address, city, and ZIP where you will be during the visit (W)
7. Best phone number for the visit if the video drops (W)

### Section 2. Safety today*
Instructions: "If any of these is happening right now, call 911 or go to the nearest emergency room before completing this form."
1. Are you having any of the following right now? (C) Bleeding that soaks a pad or tampon every hour for 2 or more hours / Severe pelvic or belly pain / Fainting or feeling faint / Fever over 101 F with pelvic pain / Chest pain, shortness of breath, or a painful swollen leg / Sudden severe headache or vision change / Thoughts of harming yourself / None of these
2. Could you be pregnant right now? (R) No / Not sure / Yes
3. Date of your last menstrual period (W, MM/DD/YYYY or "no periods")

### Section 3. Menstrual and reproductive history
Instructions: "Answer what applies. Skip questions about periods if you no longer have them."
1. Age at first period (N)
2. Current cycle pattern (R) Regular, every 21 to 35 days / Irregular / Fewer than 4 periods a year / No periods for 12 months or more / Hysterectomy
3. Usual bleeding (R) Light / Moderate / Heavy / Very heavy with clots or flooding
4. Pain with periods, 0 none to 3 severe (R, numeric values 0/1/2/3, weight 1)
5. Bleeding between periods or after sex (R) No / Yes
6. Bleeding after menopause (12 months without periods) (R) Not applicable / No / Yes
7. Number of pregnancies (N)
8. Number of births (N)
9. Are you trying to conceive in the next 12 months? (R) No / Yes / Not sure
10. Ovaries removed, hysterectomy, tubal ligation, or other pelvic surgery (C) None / Hysterectomy (uterus removed) / One or both ovaries removed / Tubal ligation / Fibroid or cyst surgery / Other (describe below)
11. Details of pelvic surgeries and dates (W)

### Section 4. Menopause symptom score (Calculate Subtotals = Yes)
Instructions: "Skip this section if you are here only for birth control. Rate the last 2 weeks. 0 = none, 1 = mild, 2 = moderate, 3 = severe."
Each item is Radio with numeric values 0/1/2/3 and weight 1: Hot flashes, Night sweats, Trouble falling or staying asleep, Low mood, Anxiety or irritability, Brain fog or memory, Fatigue, Joint or muscle aches, Palpitations, Vaginal dryness, Pain with sex, Bladder urgency or leaks, Low sexual desire, Headaches, Weight gain that bothers you.
16. Which symptom bothers you most? (W)
17. Symptoms started: (R) Under 6 months ago / 6 to 24 months ago / More than 2 years ago

### Section 5. Hormone safety screen* (estrogen and progestin contraindications)
Instructions: "These questions decide which treatments are safe for you. Please answer every one."
1. Have you ever had breast cancer? (R) No / Yes
2. Have you ever had cancer of the uterus, ovary, or cervix? (R) No / Yes
3. Has a parent, sibling, or child had breast, ovarian, or uterine cancer? (R) No / Yes / Not sure (list who and age in the next box)
4. Family cancer details (W)
5. Have you ever had a blood clot in a leg or lung (DVT or PE)? (R) No / Yes
6. Has a close relative had a blood clot, or do you have a known clotting disorder (Factor V Leiden, etc.)? (R) No / Yes / Not sure
7. Have you had a stroke, mini stroke (TIA), or heart attack? (R) No / Yes
8. Do you get migraines? (R) No / Migraine without aura / Migraine with aura (visual changes, numbness, or speech changes before the headache) / Not sure
9. Blood pressure (R) Normal / High but controlled with medicine / High and not controlled / I do not know
10. Most recent blood pressure reading, if known (W)
11. Do you smoke or vape nicotine? (R) No / Yes, fewer than 15 a day / Yes, 15 or more a day / Quit within the last year
12. Liver disease (hepatitis, cirrhosis, fatty liver) or gallbladder disease (R) No / Yes
13. Diabetes (R) No / Prediabetes / Type 1 / Type 2
14. Unexplained vaginal bleeding in the last 12 months that no doctor has evaluated (R) No / Yes
15. Lupus, other autoimmune disease, or long periods of immobility planned (surgery, long haul travel) in the next 3 months (R) No / Yes (describe below)
16. Details (W)
17. Height (N, inches) and 18. Weight (N, pounds)

### Section 6. Hormone therapy and menopause treatment history
Instructions: "Skip if you have never used hormone therapy or menopause medicines."
1. Currently or previously used (C) None / Estrogen patch / Estrogen gel or spray / Estrogen pill / Progesterone (Prometrium) / Combination pill or patch / Vaginal estrogen cream, tablet, or ring / Testosterone / Compounded or pellet hormones / Non hormonal medicine (paroxetine, gabapentin, fezolinetant, clonidine)
2. Names, doses, and dates of anything you have used (P)
3. Why did you stop, or what did not work? (P)
4. Which do you prefer, if any? (C) Patch / Gel / Pill / Vaginal only / Non hormonal / No preference, guide me
5. Last bone density scan (DEXA) and result, if any (W)

### Section 7. Birth control
Instructions: "Skip if you are not asking about contraception."
1. Current method (R) None / Combined pill / Progestin only pill / Patch / Ring / IUD / Implant / Shot / Condoms / Sterilization / Other
2. What are you looking for? (C) Start a method / Switch methods / Renew my prescription / Emergency contraception / Fewer or no periods / Estrogen free option / Not sure, help me choose
3. Methods you have used before and any problems (P)
4. Preferred pharmacy for a same day prescription (W)
5. If asking about emergency contraception: date and time of unprotected sex (W)
6. Do you need STI testing? (R) No / Yes / Not sure

### Section 8. Sexual health and comfort
Instructions: "Skip if this does not apply. Answers are private and read only by your clinician."
1. What are you experiencing? (C) Vaginal dryness / Pain at entry / Deep pain with sex / Low desire / Difficulty with arousal or orgasm / Burning, urgency, or recurrent urinary infections / Vaginal discharge or odor / Something else
2. How long? (R) Weeks / Months / Years
3. How much does it bother you, 0 to 3 (R, numeric 0/1/2/3)
4. Have you used vaginal estrogen, moisturizers, or lubricants? What helped? (P)
5. Any medicines that may lower desire (antidepressants, hormonal contraception, blood pressure medicines)? (W)
6. Anything about your relationship, stress, or mood that you would like to discuss? (P, optional)

### Section 9. Period problems and PCOS
Instructions: "Skip if your periods are not a concern."
1. Pattern (C) Heavy bleeding / Painful cramps / Irregular or missing periods / Bleeding between periods / Bleeding after sex / Very long cycles
2. Days of bleeding per period (N)
3. Days between periods, shortest and longest (W)
4. Do you pass clots larger than a quarter or soak through protection at night? (R) No / Yes
5. PCOS features (C) Acne / Excess facial or body hair / Scalp hair thinning / Weight gain / Diagnosed PCOS / None
6. Symptoms of anemia (C) Fatigue / Shortness of breath on stairs / Dizziness / Pale skin / None
7. Prior evaluation (C) Pelvic ultrasound / Hormone labs / Thyroid labs / Endometrial biopsy / None (upload results in the portal Documents if you have them)
8. Treatments tried and results (P)

### Section 10. Medical and surgical history*
Instructions: "Please list current medications, supplements, and allergies in the portal's Medication List; use this section for conditions."
1. Conditions (C) None / High blood pressure / High cholesterol / Diabetes or prediabetes / Thyroid disease / Depression or anxiety / Migraine / Asthma / Kidney disease / Seizures / Bleeding disorder / Blood clots / Cancer (type below) / Autoimmune disease / Eating disorder / Other (below)
2. Details, including cancer type and year (P)
3. Surgeries other than pelvic (with year) (P)
4. Hospitalizations in the last 5 years (W)
5. Drug allergies and reactions (P; write "none" if none)

### Section 11. Family history
1. Conditions in parents, siblings, children (C) Breast cancer / Ovarian cancer / Uterine cancer / Colon cancer / Blood clots / Heart attack or stroke before 60 / Osteoporosis or hip fracture / Diabetes / Thyroid disease / Early menopause (before 45) / None / Not known
2. Who and at what age (W)

### Section 12. Screening and prevention
1. Last Pap or HPV test: date and result (W)
2. Last mammogram: date and result (W)
3. Last colon cancer screening, if 45 or older (W)
4. Last bone density test (W)
5. Vaccines: HPV, Tdap, flu, COVID, shingles (C) plus year if known (W)
6. Do you have a primary care provider? Name and practice (W) and 7. May we send a visit summary to them? (R) Yes / No

### Section 13. Lifestyle
1. Alcohol per week (R) None / 1 to 3 / 4 to 7 / 8 or more
2. Exercise per week (R) None / 1 to 2 days / 3 to 4 days / 5 or more days
3. Sleep hours on a typical night (N)
4. Caffeine (R) None / 1 to 2 cups / 3 or more
5. Cannabis or other substances (W, optional)
6. Do you feel safe at home and in your relationships? (R) Yes / No / Prefer to discuss at the visit
7. Stress level, 0 to 3 (R, numeric)

### Section 14. Logistics*
1. Preferred pharmacy name, street, and phone (W)
2. Emergency contact name and phone (W)
3. Preferred name and pronouns (W, optional)
4. Language preference and any interpreter need (W)
5. Any accessibility needs for the video visit (W)
6. How did you hear about SheWellRX? (D) Google / A friend / Dr. Copur's office / Social media / Other

---

## Questionnaire 2: "SheWellRX Follow Up" (tie to Follow Up Telehealth Visit; Allow Resume Later = Yes)

### Section 1. Since your last visit*
1. What would you like to cover today? (P)
2. Since the last visit, overall I feel (R) Much better / Somewhat better / The same / Worse
3. Did you start the plan from your last visit? (R) Yes, as prescribed / Partly / No (tell us why below)
4. What got in the way, if anything? (P)
5. Side effects or new symptoms (C) None / Breast tenderness / Bleeding or spotting / Headache / Nausea / Mood change / Bloating / Leg pain or swelling / Chest pain or shortness of breath (call 911 if now) / Other (below)
6. Details (P)
7. Where will you physically be during this visit? (R) In New Jersey / Outside New Jersey

### Section 2. Symptom score (repeat of Initial Section 4; Calculate Subtotals = Yes)
Same 15 items, 0 to 3, so the subtotal trends against the initial visit.

### Section 3. Medicines and refills*
1. Current medicines and doses, including hormones (P; or confirm the portal list is current)
2. Refills needed today (W)
3. Pharmacy changes (W)
4. New diagnoses, ER visits, or hospital stays since last visit (W)
5. Blood pressure reading in the last month, if known (W)
6. Any chance of pregnancy since the last visit? (R) No / Yes / Not sure

### Section 4. Anything else (optional)
1. Questions you want answered before the visit ends (P)

---

## Consent form inputs (Settings > Forms > Consent Forms > "SheWellRX Telehealth Consent and Terms of Care")

Body: paste the current https://shewellrx.com/telehealth-consent text. OptiMantra adds signature and date. Add these inputs at the bottom (all inputs in a consent are required):
1. I confirm I will be physically located in New Jersey during every video visit (Single answer: I confirm)
2. I confirm I am 18 or older (Single answer: I confirm)
3. I have received and read the Notice of Privacy Practices (Single answer: I confirm)
4. Appointment reminders and my video link may be sent to me by text message and email (Single answer: Yes / No)
5. Share a summary of my visits with my primary care provider (Single answer: Yes / No) and 6. Primary care provider name and practice (Text)
7. I understand SheWellRX is out of network for all insurance and does not bill Medicare or Medicaid, that I pay the published fee at booking, and that I received a Good Faith Estimate (Single answer: I confirm)
8. Patient initials (Text)

If the practice opts out of Medicare, add a second consent "Medicare Private Contract" (required only for Medicare beneficiaries; present it through the portal to patients who answer yes to a "Are you enrolled in Medicare?" demographics question) with the 42 CFR 405.415 required statements.

---

## How to build these in OptiMantra (once, about 90 minutes each)

1. Settings > Forms > Custom Questionnaire > Add New. Title as above, Practitioner: Huseyin Copur, MD, Allow Resume Later: Yes.
2. Add Category/Section for each section; paste the Instructions line; set All Questions Required per the asterisks; set Calculate Subtotals = Yes on the symptom score sections and give each scored question Weight 1 with answer values 0/1/2/3.
3. Add Question per line: type as the legend, choices separated as the builder expects (one per line), "Line/Answer" Yes for checkbox lists so each option sits on its own line.
4. Save Questionnaire & Sort Order. Preview. Then Settings > Communications > Patient Portal and Kiosk > Questionnaire Specific To Appointment Services > Configure A Questionnaire: Initial Intake -> Initial Telehealth Visit; Follow Up -> Follow Up Telehealth Visit. Remove the GENERAL_ questionnaires from those services. Save Portal Settings.
5. Settings > Communications > Reminder Email: insert the questionnaire link keyword (Custom Questionnaire Links > Add Keyword) and the consent link so the reminder carries them.
6. Do not edit a questionnaire after patients have started it; Duplicate, edit the copy, and archive the old one (OptiMantra's own warning).
