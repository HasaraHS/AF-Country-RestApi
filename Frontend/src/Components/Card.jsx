import * as React from "react"

export function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-md ${className}`}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }) {
  return (
    <div className={`p-2 text-center ${className}`} {...props} />
  )
}
