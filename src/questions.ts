import { Answer } from "./answer";
import { ItemsQuestion, UrlQuestion } from "./types/questionTypes";
import { prompt } from "./utils/promptUtils";

const requiredValidation = (input: any, message: string) => {
  if (!input) {
    return message;
  }
  return true;
};

const mustNumberValidation = (input: any) => {
  const parsed = parseInt(input);
  if (isNaN(parsed) || parsed <= 0) {
    return "Input must a positive number";
  }
  return true;
};

const lastNumberValidation = (input: any, start: number) => {
  const parsed = parseInt(input);
  if (isNaN(parsed) || parsed <= 0) {
    return "Input must a positive number";
  }

  if (start >= parsed) {
    return "Last page must be greater than start page";
  }
  return true;
};

const properyItemsValidate = (input: any) => {
  const result = input.replace(/ /g, "_").replace(/\t/g, "").split(";");

  if (result.includes("")) {
    return "Property items is required, there is '' item";
  }
  if (!input.trim()) {
    return "Property items is required";
  }
  if (input.startsWith(";") || input.endsWith(";")) {
    return "Items cannot start or end with a semicolon";
  }
  return true;
};

export class Question {
  static async urlType() {
    const { urlType }: Answer = await prompt(
      "list",
      "urlType",
      "Select URL type",
      {
        choices: ["Single page", "Pagination"],
      }
    );
    return urlType;
  }

  static async url({ urlType }: UrlQuestion) {
    if (urlType === "Single page") {
      const { baseUrl }: Answer = await prompt(
        "input",
        "baseUrl",
        "Base URL link / e.g. 'https://www.scliper.com'",
        {
          validate: (input) => requiredValidation(input, "URL is required"),
        }
      );
      return baseUrl;
    } else {
      const { baseUrl }: Answer = await prompt(
        "input",
        "baseUrl",
        "Base URL link / e.g. 'https://www.scliper.com/pages/'",
        {
          validate: (input: string) =>
            requiredValidation(input, "URL is required"),
        }
      );

      return baseUrl;
    }
  }

  static async range() {
    const { start } = await prompt("input", "start", "Start page number", {
      validate: (input) => mustNumberValidation(input),
    });

    const { finish } = await prompt("input", "finish", "Finish page number", {
      validate: (input) => lastNumberValidation(input, start),
    });

    return {
      start,
      finish,
    };
  }

  static async setItems() {
    const { items }: { items: string } = await prompt(
      "input",
      "items",
      "Set item property, use ; to seperate / e.g. id;title;description;price",
      {
        validate: (input) => properyItemsValidate(input),
      }
    );
    const result = items.replace(/ /g, "_").replace(/\t/g, "").split(";");

    return result.map((v) => {
      return {
        item: v,
        querySelector: "",
      };
    });
  }

  static async parentClassName() {
    const { parentClassName } = await prompt(
      "input",
      "parentClassName",
      "Parent class name",
      {
        validate: (input) =>
          requiredValidation(input, "Parent class name is required"),
      }
    );

    return parentClassName;
  }

  static async itemsSelector(items: ItemsQuestion) {
    for (let i = 0; i < items.length; i++) {
      const { querySelector } = await prompt(
        "input",
        `querySelector`,
        `${items[i].item} query selector`,
        {
          validate: (input) => {
            const isDuplicate = items.some((value) => {
              return value.querySelector === input;
            });

            if (isDuplicate) {
              return "Query selector is must be unique";
            }
            return true;
          },
        }
      );

      items[i].querySelector = querySelector;
    }
    return items;
  }
}
