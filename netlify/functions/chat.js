export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "طريقة الطلب غير مسموحة" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "مفتاح OpenRouter غير مضبوط"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const { message, history = [] } = await request.json();

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 10000
    ) {
      return new Response(
        JSON.stringify({ error: "الرسالة فارغة أو طويلة جداً" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
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
          "أنت Syrian AI، مساعد ذكي عربي احترافي. أجب بدقة ووضوح، واستخدم لغة المستخدم. لا تخترع المعلومات أو المصادر."
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
          Authorization: `Bearer ${apiKey}`,
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
      return new Response(
        JSON.stringify({
          error: "تعذر الحصول على رد من مزود الذكاء الاصطناعي"
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return new Response(
        JSON.stringify({ error: "لم يصل رد صالح من النموذج" }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({ reply }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "حدث خطأ داخلي في خادم Syrian AI"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
