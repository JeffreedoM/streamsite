import React, { useEffect, useState } from "react";

import { Reorder, useDragControls } from "framer-motion";
import { Grip, Plus, Pencil, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

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
    <form className="flex flex-col space-y-4 rounded-lg bg-muted px-6 py-4">
      <div className="flex items-center justify-between font-semibold">
        <h3 className="text-lg">Chapters</h3>
        <div className="flex cursor-pointer items-center gap-1 text-sm">
          <PlusCircle size={16} className="text-sm" /> Add Chapter
        </div>
      </div>
      <Reorder.Group
        values={items}
        onReorder={setItems}
        className="flex flex-col space-y-4"
      >
        {items.map((item) => (
          <Reorder.Item
            id={item.id}
            key={item.id}
            value={item}
            className="flex cursor-grab items-center justify-between rounded-sm bg-primary/20 p-4 pl-6 active:cursor-grabbing"
          >
            <div>
              <h4>{item.chapter_name}</h4>
              {/* <p>{item.chapter_description}</p> */}
            </div>
            <Link href="#" className="flex cursor-pointer text-xs">
              <Pencil size={18} />
            </Link>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <footer className="text-sm">Drag and drop to reorder chapters</footer>
    </form>
  );
}

export default ChapterForm;
