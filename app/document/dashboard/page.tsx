import { fetchDocuments, fetchProfile } from "@/utils/api-server";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import DocumentName from "./document-name";
import { Document } from "../editor/[template_type]/[document_id]/page";
import { ExternalLink, FilePenLine, FolderDown } from "lucide-react";
import MyAccount from "./my-account";
import TwoStepDeleteButton from "./delete-button";
import CreateNewDoc from "./create-new-doc";

const DocumentDashbord = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/log-in");
  }

  const profile = await fetchProfile(user.id);
  const documents = await fetchDocuments(user.id);

  return (
    <div className="min-h-screen pt-8 px-8">
      <div className="w-full mx-auto max-w-7xl py-6 px-4 md:px-10 bg-white border rounded">
        <h2 className="text-lg font-semibold mb-4">My Documents:</h2>
        <div className="min-h-100">
          {documents.map((document: Document) => (
            <div
              key={document.id}
              className="flex md:flex-row flex-col md:justify-between justify-start gap-4 p-4 bg-white border-t"
            >
              <div className="flex-1 flex">
                <a
                  href={`/document/editor/${document.template_type}/${document.id}`}
                  className="pr-4"
                >
                  <ExternalLink className="text-[#2FAF68] hover:text-[#37c476]" />
                </a>
                <DocumentName document={document} />
              </div>
              <div className="flex gap-2 md:justify-end justify-start">
                <a
                  className="bg-[#2FAF68] hover:bg-[#37c476] text-white px-4 py-1 rounded-lg transition"
                  href={`/document/editor/${document.template_type}/${document.id}`}
                >
                  <FilePenLine className="inline pr-2" />
                  Edit
                </a>
                <a
                  className="bg-[#2FAF68] hover:bg-[#37c476] text-white px-4 py-1 rounded-lg transition"
                  href={`/document/editor/${document.template_type}/${document.id}`}
                >
                  <FolderDown className="inline pr-2" />
                  Export
                </a>
                {document?.id && <TwoStepDeleteButton documentId={document?.id} />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto pt-8 flex md:flex-row flex-col mb-8 gap-8">
        <MyAccount priceName={profile?.price_name} email={user?.email} />
        <CreateNewDoc />
      </div>
    </div>
  );
};

export default DocumentDashbord;
