/**
 * Root layout — minimal pass-through required by Next.js App Router.
 * The actual <html>, <body>, fonts, and metadata live in [locale]/layout.tsx
 * which has access to the locale for lang= attribute and locale-specific meta.
 */
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // [locale]/layout.tsx renders <html> and <body>.
  // This shell just satisfies the Next.js root layout requirement.
  return children as React.ReactElement;
}
