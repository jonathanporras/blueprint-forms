import { redirect } from "next/navigation";
import { createDocument, fetchTemplateByType } from "@/utils/api-server";

type ParamsProps = Promise<{ template_type: string }>;

const RedirectPage = async (props: { params: ParamsProps }) => {
  const { template_type } = await props.params;
  const template = await fetchTemplateByType(template_type);
  const document = await createDocument({ template_type: template.type, name: template.name });

  if (template_type && document) {
    redirect(`/document/editor/${template_type}/${document.id}`);
  }

  return <p>Redirecting...</p>;
};

export default RedirectPage;
