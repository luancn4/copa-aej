"use client";
import { useRouter } from "next/navigation";

export const GoBackButton = ({
  className,
  text,
}: {
  className: string;
  text?: string;
}) => {
  const router = useRouter();

  return (
    <button type="button" className={className} onClick={() => router.back()}>
      {text || "Voltar"}
    </button>
  );
};
