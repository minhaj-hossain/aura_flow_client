
import React from "react";
import ProjectCard from "./ProjectCard";


interface CardGridProps {
  templates: any[];
}

export default function CardGrid({ templates }: CardGridProps) {
  if (templates.length === 0) {
    return (
      <div className="w-full text-center py-20 bg-[#ffffff] rounded-[32px] border border-[#e1e3e4]/40">
        <p className="text-[#77777b] font-['Inter'] text-[16px]">
          No workspace assets match your active filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
      {templates.map((template) => (
        <ProjectCard key={template.id} template={template} />
      ))}
    </div>
  );
}
