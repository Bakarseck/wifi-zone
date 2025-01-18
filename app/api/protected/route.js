import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    // Verify the token from the Authorization header
    const user = verifyToken(req);

    // If verification passes, return protected data
    return new Response(
      JSON.stringify({
        message: "Access granted.",
        user, // Contains decoded JWT payload (e.g., user ID, email)
      }),
      { status: 200 }
    );
  } catch (error) {
    // Handle authentication errors
    return new Response(JSON.stringify({ error: error.message }), { status: 401 });
  }
}
