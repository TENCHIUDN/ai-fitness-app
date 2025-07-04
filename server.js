const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // ← これが超重要！！

const generateMenu = require('./ai');

app.post('/api/generate-menu', async (req, res) => {
  console.log("🌟 /api/generate-menu にPOSTきたよ！"); // ← これ追加！
  try {
    const userData = req.body;
    console.log("🔥 受け取ったデータ:", userData);

    const menu = await generateMenu(userData);
    console.log("✅ 生成されたメニュー:", menu);

    res.json({ menu });
  } catch (err) {
    console.error("❌ Geminiエラー:", err);
    res.status(500).json({ error: "メニュー生成に失敗しました" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ http://localhost:${PORT} でアプリ起動中🏃‍♂️`);
});
