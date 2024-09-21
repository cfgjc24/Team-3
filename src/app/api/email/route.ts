import { Resend } from 'resend';
import EmergencyAlertEmail from '@/emails/mails';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'paguguo8@gmail.com',
        subject: 'Emergency Email',
        react: EmergencyAlertEmail()
      });
  
      return NextResponse.json({
        status: 'Ok'
      });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }