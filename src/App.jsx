import React, { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'

// Lazy load non-critical sections
const Philosophy = lazy(() => import('./sections/Philosophy'))
const Product = lazy(() => import('./sections/Product'))
const Ingredients = lazy(() => import('./sections/Ingredients'))
const VideoBreak = lazy(() => import('./sections/VideoBreak'))
const Contact = lazy(() => import('./sections/Contact'))
const Closing = lazy(() => import('./sections/Closing'))

// Loading fallback
const SectionLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center bg-kiros-black">
    <div className="w-8 h-8 border-2 border-kiros-amber border-t-transparent rounded-full animate-spin" />
  </div>
)

function App() {
  return (
    <div className="bg-kiros-black min-h-screen w-full relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <Philosophy />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Product />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Ingredients />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <VideoBreak />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Closing />
      </Suspense>
    </div>
  )
}

export default App
