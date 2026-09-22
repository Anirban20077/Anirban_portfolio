const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, type, message } = req.body || {};
    if (!type || !message) {
      return res.status(400).json({ error: "Feedback type and message are required." });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );

    const { error } = await supabase.from("feedback").insert([{
      name: name ? String(name).trim() : null,
      email: email ? String(email).trim() : null,
      feedback_type: String(type).trim(),
      message: String(message).trim()
    }]);

    if (error) throw error;
    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not save your feedback." });
  }
};
