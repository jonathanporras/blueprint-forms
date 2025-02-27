"use client";
import { addField, fetchFields, updateField } from "@/utils/api";
import { useState, useEffect } from "react";
import { Field } from "./page";
import SimpleDropdown from "@/components/simple-dropdown";

const DEFAULT_FIELD_LABEL = "Field Label";
const DEFAULT_FIELD_NAME = "Field Name";
const DEFAULT_FIELD_TYPE = "text";
const DEFAULT_FIELD_REQUIRED = true;
const DEFAULT_FIELD_OPTIONS = [""];

export default function FieldsEditor({ stepId }: { stepId: string }) {
  const [fields, setFields] = useState<Field[]>([]);
  const [field, setField] = useState({
    step_id: "",
    label: DEFAULT_FIELD_LABEL,
    name: DEFAULT_FIELD_NAME,
    type: DEFAULT_FIELD_TYPE,
    required: DEFAULT_FIELD_REQUIRED,
    options: DEFAULT_FIELD_OPTIONS,
  } as Field);

  useEffect(() => {
    (async () => {
      const stepsData = await fetchFields(stepId);
      setFields([...fields, ...stepsData]);
    })();
  }, [stepId]);

  async function createField(stepId: string) {
    const newField = {
      step_id: stepId,
      position: fields.length + 1,
      label: field.label,
      name: field.name,
      type: field.type,
      required: field.required,
      options: field.options,
    };
    const data = await addField(newField);
    if (data) {
      setFields([...fields, ...data]);
      setField({
        step_id: "",
        label: DEFAULT_FIELD_LABEL,
        name: DEFAULT_FIELD_NAME,
        type: DEFAULT_FIELD_TYPE,
        required: DEFAULT_FIELD_REQUIRED,
        options: DEFAULT_FIELD_OPTIONS,
      });
    }
  }

  return (
    <div className="">
      <button className="text-2xl" onClick={() => createField(stepId)}>
        +
      </button>
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col justify-start text-sm pl-6 py-5">
          <input
            placeholder="Field Position"
            value={field.position}
            onChange={(e) => {
              setFields(
                fields.map((s) =>
                  s.id === field.id ? { ...s, position: Number(e.target.value) } : s
                )
              );
            }}
            onBlur={async () => {
              await updateField(field);
            }}
          />
          <div className="flex justify-start">
            <p className="pr-2 italic">Label:</p>
            <input
              placeholder="Field Label"
              value={field.label}
              onChange={(e) => {
                setFields(
                  fields.map((s) => (s.id === field.id ? { ...s, label: e.target.value } : s))
                );
              }}
              onBlur={async () => {
                await updateField(field);
              }}
            />
          </div>

          <div className="flex justify-start">
            <p className="pr-2 italic">Name:</p>
            <input
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => {
                setFields(
                  fields.map((s) => (s.id === field.id ? { ...s, name: e.target.value } : s))
                );
              }}
              onBlur={async () => {
                await updateField(field);
              }}
            />
          </div>

          <div className="flex justify-start">
            <p className="pr-2 italic">Type:</p>
            <SimpleDropdown
              options={["text", "number", "dropdown", "checkbox", "date"]}
              onSelect={async (option) => {
                setFields(fields.map((s) => (s.id === field.id ? { ...s, type: option } : s)));
              }}
              onBlur={async () => {
                await updateField(field);
              }}
              defaultOption={field.type}
            />
          </div>
          <div className="flex justify-start">
            <p className="pr-2 italic">Required:</p>
            <SimpleDropdown
              options={["true", "false"]}
              onSelect={async (option) => {
                setFields(
                  fields.map((s) =>
                    s.id === field.id ? { ...s, required: option === "true" } : s
                  )
                );
              }}
              onBlur={async () => {
                await updateField(field);
              }}
              defaultOption={field?.required?.toString()}
            />
          </div>
          <div className="flex justify-start">
            <p className="pr-2 italic">Options:</p>
            <input
              className=""
              placeholder="For dropdown: a,b,c"
              value={field.options}
              onChange={(e) =>
                setFields(
                  fields.map((s) =>
                    s.id === field.id ? { ...s, options: e.target.value.split(",") } : s
                  )
                )
              }
              onBlur={async () => {
                await updateField(field);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
