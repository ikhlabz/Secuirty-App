import { createTransport } from "nodemailer";

var transporter = createTransport({
  host: "smtp.ionos.com",
  port: 587,
  auth: {
    user: "info@livtech.ca",
    pass: "livtechinfo",
  },
});

export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    let sendResult = await transporter.sendMail({
      from: "info@livtech.ca",
      to: email,
      subject: "Password Reset Link",
      text: `Dear user,
            You have requested to reset your password. Please click on the link below to reset your password:

${resetUrl}

If you did not make this request, you can ignore this email.

Best Regards,
Security App`,
      html: `<div>
<p>Dear user,</p>
<p>You have requested to reset your password. Please click on the button below to reset your password:</p>
<a href=${resetUrl} target="_blank" class="button">Reset Password</a>
<p>If you did not make this request, you can ignore this email.</p>
<p>Best Regards,<br>Your App Name</p></div>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordToGuard = async (email, password) => {
  try {
    let sendResult = await transporter.sendMail({
      from: `info@livtech.ca`,
      to: email,
      subject: "Credentials",
      html: `<div>
          <p>Dear user,</p>
          <p>Your email is: ${email}</p>
          <p>Your password is: ${password}</p>
          <p>Your credentials has sent to you by the admin. Please keep it safe.</p>
</div>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};

export const sendShiftAssignmentEmail = async (email, shiftDetails) => {
  try {
    let sendResult = await transporter.sendMail({
      from: `info@livtech.ca`,
      to: email,
      subject: "Shift Assignment",
      html: `<div>
          <p>Dear user,</p>
          <p>You have been assigned to a new shift. Please see the details below:</p>
          <p>Name: ${shiftDetails.shiftName}</p>
          <p>Location: ${shiftDetails.locations[0].locationName}</p>
          <p>Date and Time: ${shiftDetails.shiftStartTime} - ${shiftDetails.shiftEndTime}</p>
          <p>Thank you.</p>
</div>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};
