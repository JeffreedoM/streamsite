import React, { useEffect, useState } from "react";

import { Reorder, useDragControls } from "framer-motion";
import { Grip } from "lucide-react";

const chapters = [
  {
    id: 1,
    chapter_name: "Introduction",
    chapter_description: "some description here",
    order: 1,
  },
  {
    id: 2,
    chapter_name: "HTML Basics",
    chapter_description: "some description here",
    order: 2,
  },
  {
    id: 3,
    chapter_name: "HTML Basics 2",
    chapter_description: "some description here",
    order: 3,
  },
];
function ChapterForm() {
  const [items, setItems] = useState(chapters);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <form className="flex flex-col space-y-2 rounded-lg bg-muted px-6 py-4">
      <div className="flex items-center justify-between font-semibold">
        <h3 className="text-lg">Chapters</h3>
      </div>
      <Reorder.Group
        values={items}
        onReorder={setItems}
        className="flex flex-col space-y-2"
      >
        {items.map((item) => (
          <Reorder.Item
            id={item.id}
            key={item.id}
            value={item}
            className="rounded-sm bg-muted-foreground/50 p-3"
          >
            <h4>{item.chapter_name}</h4>
            <p>{item.chapter_description}</p>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </form>
  );
}

export default ChapterForm;
