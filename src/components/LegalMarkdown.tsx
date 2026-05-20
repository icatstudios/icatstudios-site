import Markdown from "markdown-to-jsx";

interface LegalMarkdownProps {
  /** Raw markdown content (h2 → section, h3 → subsection, p, ul/li, strong, a) */
  children: string;
}

/**
 * Renders markdown for legal pages (privacy / terms) using site-themed
 * overrides so headings get the gradient accent bars and links match the
 * primary color. Used by app-specific policies that ship their content as
 * markdown rather than the legacy structured JSON shape.
 */
export default function LegalMarkdown({ children }: LegalMarkdownProps) {
  return (
    <Markdown
      options={{
        forceWrapper: true,
        wrapper: "div",
        overrides: {
          h1: {
            props: {
              className:
                "text-3xl font-bold tracking-tight text-foreground mt-14 first:mt-0",
            },
          },
          h2: {
            component: ({ children: c }: { children: React.ReactNode }) => (
              <h2 className="relative mt-14 pl-5 text-2xl font-semibold text-foreground">
                <span className="absolute left-0 top-1.5 h-6 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
                {c}
              </h2>
            ),
          },
          h3: {
            component: ({ children: c }: { children: React.ReactNode }) => (
              <h3 className="relative mt-7 pl-4 text-lg font-semibold text-foreground">
                <span className="absolute left-0 top-1.5 h-5 w-0.5 rounded-full bg-primary/60" />
                {c}
              </h3>
            ),
          },
          h4: {
            props: {
              className:
                "mt-6 text-base font-semibold text-foreground",
            },
          },
          p: {
            props: {
              className: "mt-4 leading-relaxed text-zinc-400",
            },
          },
          ul: {
            props: {
              className:
                "mt-4 list-disc space-y-2 pl-6 leading-relaxed text-zinc-400 marker:text-primary",
            },
          },
          ol: {
            props: {
              className:
                "mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-zinc-400 marker:text-primary",
            },
          },
          li: {
            props: { className: "pl-1" },
          },
          strong: {
            props: { className: "font-semibold text-foreground" },
          },
          em: { props: { className: "italic" } },
          a: {
            props: {
              className:
                "text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary-light hover:decoration-primary",
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
          hr: {
            props: { className: "my-8 divider-fade" },
          },
          code: {
            props: {
              className:
                "rounded-md bg-card-bg px-1.5 py-0.5 text-[0.9em] text-zinc-200 ring-1 ring-card-border",
            },
          },
          blockquote: {
            props: {
              className:
                "mt-4 border-l-2 border-primary/40 pl-4 italic text-zinc-300",
            },
          },
        },
      }}
    >
      {children}
    </Markdown>
  );
}
