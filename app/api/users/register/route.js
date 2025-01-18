import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, password } = body;

    // Input validation
    if (!firstName || !lastName || !email || !phone || !password) {
      return new Response(JSON.stringify({ error: "All fields are required." }), {
        status: 400,
      });
    }

    if (phone.length < 7) {
      return new Response(JSON.stringify({ error: "Phone number must be at least 7 digits long." }), {
        status: 400,
      });
    }

    if (!email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email format." }), {
        status: 400,
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ error: "Password must be at least 6 characters long." }), {
        status: 400,
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already exists." }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return new Response(JSON.stringify({ user: userWithoutPassword }), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
}

export async function GET() {
    return new Response("This API only supports POST requests.", { status: 405 });
}