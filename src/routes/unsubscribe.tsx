import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/unsubscribe")({
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const [state, setState] = useState<"loading" | "valid" | "already" | "invalid" | "done" | "error">("loading");
  const [submitting, setSubmitting] = useState(false);

  const token = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("token") : null;

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.valid) setState("valid");
        else if (data?.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("error"));
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/email/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data?.success) setState("done");
      else if (data?.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Rivenbark Lawncare</h1>
        {state === "loading" && <p className="mt-4 text-muted-foreground">Checking your link…</p>}
        {state === "valid" && (
          <>
            <p className="mt-4 text-muted-foreground">
              Click below to unsubscribe from emails sent by Rivenbark Lawncare.
            </p>
            <button
              onClick={confirm}
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-leaf-deep px-6 py-3 font-bold text-cream transition hover:bg-leaf disabled:opacity-60"
            >
              {submitting ? "Unsubscribing…" : "Confirm Unsubscribe"}
            </button>
          </>
        )}
        {state === "already" && <p className="mt-4 text-muted-foreground">You're already unsubscribed.</p>}
        {state === "done" && <p className="mt-4 text-muted-foreground">You've been unsubscribed. Sorry to see you go!</p>}
        {state === "invalid" && <p className="mt-4 text-muted-foreground">This unsubscribe link is invalid or expired.</p>}
        {state === "error" && <p className="mt-4 text-muted-foreground">Something went wrong. Please try again later.</p>}
      </div>
    </main>
  );
}
