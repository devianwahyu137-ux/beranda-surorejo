import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import MobileBottomNav from '@/components/public/MobileBottomNav';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 relative">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
