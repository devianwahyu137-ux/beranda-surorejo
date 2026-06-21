import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Tambah Layanan Baru</h1>
      <ServiceForm mode="create" />
    </div>
  );
}
