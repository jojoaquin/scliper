import { Answer } from "./answer";
import { JSDOM } from "jsdom";

export const singlePageScraper = async (answer: Answer) => {
  try {
    const result: Array<{}> = [];
    const items = answer.items;
    const response = await fetch(answer.baseUrl);
    const html = await response.text();

    if (response.status !== 200) {
      throw new Error(`Response status: ${response.status}`);
    }

    const dom = new JSDOM(html);

    const length = dom.window.document.getElementsByClassName(
      answer.parentClassName
    ).length;
    if (length === 0) {
      throw new Error("Parent class name is not found");
    }
    console.log(`${length} items`);

    for (let i = 0; i < length; i++) {
      const content = dom.window.document
        .getElementsByClassName(answer.parentClassName)
        .item(i);

      const resultItem: { [x: string]: string } = {};

      items.forEach((item) => {
        const itemContent =
          content
            ?.querySelector(item.querySelector)
            ?.textContent?.trim()
            .replace(/[\t\n]+/g, "") || "";
        resultItem[item.item] = itemContent;
      });
      console.log(resultItem); //
      result.push(resultItem);
    }

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
