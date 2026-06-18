import { NextResponse } from "next/server";

import { createOrder, validateOrder } from "@/lib/orders";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const validation = validateOrder({
      name: String(payload.name || ""),
      phone: String(payload.phone || ""),
      city: String(payload.city || ""),
      address: String(payload.address || ""),
      quantity: Number(payload.quantity || 1),
      productName: String(payload.productName || ""),
      unitPrice: Number(payload.unitPrice || 0),
      source: String(payload.source || "website"),
      whatsappMessage: String(payload.whatsappMessage || "")
    });

    if (!validation.ok) {
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 }
      );
    }

    const result = await createOrder(validation.order);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Order could not be saved. Please try again."
      },
      { status: 500 }
    );
  }
}
