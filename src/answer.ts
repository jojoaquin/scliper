import { ItemsQuestion } from "./types/questionTypes";

export type Answer = {
  urlType: "Single page" | "Pagination" | "";
  baseUrl: string;
  startPagination?: number;
  finishPagination?: number;
  items: ItemsQuestion;
  parentClassName: string;
};

export let answer: Answer = {
  urlType: "",
  baseUrl: "",
  startPagination: 0,
  finishPagination: 0,
  items: [],
  parentClassName: "",
};
