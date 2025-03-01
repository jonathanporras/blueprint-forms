"use client";
import { addStep, deleteStep, fetchSteps, updateStep } from "@/utils/api";
import { useState, useEffect, useRef } from "react";
import { Step } from "./page";
import FieldsEditor from "./fields-editor";

const DEFAULT_STEP_NAME = "Step Name";
const DEFAULT_STEP_HEADING = "What is the property address?";

export default function StepsEditor({ sectionId }: { sectionId: string }) {
  const [steps, setSteps] = useState<Step[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  async function handleDeleteStep(stepId: Step["id"]) {
    await deleteStep(stepId);

    timeoutRef.current = setTimeout(async () => {
      const fieldsData = await fetchSteps(sectionId);
      setSteps(fieldsData);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }

  return (
    <div>
      <button className="text-2xl pl-6" onClick={() => createStep(sectionId)}>
        +
      </button>
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col justify-start text-lg pl-10 py-5">
          <button
            className="text-[#d19292] text-sm"
            onClick={() => {
              handleDeleteStep(step.id);
            }}
          >
            delete
          </button>
          <input
            className="text-left py-1"
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
            className="text-left py-1"
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
            className="text-left py-1"
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
