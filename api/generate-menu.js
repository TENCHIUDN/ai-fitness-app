const generateMenu = require("../ai"); // ai.js の位置に合わせて相対パス！

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POSTメソッドのみ使用可能です" });
  }

  try {
    let body = "";

    // リクエストボディを手動で読み込む（Vercelでは sometimes必要）
    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", async () => {
      const userData = JSON.parse(body);
      console.log("🔥 受け取ったデータ:", userData);

      const menu = await generateMenu(userData);
      console.log("✅ 生成されたメニュー:", menu);

      res.status(200).json({ menu });
    });

  } catch (err) {
    console.error("❌ Geminiエラー:", err);
    res.status(500).json({ error: "メニュー生成に失敗しました" });
  }
};
