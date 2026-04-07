import { NextResponse } from "next/server";
import { z } from "zod";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const ipRateMap = new Map();

const FormSchema = z
  .object({
    formType: z.string().trim().min(1).max(100).default("general"),
    name: z.string().trim().max(120).optional(),
    email: z.string().trim().email().max(254).optional(),
    phone: z.string().trim().max(30).optional(),
    number: z.string().trim().max(30).optional(),
    address: z.string().trim().max(240).optional(),
    select: z.string().trim().max(120).optional(),
    message: z.string().trim().max(4000).optional(),
    comment: z.string().trim().max(4000).optional(),
    terms: z.string().trim().max(20).optional(),
    hp: z.string().trim().max(0).optional(),
  })
  .passthrough();

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
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
    if (typeof value === "string") {
      cleaned[key] = value.replace(/[<>]/g, "").trim();
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

function getRedirectUrl(request, queryKey) {
  const referer = request.headers.get("referer");

  if (!referer) {
    return new URL(`/?${queryKey}=1`, request.url);
  }

  try {
    const url = new URL(referer);
    url.searchParams.set(queryKey, "1");
    return url;
  } catch {
    return new URL(`/?${queryKey}=1`, request.url);
  }
}

function wantsHtml(request) {
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html");
}

function successResponse(request, payload) {
  if (wantsHtml(request)) {
    return NextResponse.redirect(getRedirectUrl(request, "submitted"), 303);
  }

  return NextResponse.json({ ok: true, payload });
}

function errorResponse(request, message, status = 400) {
  if (wantsHtml(request)) {
    return NextResponse.redirect(getRedirectUrl(request, "form_error"), 303);
  }

  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return errorResponse(request, "Too many submissions. Please try again later.", 429);
  }

  const formData = await request.formData();
  const input = Object.fromEntries(formData.entries());

  const parsed = FormSchema.safeParse(input);
  if (!parsed.success) {
    return errorResponse(request, "Invalid form payload.", 422);
  }

  const payload = sanitizePayload(parsed.data);

  if (payload.hp) {
    return successResponse(request, { accepted: true });
  }

  const hasContactSignal =
    Boolean(payload.email) ||
    Boolean(payload.name) ||
    Boolean(payload.message) ||
    Boolean(payload.comment);

  if (!hasContactSignal) {
    return errorResponse(request, "Please provide at least one contact field.", 422);
  }

  if (payload.formType === "newsletter" && !payload.email) {
    return errorResponse(request, "Email is required for newsletter submissions.", 422);
  }

  const webhook = process.env.FORM_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          ip,
          createdAt: new Date().toISOString(),
        }),
      });
    } catch {
      return errorResponse(request, "Unable to process submission right now.", 503);
    }
  }

  return successResponse(request, { accepted: true });
}
