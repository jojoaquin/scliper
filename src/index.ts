import { answer } from "./answer";
import { Question } from "./questions";
import { singlePageScraper } from "./scraper";

(async () => {
  try {
    const urlType = await Question.urlType();

    const baseUrl = await Question.url({
      urlType,
    });

    if (urlType === "Pagination") {
      const { start, finish } = await Question.range();
      answer.startPagination = start;
      answer.finishPagination = finish;
    }

    const items = await Question.setItems();
    const parentClassName = await Question.parentClassName();
    const itemsWithQuerySelector = await Question.itemsSelector(items);

    answer.urlType = urlType;
    answer.baseUrl = baseUrl;
    answer.items = items;
    answer.parentClassName = parentClassName;
    answer.items = itemsWithQuerySelector;

    const res = await singlePageScraper(answer);

    console.log(answer);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
})();
