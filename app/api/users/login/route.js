import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  // Validate input
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Email and password are required" }), {
      status: 400,
    });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), {
        status: 401,
      });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), {
        status: 401,
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,            
        { expiresIn: "1h" }                
    );

    // If successful, return user data (excluding sensitive fields like password)
    const { id, firstName, lastName, email: userEmail, phone } = user;

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: { id, firstName, lastName, email: userEmail, phone },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
