import { redirect } from "next/navigation";
import { createDocument, fetchTemplateByType } from "@/utils/api-server";
import { createClient } from "@/utils/supabase/server";

type ParamsProps = Promise<{ template_type: string }>;

const RedirectPage = async (props: { params: ParamsProps }) => {
  const { template_type } = await props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const template = await fetchTemplateByType(template_type);
  const document = await createDocument({
    template_type: template.type,
    name: template.name,
    ...(user?.id && { user_id: user?.id }),
  });

  if (template_type && document) {
    redirect(`/document/editor/${template_type}/${document.id}`);
  }

  return <p>Redirecting...</p>;
};

export default RedirectPage;
