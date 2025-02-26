import { createClient } from "@/utils/supabase/client";
import { Template } from "@/app/template/manager/page";
import { Section, Step } from "@/app/template/[templateId]/page";

const supabase = createClient();

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user:", error);
    throw error;
  }

  return user;
}

export async function createTemplate({ user_id, name, description, active }: Template) {
  const { data, error } = await supabase
    .from("templates")
    .upsert([
      {
        user_id: user_id,
        name: name,
        description: description,
        active: active,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating template:", error);
    throw error;
  }

  return data;
}

export async function addSection({ template_id, name, position }: Section) {
  const { data, error } = await supabase
    .from("sections")
    .upsert([
      {
        template_id,
        name,
        position,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding sections:", error);
    throw error;
  }

  return data;
}

export async function fetchSections(templateId: string) {
  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("template_id", templateId)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching sections:", error);
    throw error;
  }

  return data;
}

export async function updateSection(section: Section) {
  const { data, error } = await supabase.from("sections").update(section).eq("id", section.id);

  if (error) {
    console.error("Error updating section:", error);
    throw error;
  }

  return data;
}

export async function addStep({ name, section_id, position }: Step) {
  const { data, error } = await supabase
    .from("steps")
    .upsert([
      {
        name,
        section_id,
        position,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding steps:", error);
    throw error;
  }

  return data;
}

export async function fetchSteps(section_id: string) {
  const { data, error } = await supabase.from("steps").select().eq("section_id", section_id);

  if (error) {
    console.error("Error fetching steps:", error);
    throw error;
  }

  return data;
}

export async function updateStep(step: Step) {
  const { data, error } = await supabase.from("steps").update(step).eq("id", step.id);

  if (error) {
    console.error("Error updating step:", error);
    throw error;
  }

  return data;
}

export async function fetchFields(step_id: string) {
  const { data, error } = await supabase.from("fields").select().eq("step_id", step_id);

  if (error) {
    console.error("Error fetching steps:", error);
    throw error;
  }

  return data;
}
