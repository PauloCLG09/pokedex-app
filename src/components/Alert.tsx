interface AlertProps {
  type: "success" | "error";
  message: string;
}

function Alert({ type, message }: AlertProps) {
  const styles =
    type === "success"
      ? "bg-green-100 text-green-700 border-green-400"
      : "bg-red-100 text-red-700 border-red-400";

  return (
    <div className={`border px-4 py-3 rounded-lg mb-4 ${styles}`}>
      {message}
    </div>
  );
}

export default Alert;
