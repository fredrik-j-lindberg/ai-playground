"use client";

import { useEffect, useState } from "react";

const fetchNews = async (year: string) => {
  const res = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({
      prompt: `Answer only in json where you summarize the top 5 world-wide news stories from ${year}. Json format: [ { "date": "2021-01-01", "title": "Some news story", "summary": "Some summary" } ]}]`,
    }),
  });
  return (await res.json()) as NewsArticle[];
};

type NewsArticle = {
  title: string;
  summary: string;
  date: string;
  source: string;
};
export const News = ({ year }: { year: string }) => {
  const [content, setContent] = useState<NewsArticle[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const updateNews = async () => {
      try {
        const content = await fetchNews(year);
        setContent(content);
      } catch (error) {
        console.error("Failed to fetch news", error);
      }
      setLoading(false);
    };
    void updateNews();
  }, [year]);

  if (loading) {
    return <TableSkeleton />;
  }
  if (!content) return "No data!";
  return <>{content && <NewsTable news={content} />}</>;
};

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";

export function NewsTable({ news }: { news: NewsArticle[] }) {
  console.log("### fredrik: news", news);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((article) => (
            <TableRow key={article.date}>
              <TableCell className="font-medium whitespace-nowrap">
                {article.date}
              </TableCell>
              <TableCell>{article.title}</TableCell>
              <TableCell>{article.summary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {JSON.stringify(news, null, 2)}
    </>
  );
}

const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {new Array(5).fill(null).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {new Array(3).fill(null).map((_, colIndex) => (
            <Skeleton key={colIndex} className="w-full h-10" />
          ))}
        </div>
      ))}
    </div>
  );
};
