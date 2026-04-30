"use server"

import nodemailer from "nodemailer"

export type BookingPayload = {
  source: "main_form" | "route_modal"
  first_name: string
  last_name: string
  email?: string
  phone?: string
  origin_city?: string
  origin_country?: string
  destination_city?: string
  destination_country?: string
  travel_date?: string
  passengers: number
  payment_type?: string
  vehicle_class?: string
  route_city?: string
  route_country?: string
  route_code?: string
  direction?: string
  return_date?: string
  special_requests?: string
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function formatBookingEmail(payload: BookingPayload): string {
  const lines: string[] = [
    `<h2>New Booking Request</h2>`,
    `<p><strong>Source:</strong> ${payload.source === "main_form" ? "Main Form" : "Route Modal"}</p>`,
    `<hr/>`,
    `<h3>Customer Information</h3>`,
    `<p><strong>Name:</strong> ${payload.first_name} ${payload.last_name}</p>`,
  ]

  if (payload.email) lines.push(`<p><strong>Email:</strong> ${payload.email}</p>`)
  if (payload.phone) lines.push(`<p><strong>Phone:</strong> ${payload.phone}</p>`)

  lines.push(`<hr/>`, `<h3>Trip Details</h3>`)

  if (payload.source === "route_modal") {
    if (payload.route_city && payload.route_country) {
      lines.push(`<p><strong>Route:</strong> ${payload.route_city}, ${payload.route_country} (${payload.route_code || "N/A"})</p>`)
    }
    if (payload.direction) lines.push(`<p><strong>Direction:</strong> ${payload.direction}</p>`)
  } else {
    if (payload.origin_city || payload.origin_country) {
      lines.push(`<p><strong>Origin:</strong> ${payload.origin_city || ""}, ${payload.origin_country || ""}</p>`)
    }
    if (payload.destination_city || payload.destination_country) {
      lines.push(`<p><strong>Destination:</strong> ${payload.destination_city || ""}, ${payload.destination_country || ""}</p>`)
    }
  }

  if (payload.travel_date) lines.push(`<p><strong>Travel Date:</strong> ${payload.travel_date}</p>`)
  if (payload.return_date) lines.push(`<p><strong>Return Date:</strong> ${payload.return_date}</p>`)
  lines.push(`<p><strong>Passengers:</strong> ${payload.passengers}</p>`)

  if (payload.vehicle_class) lines.push(`<p><strong>Vehicle Class:</strong> ${payload.vehicle_class}</p>`)
  if (payload.payment_type) lines.push(`<p><strong>Payment Type:</strong> ${payload.payment_type}</p>`)

  if (payload.special_requests) {
    lines.push(`<hr/>`, `<h3>Special Requests</h3>`, `<p>${payload.special_requests}</p>`)
  }

  lines.push(`<hr/>`, `<p style="color: #666; font-size: 12px;">This booking was submitted on ${new Date().toLocaleString()}</p>`)

  return lines.join("\n")
}

export async function submitBooking(payload: BookingPayload) {
  console.log("[booking]", payload)

  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.BOOKING_EMAIL_TO || process.env.GMAIL_USER,
      subject: `New Booking: ${payload.first_name} ${payload.last_name} - ${payload.source === "route_modal" ? payload.route_city : payload.origin_city} → ${payload.source === "route_modal" ? "Transfer" : payload.destination_city}`,
      html: formatBookingEmail(payload),
    }

    await transporter.sendMail(mailOptions)
    console.log("[booking] Email sent successfully")
    return { success: true }
  } catch (error) {
    console.error("[booking] Failed to send email:", error)
    return { success: false, error: "Failed to send booking email" }
  }
}
