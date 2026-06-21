import UmkmForm from '@/components/admin/UmkmForm';

export default function NewUmkmPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Tambah UMKM Baru</h1>
      <UmkmForm mode="create" />
    </div>
  );
}
