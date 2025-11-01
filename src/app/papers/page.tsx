import Navigation from "@/components/Navigation"
import PapersFilter from "@/components/PapersFilter"
import { getLocalPapersData } from '@/lib/local-data'
import { PaperReview } from '@/types'

async function getPaperReviews(): Promise<PaperReview[]> {
  return await getLocalPapersData()
}

export default async function PapersPage() {
  const papers = await getPaperReviews()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">研读</h1>
          <p className="text-lg text-muted-foreground">记录阅读学术论文的心得与思考</p>
        </div>

        {papers.length > 0 ? (
          <PapersFilter papers={papers} />
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">📚</div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">暂无论文</h2>
            <p className="text-muted-foreground">开始记录你的阅读心得吧</p>
          </div>
        )}
      </main>
    </div>
  )
}
