"use client";
import { addField, fetchFields, updateField } from "@/utils/api";
import { useState, useEffect } from "react";
import { Field } from "./page";
import SimpleDropdown from "@/components/simple-dropdown";

export default function FieldsEditor({ stepId }: { stepId: string }) {
  const [fields, setFields] = useState<Field[]>([]);
  const [field, setField] = useState({
    step_id: "",
    label: "",
    name: "",
    type: "text",
    required: true,
    options: [],
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
        label: "",
        name: "",
        type: "text",
        required: true,
        options: [],
      });
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto p-2 border rounded mt-2">
      Add Field
      <input
        className="border p-2 rounded w-full mt-2"
        placeholder="Field Label"
        value={field.label}
        onChange={(e) =>
          setField({
            ...field,
            label: e.target.value,
          })
        }
      />
      <input
        className="border p-2 rounded w-full mt-2"
        placeholder="Field Name"
        value={field.name}
        onChange={(e) =>
          setField({
            ...field,
            name: e.target.value,
          })
        }
      />
      <>
        <SimpleDropdown
          options={["text", "number", "dropdown", "checkbox", "date"]}
          onSelect={(option) => {
            setField({
              ...field,
              type: option,
            });
          }}
        />
      </>
      <>
        <SimpleDropdown
          options={["true", "false"]}
          onSelect={(option) => {
            setField({
              ...field,
              required: option,
            });
          }}
        />
      </>
      <input
        className="border p-2 rounded w-full mt-2"
        placeholder="Options"
        value={field.options}
        onChange={(e) =>
          setField({
            ...field,
            options: e.target.value.split(","),
          })
        }
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        onClick={() => createField(stepId)}
      >
        Add Field
      </button>
      {fields.map((field) => (
        <div key={field.id} className="p-2 border rounded mt-2">
          Field: Name:
          <input
            className="border p-2 rounded w-full mt-2"
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
          <input
            className="border p-2 rounded w-full mt-2"
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
          <>
            {`Type: ${field.type}`}
            <SimpleDropdown
              options={["text", "number", "dropdown", "checkbox", "date"]}
              onSelect={(option) => {
                setFields(fields.map((s) => (s.id === field.id ? { ...s, type: option } : s)));
              }}
            />
          </>
          <>
            {`Required: ${field.required}`}
            <SimpleDropdown
              options={["true", "false"]}
              onSelect={async (option) => {
                setFields(
                  fields.map((s) => (s.id === field.id ? { ...s, required: option } : s))
                );
                await updateField(field);
              }}
            />
          </>
          <input
            className="border p-2 rounded w-full mt-2"
            placeholder="Options"
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
      ))}
    </div>
  );
}
