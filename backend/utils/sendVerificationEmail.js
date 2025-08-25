import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (user) => {
  if (!user.email || !user.verificationToken || !user._id) {
    throw new Error('Missing user data for email verification');
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `${process.env.BACKEND_URL}/api/auth/verify-email?userId=${user._id}&verificationToken=${user.verificationToken}`;

  await transporter.sendMail({
    from: 'noreply.println.typinggame@gmail.com',
    to: user.email,
    subject: 'Verify your email',
    html: `<p>Welcome to Typing Game, ${user.username}!</p>
           <p>Please verify your email by clicking the link below:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  });
};