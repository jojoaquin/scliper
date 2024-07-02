import inquirer, { QuestionCollection } from "inquirer";

export const prompt = async (
  type: string,
  name: string,
  question: string,
  options?: QuestionCollection<any>
) => {
  const res = await inquirer.prompt([
    {
      type,
      name,
      message: question,
      prefix: "❓",
      suffix: " >>>",
      ...options,
    },
  ]);
  return res;
};
