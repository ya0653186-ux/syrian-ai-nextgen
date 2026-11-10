
const API_URL = "/api/chat";

export async function sendMessage(message, history = []) {
  if (!message || !message.trim()) {
    throw new Error("الرجاء كتابة رسالة أولاً");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message.trim(),
        history
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "تعذر الاتصال بخدمة الذكاء الاصطناعي"
      );
    }

    if (!data.reply) {
      throw new Error("لم يصل رد من الخادم");
    }

    return data.reply;

  } catch (error) {
    throw new Error(
      error.message || "حدث خطأ أثناء الاتصال بالخادم"
    );
  }
}

