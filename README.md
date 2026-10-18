ANV PUBLIC SCHOOL PORTAL - SETUP GUIDE

Files:
- index.html: main website, public notices and syllabus listing
- admin.html: admin dashboard, student records, admit cards, syllabus uploads and notices
- student.html: student login and private admit-card viewing/printing
- firestore.rules: Firestore security rules
- storage.rules: Firebase Storage security rules

IMPORTANT BEFORE PUBLISHING
1. Confirm ADMIN_UID in admin.html, firestore.rules and storage.rules exactly matches Firebase Authentication > Users > the admin account UID.
2. This code uses the provided Firebase web config and admin UID from the supplied code. Firebase web config is client-side config, not a service-account private key.
3. Enable Firebase Authentication > Email/Password.
4. Create/enable a Firebase Storage bucket in Firebase Console. If Firebase asks for a billing plan, check the plan/cost implications before enabling.
5. Publish firestore.rules in Firestore Database > Rules and storage.rules in Storage > Rules.
6. In Firebase Authentication, create each student's account (email/password) yourself through the console. Never put a student's password into Firestore or this website. Copy that account's exact UID into the Student Firebase Auth UID field in Admin > Students. Only then will published admit cards be linked to that account.
7. Use a unique email/password for each student, share credentials privately with the student's parent/guardian, and arrange password reset support.
8. Public syllabus PDFs are intentionally readable by anyone who has the public website. Do not upload private student information inside syllabus PDFs.
9. Main page keeps the original external style.css and script.js references. Keep your existing files in the same GitHub repository. The Cashfree button remains dependent on your existing script.js/payment-link setup; do not assume payments work until tested end-to-end.
10. Test using one sample student and a non-sensitive test PDF/notice. Verify a student cannot see another student's admit card.

KNOWN LIMITATION
The admit-card publish button skips a card if it finds an existing record with the same exam title and class for that student. For a reissued card, use a new exam title or manage the old record through Firebase Console/admin backend. Payment processing is not implemented by these files.

