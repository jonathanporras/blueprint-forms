"use client";
import { addSection, addStep, fetchSections, fetchTemplate, updateSection } from "@/utils/api";
import React, { useState, useEffect } from "react";
import StepsEditor from "./steps-editor";
import { Section } from "./page";

const DEFAULT_SECTION_NAME = "Section Name";

export default function SectionsEditor({ templateId }: { templateId: string }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    (async () => {
      const sectionData = await fetchSections(templateId);
      const template = await fetchTemplate(templateId);

      if (sectionData) {
        setSections(sectionData);
      }
      if (template) {
        setTemplateName(template.name);
      }
    })();
  }, [templateId]);

  async function createSection() {
    const newSection = {
      template_id: templateId,
      name: DEFAULT_SECTION_NAME,
      position: sections.length + 1,
    };
    console.log(newSection);
    console.log("newSection");

    const data = await addSection(newSection);
    if (data) {
      setSections([...sections, ...data]);
    }
  }

  return (
    <div className="">
      <div className="flex justify-start align-top text-2xl">
        <h1>{templateName}</h1>
        <button className="pl-4" onClick={createSection}>
          +
        </button>
      </div>
      {sections.map((section) => (
        <div key={section.id}>
          <div className="flex flex-col justify-start text-xl pl-6 py-5">
            <input
              className="text-left w-xl"
              placeholder="Section Position"
              onBlur={async () => {
                await updateSection(section);
              }}
              value={section.position}
              onChange={(e) =>
                setSections(
                  sections.map((s) =>
                    s.id === section.id ? { ...s, position: Number(e.target.value) } : s
                  )
                )
              }
            />
            <div className="flex flex-row justify-start">
              <input
                className="text-left"
                placeholder="Section Name"
                onBlur={async () => {
                  await updateSection(section);
                }}
                value={section.name}
                onChange={(e) =>
                  setSections(
                    sections.map((s) =>
                      s.id === section.id ? { ...s, name: e.target.value } : s
                    )
                  )
                }
              />
            </div>
          </div>
          {section.id && <StepsEditor sectionId={section.id} />}
        </div>
      ))}
    </div>
  );
}
