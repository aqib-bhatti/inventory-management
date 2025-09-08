import nodemailer from 'nodemailer';
import { getManagerEmails } from './managerEmails.js';
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Email,
    pass: process.env.PASSWORD
  }
});

export const sendLowStockEmail = async (lowStockItems) => {
  try {
    // console.log('Step 3: Attempting to fetch manager email from DB.');
    const managerEmail = await getManagerEmails();
    // console.log('Step 4: Manager email fetched:', managerEmail);
    
    if (!managerEmail) {
      console.error('Manager email not found in the database. Email not sent.');
      return;
    }

    const subject = `Low Stock Alert: ${lowStockItems.length} items need restocking`;
    const htmlContent = `
      <p>Dear Manager,</p>
      <p>This is an automated low stock alert. The following items are running low:</p>
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product Name</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Remaining Stock</th>
          </tr>
        </thead>
        <tbody>
          ${lowStockItems.map(item => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity} ${item.unit}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p>Please log in to the dashboard and add the new inventory.</p>
    `;

    const mailOptions = {
      from: '"Inventory System" <saadibhatti1921@gmail.com>',
      to: managerEmail,
      subject: subject,
      html: htmlContent
    };

    // console.log('Step 5: Sending email to:', mailOptions.to);
    await transporter.sendMail(mailOptions);
    // console.log('Step 6: Low stock email sent successfully to manager.');

  } catch (error) {
    console.error('Final Error: Error sending email.', error);
  }
};