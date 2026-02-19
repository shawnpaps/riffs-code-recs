import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, Music, Code, Vault, FileText } from "lucide-react";

interface NavItem {
	title: string;
	href: string;
	icon: React.ElementType;
	description: string;
}

const navItems: NavItem[] = [
	{
		title: "Home",
		href: "/",
		icon: Home,
		description: "Back to homepage",
	},
	{
		title: "Music",
		href: "/music",
		icon: Music,
		description: "Browse the playlist",
	},
	{
		title: "Tech",
		href: "/code",
		icon: Code,
		description: "Explore tech recs",
	},
	{
		title: "Weekly Recs",
		href: "/weekly-recs",
		icon: FileText,
		description: "Newsletter archive",
	},
	{
		title: "The Vault",
		href: "/subscribers/vault",
		icon: Vault,
		description: "Subscriber exclusives",
	},
];

export function AppDrawer() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="fixed right-6 top-6 z-50 glass-strong rounded-full w-12 h-12 hover:scale-110 transition-transform duration-300 neon-glow-hover"
				>
					<Menu className="h-6 w-6" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="w-[320px] sm:w-[400px] glass-strong border-l border-white/10 backdrop-blur-2xl"
			>
				<SheetHeader className="mb-8">
					<SheetTitle className="text-2xl font-bold">
						<span className="gradient-text">Navigation</span>
					</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-col space-y-2">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<a
								key={item.href}
								href={item.href}
								className="group flex items-center gap-4 p-4 rounded-xl glass hover:glass-strong transition-all duration-300 hover:translate-x-2"
							>
								<div className="flex-shrink-0 w-10 h-10 rounded-lg glass-strong flex items-center justify-center group-hover:gradient-bg transition-all duration-300">
									<Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="text-base font-semibold text-white/90 group-hover:gradient-text transition-all duration-300">
										{item.title}
									</div>
									<div className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
										{item.description}
									</div>
								</div>
								<svg
									className="w-5 h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</a>
						);
					})}
				</nav>

				{/* Footer CTA */}
				<div className="absolute bottom-6 left-6 right-6">
					<div className="glass-strong rounded-2xl p-4 border border-white/10">
						<p className="text-sm text-white/70 mb-3">
							Get weekly recommendations delivered to your inbox
						</p>
						<a
							href="/join"
							className="block w-full text-center px-4 py-3 gradient-bg rounded-xl text-sm font-bold text-white hover:scale-105 transition-all duration-300"
						>
							Subscribe Now
						</a>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
