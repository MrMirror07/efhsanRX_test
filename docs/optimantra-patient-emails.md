# Patient emails and texts to load into OptiMantra

Loaded 2026-09-02: all templates below now exist in the account. Form link codes in this account: consent "SheWellRX Telehealth Consent and Terms of Care" = CFID_164622; questionnaire "GENERAL_Intake & History" = CUSTOMQX_115506; "GENERAL_*Follow-Up" = CUSTOMQX_115505. When the SheWellRX questionnaires are built, insert their new codes with the "Custom Questionnaire Links" button and replace the GENERAL_ codes in both confirmation templates and the reminder email.

Written 2026-09-02. These are the exact texts for the automated messages a patient receives from booking to visit. Keywords in CAPITALS are OptiMantra placeholders (Settings > Communications > Reminder Email > Message Tips). Form links are inserted with the "Consent Forms Links" and "Custom Questionnaire Links" buttons in the editor, which drop a code that becomes a patient specific link when sent. Set every template's Reply-to to njobgyn@gmail.com; OptiMantra will not send at all if Reply-to is blank.

## How the pieces fit

| Moment | What sends it | Where to configure |
| --- | --- | --- |
| Right after online booking and payment | The email template assigned to the service (Settings > Services > Services (Fee Schedule) > More > Assign Email Template To Service). OptiMantra: "If you allow self-scheduling, this email template will serve as the automated email confirmation." Plus a confirmation text when Location Settings has "Send Appointment Confirmation Through Text Also: To Both" (already on). | Templates below: "Booking confirmed, initial visit" and "Booking confirmed, follow up" |
| Receipt | The online payment creates a paid superbill dated the visit. The confirmation email states the amount and that the receipt lives in the portal under Superbills. For a second copy, open the superbill and tick "Send Email" (balance $0 sends a receipt). Statement descriptor on the card: set to SHEWELLRX (Settings > Payments > Processors > Stripe Express > Update Statement Descriptor) so the charge is recognizable and carries no health detail. | Superbill, Stripe Express |
| 2 days before | Reminder Email for Huseyin Copur, MD, sent 10:00 AM Eastern, with VIDEO_CHAT_LINK and the forms. | Settings > Communications > Reminder Email |
| 1 day before | Reminder Text, with the video link. Location Settings text template: "Reminder with Videochat Link". | Settings > Communications > Reminder Text |
| Cancellation | Cancellation template, restating the 24 hour refund rule and how to rebook. | Settings > Communications > Cancellation Templates |

## Email template 1: "Booking confirmed, initial visit" (assign to Initial Telehealth Visit)

From name: SheWellRX
Subject: Your SheWellRX video visit is confirmed for APPOINTMENT_START_DATE_TIME
Reply-to: njobgyn@gmail.com

Message:

Hi FIRST_NAME_OR_NICK_NAME,

You are booked. Here are the details.

Visit: APPOINTMENT_SERVICE_NAME with PRACTITIONER_NAME
When: APPOINTMENT_START_DATE_TIME (Eastern time)
Where: on video, from anywhere private in New Jersey. Your link is below and comes again in your reminders.

Join your visit: VIDEO_CHAT_LINK

Payment: your $249 visit fee was charged today to the card you entered. The charge appears as SHEWELLRX on your statement. Your receipt is saved in the patient portal under Superbills, and you may request an itemized superbill for out of network reimbursement at any time. This fee is the only charge from SheWellRX; medications and lab tests, if any, are billed by your pharmacy or lab. Your written Good Faith Estimate will follow in the portal.

Three things to do before we meet (about ten minutes):
1. Sign your telehealth consent: [insert Consent Form link: SheWellRX Telehealth Consent and Terms of Care]
2. Complete your intake so Dr. Copur can read your story first: [insert Custom Questionnaire link: SheWellRX Initial Intake]
3. Set up your patient portal, where your messages, results, and receipts live: go to https://www.optimantra.com/optimus/om/patient/login?accessPoint=L1YvN0JQYzk1ZnRsdlFXNEhOOXJWUT09, choose New Sign Up, and use this same email address, your first name, and your date of birth.

Need to change your time? Sign in to the portal and choose your appointment, or reply to this email. Cancel or reschedule up to 24 hours before your visit for a full refund; later cancellations and missed visits are not refunded.

