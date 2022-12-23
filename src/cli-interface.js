import prompts from 'prompts';

export async function ask(question) {
  return await prompts(question);
}

export function output(message) {
  console.log(message);
}
