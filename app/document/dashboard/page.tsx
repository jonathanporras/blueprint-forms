import { Button } from "@/components/ui/button";
import { fetchDocuments } from "@/utils/api-server";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const DocumentDashbord = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const documents = await fetchDocuments(user.id);

  return (
    <div className="w-full mx-auto max-w-2xl">
      <div className="p-4">
        <div className="max-w-full overflow-x-auto mx-auto bg-white">
          <table className="w-full text-left min-w-[300px]">
            <thead>
              <tr>
                <th className="text-lg text-light pb-4">My Documents:</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id} className="border-b">
                  <td>{document.name}</td>
                  <td className="p-2"></td>
                  <td className="p-2 flex gap-2 justify-end">
                    <Link
                      className=" bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-1 rounded-lg transition"
                      href={`/document/editor/${document.template_type}/${document.id}`}
                    >
                      edit
                    </Link>
                    <Link
                      className=" bg-[#2FAF68] hover:bg-[#37c476] transition text-white px-4 py-1 rounded-lg transition"
                      href={`/document/editor/${document.template_type}/${document.id}`}
                    >
                      export
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentDashbord;
