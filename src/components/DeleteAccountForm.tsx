"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface DeleteAccountFormProps {
  /** Used in the email subject + body header */
  appName: string;
  /** Accent color used for the submit button + focus rings */
  accent: string;
  /** Set of optional fields to render — defaults to a minimal email + notes form */
  fields?: {
    username?: boolean;
    email?: boolean;
    confirmCode?: boolean;
    notes?: boolean;
  };
}

const SUPPORT_EMAIL = "support@icatstudios.com";

export default function DeleteAccountForm({
  appName,
  accent,
  fields = { email: true, notes: true },
}: DeleteAccountFormProps) {
  const t = useTranslations("deleteAccount");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lines: string[] = [
      `${t("formTitle")} — ${appName}`,
      "",
    ];
    if (fields.username && username) lines.push(`${t("usernameLabel")}: ${username}`);
    if (fields.email && email) lines.push(`${t("emailLabel")}: ${email}`);
    if (fields.confirmCode && confirmCode)
      lines.push(`${t("confirmCodeLabel")}: ${confirmCode}`);
    if (fields.notes && notes) {
      lines.push("");
      lines.push(`${t("notesLabel")}:`);
      lines.push(notes);
    }
    lines.push("");
    lines.push("---");
    lines.push("Sent via icatstudios.com");

    const subject = t("mailtoSubject", { app: appName });
    const body = lines.join("\n");
    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  const labelClass =
    "block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400";
  const inputBase =
    "w-full rounded-lg border border-card-border bg-card-bg/60 px-4 py-2.5 text-sm text-foreground placeholder-zinc-600 backdrop-blur transition-all duration-300 focus:outline-none focus:ring-2";
  const focusRingStyle = { "--tw-ring-color": `${accent}88` } as React.CSSProperties;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.username && (
        <div className="space-y-2">
          <label htmlFor="da-username" className={labelClass}>
            {t("usernameLabel")}
          </label>
          <input
            id="da-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("usernamePlaceholder")}
            required
            className={inputBase}
            style={focusRingStyle}
          />
        </div>
      )}

      {fields.email && (
        <div className="space-y-2">
          <label htmlFor="da-email" className={labelClass}>
            {t("emailLabel")}
          </label>
          <input
            id="da-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            required
            className={inputBase}
            style={focusRingStyle}
          />
        </div>
      )}

      {fields.confirmCode && (
        <div className="space-y-2">
          <label htmlFor="da-code" className={labelClass}>
            {t("confirmCodeLabel")}
          </label>
          <input
            id="da-code"
            type="text"
            value={confirmCode}
            onChange={(e) => setConfirmCode(e.target.value)}
            placeholder={t("confirmCodePlaceholder")}
            required
            className={inputBase}
            style={focusRingStyle}
          />
          <p className="text-xs leading-relaxed text-zinc-500">
            {t("confirmCodeHelp")}
          </p>
        </div>
      )}

      {fields.notes && (
        <div className="space-y-2">
          <label htmlFor="da-notes" className={labelClass}>
            {t("notesLabel")}
          </label>
          <textarea
            id="da-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("notesPlaceholder")}
            rows={4}
            className={`${inputBase} resize-none`}
            style={focusRingStyle}
          />
        </div>
      )}

      <button
        type="submit"
        className="themed-btn inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold transition-all"
        style={
          {
            color: accent,
            borderColor: `${accent}66`,
            background: `${accent}1a`,
            ["--btn-color" as string]: accent,
          } as React.CSSProperties
        }
      >
        {t("submit")}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>

      <p className="pt-2 text-xs leading-relaxed text-zinc-500">
        {t("processingNote")}
      </p>
    </form>
  );
}
