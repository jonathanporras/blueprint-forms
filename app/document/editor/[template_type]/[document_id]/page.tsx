import { fetchAllTemplateData, fetchTemplateByType } from "@/utils/api-server";
import Editor from "./editor";

type ParamsProps = Promise<{ template_type: string; document_id: string }>;

export interface Document {
  id?: string;
  name: string;
  template_type: string;
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

  return <Editor formData={templateData} documentId={document_id} />;
};

export default DocumentEditor;
