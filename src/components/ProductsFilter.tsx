'use client'

import { useState, useMemo } from 'react'
import { Calendar, Building2, Globe, Tag } from "lucide-react"
import { ProductExperience } from '@/types'
import CustomSelect from './CustomSelect'
import Image from 'next/image'

interface ProductsFilterProps {
  products: ProductExperience[]
}

export default function ProductsFilter({ products }: ProductsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')

  // 获取所有类别和国家选项
  const { categoryOptions, countryOptions } = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category).filter(Boolean))
    const uniqueCountries = new Set(products.map(p => p.country).filter(Boolean))
    
    return {
      categoryOptions: [
        { value: 'all', label: '全部类别' },
        ...Array.from(uniqueCategories).sort().map(cat => ({ value: cat, label: cat }))
      ],
      countryOptions: [
        { value: 'all', label: '全部国家' },
        ...Array.from(uniqueCountries).sort().map(country => ({ value: country, label: country }))
      ]
    }
  }, [products])

  // 筛选产品
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false
      }
      if (selectedCountry !== 'all' && product.country !== selectedCountry) {
        return false
      }
      return true
    })
  }, [products, selectedCategory, selectedCountry])

  return (
    <div className="relative">
      {/* 筛选栏 */}
      <div className="relative z-[100] mb-8 flex flex-wrap gap-4 items-center animate-fade-in">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            类别:
          </label>
          <CustomSelect
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categoryOptions}
            placeholder="全部类别"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Globe size={16} className="text-secondary" />
            国家:
          </label>
          <CustomSelect
            value={selectedCountry}
            onChange={setSelectedCountry}
            options={countryOptions}
            placeholder="全部国家"
            className="min-w-[140px]"
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/20">
          <span className="text-xs font-medium text-primary">共</span>
          <span className="text-lg font-bold text-primary">{filteredProducts.length}</span>
          <span className="text-xs font-medium text-primary">个</span>
        </div>
      </div>

      {/* 产品列表 */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredProducts.map((product, index) => (
            <article
              key={product.id}
              className="group relative rounded-xl border-2 border-primary/40 bg-card/60 shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur transition-all duration-500 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-card/80 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>

              {/* 固定高度容器 */}
              <div className="flex flex-col h-[600px]">
                {/* 头部区域 - 紧凑高度 */}
                <div className="flex-shrink-0 p-4 border-b border-border/50">
                  <div className="flex items-start gap-3">
                    {product.icon && (
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        <Image
                          src={product.icon}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-card-foreground mb-1.5 truncate">
                        {product.name}
                      </h2>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {product.category && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            <Tag size={12} />
                            {product.category}
                          </span>
                        )}
                        {product.company && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                            <Building2 size={12} />
                            {product.company}
                          </span>
                        )}
                        {product.country && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                            <Globe size={12} />
                            {product.country}
                          </span>
                        )}
                      </div>
                      {product.updateDate && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <span>更新于 {product.updateDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 内容区域 - 可滚动 */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:hover:bg-primary/50 [&::-webkit-scrollbar-track]:bg-transparent">
                  {product.positioning && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        定位
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{product.positioning}</p>
                    </div>
                  )}

                  {product.coreCapabilities && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        核心能力
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{product.coreCapabilities}</p>
                    </div>
                  )}

                  {product.userExperience && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        使用体验
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{product.userExperience}</p>
                    </div>
                  )}

                  {product.complianceRisks && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        合规风险
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{product.complianceRisks}</p>
                    </div>
                  )}

                  {product.ecosystemAndScalability && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        生态系统与可扩展性
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{product.ecosystemAndScalability}</p>
                    </div>
                  )}

                  {product.commercialPotential && (
                    <div>
                      <h3 className="mb-2 font-medium text-card-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        商业化潜力
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{product.commercialPotential}</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">📱</div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">暂无符合条件的产品</h2>
          <p className="text-muted-foreground">请尝试调整筛选条件</p>
        </div>
      )}
    </div>
  )
}

