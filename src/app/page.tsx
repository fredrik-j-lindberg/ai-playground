"use client";

import { News } from "@/components/News";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Home() {
  const [year, setYear] = useState<string>();

  return (
    <main className="flex min-h-screen flex-col justify-between p-24 gap-6">
      <YearSelect year={year} setYear={setYear} />
      <div className="flex-grow">{year && <News year={year} />}</div>
    </main>
  );
}

const YearSelect = ({
  year,
  setYear,
}: {
  year?: string;
  setYear: (year: string) => void;
}) => {
  return (
    <Select value={year} onValueChange={setYear}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {new Array(10)
          .fill(null)
          .map((_, i) => (2021 - i).toString())
          .map((yearOption) => (
            <SelectItem key={yearOption} value={yearOption}>
              {yearOption}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
