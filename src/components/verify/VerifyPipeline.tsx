"use client";

export default function VerifyPipeline(_props: {
  sessionId: string;
  backendUrl: string;
  onComplete: (result: any) => void;
}) {
  return (
    <div className="text-text-muted text-[13px] p-6">Loading pipeline...</div>
  );
}
