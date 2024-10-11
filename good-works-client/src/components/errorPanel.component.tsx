export function ErrorPanel({ message, title }: { message: string, title: string }) {
  return <div className="mt-2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert">
    <span className="mr-2 font-bold">
      {title}:
    </span>
    {message}
  </div>;
}
