"use client";
import { Field } from "@/app/template/[templateId]/page";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Document, DocumentField } from "./page";
import { createDocumentFields, fetchDocumentFields, updateDocumentFields } from "@/utils/api";
import { useAtom } from "jotai";
import { documentFieldsAtom } from "@/app/atoms/documentFieldsAtom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams, useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import ExportButton from "@/components/export-button";
import { User } from "@supabase/supabase-js";
import Spinner from "@/components/spinner";

export type FormData = {
  id: any;
  name: any;
  sections: {
    name: any;
    position: any;
    steps: {
      name: any;
      position: any;
      heading: any;
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
  user,
}: {
  formData: FormData;
  documentId: Document["id"];
  user: User | null;
}) {
  const router = useRouter();
  let steps = formData.sections.flatMap((section) =>
    section.steps?.map((step) => ({ ...step, sectionName: section.name }))
  );
  steps.sort((a, b) => {
    // If sectionNames are the same: compare by position
    return a.sectionName === b.sectionName ? a.position - b.position : 0;
  });

  steps.forEach((step) => {
    step.fields.sort((a, b) => a.position - b.position);
  });
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useAtom<Record<string, any>>(documentFieldsAtom);
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stepFromQuery = searchParams.get("step");
    fetchFields(documentId);
    setCurrentStep(Number(stepFromQuery));
    setLoading(false);
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

  const nextStep = async () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    await saveFields();
    const params = new URLSearchParams(searchParams);
    params.set("step", (currentStep + 1).toString());
    router.replace(`?${params.toString()}`);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    const params = new URLSearchParams(searchParams);
    params.set("step", (currentStep - 1).toString());
    router.replace(`?${params.toString()}`);
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
            <p className="font-light text-sm mb-1 mt-4">{field?.label}</p>
            <input
              type="text"
              value={formValues[field.name]?.value || ""}
              onChange={(e) => handleChange(field, e.target.value)}
              required={field.required}
              className="border p-2 w-full max-w-md"
            />
          </div>
        );
      case "dropdown":
        return (
          <div key={field.name}>
            <p className="font-light text-sm mb-1 mt-4">{field?.label}</p>
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
          <label key={field.name} className="flex items-center space-x-2 font-light text-sm">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(field, String(e.target.checked))}
            />
            <span>{field.label}</span>
          </label>
        );
      case "date":
        return (
          <div key={field.name}>
            <p className="font-light text-sm mb-1 mt-4">{field?.label}</p>
            <DatePicker
              id="date-picker"
              selected={formValues[field.name]?.value}
              onChange={(date) => handleChange(field, date)}
              dateFormat="MM/dd/yyyy"
              className="border p-2 rounded-md w-48"
              placeholderText="Pick a date"
            />
          </div>
        );
      default:
        return null;
    }
  };
  return loading ? (
    <div className="w-full">
      <Spinner />
    </div>
  ) : (
    <div className="px-8 my-8 lg:w-1/2 sm:w-full ">
      <div className="ml-0 lg:ml-8">
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
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
          className="space-y mb-16"
        >
          <h2 className="text-sm font-regular mb-8">
            {steps[currentStep]?.sectionName} <span className="px-1">&#8594;</span>{" "}
            {steps[currentStep]?.name}
          </h2>
          <div className="ml-0 lg:ml-6">
            <h3 className="text-2xl font-light mb-6">{steps[currentStep]?.heading}</h3>
            {steps[currentStep]?.fields?.map(renderField)}
          </div>
        </motion.div>
        <div className="mt-4 flex justify-end mt-16">
          {currentStep > 0 && (
            <button onClick={prevStep} className="bg-gray-300 px-4 py-2 px-2 mr-4 rounded">
              Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-2 rounded"
            >
              Continue
              <MoveRight className="inline pl-2" />
            </button>
          ) : (
            <ExportButton user={user} documentId={documentId} />
          )}
        </div>
      </div>
    </div>
  );
}
