import { Button } from "@/components/ui/button";
import { fetchDocuments } from "@/utils/api-server";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import DocumentName from "./document-name";
import { Document } from "../editor/[template_type]/[document_id]/page";
import { ExternalLink, FilePenLine, FolderDown } from "lucide-react";

const DocumentDashbord = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/log-in");
  }

  const documents = await fetchDocuments(user.id);

  return (
    <div className="w-full mx-auto max-w-7xl p-4">
      <h2 className="text-lg font-semibold mb-4">My Documents:</h2>
      <div className="">
        {documents.map((document: Document) => (
          <div
            key={document.id}
            className="flex sm:flex-row sm:items-center justify-between gap-4 p-4 border-b bg-white"
          >
            <div className="flex-1 flex">
              <Link
                href={`/document/editor/${document.template_type}/${document.id}`}
                className="pr-4"
              >
                <ExternalLink className="" />
              </Link>
              <DocumentName document={document} />
            </div>
            <div className="flex gap-2 justify-end">
              <Link
                className="bg-[#2FAF68] hover:bg-[#37c476] text-white px-4 py-1 rounded-lg transition"
                href={`/document/editor/${document.template_type}/${document.id}`}
              >
                <FilePenLine className="inline pr-2" />
                edit
              </Link>
              <Link
                className="bg-[#2FAF68] hover:bg-[#37c476] text-white px-4 py-1 rounded-lg transition"
                href={`/document/editor/${document.template_type}/${document.id}`}
              >
                <FolderDown className="inline pr-2" />
                export
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentDashbord;
