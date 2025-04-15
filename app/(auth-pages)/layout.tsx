export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full mx-auto flex justify-center">{children}</div>;
}
