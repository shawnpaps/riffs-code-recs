import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Mail,
	CheckCircle,
	AlertCircle,
	Loader2,
	Users,
	TrendingUp,
	Sparkles,
} from "lucide-react";

interface NewsletterSignupProps {
	variant?: "default" | "inline" | "hero" | "minimal";
	showStats?: boolean;
	className?: string;
}

export function NewsletterSignup({
	variant = "default",
	showStats = true,
	className = "",
}: NewsletterSignupProps) {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");
	const [subscriberCount, setSubscriberCount] = useState<string>("...");
	const [isLoadingCount, setIsLoadingCount] = useState<boolean>(true);

	// Fetch subscriber count
	useEffect(() => {
		if (showStats) {
			setIsLoadingCount(true);
			console.log("Fetching subscriber count from /api/subscriber-count");

			fetch("/api/subscriber-count")
				.then((res) => {
					console.log("Subscriber count API response status:", res.status);
					return res.json();
				})
				.then((data) => {
					console.log("Subscriber count API response data:", data);

					if (data.formatted) {
						setSubscriberCount(data.formatted);
						console.log("Set subscriber count to:", data.formatted);
					} else {
						console.warn("No formatted count in response, using fallback");
						setSubscriberCount("100+");
					}

					if (data.error) {
						console.error("API returned error:", data.error);
					}
				})
				.catch((err) => {
					console.error("Failed to fetch subscriber count:", err);
					setSubscriberCount("100+");
				})
				.finally(() => {
					setIsLoadingCount(false);
				});
		}
	}, [showStats]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			setMessage("Please enter your email");
			setStatus("error");
			return;
		}

		setStatus("loading");
		setMessage("");

		try {
			const response = await fetch("/api/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (response.ok) {
				setStatus("success");
				setMessage("🎉 Welcome to the community! Check your email to confirm.");
				setEmail("");

				// Redirect to success page after 2 seconds
				setTimeout(() => {
					window.location.href = "/subscription-success";
				}, 2000);
			} else {
				setStatus("error");
				setMessage(data.details || "Something went wrong. Please try again.");
			}
		} catch (error) {
			setStatus("error");
			setMessage("Network error. Please try again.");
			console.error("Subscribe error:", error);
		}
	};

	// Variant: Hero (Large, prominent)
	if (variant === "hero") {
		return (
			<div className={`max-w-2xl mx-auto ${className}`}>
				<div className="glass-strong rounded-3xl p-8 md:p-12 neon-glow">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 mx-auto mb-4 gradient-bg rounded-2xl flex items-center justify-center floating">
							<Mail className="w-8 h-8 text-white" />
						</div>
						<h2 className="text-3xl md:text-4xl font-bold mb-3">
							<span className="gradient-text">Join the Community</span>
						</h2>
						<p className="text-white/70 text-lg">
							Get weekly tech and music recommendations delivered to your inbox
						</p>
					</div>

					{/* Stats */}
					{showStats && (
						<div className="grid grid-cols-3 gap-4 mb-8">
							<div className="text-center glass rounded-xl p-4">
								<Users className="w-5 h-5 mx-auto mb-2 text-purple-400" />
								<div className="text-2xl font-bold gradient-text">
									{subscriberCount}
								</div>
								<div className="text-xs text-white/60">Subscribers</div>
							</div>
							<div className="text-center glass rounded-xl p-4">
								<TrendingUp className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
								<div className="text-2xl font-bold gradient-text">Weekly</div>
								<div className="text-xs text-white/60">Updates</div>
							</div>
							<div className="text-center glass rounded-xl p-4">
								<Sparkles className="w-5 h-5 mx-auto mb-2 text-pink-400" />
								<div className="text-2xl font-bold gradient-text">Free</div>
								<div className="text-xs text-white/60">Forever</div>
							</div>
						</div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="relative">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email address"
								disabled={status === "loading" || status === "success"}
								className="w-full px-6 py-4 bg-black/40 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
							/>
							<Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
						</div>

						<button
							type="submit"
							disabled={status === "loading" || status === "success"}
							className="w-full px-8 py-4 gradient-bg rounded-xl text-lg font-bold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
						>
							{status === "loading" && (
								<Loader2 className="w-5 h-5 animate-spin" />
							)}
							{status === "success" && <CheckCircle className="w-5 h-5" />}
							{status === "loading"
								? "Subscribing..."
								: status === "success"
									? "Subscribed!"
									: "Subscribe Now"}
						</button>
					</form>

					{/* Message */}
					{message && (
						<div
							className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
								status === "success"
									? "bg-green-500/10 border border-green-500/20 text-green-400"
									: "bg-red-500/10 border border-red-500/20 text-red-400"
							}`}
						>
							{status === "success" ? (
								<CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
							) : (
								<AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
							)}
							<p className="text-sm">{message}</p>
						</div>
					)}

					{/* Trust Signals */}
					<div className="mt-6 pt-6 border-t border-white/10 text-center">
						<p className="text-sm text-white/50">
							✓ No spam, ever &nbsp;•&nbsp; ✓ Unsubscribe anytime &nbsp;•&nbsp;
							✓ Weekly content
						</p>
					</div>
				</div>
			</div>
		);
	}

	// Variant: Inline (Compact, for sidebars)
	if (variant === "inline") {
		return (
			<div className={`glass rounded-2xl p-6 ${className}`}>
				<div className="flex items-center gap-3 mb-4">
					<div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
						<Mail className="w-5 h-5 text-white" />
					</div>
					<div>
						<h3 className="font-bold text-white">Newsletter</h3>
						{showStats && (
							<p className="text-xs text-white/60">
								{subscriberCount} subscribers
							</p>
						)}
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-3">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Your email"
						disabled={status === "loading" || status === "success"}
						className="w-full px-4 py-2.5 bg-black/40 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
					/>

					<button
						type="submit"
						disabled={status === "loading" || status === "success"}
						className="w-full px-4 py-2.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
					>
						{status === "loading" && (
							<Loader2 className="w-4 h-4 animate-spin" />
						)}
						{status === "loading"
							? "..."
							: status === "success"
								? "✓ Subscribed"
								: "Subscribe"}
					</button>
				</form>

				{message && (
					<p
						className={`mt-3 text-xs ${
							status === "success" ? "text-green-400" : "text-red-400"
						}`}
					>
						{message}
					</p>
				)}

				<p className="text-xs text-white/40 mt-3">Weekly updates, no spam</p>
			</div>
		);
	}

	// Variant: Minimal (Just input + button)
	if (variant === "minimal") {
		return (
			<div className={className}>
				<form onSubmit={handleSubmit} className="flex gap-2">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						disabled={status === "loading" || status === "success"}
						className="flex-1 px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
					/>
					<button
						type="submit"
						disabled={status === "loading" || status === "success"}
						className="px-6 py-2 gradient-bg rounded-lg text-sm font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
					>
						{status === "loading" ? (
							<Loader2 className="w-4 h-4 animate-spin" />
						) : status === "success" ? (
							<CheckCircle className="w-4 h-4" />
						) : (
							"Subscribe"
						)}
					</button>
				</form>
				{message && (
					<p
						className={`mt-2 text-xs ${
							status === "success" ? "text-green-400" : "text-red-400"
						}`}
					>
						{message}
					</p>
				)}
			</div>
		);
	}

	// Variant: Default (Medium size, balanced)
	return (
		<div className={`glass-strong rounded-2xl p-8 ${className}`}>
			{/* Header */}
			<div className="text-center mb-6">
				<div className="w-12 h-12 mx-auto mb-3 gradient-bg rounded-xl flex items-center justify-center">
					<Mail className="w-6 h-6 text-white" />
				</div>
				<h3 className="text-2xl font-bold mb-2">
					<span className="gradient-text">
						Join {subscriberCount} Subscribers
					</span>
				</h3>
				<p className="text-white/70 text-sm">
					Get weekly tech and music recommendations
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-3">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email address"
					disabled={status === "loading" || status === "success"}
					className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
				/>

				<button
					type="submit"
					disabled={status === "loading" || status === "success"}
					className="w-full px-6 py-3 gradient-bg rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
				>
					{status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
					{status === "success" && <CheckCircle className="w-5 h-5" />}
					{status === "loading"
						? "Subscribing..."
						: status === "success"
							? "Subscribed!"
							: "Subscribe Free"}
				</button>
			</form>

			{/* Message */}
			{message && (
				<div
					className={`mt-4 p-3 rounded-lg text-sm ${
						status === "success"
							? "bg-green-500/10 text-green-400"
							: "bg-red-500/10 text-red-400"
					}`}
				>
					{message}
				</div>
			)}

			{/* Trust Signals */}
			<div className="mt-4 pt-4 border-t border-white/10">
				<div className="flex items-center justify-center gap-4 text-xs text-white/50">
					<span className="flex items-center gap-1">
						<CheckCircle className="w-3 h-3" />
						No spam
					</span>
					<span className="flex items-center gap-1">
						<CheckCircle className="w-3 h-3" />
						Unsubscribe anytime
					</span>
					<span className="flex items-center gap-1">
						<CheckCircle className="w-3 h-3" />
						Weekly only
					</span>
				</div>
			</div>
		</div>
	);
}
