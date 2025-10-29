"use client"

import { Navigation } from "@/components/navigation"
import { Code2, BookOpen, Sparkles, Mail, MessageCircle, X } from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const [showWeChatQR, setShowWeChatQR] = useState(false)

  const skills = ["Python", "C", "C++", "Machine Learning", "Data Science", "全栈开发", "LLM", "VibeCoding"]

  const interests = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "全栈开发",
      description: "热衷于构建现代化的Web应用，从前端到后端的完整解决方案",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "学术研究",
      description: "深入研究机器学习和人工智能领域的前沿论文与技术",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "技术创新",
      description: "探索新技术，将理论研究转化为实际应用",
    },
  ]

  return (
    <div className="min-h-screen relative">
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <section className="relative mb-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 overflow-hidden fade-in-up">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse float-animation" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse float-animation"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 ring-2 ring-primary/50 shadow-[0_0_40px_rgba(168,85,247,0.3)] glow-border">
                <div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary/50 border-r-secondary/50 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                <span className="text-5xl relative z-10">👨‍💻</span>
              </div>
            </div>

            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl gradient-text">王家俊</h1>

            <p className="mb-6 text-xl text-primary font-medium">AI爱好者</p>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Faith in AI. Chasing the Frontier. Building the Future.
            </p>
          </div>
        </section>

        <section className="mb-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 px-6 sm:px-8 py-12 relative overflow-hidden shimmer fade-in-up-delay-1">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">个人背景</h2>

          <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              我本科毕业于<span className="text-foreground font-semibold">北京邮电大学计算机学院</span>，
              <span className="text-foreground font-semibold">计算机科学与技术专业</span>，
              在校期间打下了扎实的编程与算法基础；目前在
              <span className="text-foreground font-semibold">香港中文大学（深圳）数据科学学院</span>攻读
              <span className="text-foreground font-semibold">金融工程</span>硕士学位。
              这样的跨学科学习经历，让我能在技术与商业之间灵活思考——既关注技术本身的创新性与可行性，也关注用户需求与商业价值。
            </p>
            <p className="text-lg">
              我的兴趣与职业方向，如今聚焦在<span className="text-foreground font-semibold">AI 产品的探索与实践</span>。
              我深信，AI 将深刻改变我们未来的生活方式。我致力于追随这一前沿，投身其中，探索 AI 的无限可能。
            </p>
            <p className="text-lg">
              我希望通过这个博客，记录我的观察与思考，也期待与你一起，在 AI 的时代里共同探索、成长。
            </p>
          </div>
        </section>

        <section className="mb-16 fade-in-up-delay-2">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">兴趣方向</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {interests.map((interest, index) => (
              <div
                key={interest.title}
                className="group relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transition-all hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-2 glow-border overflow-hidden shimmer magnetic"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />

                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity">
                  <div className="absolute top-2 right-2 w-full h-px bg-gradient-to-r from-transparent to-primary rotate-45" />
                  <div className="absolute top-4 right-4 w-full h-px bg-gradient-to-r from-transparent to-secondary rotate-45" />
                </div>

                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform border border-primary/20">
                  {interest.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {interest.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{interest.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 fade-in-up-delay-3">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground">技术栈</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className="group relative rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 text-center transition-all hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:-translate-y-1 glow-border shimmer magnetic"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="font-medium text-foreground group-hover:text-primary transition-colors">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 px-6 py-8 relative overflow-hidden shimmer fade-in-up-delay-4">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-foreground">联系方式</h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => setShowWeChatQR(true)}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground backdrop-blur transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] magnetic"
            >
              <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">微信</span>
            </button>

            <div className="group relative flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground backdrop-blur transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] magnetic cursor-default">
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">邮箱</span>
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-background border border-primary/50 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.3)] pointer-events-none group-hover:pointer-events-auto select-text z-10">
                706582310@qq.com
              </span>
            </div>
          </div>
        </section>
      </main>

      {showWeChatQR && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in"
          onClick={() => setShowWeChatQR(false)}
        >
          <div
            className="relative bg-background border-2 border-primary/50 rounded-2xl p-8 max-w-sm w-full shadow-[0_0_50px_rgba(168,85,247,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowWeChatQR(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-center mb-6 text-foreground">微信二维码</h3>

            <div className="bg-white p-4 rounded-xl mb-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400 text-sm text-center px-4">
                  请将此处替换为
                  <br />
                  你的微信二维码图片
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">扫描二维码添加微信</p>
          </div>
        </div>
      )}
    </div>
  )
}
