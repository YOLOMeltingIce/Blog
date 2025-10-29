import Navigation from "@/components/Navigation"
import { getLocalAITimelineData } from '@/lib/local-data'
import { AITimelineEvent } from '@/types'

async function getAITimelineEvents(): Promise<AITimelineEvent[]> {
  return await getLocalAITimelineData()
}

const categoryColors: Record<string, string> = {
  架构创新: "bg-primary/10 text-primary",
  预训练模型: "bg-chart-2/10 text-chart-2",
  大模型时代: "bg-chart-3/10 text-chart-3",
  应用突破: "bg-chart-4/10 text-chart-4",
  多模态: "bg-chart-5/10 text-chart-5",
  开源生态: "bg-primary/10 text-primary",
}

export default async function AITimelinePage() {
  const events = await getAITimelineEvents()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">AI 发展时间轴</h1>
          <p className="text-lg text-muted-foreground">记录人工智能领域的重要里程碑</p>
        </div>

        {events.length > 0 ? (
          <>
            {/* Mobile Timeline */}
            <div className="md:hidden space-y-8">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="relative pl-8 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background animate-pulse-slow" />
                  {index < events.length - 1 && (
                    <div className="absolute left-[5px] top-5 h-full w-0.5 bg-border" />
                  )}

                  <div className="group rounded-xl border-2 border-primary/40 bg-card/60 p-4 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur transition-all duration-500 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-card/80 hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    </div>

                    <div className="mb-2 flex items-center gap-2">
                      {event.category && (
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${categoryColors[event.category] || 'bg-primary/10 text-primary'}`}>
                          {event.category}
                        </span>
                      )}
                      {event.date && (
                        <span className="text-xs text-muted-foreground">{event.date}</span>
                      )}
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-card-foreground">{event.title}</h3>

                    {event.description && (
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                    )}

                    {event.impact && (
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-card-foreground">影响：</strong>
                        {event.impact}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Timeline */}
            <div className="hidden md:block relative">
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/50 via-border to-primary/50" />

              <div className="space-y-12">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="relative flex items-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-1 pr-8 text-right">
                      {index % 2 === 0 && (
                        <div className="group inline-block rounded-xl border-2 border-primary/40 bg-card/60 p-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur transition-all duration-500 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-card/80 hover:-translate-y-1">
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                          </div>

                          <div className="mb-3 flex items-center justify-end gap-2">
                            {event.date && (
                              <span className="text-sm text-muted-foreground">{event.date}</span>
                            )}
                            {event.category && (
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[event.category] || 'bg-primary/10 text-primary'}`}
                              >
                                {event.category}
                              </span>
                            )}
                          </div>

                          <h3 className="mb-3 text-xl font-semibold text-card-foreground">{event.title}</h3>

                          {event.description && (
                            <p className="mb-3 text-left leading-relaxed text-muted-foreground">{event.description}</p>
                          )}

                          {event.impact && (
                            <p className="text-left text-sm text-muted-foreground">
                              <strong className="text-card-foreground">影响：</strong>
                              {event.impact}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-background animate-pulse-slow" />
                    </div>

                    <div className="flex-1 pl-8 text-left">
                      {index % 2 === 1 && (
                        <div className="group inline-block rounded-xl border-2 border-primary/40 bg-card/60 p-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur transition-all duration-500 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-card/80 hover:-translate-y-1">
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                          </div>

                          <div className="mb-3 flex items-center gap-2">
                            {event.category && (
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[event.category] || 'bg-primary/10 text-primary'}`}
                              >
                                {event.category}
                              </span>
                            )}
                            {event.date && (
                              <span className="text-sm text-muted-foreground">{event.date}</span>
                            )}
                          </div>

                          <h3 className="mb-3 text-xl font-semibold text-card-foreground">{event.title}</h3>

                          {event.description && (
                            <p className="mb-3 leading-relaxed text-muted-foreground">{event.description}</p>
                          )}

                          {event.impact && (
                            <p className="text-sm text-muted-foreground">
                              <strong className="text-card-foreground">影响：</strong>
                              {event.impact}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🤖</div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">暂无事件</h2>
            <p className="text-muted-foreground">开始记录AI发展的重要时刻吧</p>
          </div>
        )}
      </main>
    </div>
  )
}
