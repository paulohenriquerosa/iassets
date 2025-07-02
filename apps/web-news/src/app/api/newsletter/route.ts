import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/newsletter";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    await addSubscriber(email);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("newsletter subscribe error", e);
    return NextResponse.json({ error: "Internal" }, { status: 500 });
  }
} 