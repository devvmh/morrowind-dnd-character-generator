import { ask, output } from './cli-interface.js';
import questions from './questions.js';
import { getStats, getClass } from './logic.js';
import { render } from './render.js';

async function main() {
  output("Welcome to Morrowind DND Character Generator. I'm going to ask you ten questions, and then generate you a character");
  const answers = await askQuestions();
  const stats = getStats(answers);
  const klass = getClass(answers);
  const characterText = render(stats, klass);
  output(characterText);
}

async function askQuestions() {
  const answers = {};
  for (let i = 0; i < questions.length; i += 1) {
    const answer = await ask(questions[i]);
    Object.entries(answer.value).forEach(([key, value]) => {
      if (answers[key] === undefined) {
        answers[key] = 0;
      }
      answers[key] += value;
    });
  }
  return answers;
}

main();
