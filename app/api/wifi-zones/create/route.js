import prisma from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();
  const { name, description, dns, contact, system, userId } = body;

  try {
    const wifiZone = await prisma.wifiZone.create({
      data: {
        name,
        description,
        dns,
        contact,
        system,
        userId,
      },
    });

    return new Response(JSON.stringify({ wifiZone }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to create Wifi Zone" }), { status: 400 });
  }
}
