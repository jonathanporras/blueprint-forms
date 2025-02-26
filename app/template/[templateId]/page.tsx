"use client";
import { addSection, fetchSections, updateSection } from "@/utils/api";
import { useState, useEffect } from "react";
import StepsEditor from "./steps-editor";

export interface Section {
  id?: string;
  template_id: string;
  name: string;
  position: number;
}

export interface Step {
  id?: string;
  section_id: string;
  name?: string;
  position: number;
}

export interface Field {
  id: string;
  template_id: string;
  section_id?: string;
  step_id: string;
  label: string;
  name: string;
  type: "text" | "number" | "dropdown" | "checkbox" | "date";
  required: boolean;
  options?: string[];
}

export default function SectionEditor({ params }: { params: { templateId: string } }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState("");

  useEffect(() => {
    (async () => {
      const templateId = await params.templateId;

      setTemplateId(templateId);
      const sectionData = await fetchSections(templateId);

      if (sectionData) {
        setSections(sectionData);
      }
    })();
  }, [params]);

  async function createSection() {
    const newSection = {
      template_id: templateId,
      name,
      position: sections.length + 1,
    };
    console.log(newSection);
    console.log("newSection");

    const data = await addSection(newSection);
    if (data) {
      setSections([...sections, ...data]);
      setName("");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Edit Template</h1>
      <input
        className="border p-2 rounded w-full mt-2"
        placeholder="Section Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={createSection}
      >
        Add Section
      </button>

      {sections.map((section) => (
        <div key={section.id} className="p-2 border rounded mt-2">
          Section:
          <input
            className="border p-2 rounded w-full"
            placeholder="Section Name"
            onBlur={async () => {
              await updateSection(section);
            }}
            value={section.name}
            onChange={(e) =>
              setSections(
                sections.map((s) => (s.id === section.id ? { ...s, name: e.target.value } : s))
              )
            }
          />
          {section.id && <StepsEditor sectionId={section.id} />}
        </div>
      ))}
    </div>
  );
}
