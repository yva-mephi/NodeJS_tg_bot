import { questionsData } from "./loadQuestions.js";
import startQuiz from "./startQuiz.js";
import { updateLeaderboard } from "../database/userUpdate.js";

async function startRatingQuiz(ctx) {
    ctx.session.ratingMode = true;
    ctx.session.score = 0;

    await ctx.reply(
        "🏆 Рейтинговый режим начался! За каждый правильный ответ вы получаете 1 балл. Ошибка завершает игру."
    );

    // Объединяем вопросы из всех категорий
    const allQuestions = Object.values(questionsData).flat();

    // Сохраняем объединенные вопросы в сессию
    ctx.session.questionsData = { mixed: allQuestions };

    // Запуск первого вопроса
    await startQuiz(ctx, "mixed");
}

export default startRatingQuiz;