import type { Metadata } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import DotNav from "@/components/layout/DotNav";
import NextSectionBtn from "@/components/layout/NextSectionBtn";
import ScrollReveal from "@/components/layout/ScrollReveal";

// next/font handles optimal loading (replaces vanilla media="print" trick)
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const SITE_URL = "https://tramcp12.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Trạm CP12",
  description:
    "A trail runner's homestay in the cloud-wrapped mountains of Dalat, Vietnam. 1,500m altitude.",
  url: SITE_URL,
  telephone: "+84765679228",
  email: "cp12tramdungchill@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "228/6 Đường Phú Đồng Thiên Vương, Phường 8",
    addressLocality: "Đà Lạt",
    addressRegion: "Lâm Đồng",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.9404,
    longitude: 108.4384,
  },
  priceRange: "₫₫",
  checkinTime: "14:00",
  checkoutTime: "12:00",
  image: `${SITE_URL}/static/img/travel/langbiang.jpg`,
  sameAs: [
    "https://www.facebook.com/tramcp12",
    "https://www.instagram.com/tramcp12",
    "https://maps.app.goo.gl/J21hfLiN5raSABX87",
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Mountain View", value: true },
  ],
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === "vi";

  const description = isVi
    ? "Homestay cho vận động viên trail giữa núi rừng mờ sương Đà Lạt. Độ cao 1.500m, phòng từ 450.000 VND/đêm."
    : "A trail runner's homestay in the cloud-wrapped mountains of Dalat. 1,500m altitude, rooms from 450,000 VND/night.";

  return {
    title: isVi
      ? "Trạm CP12 — Homestay Đà Lạt"
      : "Trạm CP12 — Homestay Dalat Vietnam",
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        vi: `${SITE_URL}/vi`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: isVi ? "Trạm CP12 — Homestay Đà Lạt" : "Trạm CP12 — Homestay Dalat",
      description: isVi
        ? "Homestay cho vận động viên trail giữa núi rừng mờ sương Đà Lạt."
        : "A trail runner's homestay in the cloud-wrapped mountains of Dalat.",
      url: `${SITE_URL}/${locale}`,
      siteName: "Trạm CP12",
      images: [
        {
          url: `${SITE_URL}/static/img/travel/langbiang.jpg`,
          width: 1200,
          height: 630,
          alt: "Trạm CP12 — Đà Lạt Homestay",
        },
      ],
      locale: isVi ? "vi_VN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isVi ? "Trạm CP12 — Homestay Đà Lạt" : "Trạm CP12 — Homestay Dalat",
      images: [`${SITE_URL}/static/img/travel/langbiang.jpg`],
    },
    other: {
      "theme-color": "#2d4a3e",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${cormorant.variable} ${beVietnam.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-nav">
            {locale === "vi" ? "Chuyển đến nội dung" : "Skip to content"}
          </a>
          <Nav locale={locale} />
          <ScrollReveal />
          {children}
          <Footer />
          <DotNav />
          <NextSectionBtn />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
