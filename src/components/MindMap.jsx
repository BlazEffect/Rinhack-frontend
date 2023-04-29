import MindElixir, { E } from "mind-elixir";
import { useEffect, useState } from "react";

export default function MindMap({ data, handleClick }) {
  const nodeData = {
    nodeData: {
      topic: "node topic",
      
      text: `asasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasdasdsadddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd`,
      children: [
        {
          topic: "child",
          
          children: [
            {
                topic: 'another children',
                
            },
            {
                topic: 'another children',
                
            },
          ]
        },
      ],
    },
  };

  useEffect(() => {
    const mind = new MindElixir({
      el: "#map",
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: false, // default true
      nodeMenu: false, // default true
      keypress: true, // default true
      locale: "ru",
      collapse: true,
      contextMenuOption: {
        focus: false,
        link: false,
        // add in menu
        extend: [
          {
            name: "Подробнее",
            key: 'asd',
            onclick: (obj, el) => {
                console.log(obj,el)
                return;
            },
          },
        ],
      },
      before: {
        async beginEdit(el, obj) {
          const node = Object.values(el)[0];
          handleClick(node);
        },
      },
    });

    mind.init(Object.keys(data || {})?.length ? data : nodeData);
    /* mind.refresh(nodeData); */
    mind.bus.addListener("operation", (e) => {
      if (e.name === "beginEdit") {
        return;
      }
    });
  });

  return <div id="map" className="w-full h-full" />;
}
