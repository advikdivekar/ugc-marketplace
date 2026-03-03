export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 max-h-screen z-[9999] overflow-y-auto">
      {children}
    </div>
  );
}
