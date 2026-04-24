import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/schemas/contactSchema';

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const ipRateMap = new Map();

const CONTACT_EMAIL = 'info@awesomemateremovals.com.au';

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
      // Normalize whitespace without mutating semantic content.
      cleaned[key] = value.trim();
    } else if (Array.isArray(value)) {
      cleaned[key] = value.map((v) => (typeof v === 'string' ? v.trim() : v));
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

function getTurnstileSecret() {
  return (
    process.env.TURNSTILE_SECRET_KEY ||
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
    process.env.Cloudflare_turnstile_secret_key ||
    ''
  );
}

async function verifyTurnstile(token, ip) {
  const isTurnstileRequired =
    process.env.NODE_ENV === 'production' &&
    process.env.TURNSTILE_ENABLED === 'true';

  if (!isTurnstileRequired) {
    return true;
  }

  const turnstileSecret = getTurnstileSecret();
  if (!turnstileSecret) {
    console.error('Turnstile is required in production but TURNSTILE_SECRET_KEY is missing');
    return false;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json();
    return Boolean(data.success);
  } catch (error) {
    console.error('Turnstile verification error:', error);
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

  let conditionalLabel = '';
  let conditionalValue = '';
  if (data.propertyType === 'house' && data.multiStoryHouse) {
    conditionalLabel = 'Multi-Story House';
    conditionalValue = data.multiStoryHouse === 'yes' ? 'Yes' : 'No';
  } else if (data.propertyType === 'apartment' && data.buildingLift) {
    conditionalLabel = 'Building Has Lift';
    conditionalValue = data.buildingLift === 'yes' ? 'Yes' : 'No';
  } else if (data.propertyType === 'villa' && data.itemTypes?.length) {
    const items = data.itemTypes.map((item) => itemTypeLabels[item]).join(', ');
    conditionalLabel = 'Special Items';
    conditionalValue = items;
  }

  return {
    propertyTypeLabel: propertyTypeLabels[data.propertyType],
    serviceTypeLabel: serviceTypeLabels[data.serviceType],
    conditionalLabel,
    conditionalValue,
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeMultilineHtml(value) {
  return escapeHtml(value).replace(/\r?\n/g, '<br>');
}

function generateEmailHtml(data, formatted) {
  const safeData = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    preferredDate: escapeHtml(data.preferredDate),
    preferredTime: escapeHtml(data.preferredTime),
    movingFrom: escapeHtml(data.movingFrom),
    movingTo: escapeHtml(data.movingTo),
    additionalDetails: data.additionalDetails ? escapeMultilineHtml(data.additionalDetails) : '',
  };

  const safeFormatted = {
    serviceTypeLabel: escapeHtml(formatted.serviceTypeLabel),
    propertyTypeLabel: escapeHtml(formatted.propertyTypeLabel),
    conditionalLabel: escapeHtml(formatted.conditionalLabel),
    conditionalValue: escapeHtml(formatted.conditionalValue),
  };

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
        <span class="field-value">${safeData.name}</span>
      </div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value">${safeData.email}</span>
      </div>
    </div>

    <div class="section">
      <h2>Service Details</h2>
      <div class="field">
        <span class="field-label">Service Type:</span>
        <span class="field-value">${safeFormatted.serviceTypeLabel}</span>
      </div>
      <div class="field">
        <span class="field-label">Property Type:</span>
        <span class="field-value">${safeFormatted.propertyTypeLabel}</span>
      </div>
      ${safeFormatted.conditionalLabel && safeFormatted.conditionalValue ? `<div class="field">
        <span class="field-label">${safeFormatted.conditionalLabel}:</span>
        <span class="field-value">${safeFormatted.conditionalValue}</span>
      </div>` : ''}
    </div>

    <div class="section">
      <h2>Preferred Schedule</h2>
      <div class="field">
        <span class="field-label">Preferred Date:</span>
        <span class="field-value">${safeData.preferredDate}</span>
      </div>
      <div class="field">
        <span class="field-label">Preferred Time:</span>
        <span class="field-value">${safeData.preferredTime}</span>
      </div>
    </div>

    <div class="section">
      <h2>Moving Details</h2>
      <div class="field">
        <span class="field-label">Moving From:</span>
        <span class="field-value">${safeData.movingFrom}</span>
      </div>
      <div class="field">
        <span class="field-label">Moving To:</span>
        <span class="field-value">${safeData.movingTo}</span>
      </div>
      ${safeData.additionalDetails ? `<div class="field">
        <span class="field-label">Additional Details:</span>
        <span class="field-value">${safeData.additionalDetails}</span>
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

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Validation failed', details: { form: ['Invalid request payload'] } },
        { status: 400 }
      );
    }

    // Verify Cloudflare Turnstile in production. Development bypass is intentional.
    const turnstileValid = await verifyTurnstile(body.recaptchaToken, ip);
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Turnstile verification failed. Please try again.' },
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
