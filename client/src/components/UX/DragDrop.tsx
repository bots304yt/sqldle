import { Containers, DraggedItem, Item } from "@/lib/types";
import React, { useState, DragEvent, TouchEvent } from "react";

export function DragDrop({containers, onMove, setContainers}: {containers: Containers, onMove?: (item: Item, target: string) => void, setContainers: React.Dispatch<React.SetStateAction<Containers>>}) {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [dragOver, setDragOver] = useState<{ container: string; index: number } | null>(null);

  const moveItem = () => {
    if (!draggedItem || !dragOver) return;
  
    const { item, source } = draggedItem;
    const { container: target, index } = dragOver;
  
    setContainers((prev) => {
      const srcItems = [...prev[source].items];
      const tgtItems = source === target ? srcItems : [...prev[target].items];
      const itemIndex = srcItems.indexOf(item);
      if (itemIndex === -1) return prev;
      srcItems.splice(itemIndex, 1);
      const adjustedIndex = source === target && itemIndex < index ? index - 1 : index;

      tgtItems.splice(adjustedIndex, 0, item);

      if (onMove) onMove(item, target);
      return {
        ...prev,
        [source]: { ...prev[source], items: srcItems },
        [target]: { ...prev[target], items: tgtItems },
      };
    });
  
    setDraggedItem(null);
    setDragOver(null);
  };
  

  const handleDragStart = (e: DragEvent, item: Item, source: string) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedItem({ item, source });
  };

  const handleDragOver = (e: DragEvent, container: string, index: number) => {
    e.preventDefault();
    setDragOver({ container, index });
  };

  const handleTouchStart = (item: Item, source: string) => setDraggedItem({ item, source });
  const handleClick = (item: Item, container: string) => {
    // move item to the other container (last position)
    const target = container === "query" ? "available" : "query";
    setContainers((prev) => {
      const srcItems = [...prev[container].items];
      const tgtItems = [...prev[target].items];
      const itemIndex = srcItems.indexOf(item);
      if (itemIndex === -1) return prev;
      srcItems.splice(itemIndex, 1);
      tgtItems.push(item);
      if (onMove) onMove(item, target);
      return {
        ...prev,
        [container]: { ...prev[container], items: srcItems },
        [target]: { ...prev[target], items: tgtItems },
      };
    });
  }

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return;

    const container = element.closest("[data-container]")?.getAttribute("data-container");
    const index = element.closest("[data-index]")?.getAttribute("data-index");

    if (container && index !== null) {
      setDragOver({ container, index: Number(index) });
    }
  };

  return (
    <div className="flex flex-col gap-4" >
      {Object.entries(containers).map(([key, c]) => (
        <div key={key}>
          <div className="flex items-center gap-2">
            {c.color && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />}
            <h3>{c.title}</h3>
          </div>
          <div
            className="flex gap-2 flex-wrap min-w-full min-h-20 bg-blue-900/5 rounded-md p-3 py-4 border-2 border-gray-200 border-dashed hover:border-gray-400"
            data-container={key}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver({ container: key, index: c.items.length });
            }}
            onDrop={moveItem}
            onTouchEnd={moveItem}
          >
            {c.items.map((item, index) => (
              <div
                className={"item bg-black text-white text-center p-1 px-4 rounded-md h-fit cursor-grab hover:opacity-70 select-none " + item.state}
                key={item.value + "-" + index}
                data-index={index}
                draggable
                onDragStart={(e) => handleDragStart(e, item, key)}
                onDragOver={(e) => (e.stopPropagation(), handleDragOver(e, key, index))}
                onTouchStart={() => handleTouchStart(item, key)}
                onClick={() => handleClick(item, key)}
                onTouchMove={handleTouchMove}
                style={{
                  transition: "transform 0.2s ease",
                  transform: dragOver?.container === key && dragOver?.index === index ? "translateX(15px)" : "none",
                }}>
                {item.value}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};