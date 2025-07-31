import Link from "next/link";
import Image from "next/image";

export default async function Home() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
                Belajar Lebih
                <span className="bg-secondary bg-clip-text text-transparent">
                  {" "}Cerdas
                </span>
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Pahamin adalah AI Study Buddy yang membantu kamu memahami materi pelajaran
                dengan lebih mudah dan interaktif menggunakan teknologi AI terdepan.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/explain"
                  className="bg-primary text-text-primary px-8 py-4 rounded-full font-semibold hover:shadow-medium transition-all transform hover:scale-105 animate-scale-in"
                >
                  Mulai Belajar
                </Link>
                <Link
                  href="/quiz"
                  className="border-2 border-secondary text-secondary px-8 py-4 rounded-full font-semibold hover:bg-secondary hover:text-white transition-all animate-scale-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  Coba Generator Soal
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 backdrop-blur-sm">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hero-ai-study-buddy.png"
                    alt="AI Study Buddy membantu siswa belajar dengan teknologi AI yang canggih"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in group flex flex-col gap-3 items-center justify-center">
              <div className="w-16 h-16 bg-primary/30 rounded-2xl flex items-center justify-center text-4xl">
                📘
              </div>
              <h3 className="text-2xl font-semibold text-text-primary">Penjelasan Materi</h3>
              <p className="text-text-secondary leading-relaxed">
                Dapatkan penjelasan terstruktur untuk topik apapun dengan gaya yang bisa disesuaikan.
              </p>
              <Image
                src="/hero-ai-study-buddy.png"
                alt="Ilustrasi AI menjelaskan materi pelajaran dengan diagram dan grafik yang mudah dipahami"
                className="w-full h-auto object-cover aspect-video rounded-lg hover:scale-105 transition-transform duration-300"
                width={500}
                height={500}
              />
            </div>

            <div className="bg-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in group flex flex-col gap-3 items-center justify-center" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-primary/30 rounded-2xl flex items-center justify-center text-4xl">
                📝
              </div>
              <h3 className="text-2xl font-semibold text-text-primary">Generator Soal</h3>
              <p className="text-text-secondary leading-relaxed">
                Buat soal latihan dengan kunci jawaban dan pembahasan untuk menguji pemahaman.
              </p>
              <Image
                src="/hero-ai-study-buddy.png"
                alt="Ilustrasi AI membuat soal quiz dengan berbagai jenis pertanyaan dan kunci jawaban"
                className="w-full h-auto object-cover aspect-video rounded-lg hover:scale-105 transition-transform duration-300"
                width={500}
                height={500}
              />
            </div>

            <div className="bg-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in group flex flex-col gap-3 items-center justify-center" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-primary/30 rounded-2xl flex items-center justify-center text-4xl">
                🔁
              </div>
              <h3 className="text-2xl font-semibold text-text-primary">Flashcard Mode</h3>
              <p className="text-text-secondary leading-relaxed">
                Belajar cepat dengan format tanya-jawab yang interaktif dan menyenangkan.
              </p>
              <Image
                src="/hero-ai-study-buddy.png"
                alt="Ilustrasi flashcard interaktif dengan kartu tanya jawab yang menarik"
                className="w-full h-auto object-cover aspect-video rounded-lg hover:scale-105 transition-transform duration-300"
                width={500}
                height={500}
              />
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-12 text-center">
              Bagaimana Cara Kerjanya?
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Masukkan Topik</h3>
                <p className="text-text-secondary">Ketik topik yang ingin dipelajari</p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">AI Menganalisis</h3>
                <p className="text-text-secondary">AI memproses dan memahami materi</p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Dapatkan Hasil</h3>
                <p className="text-text-secondary">Penjelasan yang mudah dipahami</p>
              </div>

              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">Latihan & Review</h3>
                <p className="text-text-secondary">Uji pemahaman dengan quiz</p>
              </div>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-12 text-center">
              Apa Kata Mereka?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-surface rounded-2xl p-8 shadow-soft">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    {/* <Image
                      src="/testimonial-student-1.png"
                      alt="Foto profil siswa SMA yang menggunakan Pahamin"
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Sarah, Siswa SMA</h4>
                    <p className="text-text-secondary text-sm">Kelas 12 IPA</p>
                  </div>
                </div>
                <p className="text-text-secondary italic">
                  &ldquo;Pahamin membantu saya memahami konsep fisika yang sulit dengan penjelasan yang sangat jelas. Sekarang belajar jadi lebih menyenangkan!&rdquo;
                </p>
              </div>

              <div className="bg-surface rounded-2xl p-8 shadow-soft">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    {/* <Image
                      src="/testimonial-student-2.png"
                      alt="Foto profil mahasiswa yang menggunakan Pahamin"
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">Ahmad, Mahasiswa</h4>
                    <p className="text-text-secondary text-sm">Teknik Informatika</p>
                  </div>
                </div>
                <p className="text-text-secondary italic">
                  &ldquo;Generator soal di Pahamin sangat membantu untuk persiapan ujian. Soal-soalnya berkualitas dan pembahasannya detail.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Siap untuk Belajar Lebih Cerdas?
            </h2>
            <p className="text-xl text-text-secondary mb-16">
              Bergabunglah dengan ribuan siswa yang sudah merasakan manfaat Pahamin
            </p>
            <Link
              href="/explain"
              className="bg-secondary text-white px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 animate-scale-in"
            >
              Mulai Sekarang - Gratis!
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-16">
        <div className="text-center text-text-tertiary">
          <div className="flex items-center justify-center mb-4">
            <Image src="/logo-pahamin.png" alt="Pahamin" width={100} height={100} className="w-auto h-10" />
          </div>
          <p>Dibuat oleh <span className="font-semibold text-text-primary">Adzi Bilal</span> 🚀</p>
          <p className="text-sm mt-2">AI Study Buddy untuk masa depan pendidikan yang lebih cerdas</p>
        </div>
      </footer>
    </div>
  );
}
