import fs from "fs/promises";

const questionsData = {};

async function loadQuestions() {
    const categories = {
        html: "html_questions.json",
        css: "css_questions.json",
        js: "js_questions.json",
        react: "react_questions.json",
        angular: "angular_questions.json",
        typescript: "typescript_questions.json",
        nodejs: "nodejs_questions.json",
    };

    for (const [category, file] of Object.entries(categories)) {
        try {
            const data = await fs.readFile(`./questions/${file}`, "utf8");
            questionsData[category] = JSON.parse(data).questions;
        } catch (error) {
            console.error(`Ошибка при загрузке вопросов из файла ${file}:`, error);
        }
    }
}

export { loadQuestions, questionsData };