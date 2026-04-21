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
    <p className={className} onClick={() => router.back()}>
      {text || "Voltar"}
    </p>
  );
};
