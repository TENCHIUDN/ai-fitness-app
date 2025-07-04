const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Gemini APIキーから初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateMenu(userData) {
  const {
    weight,
    bodyFat,
    coreMuscle,
    rightArm,
    leftArm,
    rightLeg,
    leftLeg,
    goal,
    duration,
    parts
  } = userData;

  // プロンプト作成
const prompt = `
ユーザーの体組成データ：
- 体重：${weight}kg
- 体脂肪率：${bodyFat}%
- 筋肉量（kg）：体幹 ${coreMuscle}、右腕 ${rightArm}、左腕 ${leftArm}、右脚 ${rightLeg}、左脚 ${leftLeg}

トレーニングの目的は「${goal}」で、時間は「${duration}分」、鍛えたい部位は「${parts.join("、")}」です。

この情報をもとに、今日行うべきトレーニングメニューを日本語で提案してください。
初心者〜中級者向けで、道具は自重 or 家庭用器具を想定。
筋トレと有酸素をバランスよく含めてください。

形式は以下の通り：
- 種目名
　内容（重量、回数、時間など）←全角スペースでインデントしてください
- **補足、注意書き、アドバイス等は不要です。**
- 出力はトレーニングメニュー本体のみにしてください。
- メニューについての説明は不要です。
`;


  try {
    // モデルの選択（v1対応モデル名を明示）
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // コンテンツ生成
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (err) {
    console.error("Gemini APIエラー:", err);
    return "AIメニューの生成に失敗しました。";
  }
}

module.exports = generateMenu;