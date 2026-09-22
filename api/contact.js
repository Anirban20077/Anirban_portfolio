const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, contact, subject, message, video_format } = req.body || {};
    if (!name || !contact || !subject || !message) {
      return res.status(400).json({ error: "Please complete the required fields." });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    const { error } = await supabase.from("contact_messages").insert([{
  name: String(name).trim(),
  contact: String(contact).trim(),
  subject: String(subject).trim(),
  message: String(message).trim(),
  video_format: Array.isArray(video_format) ? video_format : []
}]);

    if (error) throw error;
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not save your inquiry." });
  }
};
