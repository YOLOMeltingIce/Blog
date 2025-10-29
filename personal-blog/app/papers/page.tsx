import { Navigation } from "@/components/navigation"
import { Calendar, User, BookOpen, Star } from "lucide-react"

const papers = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    journal: "NeurIPS 2017",
    rating: 5,
    date: "2024-01-15",
    summary: "提出了革命性的Transformer架构。",
    reason: "现代大语言模型的基础架构。",
    coreContent: "核心创新在于自注意力机制和多头注意力的设计。",
    insights: "Transformer证明了注意力机制的强大表达能力。",
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Devlin et al.",
    journal: "NAACL 2019",
    rating: 5,
    date: "2024-01-20",
    summary: "通过双向Transformer进行预训练，建立了预训练-微调的新范式，在多个NLP任务上刷新了记录。",
    reason: "BERT开创了预训练语言模型的新时代，其思想深刻影响了后续的GPT系列和其他大模型的发展。",
    coreContent:
      "BERT采用掩码语言模型（Masked Language Model）和下一句预测（Next Sentence Prediction）两个任务进行预训练。双向上下文理解使模型能够更好地捕捉语义信息。通过在大规模语料上预训练，然后在下游任务上微调，实现了优异的迁移学习效果。",
    insights:
      "BERT证明了大规模预训练的价值，预训练-微调范式成为NLP的标准做法。双向理解相比单向模型能获得更丰富的语义表示。这篇论文让我认识到，在AI领域，数据规模和训练方法的创新同样重要。",
  },
]

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

export default function PapersPage() {
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
                key={index}
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
                  <span>{paper.authors}</span>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen size={16} />
                  <span>{paper.journal}</span>
                </div>

                <div className="mb-4">
                  <StarRating rating={paper.rating} />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium text-card-foreground">概要</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{paper.summary}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium text-card-foreground">阅读理由</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{paper.reason}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium text-card-foreground">论文核心内容</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{paper.coreContent}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium text-card-foreground">我的感悟</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{paper.insights}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-border/50 pt-4 mt-4 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>阅读于 {paper.date}</span>
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
