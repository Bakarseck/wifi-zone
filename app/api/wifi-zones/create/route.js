import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Authorization token is missing" }), {
      status: 401,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in .env
    const userId = decoded.id;

    const body = await req.json();
    const { name, description, dns, contact, system } = body;

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
    console.error("Error creating WiFi zone:", error);
    return new Response(JSON.stringify({ error: "Unable to create Wifi Zone" }), {
      status: 400,
    });
  }
}
