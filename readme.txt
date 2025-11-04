Employee Background Verification Application.

Project Concept:
This is a web-based Employee Background Verification system designed to allow organizations to manage and verify employee details efficiently. Employees can submit their personal, educational, employment, identity, and reference information, while administrators can review submissions and update verification statuses.

Frontend Features:

User (Employee) Side:
- Fill personal, educational, employment, identity, and reference details.
- View verification status (Pending, Verified, Rejected) in real-time.
- Form validation ensures all required fields are completed.
- Upload ID proofs (Aadhaar or PAN).
- Refresh status to see updates.
- Logout functionality.

Admin Side:
- Dashboard showing all employee submissions in a table.
- Search by name or email.
- Filter submissions by status (Pending, Verified, Rejected).
- View complete employee details in a modal.
- Update status to Verified or Rejected.
- Logout functionality.
- Displays "No records found" when there are no matching submissions.

Future Improvements / Backend Integration:
- Replace localStorage with a database for persistent data storage.
- Implement secure login and authentication for users and admins.
- Email notifications when verification status is updated.
- Backend APIs for handling CRUD operations and status updates.
- Secure storage for uploaded ID proofs.
- Reporting and analytics for submission statistics.

Technologies Used:
- HTML, CSS, JavaScript for frontend.
- Browser localStorage for temporary data storage in this frontend version.
