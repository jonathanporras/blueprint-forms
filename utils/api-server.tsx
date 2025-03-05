import { Document } from "@/app/document/editor/[template_type]/[document_id]/page";
import { createClient } from "@/utils/supabase/server";

export async function fetchTemplateByType(template_type: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("type", template_type)
    .single();

  if (error) {
    console.error("Error fetching template:", error);
    throw error;
  }

  return data;
}

export async function createDocument({ template_type, name }: Document) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .upsert([
      {
        template_type: template_type,
        name: name,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating document:", error);
    throw error;
  }

  return data[0];
}
