import { Metadata } from "src/utils/post";

export const metadataFixtures: Metadata[] = [
  {
    title: "Type Assertions",
    abstract: "A short guide to convincing typescript you know better than it does",
    lastUpdated: "October 23, 2023",
    slug: "typescript-type-assertions-cheat-sheet",
    tags: ["software eng", "typescript"],
    collection: null,
    isPublished: true,
  },
  {
    title: "Test-Driven Refactoring",
    abstract: "Approaching tests from the angle of refactoring rather than development",
    lastUpdated: "August 9, 2022",
    slug: "test-driven-refactoring",
    tags: ["software eng", "rant"],
    collection: null,
    isPublished: true,
  },
  {
    title: "Smaller Arcs",
    abstract: "Jonathan Hickman, Zeb Wells, and the mythical 40-issue arc.",
    lastUpdated: "December 27, 2022",
    slug: "tie-together-smaller-arcs",
    tags: ["comics", "rant"],
    collection: {
      name: "thousand-comics",
      order: 0,
    },
    isPublished: true,
  },
];