Please have your medication list, pharmacy name, and any recent lab results nearby. If you feel unwell in a way that cannot wait, do not wait for us: call 911 or go to the nearest emergency room.

Warmly,
SheWellRX
The telehealth practice of Huseyin Copur, MD, board certified in obstetrics and gynecology (ABOG), licensed in New Jersey
njobgyn@gmail.com

Footer: SheWellRX does not provide emergency care. Visits are for patients physically located in New Jersey. This email may contain appointment information; if you received it in error, delete it and let us know.

## Email template 2: "Booking confirmed, follow up" (assign to Follow Up Telehealth Visit)

Same as template 1 with these changes: subject unchanged; payment paragraph says "$149"; step 2 links the "SheWellRX Follow Up" questionnaire; step 1 becomes "Your consent on file still applies. If anything about your health or contact details has changed, update it in the portal."

## Reminder Email (Settings > Communications > Reminder Email, practitioner Huseyin Copur, MD)

Send: 2 days before. Reply-to: njobgyn@gmail.com.
Subject: Reminder: your SheWellRX video visit is APPOINTMENT_START_DATE_TIME

Hi FIRST_NAME_OR_NICK_NAME,

Your video visit with PRACTITIONER_NAME is APPOINTMENT_START_DATE_TIME (Eastern).

Join here at your appointment time: VIDEO_CHAT_LINK
Use Chrome, Safari, or Edge on a phone, tablet, or computer; no app needed. Allow camera and microphone when asked, and find a quiet, private spot in New Jersey.

Still to do, if you have not yet: your consent [Consent Form link] and your intake [Custom Questionnaire link]. Dr. Copur reads every answer before you connect.

To change your time, sign in to the portal (https://www.optimantra.com/optimus/om/patient/login?accessPoint=L1YvN0JQYzk1ZnRsdlFXNEhOOXJWUT09) or reply to this email at least 24 hours ahead.

For emergencies, call 911.

SheWellRX, njobgyn@gmail.com

Set "New Patient Reminder Email" and "Follow Up Reminder Email" both to use this template. Set Notification Email Destination and Patient Portal Message Destination Email to njobgyn@gmail.com.

## Reminder Text (Settings > Communications > Reminder Text, 1 day before)

SheWellRX: your video visit with Dr. Copur is APPOINTMENT_START_DATE_TIME ET. Join: VIDEO_CHAT_LINK. Change your time 24h+ ahead in the portal. Reply STOP to opt out.

## Confirmation text (Location Settings, template "Reminder with Videochat Link")

SheWellRX: you are booked for APPOINTMENT_START_DATE_TIME ET with Dr. Copur. Details and your video link are in your email. Reply STOP to opt out.

## Cancellation template

Subject: Your SheWellRX visit on APPOINTMENT_START_DATE_TIME has been cancelled

Hi FIRST_NAME_OR_NICK_NAME, your visit on APPOINTMENT_START_DATE_TIME has been cancelled. Cancellations made at least 24 hours ahead are refunded in full to the original card within 5 to 10 business days. To book a new time, start at https://shewellrx.com/book or sign in to the portal. If you did not request this, reply to this email.

## Scheduler notice (Settings > Scheduling > Online Booking > Location Settings > Notice To Display On Top Of Online Bookings)

Visits are with Huseyin Copur, MD, a physician licensed in New Jersey and board certified in obstetrics and gynecology (ABOG). When a certified nurse midwife joins SheWellRX, you will be told if your visit is scheduled with the nurse midwife and you may request the physician instead. Video visits are for patients physically located in New Jersey at the time of the visit, age 18 and older. You pay the full visit fee at the end of booking; cancel or reschedule up to 24 hours before for a full refund. Not for emergencies: call 911. Questions: njobgyn@gmail.com.

## Provider description (Settings > Business > Provider Settings > Description (Online Bookings))

Huseyin Copur, MD, FACOG. Board certified in obstetrics and gynecology by the American Board of Obstetrics and Gynecology since 1989 and in private practice in northern New Jersey since 2002. Every SheWellRX visit is a 30 minute video conversation with Dr. Copur himself, followed by a written plan and two weeks of follow up messaging.
