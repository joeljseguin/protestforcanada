import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      organizerEmail,
      organizerName,
      eventTitle,
      eventDate,
      eventLocation,
      registrantName,
      registrantEmail,
      registrantMessage,
    } = await req.json();

    if (!organizerEmail || !registrantName || !registrantEmail || !eventTitle) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log the registration notification (in production, integrate with an email service)
    console.log(`
=== EVENT REGISTRATION NOTIFICATION ===
To: ${organizerName} <${organizerEmail}>
Subject: New Registration for "${eventTitle}"

Dear ${organizerName},

A new participant has registered for your event:

Event: ${eventTitle}
Date: ${eventDate}
Location: ${eventLocation}

Registrant Details:
- Name: ${registrantName}
- Email: ${registrantEmail}
${registrantMessage ? `- Message: ${registrantMessage}` : ""}

This registration was submitted through PROTEST — the humanitarian quest platform.
========================================
    `);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification logged. Email delivery requires email service configuration.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in notify-organizer:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
