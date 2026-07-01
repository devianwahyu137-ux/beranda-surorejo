import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, rt_rw, phone, category, subject, body: messageBody } = body;

    // Validation
    if (!name || !rt_rw || !category || !subject || !messageBody) {
      return NextResponse.json(
        { error: 'Semua field wajib harus diisi.' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['keluhan', 'saran', 'pertanyaan', 'informasi'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Kategori tidak valid.' },
        { status: 400 }
      );
    }

    // Length validation
    if (name.length > 200 || subject.length > 300 || messageBody.length > 5000) {
      return NextResponse.json(
        { error: 'Input melebihi batas panjang yang diizinkan.' },
        { status: 400 }
      );
    }

    // Simple rate limiting via IP header (basic protection)
    // In production, use a proper rate limiter

    const supabase = await createClient();

    const { error } = await supabase.from('message').insert({
      name: name.trim(),
      rt_rw: rt_rw.trim(),
      phone: phone?.trim() || null,
      category,
      subject: subject.trim(),
      body: messageBody.trim(),
    });

    if (error) {
      console.error('Failed to insert message:', error);
      return NextResponse.json(
        { error: 'Gagal menyimpan pesan. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    // Optional: Send Email Notification via Resend (Free Tier friendly)
    // Hanya berjalan jika RESEND_API_KEY ada di .env.local
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Surorejo Web <onboarding@resend.dev>',
            to: process.env.ADMIN_EMAIL,
            subject: `[Aspirasi Warga] ${category.toUpperCase()}: ${subject}`,
            html: `
              <h2>Aspirasi Baru dari Warga</h2>
              <p><strong>Nama:</strong> ${name}</p>
              <p><strong>RT/RW:</strong> ${rt_rw}</p>
              <p><strong>No HP:</strong> ${phone || '-'}</p>
              <p><strong>Kategori:</strong> ${category}</p>
              <hr />
              <p><strong>Pesan:</strong></p>
              <p>${messageBody}</p>
              <br />
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/pesan">Buka Dashboard Admin</a>
            `,
          }),
        });
      } catch (err) {
        console.error('Gagal mengirim notifikasi email:', err);
        // Lanjut saja, tidak usah return error agar flow form di user tetap sukses
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
