import { Navigation } from "@/components/navigation"
import { Calendar, Github, ExternalLink, CheckCircle, Clock, Circle } from "lucide-react"

const projects = [
  {
    title: "AI 论文阅读助手",
    status: "completed" as const,
    description:
      "基于大语言模型的论文阅读辅助工具，帮助研究者快速理解复杂的学术论文。支持自动摘要、关键概念提取和相关论文推荐。",
    technologies: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS"],
    highlights: ["智能论文摘要生成", "关键概念可视化", "相关文献推荐系统"],
    date: "2024-01",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "个人知识管理系统",
    status: "in-progress" as const,
    description: "一个现代化的个人知识管理平台，支持Markdown编辑、标签分类、全文搜索和知识图谱可视化。",
    technologies: ["React", "Node.js", "PostgreSQL", "D3.js"],
    highlights: ["双向链接支持", "知识图谱可视化", "智能标签推荐"],
    date: "2024-02",
    github: "https://github.com",
  },
  {
    title: "机器学习模型部署平台",
    status: "planned" as const,
    description: "简化机器学习模型部署流程的平台，支持多种框架，提供API接口和监控功能。",
    technologies: ["Python", "FastAPI", "Docker", "Kubernetes"],
    highlights: ["一键模型部署", "实时性能监控", "自动扩缩容"],
    date: "2024-03",
  },
]

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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">项目经历</h1>
          <p className="text-lg text-muted-foreground">记录我的技术探索与实践</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => {
            const StatusIcon = statusConfig[project.status].icon

            return (
              <article
                key={index}
                className="group relative rounded-xl border-2 border-primary/40 bg-card/60 p-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur transition-all duration-500 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-card/80 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>

                <div className="relative mb-4 flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-card-foreground transition-colors">{project.title}</h2>

                  {(project.github || project.demo) && (
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-all hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
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

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="mb-4">
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

                <div className="flex items-center gap-2 border-t border-border/50 pt-4 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>{project.date}</span>
                </div>
              </article>
            )
          })}
        </div>
      </main>
    </div>
  )
}
