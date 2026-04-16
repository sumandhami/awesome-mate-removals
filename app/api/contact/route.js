import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/schemas/contactSchema';

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const ipRateMap = new Map();

const CONTACT_EMAIL = 'sdhami934@gmail.com';

// Initialize Resend client only when API key is available
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('Resend API key not configured');
    return null;
  }
  return new Resend(apiKey);
};

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = ipRateMap.get(ip);

  if (!current || now > current.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  ipRateMap.set(ip, current);

  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function sanitizePayload(payload) {
  const cleaned = {};

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'string') {
      cleaned[key] = value.replace(/[<>]/g, '').trim();
    } else if (Array.isArray(value)) {
      cleaned[key] = value.map((v) => (typeof v === 'string' ? v.replace(/[<>]/g, '').trim() : v));
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

async function verifyRecaptcha(token) {
  const isRecaptchaRequired =
    process.env.NODE_ENV === 'production' &&
    process.env.RECAPTCHA_ENABLED === 'true';

  if (!isRecaptchaRequired) {
    return true;
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.error('reCAPTCHA is required in production but RECAPTCHA_SECRET_KEY is missing');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    if (data.score !== undefined) {
      return data.score >= 0.5;
    }

    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

function formatFormData(data) {
  const propertyTypeLabels = {
    house: 'House',
    apartment: 'Apartment',
    villa: 'Villa',
    other: 'Other',
  };

  const serviceTypeLabels = {
    removal: 'Removal',
    transport: 'Transport',
    storage: 'Storage',
    other: 'Other',
  };

  const itemTypeLabels = {
    marble_table: 'Marble Table',
    stone_table: 'Stone Table',
    statue: 'Statue',
    piano: 'Piano',
    pool_table: 'Pool Table',
    scooters: 'Scooters',
    e_bikes: 'E-Bikes',
  };

  let conditionalInfo = '';
  if (data.propertyType === 'house' && data.multiStoryHouse) {
    conditionalInfo = `Multi-Story House: ${data.multiStoryHouse === 'yes' ? 'Yes' : 'No'}`;
  } else if (data.propertyType === 'apartment' && data.buildingLift) {
    conditionalInfo = `Building Has Lift: ${data.buildingLift === 'yes' ? 'Yes' : 'No'}`;
  } else if (data.propertyType === 'villa' && data.itemTypes?.length) {
    const items = data.itemTypes.map((item) => itemTypeLabels[item]).join(', ');
    conditionalInfo = `Special Items: ${items}`;
  }

  return {
    propertyTypeLabel: propertyTypeLabels[data.propertyType],
    serviceTypeLabel: serviceTypeLabels[data.serviceType],
    conditionalInfo,
  };
}

function generateEmailHtml(data, formatted) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { margin-bottom: 20px; }
    .section h2 { color: #1e3c72; font-size: 16px; margin-top: 0; border-bottom: 2px solid #2a5298; padding-bottom: 10px; }
    .field { margin-bottom: 10px; }
    .field-label { font-weight: bold; color: #1e3c72; }
    .field-value { color: #555; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>

    <div class="section">
      <h2>Personal Information</h2>
      <div class="field">
        <span class="field-label">Name:</span>
        <span class="field-value">${data.name}</span>
      </div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value">${data.email}</span>
      </div>
    </div>

    <div class="section">
      <h2>Service Details</h2>
      <div class="field">
        <span class="field-label">Service Type:</span>
        <span class="field-value">${formatted.serviceTypeLabel}</span>
      </div>
      <div class="field">
        <span class="field-label">Property Type:</span>
        <span class="field-value">${formatted.propertyTypeLabel}</span>
      </div>
      ${formatted.conditionalInfo ? `<div class="field">
        <span class="field-label">${formatted.conditionalInfo.split(':')[0]}:</span>
        <span class="field-value">${formatted.conditionalInfo.split(':')[1].trim()}</span>
      </div>` : ''}
    </div>

    <div class="section">
      <h2>Preferred Schedule</h2>
      <div class="field">
        <span class="field-label">Preferred Date:</span>
        <span class="field-value">${data.preferredDate}</span>
      </div>
      <div class="field">
        <span class="field-label">Preferred Time:</span>
        <span class="field-value">${data.preferredTime}</span>
      </div>
    </div>

    <div class="section">
      <h2>Moving Details</h2>
      <div class="field">
        <span class="field-label">Moving From:</span>
        <span class="field-value">${data.movingFrom}</span>
      </div>
      <div class="field">
        <span class="field-label">Moving To:</span>
        <span class="field-value">${data.movingTo}</span>
      </div>
      ${data.additionalDetails ? `<div class="field">
        <span class="field-label">Additional Details:</span>
        <span class="field-value">${data.additionalDetails.replace(/\n/g, '<br>')}</span>
      </div>` : ''}
    </div>

    <div class="footer">
      <p>This is an automated email from Awesome Mate Removals contact form.</p>
      <p>Submission Time: ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Verify reCAPTCHA
    const recaptchaValid = await verifyRecaptcha(body.recaptchaToken);
    if (!recaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Validate with Zod schema
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Sanitize payload
    const sanitized = sanitizePayload(parsed.data);

    // Format data for email
    const formatted = formatFormData(sanitized);

    // Generate email HTML
    const emailHtml = generateEmailHtml(sanitized, formatted);

    // Send email via Resend (only if API key is configured)
    const resend = getResendClient();
    if (resend) {
      try {
        const emailResult = await resend.emails.send({
          from: 'Contact Form <onboarding@resend.dev>',
          to: CONTACT_EMAIL,
          replyTo: sanitized.email,
          subject: `New Contact Form Submission from ${sanitized.name}`,
          html: emailHtml,
        });

        if (emailResult.error) {
          console.error('Email sending error:', emailResult.error);
          return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
          );
        }
      } catch (emailError) {
        console.error('Email service error:', emailError);
        return NextResponse.json(
          { error: 'Email service temporarily unavailable. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      console.log('Email not sent - Resend API key not configured. Form data:', sanitized);
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Your message has been sent successfully',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
