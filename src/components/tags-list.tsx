"use client";

import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export function TagList({ tags }: { tags: string }) {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/?search=${tag}`);
  }

  return (
    <div className="mt-4">
      {tags.split(",").map((tag) => (
        <Badge
          key={tag.trim()}
          variant="outline"
          className="mr-1 mb-1 cursor-pointer select-none"
          onClick={() => handleTagClick(tag.trim())}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTagClick(tag.trim());
            }
          }}
          tabIndex={0}
        >
          {tag.trim()}
        </Badge>
      ))}
    </div>
  );
}