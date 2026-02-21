'use client'

export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-light flex">
      <aside className="hidden lg:flex w-64 bg-white border-r border-brand-border flex-col h-screen sticky top-0">
        <div className="p-4 border-b border-brand-border">
          <div className="h-8 w-36 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 p-2 space-y-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={`sidebar-${item}`} className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="p-2 border-t border-brand-border">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </aside>

      <main className="flex-1 p-4 pt-16 lg:p-8 lg:pt-8">
        <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-10 bg-gray-200 rounded w-64" />
          </div>

          <div className="bg-white rounded-2xl border border-brand-border p-6">
            <div className="h-4 bg-gray-200 rounded w-40 mb-4" />
            <div className="h-10 bg-gray-200 rounded w-48 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-56" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
            <div className="flex-1 h-12 bg-gray-200 rounded-lg" />
          </div>

          <div className="bg-white rounded-2xl border border-brand-border p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div key={`reports-${item}`} className="h-20 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-brand-border p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-32" />
            {[1, 2, 3].map((item) => (
              <div key={`assets-${item}`} className="h-14 bg-gray-100 rounded-xl" />
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-brand-border p-6">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={`activity-${item}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                  <div className="w-20 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
