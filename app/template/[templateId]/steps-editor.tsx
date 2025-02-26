"use client";
import { addStep, fetchSteps, updateStep } from "@/utils/api";
import { useState, useEffect } from "react";
import { Step } from "./page";

export default function StepsEditor({ sectionId }: { sectionId: string }) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const stepsData = await fetchSteps(sectionId);
      setSteps([...steps, ...stepsData]);
    })();
  }, [sectionId]);

  async function createStep(sectionId: string) {
    const newStep = {
      name: name,
      section_id: sectionId,
      position: steps.length + 1,
    };
    const data = await addStep(newStep);
    if (data) {
      setSteps([...steps, ...data]);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <input
        className="border p-2 rounded w-full mt-2"
        placeholder="Step Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        onClick={() => createStep(sectionId)}
      >
        Add Step
      </button>
      {steps.map((step) => (
        <div>
          <h3>Step</h3>
          Name:
          <>
            <input
              className="border p-2 rounded w-full"
              placeholder={step.name ? `${step.name}` : "None"}
              value={step.name}
              onBlur={async () => {
                await updateStep(step);
              }}
              onChange={(e) =>
                setSteps(
                  steps.map((s) => (s.id === step.id ? { ...s, name: e.target.value } : s))
                )
              }
            />
            Number:
            <input
              className="border p-2 rounded w-full"
              placeholder={step.position ? `${step.position}` : "None"}
              value={step.position}
              onBlur={async () => {
                await updateStep(step);
              }}
              onChange={(e) =>
                setSteps(
                  steps.map((s) =>
                    s.id === step.id ? { ...s, position: Number(e.target.value) } : s
                  )
                )
              }
            />
          </>
        </div>
      ))}
    </div>
  );
}
