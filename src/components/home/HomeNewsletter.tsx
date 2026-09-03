'use client';

import * as React from 'react';
import { Mail, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export function HomeNewsletter() {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      toast.success('Welcome to MUNIAMART! Check your email for your $10 coupon.');
    }, 600);
  };

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 lg:p-16 text-center shadow-xs">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              <Mail className="h-3.5 w-3.5" />
              <span>Newsletter Rewards</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Don&apos;t Miss Out on Exclusive Deals
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Join over 25,000+ smart shoppers. Get secret discounts, early access to new inventory drops, and tailored product recommendations directly in your inbox.
            </p>

            <div className="pt-4 max-w-md mx-auto">
              {isSubscribed ? (
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-200 animate-in fade-in zoom-in-95">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                  <div className="text-left text-xs">
                    <p className="font-bold">You&apos;re officially subscribed!</p>
                    <p className="text-muted-foreground mt-0.5">
                      Coupon code <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">WELCOME10</span> activated for your cart.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        required
                        className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground shadow-xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary-hover active:scale-95 disabled:opacity-50 transition-all cursor-pointer shrink-0"
                    >
                      <span>{isLoading ? 'Joining...' : 'Get My $10 Off'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span>No spam ever. Unsubscribe with 1 click at any time.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
