import { NextResponse } from "next/server";

/**
 * Contact submissions — Vercel Route Handler stub.
 * Persist to DynamoDB (via CDK) in a later milestone.
 */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "Contact endpoint not implemented yet.",
    },
    { status: 501 },
  );
}
