import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { service: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      serviceId,
      preferredDate,
      preferredTime,
      notes,
    } = body;

    // Validate required fields
    if (!customerName || !customerName.trim()) {
      return NextResponse.json(
        { error: "Customer name is required" },
        { status: 400 }
      );
    }

    if (!customerPhone || !/^\d{10}$/.test(customerPhone)) {
      return NextResponse.json(
        { error: "A valid 10-digit phone number is required" },
        { status: 400 }
      );
    }

    if (!serviceId || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Service, preferred date, and preferred time are required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        customerName: customerName.trim(),
        customerPhone,
        customerEmail: customerEmail || null,
        serviceId,
        preferredDate: new Date(preferredDate),
        preferredTime,
        notes: notes || null,
      },
      include: { service: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
