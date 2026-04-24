import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";

import appCss from "../styles.css?url";

const SITE_NAME = "Lumeo Studio";
const SITE_URL = (
	import.meta.env.VITE_SITE_URL ?? "https://lumeoo.studio"
).replace(/\/$/, "");
const DEFAULT_TITLE = `${SITE_NAME} | Product, Brand & Web Design Studio`;
const DEFAULT_DESCRIPTION =
	"Research-driven product design, brand identity, and web design/development for startups and growing businesses. We combine strategy, UX, and craft to build digital experiences that drive real outcomes.";
const DEFAULT_KEYWORDS = [
	"product design studio",
	"brand design agency",
	"web design and development",
	"UI UX design",
	"design systems",
	"startup design partner",
	"research driven design",
	"no-code web development",
	"framer website development",
	"webflow design studio",
].join(", ");
const OG_IMAGE_URL = `${SITE_URL}/assets/brand/logo-large.svg`;
const FAVICON_URL = `${SITE_URL}/assets/brand/logo.svg`;
const STRUCTURED_DATA = JSON.stringify(
	{
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${SITE_URL}/#organization`,
				name: SITE_NAME,
				url: SITE_URL,
				logo: `${SITE_URL}/assets/brand/logo-large.svg`,
				email: "hello@lumeoo.studio",
				description: DEFAULT_DESCRIPTION,
				sameAs: [],
			},
			{
				"@type": "ProfessionalService",
				"@id": `${SITE_URL}/#service`,
				name: SITE_NAME,
				url: SITE_URL,
				serviceType: [
					"Product Design",
					"Brand Identity Design",
					"Web Design and Development",
				],
				provider: {
					"@id": `${SITE_URL}/#organization`,
				},
				description: DEFAULT_DESCRIPTION,
				areaServed: "Worldwide",
			},
			{
				"@type": "WebSite",
				"@id": `${SITE_URL}/#website`,
				url: SITE_URL,
				name: SITE_NAME,
				description: DEFAULT_DESCRIPTION,
				publisher: {
					"@id": `${SITE_URL}/#organization`,
				},
			},
		],
	},
	null,
	0,
);

// const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: DEFAULT_TITLE,
			},
			{
				name: "description",
				content: DEFAULT_DESCRIPTION,
			},
			{
				name: "keywords",
				content: DEFAULT_KEYWORDS,
			},
			{
				name: "author",
				content: SITE_NAME,
			},
			{
				name: "publisher",
				content: SITE_NAME,
			},
			{
				name: "application-name",
				content: SITE_NAME,
			},
			{
				name: "apple-mobile-web-app-title",
				content: SITE_NAME,
			},
			{
				name: "theme-color",
				content: "#ffffff",
			},
			{
				name: "theme-color",
				media: "(prefers-color-scheme: dark)",
				content: "#0f0f10",
			},
			{
				name: "format-detection",
				content: "telephone=no, address=no, email=no",
			},
			{
				name: "robots",
				content:
					"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
			},
			{
				name: "googlebot",
				content:
					"index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
			},
			{
				name: "referrer",
				content: "strict-origin-when-cross-origin",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: SITE_NAME,
			},
			{
				property: "og:title",
				content: DEFAULT_TITLE,
			},
			{
				property: "og:description",
				content: DEFAULT_DESCRIPTION,
			},
			{
				property: "og:url",
				content: SITE_URL,
			},
			{
				property: "og:locale",
				content: "en_US",
			},
			{
				property: "og:image",
				content: OG_IMAGE_URL,
			},
			{
				property: "og:image:alt",
				content: `${SITE_NAME} logo`,
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: DEFAULT_TITLE,
			},
			{
				name: "twitter:description",
				content: DEFAULT_DESCRIPTION,
			},
			{
				name: "twitter:image",
				content: OG_IMAGE_URL,
			},
			{
				name: "twitter:image:alt",
				content: `${SITE_NAME} logo`,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "canonical",
				href: SITE_URL,
			},
			{
				rel: "alternate",
				hrefLang: "en",
				href: SITE_URL,
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: FAVICON_URL,
			},
			{
				rel: "alternate icon",
				type: "image/x-icon",
				href: "/favicon.ico",
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className="light"
			style={{ colorScheme: "light" }}
			suppressHydrationWarning
		>
			<head>
				{/* <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} /> */}
				<HeadContent />
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
				/>
			</head>
			<body
				suppressHydrationWarning
				className="wrap-anywhere flex min-h-dvh flex-col font-sans antialiased"
			>
				<ReactLenis root>
					<Header />
					<main className="flex flex-1 flex-col">{children}</main>
					<Footer />
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				</ReactLenis>
				<Scripts />
			</body>
		</html>
	);
}
