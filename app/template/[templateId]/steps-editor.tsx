"use client";
import { addStep, fetchSteps, updateStep } from "@/utils/api";
import { useState, useEffect } from "react";
import { Step } from "./page";
import FieldsEditor from "./fields-editor";

const DEFAULT_STEP_NAME = "Step Name";
const DEFAULT_STEP_HEADING = "What is the property address?";

export default function StepsEditor({ sectionId }: { sectionId: string }) {
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    (async () => {
      const stepsData = await fetchSteps(sectionId);
      setSteps([...steps, ...stepsData]);
    })();
  }, [sectionId]);

  async function createStep(sectionId: string) {
    const newStep = {
      name: DEFAULT_STEP_NAME,
      heading: DEFAULT_STEP_HEADING,
      section_id: sectionId,
      position: steps.length + 1,
    };
    const data = await addStep(newStep);
    if (data) {
      setSteps([...steps, ...data]);
    }
  }

  return (
    <div>
      <button className="text-2xl pl-6" onClick={() => createStep(sectionId)}>
        +
      </button>
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col justify-start text-lg pl-10 py-5">
          <input
            className="text-left"
            placeholder={"Step Position"}
            value={step.position ? step.position : ""}
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
          <input
            className="text-left"
            placeholder={"Step Name"}
            value={step.name ? step.name : ""}
            onBlur={async () => {
              await updateStep(step);
            }}
            onChange={(e) =>
              setSteps(
                steps.map((s) => (s.id === step.id ? { ...s, name: e.target.value } : s))
              )
            }
          />
          <input
            className="text-left"
            placeholder={"What is the property address?"}
            value={step.heading ? step.heading : ""}
            onBlur={async () => {
              await updateStep(step);
            }}
            onChange={(e) =>
              setSteps(
                steps.map((s) => (s.id === step.id ? { ...s, heading: e.target.value } : s))
              )
            }
          />
          {step.id && <FieldsEditor stepId={step.id} />}
        </div>
      ))}
    </div>
  );
}
