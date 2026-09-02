# Legacy records migration: 36 GB from FirstChoice ObGyn into OptiMantra

Written 2026-09-01. Sources: OptiMantra "Import your Practice Data into OptiMantra" (https://optimantra.zendesk.com/hc/en-us/articles/53684835222555), "Exporting Data from Another EMR" (https://optimantra.zendesk.com/hc/en-us/articles/53684680981403), HIPAA Security Rule (45 CFR 164.312), NIST SP 800-88, N.J.A.C. 13:35-6.5 (7 year retention), and the legal research in `docs/compliance-checklist.md`.

## What OptiMantra will import (free, through a support ticket in the "Uploads" category)

| Data | Format | Lands in |
| --- | --- | --- |
| Patient demographics (required first) | CSV or Excel using OptiMantra's template (attached to the help article) | Patients list |
| Appointments (optional, one time only) | CSV | Scheduler |
| Charts, scanned documents, ultrasound reports, letters | PDF, one or more per patient, named so they match the patient | Patient > Actions > Documents |
| Clinical summaries | C CDA XML | Patient > Documents (reference only, not parsed into the chart) |
| Chart notes as data | CSV or Excel | Chart notes |
| Services and contacts | CSV | Fee schedule, Contacts |

Not imported: billing history, invoices, balances, packages (recreate open balances as superbill adjustments if any).

## Before touching the data

1. **Inventory (1 day).** List what the 36 GB contains: source system name and version, folder structure, file types (PDF, TIFF/JPEG scans, DICOM ultrasounds, database exports, CSV, C CDA), date range, number of patients, and whether patient identifiers are in file names or inside files. Record it in a spreadsheet. If the source is a hosted EHR, request a full export (demographics CSV, C CDA per patient, documents) rather than screen scraping; follow the OptiMantra export article and do the export once, on a Wednesday or Thursday.
2. **Retention decision.** New Jersey requires 7 years from the last entry for all records; obstetric charts should be kept until the child turns 13 or longer per the malpractice carrier. Import everything inside those windows; do not delete anything older without counsel's sign off.
3. **Contracts.** Confirm the OptiMantra BAA is signed (it is included in the license) and covers the import service; sign a BAA with the legacy EHR vendor for the export and with anyone else who touches the files (IT helper, scanning vendor). No BAA, no access.
4. **Clean workstation.** Use one practice owned, encrypted (FileVault or BitLocker) laptop with cloud sync (iCloud Drive, OneDrive, Google Drive desktop) turned off, current OS, and a screen lock. No personal devices, no email attachments of PHI.

## Preparing the files (1 to 2 weeks of part time work)

5. **Demographics CSV.** Fill OptiMantra's template: last name, first name, DOB, sex, phone, email, address, and a legacy chart ID column. Deduplicate on name + DOB (OptiMantra skips exact matches on later loads and will not update them). Save as UTF 8 CSV.
6. **Documents.** Convert scans to PDF (one PDF per encounter or per chart section), name each `LASTNAME_FIRSTNAME_DOB_YYYY-MM-DD_type.pdf`, and put them in one folder per patient using the same name key. DICOM ultrasound images: export a PDF report per study and keep the raw DICOM in the archive (OptiMantra Documents is a viewer, not a PACS). Expect 36 GB to shrink substantially if the bulk is TIFF or database files.
7. **C CDA.** If the old EHR exports C CDA, include one per patient; it becomes a reference document in OptiMantra.
8. **Integrity.** Run a checksum manifest (`shasum -a 256 -r folder > manifest.txt`) and keep it with the archive.

## Transfer to OptiMantra

9. Open a ticket in OptiMantra (top right "create a ticket", category Uploads) describing the scope and asking for a **secure upload link** for a large transfer (the article offers Google Drive or Dropbox shared to dave@optimantra.com with a password and 7 to 14 day expiry; for 36 GB, ask for their secure link and include the archive password in the ticket, not in the file name).
10. Upload the demographics CSV first, then the document folders. Log who uploaded what and when (chain of custody).
11. OptiMantra validates, cleans, and loads on a weekend slot; processing time varies with volume. Ask them to confirm patient counts loaded and to flag rejects.

## After the load

12. **Verify.** Pick 5 percent of patients at random, open each in OptiMantra, and confirm demographics and that documents opened and are the right patient. Fix mismatches through the ticket.
13. **Archive.** Keep one encrypted, offline copy of the original export plus the manifest (for example a hardware encrypted drive in a locked place, and a second copy in a HIPAA eligible cloud bucket under a BAA). This is the unaltered legacy record; OptiMantra is the working copy.
14. **Destroy working copies.** Securely erase the laptop working folder and any transfer drives per NIST 800-88 (full disk crypto erase or overwrite), empty trash, and get written destruction certificates from any vendor. Ask the legacy EHR vendor in writing to return or destroy PHI per the BAA and confirm their retention period.
15. **Update the HIPAA risk analysis** to record the migration, the archive location, who can access it, and the destruction dates.
16. **Patients.** The office closure notice (see compliance checklist section 8) must tell patients where their records now live and how to request copies; requests are fulfilled from OptiMantra (Send records) within 30 days.

## Timeline

Week 1: inventory, BAAs, workstation. Weeks 2 to 3: CSV, PDF naming, checksum. Week 4: ticket, upload, weekend load. Week 5: verification, archive, destruction, risk analysis update.
