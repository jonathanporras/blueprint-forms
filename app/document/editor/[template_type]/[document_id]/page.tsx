import { fetchAllTemplateData, fetchTemplateByType } from "@/utils/api-server";
import Editor from "./editor";
import { createClient } from "@/utils/supabase/server";
import DocumentPreviewWrapper from "./document-preview-wrapper";

type ParamsProps = Promise<{ template_type: string; document_id: string }>;

export interface Document {
  id?: string;
  name: string;
  template_type: string;
  user_id?: string;
}

export interface DocumentField {
  id?: string;
  document_id?: string;
  field_id?: string;
  value?: string;
}

const DocumentEditor = async (props: { params: ParamsProps }) => {
  const { template_type, document_id } = await props.params;
  const template = await fetchTemplateByType(template_type);
  const templateData = await fetchAllTemplateData(template.id);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-col lg:flex-row flex justify-center gap-16 w-full">
      <Editor user={user} formData={templateData} documentId={document_id} />
      <DocumentPreviewWrapper user={user} documentId={document_id} />
    </div>
  );
};

export default DocumentEditor;
