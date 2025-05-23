import React from "react";
import SectionsEditor from "./sections-editor";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export interface Section {
  id?: string;
  template_id?: string;
  name: string;
  position: number;
  steps?: Step[];
}

export interface Step {
  id?: string;
  heading: string;
  section_id: string;
  name?: string;
  position: number;
  fields?: Field[];
}

export interface Field {
  id?: string;
  template_id?: string;
  section_id?: string;
  position?: number;
  step_id?: string;
  label: string;
  name: string;
  type: string | "text" | "number" | "dropdown" | "checkbox" | "date";
  required?: boolean;
  options?: string[];
  dependent_field_id?: string;
  dependent_field_value?: string;
}

type ParamsProps = Promise<{ templateId: string }>;

export default async function TemplateEditor(props: { params: ParamsProps }) {
  const { templateId } = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.email !== "porrasjon@gmail.com") {
    return redirect("/");
  }

  return <SectionsEditor templateId={templateId} />;
}
