"use client";
import { createTemplate, getUser } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "../[templateId]/page";

export interface Template {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  active: boolean;
  sections: Section[];
}

const TemplateEditor: React.FC = () => {
  const router = useRouter();
  const [template, setTemplate] = useState<Template>({
    id: "",
    user_id: "",
    name: "",
    description: "",
    active: false,
    sections: [],
  });

  console.log("template:");
  console.log(template);

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setTemplate((prev) => ({
          ...prev,
          user_id: user.id,
        }));
      }
    });
  }, []);

  const addTemplate = async () => {
    const data = await createTemplate(template);
    router.push(`/template/${data[0].id}`);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Create a Template</h2>
      <input
        type="text"
        placeholder="Template Name"
        value={template.name}
        onChange={(e) => setTemplate({ ...template, name: e.target.value })}
        className="w-full border p-2 rounded mb-2"
      />
      <textarea
        placeholder="Template Description"
        value={template.description}
        onChange={(e) => setTemplate({ ...template, description: e.target.value })}
        className="w-full border p-2 rounded mb-2"
      ></textarea>
      <button className="px-4 py-2 bg-green-500 text-white rounded mb-4" onClick={addTemplate}>
        Add Template
      </button>
    </div>
  );
};

export default TemplateEditor;
