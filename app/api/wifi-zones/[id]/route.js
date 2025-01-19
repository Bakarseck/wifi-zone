import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function POST (req) {
  const authHeader = req.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Authorization token is missing' }),
      {
        status: 401
      }
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // Ensure JWT_SECRET is set in .env
    const userId = decoded.id

    const body = await req.json()
    const { name, description, dns, contact, system } = body

    const wifiZone = await prisma.wifiZone.create({
      data: {
        name,
        description,
        dns,
        contact,
        system,
        userId
      }
    })

    return new Response(JSON.stringify({ wifiZone }), { status: 201 })
  } catch (error) {
    console.error('Error creating WiFi zone:', error)
    return new Response(
      JSON.stringify({ error: 'Unable to create Wifi Zone' }),
      {
        status: 400
      }
    )
  }
}

export async function GET (req) {
  const authHeader = req.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Authorization token is missing' }),
      {
        status: 401
      }
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    const wifiZones = await prisma.wifiZone.findMany({
      where: { userId },
      include: { tariffs: true }
    })

    return new Response(JSON.stringify({ wifiZones }), { status: 200 })
  } catch (error) {
    console.error('Error fetching WiFi zones:', error)
    return new Response(
      JSON.stringify({ error: 'Unable to fetch WiFi zones' }),
      {
        status: 500
      }
    )
  }
}

export async function PATCH (req, { params }) {
  const { id } = params
  const authHeader = req.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Authorization token is missing' }),
      {
        status: 401
      }
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    jwt.verify(token, process.env.JWT_SECRET)

    const body = await req.json()
    const updatedZone = await prisma.wifiZone.update({
      where: { id: parseInt(id, 10) },
      data: body
    })

    return new Response(JSON.stringify({ updatedZone }), { status: 200 })
  } catch (error) {
    console.error('Error updating WiFi zone:', error)
    return new Response(
      JSON.stringify({ error: 'Unable to update WiFi zone' }),
      {
        status: 500
      }
    )
  }
}

export async function DELETE (req, { params }) {
  const { id } = params
  const authHeader = req.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ error: 'Authorization token is missing' }),
      {
        status: 401
      }
    )
  }

  const token = authHeader.split(' ')[1]

  try {
    jwt.verify(token, process.env.JWT_SECRET)

    await prisma.wifiZone.delete({
      where: { id: parseInt(id, 10) }
    })

    return new Response(
      JSON.stringify({ message: 'WiFi zone deleted successfully' }),
      {
        status: 200
      }
    )
  } catch (error) {
    console.error('Error deleting WiFi zone:', error)
    return new Response(
      JSON.stringify({ error: 'Unable to delete WiFi zone' }),
      {
        status: 500
      }
    )
  }
}
