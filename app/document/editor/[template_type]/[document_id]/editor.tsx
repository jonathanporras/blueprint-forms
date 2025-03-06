"use client";
import { Field, Section } from "@/app/template/[templateId]/page";
import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  id: string;
  name: string;
  sections: Section[];
}

const Editor = ({ formData }: { formData: FormData }) => {
  const steps = formData.sections.flatMap((section) =>
    section.steps?.map((step) => ({ ...step, sectionName: section.name }))
  );
  const totalSteps = steps.length;

  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleChange = (field: Field, value: any) => {
    setFormValues((prev) => ({ ...prev, [field.name]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            key={field.name}
            type="text"
            value={formValues[field.name] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={field.label}
            required={field.required}
            className="border p-2 w-full"
          />
        );
      case "dropdown":
        return (
          <select
            key={field.name}
            value={formValues[field.name] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            required={field.required}
            className="border p-2 w-full"
          >
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <label key={field.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formValues[field.name] || false}
              onChange={(e) => handleChange(field, e.target.checked)}
            />
            <span>{field.label}</span>
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-2 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9 }}
        />
      </div>
      <h2 className="text-lg font-bold mb-2">
        {steps[currentStep]?.sectionName} - {steps[currentStep]?.name}
      </h2>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.9 }}
        className="space-y-4"
      >
        {steps[currentStep]?.fields?.map(renderField)}
      </motion.div>
      <div className="mt-4 flex justify-between">
        {currentStep > 0 && (
          <button onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">
            Back
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        ) : (
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Editor;
