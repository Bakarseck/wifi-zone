import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const wifiZones = await prisma.wifiZone.findMany({
      where: { userId: parseInt(userId) },
      include: { tariffs: true },
    });

    return new Response(JSON.stringify({ wifiZones }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to fetch data" }), { status: 400 });
  }
}
