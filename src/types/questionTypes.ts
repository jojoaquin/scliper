export type UrlQuestion = {
  urlType: "Single page" | "Pagination" | "";
};

export type RangeQuestion = {
  start: number;
  finish: number;
};

export type ItemsQuestion = Array<{
  item: string;
  querySelector: string;
}>;
