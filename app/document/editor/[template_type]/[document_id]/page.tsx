export interface Document {
  id?: string;
  template_type?: string;
  name?: string;
}

type ParamsProps = Promise<{ template_type: string; document_id: string }>;

const DocumentEditor = async (props: { params: ParamsProps }) => {
  const { template_type, document_id } = await props.params;

  return (
    <>
      <p>{template_type}</p>
      <p>{document_id}</p>
    </>
  );
};

export default DocumentEditor;
