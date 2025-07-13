import { RequestHandler } from "express";

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
  timestamp: string;
  whatsappNumber: string;
}

export const handleSendInquiry: RequestHandler = async (req, res) => {
  try {
    const inquiryData: InquiryData = req.body;

    // Validate required fields
    if (
      !inquiryData.name ||
      !inquiryData.email ||
      !inquiryData.subject ||
      !inquiryData.message
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Format the WhatsApp message
    const whatsappMessage =
      `🌟 *NEW INQUIRY FROM MERFUME WEBSITE* 🌟\n\n` +
      `👤 *Name:* ${inquiryData.name}\n` +
      `📧 *Email:* ${inquiryData.email}\n` +
      `📱 *Phone:* ${inquiryData.phone}\n` +
      `📝 *Inquiry Type:* ${inquiryData.inquiryType}\n` +
      `📋 *Subject:* ${inquiryData.subject}\n\n` +
      `💬 *Message:*\n${inquiryData.message}\n\n` +
      `🕒 *Submitted:* ${new Date(inquiryData.timestamp).toLocaleString()}\n\n` +
      `✨ This inquiry was submitted through the Merfume website contact form.`;

    // In a real implementation, you would use WhatsApp Business API
    // For now, we'll simulate success and log the data
    console.log("=== NEW INQUIRY RECEIVED ===");
    console.log("WhatsApp Number:", inquiryData.whatsappNumber);
    console.log("Message:", whatsappMessage);
    console.log("Raw Data:", inquiryData);
    console.log("=================================");

    // Simulate API processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For production, you would integrate with:
    // 1. WhatsApp Business API
    // 2. Twilio WhatsApp API
    // 3. Or another WhatsApp service provider

    // Example implementation with WhatsApp Business API would look like:
    /*
    const response = await fetch('https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: inquiryData.whatsappNumber,
        type: 'text',
        text: {
          body: whatsappMessage
        }
      })
    });
    */

    // For now, return success (the message was logged and can be processed manually)
    res.json({
      success: true,
      message: "Inquiry received and forwarded successfully",
      inquiryId: Date.now().toString(), // Simple ID generation
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process inquiry",
    });
  }
};
