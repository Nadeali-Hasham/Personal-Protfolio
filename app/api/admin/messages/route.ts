import { NextResponse } from "next/server";

type ResendEmail = {
  id: string;
  to: string[];
  from: string;
  subject: string;
  created_at: string;
  last_event?: string;
};

export async function GET(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  const apiKey = process.env.RESEND_API_KEY;

  if (!secret || !apiKey) {
    return NextResponse.json(
      { message: "Admin log is not configured. Set ADMIN_SECRET and RESEND_API_KEY." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const provided = searchParams.get("secret");

  if (!provided || provided !== secret) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      cache: "no-store"
    });

    const payload = (await response.json()) as {
      data?: ResendEmail[];
      message?: string;
    };

    if (!response.ok) {
      return NextResponse.json(
        { message: payload.message ?? "Could not load email log from Resend." },
        { status: response.status }
      );
    }

    const emails = (payload.data ?? [])
      .filter((email) => /portfolio|message received|contact/i.test(email.subject))
      .slice(0, 30);

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Admin messages fetch failed:", error);
    return NextResponse.json({ message: "Could not load email log." }, { status: 502 });
  }
}
