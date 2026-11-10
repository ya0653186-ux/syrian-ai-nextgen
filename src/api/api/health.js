export default function handler(req, res) {
  return res.status(200).json({
    status: "ok",
    app: "Syrian AI",
    message: "الخادم يعمل بنجاح"
  });
}
