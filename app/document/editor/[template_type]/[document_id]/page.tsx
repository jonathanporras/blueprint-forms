import { fetchAllTemplateData, fetchTemplateByType } from "@/utils/api-server";
import Editor from "./editor";

type ParamsProps = Promise<{ template_type: string; document_id: string }>;

const DocumentEditor = async (props: { params: ParamsProps }) => {
  const { template_type } = await props.params;
  const template = await fetchTemplateByType(template_type);
  const templateData = await fetchAllTemplateData(template.id);

  return <Editor formData={templateData} />;
};

export default DocumentEditor;
