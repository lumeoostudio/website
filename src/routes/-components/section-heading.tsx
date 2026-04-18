import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

const eyebrowClassName =
	"font-medium font-secondary text-secondary text-sm leading-[1.1] tracking-normal sm:text-base";

export const sectionHeadingTitleClassName =
	"font-medium font-primary text-4xl text-primary leading-[1.1] tracking-[-3%] sm:text-[48px]";

type SectionEyebrowProps = {
	children: ReactNode;
	className?: string;
};

/** Eyebrow label only (e.g. a subsection without a large title). */
export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
	return <p className={cn(eyebrowClassName, className)}>{children}</p>;
}

export type SectionHeadingProps = {
	eyebrow: string;
	children: ReactNode;
	className?: string;
	/** When true, `children` are not wrapped in `h1` (use for split layouts; apply `sectionHeadingTitleClassName` to your own heading). */
	unstyledTitle?: boolean;
};

export function SectionHeading({
	eyebrow,
	children,
	className,
	unstyledTitle = false,
}: SectionHeadingProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<SectionEyebrow>{eyebrow}</SectionEyebrow>
			{unstyledTitle ? (
				children
			) : (
				<h1 className={sectionHeadingTitleClassName}>{children}</h1>
			)}
		</div>
	);
}
