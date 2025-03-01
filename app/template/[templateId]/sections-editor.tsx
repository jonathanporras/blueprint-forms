"use client";
import {
  addSection,
  deleteSection,
  fetchSections,
  fetchTemplate,
  updateSection,
  updateTemplate,
} from "@/utils/api";
import React, { useState, useEffect, useRef } from "react";
import StepsEditor from "./steps-editor";
import { Section } from "./page";
import Spinner from "@/components/spinner";
import { Template } from "../manager/page";

const DEFAULT_SECTION_NAME = "Section Name";

export default function SectionsEditor({ templateId }: { templateId: string }) {
  const [loading, isLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const [template, setTemplate] = useState<Template>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    (async () => {
      const sectionData = await fetchSections(templateId);
      const template = await fetchTemplate(templateId);

      if (sectionData) {
        setSections(sectionData);
      }
      if (template) {
        setTemplate(template);
      }

      isLoading(false);
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

  async function handleDeleteSection(sectionId: Section["id"]) {
    await deleteSection(sectionId);

    timeoutRef.current = setTimeout(async () => {
      const fieldsData = await fetchSections(templateId);
      setSections(fieldsData);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="flex flex-col justify-start align-top text-2xl py-5 w-full">
        <input
          value={template?.name ? template.name : ""}
          onChange={(e) => {
            if (template) {
              setTemplate({
                ...template,
                name: e.target.value,
              });
            }
          }}
          onBlur={async () => {
            if (template) {
              await updateTemplate(template);
            }
          }}
        />
        <button className="text-left" onClick={createSection}>
          +
        </button>
      </div>
      {sections.map((section) => (
        <div key={section.id}>
          <div className="flex flex-col justify-start text-xl pl-6">
            <button
              className="text-[#d19292] text-sm"
              onClick={() => {
                handleDeleteSection(section.id);
              }}
            >
              delete
            </button>
            <input
              className="text-left py-1"
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
                className="text-left py-1"
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
