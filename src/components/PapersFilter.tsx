'use client'

import { useState, useMemo } from 'react'
import { Calendar, User, BookOpen, Tag } from "lucide-react"
import { PaperReview } from '@/types'
import CustomSelect from './CustomSelect'

interface PapersFilterProps {
  papers: PaperReview[]
}

export default function PapersFilter({ papers }: PapersFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // 获取所有分类列表
  const categoryOptions = useMemo(() => {
    const uniqueCategories = new Set(papers.map(p => p.category).filter(Boolean))
    const categories = Array.from(uniqueCategories).sort()
    return [
      { value: 'all', label: '全部分类' },
      ...categories.map(cat => ({ value: cat, label: cat }))
    ]
  }, [papers])

  // 筛选论文
  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      if (selectedCategory !== 'all' && paper.category !== selectedCategory) {
        return false
      }
      return true
    })
  }, [papers, selectedCategory])

  return (
    <div className="relative">
      {/* 筛选栏 */}
      <div className="relative z-[100] mb-8 flex flex-wrap gap-4 items-center animate-fade-in">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            分类:
          </label>
          <CustomSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categoryOptions}
            placeholder="全部分类"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/20">
          <span className="text-xs font-medium text-primary">共</span>
          <span className="text-lg font-bold text-primary">{filteredPapers.length}</span>
          <span className="text-xs font-medium text-primary">篇</span>
        </div>
      </div>

      {/* 论文列表 */}
      {filteredPapers.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredPapers.map((paper, index) => (
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

              {paper.date && (
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>发表于 {paper.date}</span>
                </div>
              )}

              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen size={16} />
                <span>{paper.journal}</span>
              </div>

              {paper.category && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    <Tag size={12} />
                    {paper.category}
                  </span>
                </div>
              )}

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
                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{paper.reason}</p>
                  </div>
                )}

                {paper.coreContent && (
                  <div>
                    <h3 className="mb-2 font-medium text-card-foreground">论文核心内容</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{paper.coreContent}</p>
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

              {paper.readDate && (
                <div className="flex items-center gap-2 border-t border-border/50 pt-4 mt-4 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>阅读于 {paper.readDate}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">📚</div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">暂无符合条件的论文</h2>
          <p className="text-muted-foreground">请尝试调整筛选条件</p>
        </div>
      )}
    </div>
  )
}

