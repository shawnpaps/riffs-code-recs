import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

interface NavItem {
	title: string;
	href: string;
}

const navItems: NavItem[] = [
	{ title: 'Home', href: '/' },
	{ title: 'Music', href: '/music' },
	{ title: 'Tech', href: '/code' },
	{ title: 'The Vault', href: '/subscribers/auth' },
];

export function AppDrawer() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="fixed right-4 top-4">
					<Menu className="h-6 w-6" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-[300px] sm:w-[400px]">
				<SheetHeader>
					<SheetTitle>Navigation</SheetTitle>
				</SheetHeader>
				<nav className="mt-8 flex flex-col space-y-4">
					{navItems.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="text-lg font-medium hover:text-primary transition-colors">
							{item.title}
						</a>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
