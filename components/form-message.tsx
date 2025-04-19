export type Message = { success: string } | { error: string } | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-xl">
      {"success" in message && (
        <div className="text-[green] font-md font-md">{message.success}</div>
      )}
      {"error" in message && <div className="text-[red] font-bold">{message.error}</div>}
      {"message" in message && <div className="text-[gray]">{message.message}</div>}
    </div>
  );
}
