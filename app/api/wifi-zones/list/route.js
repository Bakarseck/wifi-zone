import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Authorization token is missing" }),
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!userId) {
      throw new Error("Invalid token: userId is missing");
    }

    // Fetch WiFi zones with tariffs and tickets
    const wifiZones = await prisma.wifiZone.findMany({
      where: { userId: parseInt(userId, 10) },
      include: {
        tariffs: {
          include: {
            tickets: true,
          },
        },
      },
    });

    return new Response(JSON.stringify({ wifiZones }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error verifying token or fetching WiFi zones:", error);
    return new Response(JSON.stringify({ error: "Unable to fetch data" }), {
      status: 500,
    });
  }
}
