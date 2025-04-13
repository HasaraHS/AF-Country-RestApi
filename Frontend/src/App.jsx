
import React, { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "./Components/Card"
import { motion } from "framer-motion"
import Globe from "react-globe.gl"
import * as THREE from "three"

const countries = [
  { name: "USA", emoji: "🇺🇸", bg: "bg-red-200" },
  { name: "Japan", emoji: "🇯🇵", bg: "bg-pink-200" },
  { name: "Germany", emoji: "🇩🇪", bg: "bg-yellow-200" },
  { name: "Sri Lanka", emoji: "🇱🇰", bg: "bg-green-200" },
  { name: "Brazil", emoji: "🇧🇷", bg: "bg-lime-200" },
]

const App = () => {
  const globeEl = useRef()
  const [globeSize, setGlobeSize] = useState(400)

  useEffect(() => {
    // Auto rotate the globe
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true
      globeEl.current.controls().autoRotateSpeed = 0.8
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">🌍 World Country Balls + Globe</h1>

      {/* Globe Section */}
      <div className="rounded-full overflow-hidden shadow-lg border border-white" style={{ width: globeSize, height: globeSize }}>
        <Globe
          ref={globeEl}
          width={globeSize}
          height={globeSize}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="rgba(0,0,0,0)"
        />
      </div>

      {/* Country Balls Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-10">
        {countries.map((country, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Card className={`w-28 h-28 flex items-center justify-center ${country.bg}`}>
              <CardContent>
                <div className="text-4xl">{country.emoji}</div>
                <p className="text-sm mt-2">{country.name}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default App
