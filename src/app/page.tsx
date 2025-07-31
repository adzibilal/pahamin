import Link from "next/link";

export default async function Home() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Belajar Lebih
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Cerdas
            </span>
          </h1>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            Pahamin adalah AI Study Buddy yang membantu kamu memahami materi pelajaran 
            dengan lebih mudah dan interaktif menggunakan teknologi AI terdepan.
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
              <div className="text-3xl mb-4">📘</div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Penjelasan Materi</h3>
              <p className="text-text-secondary">
                Dapatkan penjelasan terstruktur untuk topik apapun dengan gaya yang bisa disesuaikan.
              </p>
            </div>
            
            <div className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Generator Soal</h3>
              <p className="text-text-secondary">
                Buat soal latihan dengan kunci jawaban dan pembahasan untuk menguji pemahaman.
              </p>
            </div>
            
            <div className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl mb-4">🔁</div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Flashcard Mode</h3>
              <p className="text-text-secondary">
                Belajar cepat dengan format tanya-jawab interaktif yang menyenangkan.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/explain"
              className="bg-gradient-to-r from-primary to-primary-hover text-text-primary px-8 py-4 rounded-xl font-semibold hover:shadow-medium transition-all transform hover:scale-105 animate-scale-in"
            >
              Mulai Belajar
            </Link>
            <Link 
              href="/quiz"
              className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-text-primary transition-all animate-scale-in"
              style={{animationDelay: '0.1s'}}
            >
              Coba Generator Soal
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-16">
        <div className="text-center text-text-tertiary">
          <p>Dibuat dengan ❤️ oleh <span className="font-semibold text-text-primary">Adzi Bilal</span></p>
          <p className="text-sm mt-2">AI Study Buddy untuk masa depan pendidikan yang lebih cerdas</p>
        </div>
      </footer>
    </div>
  );
}
