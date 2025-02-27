import React from "react";
import SectionsEditor from "./sections-editor";
import { global } from "styled-jsx/css";

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
  id?: string;
  template_id?: string;
  section_id?: string;
  step_id: string;
  label: string;
  name: string;
  type: string | "text" | "number" | "dropdown" | "checkbox" | "date";
  required?: boolean;
  options?: string[];
}

type ParamsProps = Promise<{ templateId: string }>;

export default async function TemplateEditor(props: { params: ParamsProps }) {
  const { templateId } = await props.params;

  return (
    <div className="p-2 border rounded mt-2">
      <h1 className="text-2xl font-bold">Edit Template</h1>
      <SectionsEditor templateId={templateId} />
    </div>
  );
}
