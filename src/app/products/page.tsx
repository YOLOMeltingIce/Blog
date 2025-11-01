import Navigation from "@/components/Navigation"
import ProductsFilter from "@/components/ProductsFilter"
import { getLocalProductsData } from '@/lib/local-data'
import { ProductExperience } from '@/types'

async function getProducts(): Promise<ProductExperience[]> {
  return await getLocalProductsData()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">产品体验</h1>
          <p className="text-lg text-muted-foreground">记录我使用过的产品体验与思考</p>
        </div>

        {products.length > 0 ? (
          <ProductsFilter products={products} />
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">📱</div>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">暂无产品</h2>
            <p className="text-muted-foreground">开始记录你的产品体验吧</p>
          </div>
        )}
      </main>
    </div>
  )
}
