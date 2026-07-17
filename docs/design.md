# 05_DESIGN_SYSTEM.md

# Web Design Specification

## Objective

Seluruh halaman harus memiliki tampilan yang profesional, modern, konsisten, dan mudah digunakan. Prioritas utama adalah keterbacaan informasi, efisiensi penggunaan, serta konsistensi visual.

Desain harus terasa seperti produk SaaS/Enterprise yang matang, bukan hasil template atau AI-generated.

---

# Design Principles

Urutan prioritas:

1. Function
2. Usability
3. Consistency
4. Accessibility
5. Aesthetics

Visual yang menarik tidak boleh mengorbankan kemudahan penggunaan.

---

# Layout

## Container

Gunakan layout yang konsisten pada seluruh halaman.

- max-width yang konsisten
- gutter konsisten
- padding horizontal konsisten
- margin antar section konsisten

Tidak boleh berubah-ubah antar halaman.

---

## Grid

Gunakan grid system yang konsisten.

- Alignment wajib rapi
- Tidak boleh ada komponen yang terlihat "mengambang"
- Semua card harus mengikuti grid

---

## Spacing

Gunakan spacing scale.

Contoh:

- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40
- 48

Jangan menggunakan spacing acak.

---

# Typography

Gunakan maksimal:

- 1 font utama
- 1 font monospace (jika diperlukan)

Hierarchy harus jelas.

Heading
↓

Sub Heading
↓

Section
↓

Body
↓

Caption

Gunakan ukuran yang konsisten.

Hindari terlalu banyak ukuran font.

---

# Color System

Gunakan semantic color.

Primary

Secondary

Success

Warning

Danger

Info

Surface

Background

Border

Text

Setiap warna memiliki fungsi.

Jangan menggunakan warna hanya karena terlihat menarik.

---

# Border Radius

Gunakan radius yang konsisten.

Misalnya:

Small

Medium

Large

Extra Large

Tidak boleh setiap komponen memiliki radius berbeda.

---

# Shadow

Gunakan shadow seperlunya.

Prioritas:

Surface
↓

Elevation

↓

Focus

Hindari shadow yang terlalu blur atau terlalu besar.

---

# Components

Semua komponen wajib berasal dari design system.

Contoh:

Button

Input

Textarea

Dropdown

Select

Table

Badge

Alert

Modal

Drawer

Tabs

Accordion

Pagination

Card

Stat Card

Empty State

Loading State

Skeleton

Tooltip

Toast

Tidak membuat variasi baru tanpa alasan.

---

# Tables

Table adalah komponen utama.

Harus memiliki:

- Header jelas
- Zebra atau hover
- Sorting
- Filtering
- Pagination
- Responsive
- Empty State

Kolom harus sejajar.

Tidak boleh padding terlalu sempit.

---

# Forms

Semua form harus konsisten.

Gunakan:

Label

Placeholder

Helper Text

Validation

Error Message

Success Message

Disabled State

Readonly State

Required Indicator

---

# Buttons

Gunakan hierarchy.

Primary

Secondary

Outline

Ghost

Danger

Link

Ukuran:

Small

Medium

Large

---

# Icons

Gunakan satu icon library.

Ukuran icon konsisten.

Jangan mencampur berbagai style icon.

---

# Navigation

Sidebar

Topbar

Breadcrumb

Page Header

Harus konsisten.

Active menu harus jelas.

---

# Card

Card hanya digunakan bila memang diperlukan.

Hindari membuat seluruh halaman menjadi kumpulan card.

---

# Responsive

Desktop adalah prioritas utama.

Kemudian:

Laptop

Tablet

Mobile

Layout tidak boleh rusak.

---

# Empty State

Setiap halaman wajib memiliki:

Empty State

Loading

Error

No Permission

No Search Result

---

# Accessibility

Pastikan:

Kontras cukup

Focus state jelas

Keyboard friendly

Hover tidak menjadi satu-satunya indikator

Ukuran klik nyaman

---

# Animation

Gunakan animasi ringan.

Prioritaskan:

Fade

Slide

Scale kecil

Durasi singkat.

Hindari animasi berlebihan.

---

# Visual Hierarchy

Pengguna harus langsung mengetahui:

Apa yang paling penting.

Apa tindakan utama.

Apa informasi pendukung.

Gunakan:

Ukuran

Warna

Spacing

Alignment

Weight

Bukan dekorasi.

---

# Information Density

Gunakan ruang secara efisien.

Tidak terlalu padat.

Tidak terlalu kosong.

Dashboard enterprise lebih mengutamakan informasi daripada dekorasi.

---

# Consistency

Semua halaman harus memiliki:

Spacing sama

Radius sama

Shadow sama

Typography sama

Color sama

Button sama

Table sama

Form sama

Navigation sama

---

# What Must Be Controlled

Agent harus mengendalikan:

- Konsistensi spacing
- Typography hierarchy
- Color usage
- Border radius
- Shadow
- Grid
- Alignment
- White space
- Component sizing
- Button hierarchy
- Form layout
- Table layout
- Responsive behavior
- Accessibility

---

# What Must Be Considered

Selalu pertimbangkan:

Apakah informasi mudah dipahami?

Apakah CTA langsung terlihat?

Apakah user perlu scrolling berlebihan?

Apakah hierarchy sudah jelas?

Apakah komponen terlalu ramai?

Apakah halaman memiliki fokus?

Apakah halaman nyaman digunakan selama berjam-jam?

---

# What Is Not Allowed

Jangan menghasilkan tampilan yang:

Terlihat AI-generated.

Terlihat seperti template.

Terlalu banyak gradient.

Glassmorphism berlebihan.

Shadow besar.

Border radius ekstrem.

Padding sangat besar.

White space berlebihan.

Warna terlalu ramai.

Card memenuhi seluruh halaman.

Semua section terlihat identik.

Typography tidak konsisten.

Ukuran button berubah-ubah.

Spacing acak.

Layout tidak sejajar.

Icon campur berbagai style.

Menggunakan lebih dari satu pola layout tanpa alasan.

Menggunakan dekorasi yang tidak memiliki fungsi.

Mengorbankan usability demi estetika.

---

# AI Design Anti-Pattern

Hindari ciri-ciri berikut:

- Semua card memiliki radius besar.
- Semua komponen menggunakan shadow.
- Seluruh halaman berbentuk card.
- Gradient di hampir semua elemen.
- Glass effect.
- Floating component tanpa struktur.
- Header terlalu besar.
- Hero section berlebihan untuk aplikasi bisnis.
- Padding sangat longgar.
- Dashboard seperti landing page.
- Terlalu banyak warna aksen.
- Ikon dekoratif yang tidak memberi makna.
- Efek animasi berlebihan.
- Desain yang terlihat seperti hasil prompt AI tanpa identitas.

---

# Expected Result

Hasil akhir harus terasa seperti aplikasi enterprise yang telah dikembangkan selama bertahun-tahun.

Karakter desain yang diharapkan:

- Professional
- Clean
- Modern
- Efficient
- Elegant
- Mature
- Consistent
- Production Ready
- Enterprise Grade

Bukan:

- Template
- AI Generated
- Dribbble Concept
- Landing Page
- UI Showcase
- Experimental Design