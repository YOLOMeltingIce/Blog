import Navigation from "@/components/Navigation"
import { Calendar, Github, ExternalLink, CheckCircle, Clock, Circle } from "lucide-react"
import { getLocalProjectsData } from '@/lib/local-data'
import { Project } from '@/types'

async function getProjects(): Promise<Project[]> {
  return await getLocalProjectsData()
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    label: "已完成",
    color: "text-green-500",
  },
  "in-progress": {
    icon: Clock,
    label: "进行中",
    color: "text-primary",
  },
  planned: {
    icon: Circle,
    label: "计划中",
    color: "text-muted-foreground",
  },
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">项目经历</h1>
          <p className="text-lg text-muted-foreground">记录我的技术探索与实践</p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project, index) => {
              const StatusIcon = statusConfig[project.status].icon

              return (
                <article
                  key={project.id}
                  className="group relative rounded-xl border-2 border-primary/40 bg-card/60 p-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur transition-all duration-500 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-card/80 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>

                  <div className="relative mb-4 flex items-start justify-between">
                    <h2 className="text-xl font-semibold text-card-foreground transition-colors">{project.title}</h2>

                    {(project.githubUrl || project.demoUrl) && (
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <StatusIcon size={16} className={statusConfig[project.status].color} />
                    <span className="text-sm text-muted-foreground">{statusConfig[project.status].label}</span>
                  </div>

                  <div className="space-y-4">
                    {(() => {
                      const descLines = project.description.split('\n').filter(line => line.trim());
                      const sections: { [key: string]: string[] } = {};
                      let currentSection = '';
                      
                      descLines.forEach(line => {
                        if (line.includes('：') || line.includes(':')) {
                          currentSection = line.split(/[：:]/)[0].trim();
                          const content = line.split(/[：:]/)[1]?.trim();
                          if (content) {
                            sections[currentSection] = [content];
                          } else {
                            sections[currentSection] = [];
                          }
                        } else if (currentSection && line.trim()) {
                          sections[currentSection].push(line.trim());
                        }
                      });

                      return Object.entries(sections).map(([title, content]) => (
                        <div key={title}>
                          <h3 className="mb-2 font-medium text-card-foreground">{title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {content.join(' ')}
                          </p>
                        </div>
                      ));
                    })()}
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4 mt-4">
                      <h3 className="mb-2 font-medium text-card-foreground">技术栈</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-4">
                      <h3 className="mb-2 font-medium text-card-foreground">项目亮点</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(project.startDate || project.endDate) && (
                    <div className="flex items-center gap-2 border-t border-border/50 pt-4 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>
                        {project.startDate || project.endDate}
                      </span>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🚀</div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">暂无项目</h2>
            <p className="text-muted-foreground">开始记录你的项目经历吧</p>
          </div>
        )}
      </main>
    </div>
  )
}
