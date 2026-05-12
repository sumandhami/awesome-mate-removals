import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  const secret = req.headers.get("x-sanity-webhook-secret");
  if (process.env.SANITY_WEBHOOK_SECRET && secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  if (body?._type === "post")      revalidateTag("posts");
  if (body?._type === "homepage")  revalidateTag("homepage");
  if (body?._type === "review")    revalidateTag("reviews");
  if (body?._type === "faq")       revalidateTag("faqs");
  if (body?._type === "service")      revalidateTag("services");
  if (body?._type === "siteSettings") revalidateTag("siteSettings");

  return NextResponse.json({ revalidated: true });
}
