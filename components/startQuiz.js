import { questionsData } from "./loadQuestions.js";

function getRandomQuestion(questions, askedQuestions) {
    const availableQuestions = questions.filter(
        (_, index) => !askedQuestions.includes(index)
    );
    if (availableQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return {
        ...availableQuestions[randomIndex],
        index: questions.indexOf(availableQuestions[randomIndex]), // Сохраняем индекс вопроса
    };
}

async function startQuiz(ctx, category) {
    const questions = ctx.session.questionsData[category];
    if (!questions || questions.length === 0) {
        await ctx.reply(`Не удалось загрузить вопросы для категории ${category}.`);
        return;
    }

    const questionData = getRandomQuestion(questions, ctx.session.askedQuestions || []);
    if (!questionData) {
        await ctx.reply(`🎉 Вы прошли все вопросы по теме ${category}! Набранные баллы: ${ctx.session.correctAnswers[category]}`);
        ctx.session.askedQuestions = [];
        ctx.session.currentQuestion = null;

        const startKeyboard = {
            keyboard: [
                [{ text: "📄 HTML" }, { text: "🎨 CSS" }],
                [{ text: "🟨 JavaScript" }, { text: "⚛️ React" }],
                [{ text: "🅰️ Angular" }, { text: "🟦 TypeScript" }],
                [{ text: "🟩Node.js" }],
                [{ text: "🏆 Рейтинговый режим" }],
                [{ text: "📣 Таблица лидеров" }],
            ],
            resize_keyboard: true,
        };

        await ctx.reply("Выбери категорию или режим:", {
            reply_markup: startKeyboard,
        });
        return;
    }

    ctx.session.currentQuestion = questionData;
    ctx.session.currentCategory = category;

    await ctx.reply(questionData.question, {
        reply_markup: {
            keyboard: questionData.options.map((option) => [{ text: option }]),
            resize_keyboard: true,
        },
    });
}

export default startQuiz;