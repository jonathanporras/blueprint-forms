"use client";
import { Field } from "@/app/template/[templateId]/page";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Document, DocumentField } from "./page";
import { createDocumentFields, fetchDocumentFields, updateDocumentFields } from "@/utils/api";
import { useAtom } from "jotai";
import { documentFieldsAtom } from "@/app/atoms/documentFieldsAtom";

export type FormData = {
  id: any;
  name: any;
  sections: {
    name: any;
    position: any;
    steps: {
      name: any;
      position: any;
      fields: {
        name: any;
        label: any;
        type: any;
        position: any;
        required: any;
        options: any;
        dependent_field_id: any;
        dependent_field_value: any;
      }[];
    }[];
  }[];
};

export default function Editor({
  formData,
  documentId,
}: {
  formData: FormData;
  documentId: Document["id"];
}) {
  const steps = formData.sections.flatMap((section) =>
    section.steps?.map((step) => ({ ...step, sectionName: section.name }))
  );
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useAtom<Record<string, any>>(documentFieldsAtom);
  const progress = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    fetchFields(documentId);
  }, [documentId]);

  const fetchFields = async (documentId: Document["id"]) => {
    const data = await fetchDocumentFields(documentId);

    data.forEach((document_field: any) => {
      setFormValues((prev) => ({
        ...prev,
        [document_field.fields?.name]: {
          ...document_field,
        },
      }));
    });
  };

  const saveFields = async () => {
    const document_fields_to_create = [];
    const document_fields_to_update = [];

    for (const formValue in formValues) {
      const document_field = {
        value: formValues[formValue]?.value,
        document_id: documentId,
        field_id: formValues[formValue]?.field_id,
      } as DocumentField;

      if (formValues[formValue]?.id) {
        document_field.id = formValues[formValue]?.id;
        document_fields_to_update.push(document_field);
      } else {
        document_fields_to_create.push(document_field);
      }
    }

    if (document_fields_to_create.length > 0) {
      await createDocumentFields(...document_fields_to_create);
    }

    if (document_fields_to_update.length > 0) {
      await updateDocumentFields(...document_fields_to_update);
    }

    await fetchFields(documentId);
  };

  const handleChange = (field: Field, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field.name as string]: {
        ...prev[field.name as string],
        field_id: field.id,
        value: value,
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    saveFields();
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderField = (field: Field) => {
    if (field.dependent_field_id) {
      const dependentField = Object.values(formValues).find(
        (formValue) => formValue.field_id === field.dependent_field_id
      );

      if (dependentField?.value !== field.dependent_field_value) {
        return null; // Do not render if the condition is not met
      }
    }

    switch (field.type) {
      case "text":
        return (
          <div key={field.name}>
            <p className="font-light text-sm mb-1">{field?.label}</p>
            <input
              type="text"
              value={formValues[field.name]?.value || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={field.label}
              required={field.required}
              className="border p-2 w-full max-w-md"
            />
          </div>
        );
      case "dropdown":
        return (
          <div key={field.name}>
            <p className="font-light text-sm mb-1">{field?.label}</p>
            <select
              value={formValues[field.name]?.value || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              required={field.required}
              className="border p-2 w-full max-w-md"
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case "checkbox":
        const value = formValues[field.name]?.value === "true";
        return (
          <label key={field.name} className="flex items-center space-x-2 font-light">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(field, String(e.target.checked))}
            />
            <span>{field.label}</span>
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 w-1/2 max-w-xl">
      <div className="">
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-2 bg-[#1E3A5F]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.9 }}
          />
        </div>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.9 }}
          className="space-y-4 mb-16"
        >
          <h2 className="text-lg font-bold mb-6">
            {steps[currentStep]?.sectionName} - {steps[currentStep]?.name}
          </h2>
          {steps[currentStep]?.fields?.map(renderField)}
        </motion.div>
        <div className="mt-4 flex justify-end mt-16">
          {currentStep > 0 && (
            <button onClick={prevStep} className="bg-gray-300 px-4 py-2 px-2 mr-4 rounded">
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button onClick={nextStep} className="bg-[#2FAF68] text-white px-4 py-2 rounded">
              Continue
            </button>
          ) : (
            <button type="submit" className="bg-[#2FAF68] text-white px-4 py-2 rounded">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
