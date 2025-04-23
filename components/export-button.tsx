"use client";
import { debounce } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import LeaseAgreementPDF from "./pdf-templates/lease-agreement-pdf";
import { usePDF } from "@react-pdf/renderer";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/app/document/editor/[template_type]/[document_id]/document-preview";
import { FolderDown } from "lucide-react";
import { fetchProfile } from "@/utils/api";
import { useAtom } from "jotai";
import { documentFieldsAtom } from "@/app/atoms/documentFieldsAtom";

export default function ExportButton({
  user,
  documentId,
}: {
  user: User | null;
  documentId?: string | null;
}) {
  const [formValues] = useAtom<Record<string, any>>(documentFieldsAtom);
  const [instance, update] = usePDF({
    document: <LeaseAgreementPDF formValues={formValues} />,
  });
  const debouncedUpdateExport = useCallback(
    debounce((formValues) => {
      update(<LeaseAgreementPDF formValues={formValues} />);
    }, 300),
    [formValues]
  );
  const [profile, setProfile] = useState({} as Profile);

  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id).then((data) => {
        setProfile(data);
      });
    }
  }, [user]);

  useEffect(() => {
    debouncedUpdateExport(formValues);
  }, [formValues]);

  return user ? (
    profile?.status === "paid" ? (
      <>
        {instance?.url && (
          <a
            className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-2 rounded"
            href={instance.url}
            download="lease-agreement.pdf"
          >
            <FolderDown className="inline pr-2" />
            Export
          </a>
        )}
      </>
    ) : (
      <a
        className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-2 rounded"
        href={`/pricing`}
      >
        <FolderDown className="inline pr-2" />
        Export
      </a>
    )
  ) : (
    <a
      className="bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-2 rounded"
      href={`/sign-up?document_id=${documentId}`}
    >
      <FolderDown className="inline pr-2" />
      Export
    </a>
  );
}
