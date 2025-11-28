import nodemailer from "nodemailer";

export async function POST(req: { json: () => PromiseLike<{ firstname: string; lastname:string; email: string; message: string; }> | {firstname:string; lastname: string; email: string; message: string; }; }) {
  try {
    const {firstname,lastname, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.MAIL_USER,
      subject: `A New meessage from ${firstname + lastname}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}
