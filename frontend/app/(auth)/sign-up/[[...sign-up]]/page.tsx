"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[100vh] items-center justify-center p-6 bg-[#050505]" style={{
      background: 'linear-gradient(180deg, #050505 0%, #a855f7 100%)',
    }}>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#a855f7',
            colorBackground: '#111',
            colorText: 'white',
            colorInputBackground: '#222',
            colorInputText: 'white',
          },
          elements: {
            formButtonPrimary:
              "w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all",
            card: "bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 glass-card",
            headerTitle: "text-2xl font-bold tracking-tight text-white",
            headerSubtitle: "text-sm text-gray-400 font-medium",
            formFieldLabel: "text-[10px] font-bold uppercase tracking-widest text-gray-500",
            formFieldInput: "w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all mb-2",
            dividerLine: "bg-white/10",
            dividerText: "text-gray-500 bg-transparent",
            footerActionLink: "text-purple-400 hover:text-purple-300 font-medium",
            identityPreviewText: "text-gray-300",
            identityPreviewEditButton: "text-purple-400",
            formButtonReset: "text-gray-400 hover:text-purple-400",
          }
        }}
        routing="path"
        path="/sign-up"
        forceRedirectUrl="/profile"
      />
      <div className="absolute inset-0 noise-bg mix-blend-overlay opacity-30 pointer-events-none" />
    </div>
  );
}
