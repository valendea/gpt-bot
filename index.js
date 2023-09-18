import openai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(
    colors.bold.blue(
      "Hello there! ChatBot, fueled by ChatGPT magic, is at your service."
    )
  );
  console.log(colors.bold.blue("What's on your mind?"));

  let chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      chatHistory.push({ role: "user", content: userInput });

      const completion = await openai.chat.completions.create({
        messages: chatHistory,
        model: "gpt-4",
      });

      const completionText = completion.choices[0].message.content;

      if (userInput.trim().toLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + completionText);
        return;
      }

      console.log(colors.green("Bot: ") + completionText);

      chatHistory.push({ role: "assistant", content: completionText });
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
