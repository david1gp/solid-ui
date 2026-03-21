import { FeatureGridSection } from "#ui/static/grid/FeatureGridSection.jsx"
import { technicalFeatures } from "./technicalFeatures.js"

export function DemoFeatureGridSection() {
  return (
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">Feature Grid Demo</h1>
      <FeatureGridSection
        id="TechnicalFeatures"
        title="Technical Features of Platform"
        subtitle1="Built with modern technology and user experience in mind. Fast, efficient, and reliable."
        features={technicalFeatures}
      />
    </div>
  )
}
