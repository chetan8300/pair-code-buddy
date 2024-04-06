import { Badge } from "./ui/badge";

export function TagList({ tags }: { tags: string }) {
  return (
    <div className="mt-4">
      {tags.split(",").map((tag) => (
        <Badge key={tag.trim()} variant="outline" className="mr-1 mb-1">
          {tag.trim()}
        </Badge>
      ))}
    </div>
  );
}