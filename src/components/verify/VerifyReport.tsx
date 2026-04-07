"use client";

export default function VerifyReport(_props: {
  result: any;
  onReset: () => void;
  backendUrl: string;
}) {
  return (
    <div className="text-text-muted text-[13px] p-6">Loading report...</div>
  );
}
