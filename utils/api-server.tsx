import { Profile } from "@/app/document/editor/[template_type]/[document_id]/document-preview";
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

export async function fetchAllTemplateData(template_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates")
    .select(
      "id, name, sections(name, position, steps(name, position, heading, fields(id, name, label, type, position, required, options, dependent_field_id, dependent_field_value)))"
    )
    .eq("id", template_id)
    .order("position", { ascending: true, referencedTable: "sections" })
    .single();

  if (error) {
    console.error("Error fetching template data:", error);
    throw error;
  }

  return data;
}

export async function createDocument({ template_type, name, user_id }: Document) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .upsert([
      {
        template_type: template_type,
        name: name,
        user_id: user_id,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating document:", error);
    throw error;
  }

  return data[0];
}

export async function fetchDocuments(user_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }

  return data;
}

export async function fetchProfile(user_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select().eq("id", user_id);

  if (error) {
    console.error("Error fetching steps:", error);
    throw error;
  }

  return data[0];
}

export async function updateProfile({
  status,
  id,
  priceName,
  stripeCustomerId,
}: {
  status: Profile["status"];
  id: Profile["id"];
  priceName: Profile["planName"];
  stripeCustomerId?: Profile["stripeCustomerId"];
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      status: status,
      price_name: priceName,
      ...(stripeCustomerId && { stripe_customer_id: stripeCustomerId }),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating profile status:", error);
    throw error;
  }

  return data;
}
