

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "طريقة الطلب غير مسموحة"
    });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "مفتاح خدمة الذكاء الاصطناعي غير مضبوط"
    });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 10000
    ) {
      return res.status(400).json({
        error: "الرسالة فارغة أو طويلة جداً"
      });
    }

    const safeHistory = Array.isArray(history)
      ? history.slice(-20).filter(item =>
          item &&
          ["user", "assistant"].includes(item.role) &&
          typeof item.content === "string" &&
          item.content.length <= 6000
        )
      : [];

    const messages = [
      {
        role: "system",
        content:
          "أنت Syrian AI، مساعد ذكي عربي احترافي. أجب بدقة ووضوح، واستخدم اللغة التي يتحدث بها المستخدم. لا تخترع المعلومات أو المصادر."
      },
      ...safeHistory,
      {
        role: "user",
        content: message.trim()
      }
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-Title": "Syrian AI"
        },
        body: JSON.stringify({
          model: process.env.OPENROUTER_MODEL || "openrouter/free",
          messages,
          temperature: 0.7,
          max_tokens: 2000
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: "تعذر الحصول على رد من مزود الذكاء الاصطناعي"
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({
        error: "لم يصل رد صالح من النموذج"
      });
    }

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      error: "حدث خطأ داخلي في خادم Syrian AI"
    });
  }
}
