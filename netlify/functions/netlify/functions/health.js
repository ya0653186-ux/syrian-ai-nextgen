export default async function handler() {
  return new Response(
    JSON.stringify({
      status: "ok",
      app: "Syrian AI",
      message: "الخادم يعمل بنجاح"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
