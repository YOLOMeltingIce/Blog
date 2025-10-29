import Navigation from "@/components/Navigation"
import { Calendar, User, BookOpen, Star } from "lucide-react"
import { getLocalPapersData } from '@/lib/local-data'
import { PaperReview } from '@/types'

async function getPaperReviews(): Promise<PaperReview[]> {
  return await getLocalPapersData()
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">{rating}/5</span>
    </div>
  )
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
          <div className="grid gap-8 lg:grid-cols-2">
            {papers.map((paper, index) => (
              <article
                key={paper.id}
                className="group relative rounded-xl border-2 border-primary/40 bg-card/60 p-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur transition-all duration-500 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-card/80 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>

                <h2 className="relative mb-3 text-xl font-semibold text-card-foreground transition-colors">
                  {paper.title}
                </h2>

                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <User size={16} />
                  <span>{paper.authors.join(', ')}</span>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen size={16} />
                  <span>{paper.journal} ({paper.year})</span>
                </div>

                <div className="mb-4">
                  <StarRating rating={paper.rating} />
                </div>

                <div className="space-y-4">
                  {paper.summary && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground">概要</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{paper.summary}</p>
                    </div>
                  )}

                  {paper.reason && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground">阅读理由</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{paper.reason}</p>
                    </div>
                  )}

                  {paper.coreContent && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground">论文核心内容</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{paper.coreContent}</p>
                    </div>
                  )}

                  {paper.insights && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground">我的感悟</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{paper.insights}</p>
                    </div>
                  )}

                  {paper.review && !paper.summary && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground">读后感</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{paper.review}</p>
                    </div>
                  )}

                  {paper.keyInsights && paper.keyInsights.length > 0 && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground">关键洞见</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {paper.keyInsights.map((insight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 border-t border-border/50 pt-4 mt-4 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>阅读于 {paper.readDate}</span>
                </div>
              </article>
            ))}
          </div>
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
