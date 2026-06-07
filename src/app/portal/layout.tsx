// The client portal is a self-contained, white-label surface. It sits on top of
// the marketing chrome (Navbar/Footer from the root layout) the same way the
// admin console does, so enterprise clients see only their branded dashboard.
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-void">
      {children}
    </div>
  );
}
