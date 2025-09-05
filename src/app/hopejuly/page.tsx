'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FaCalculator } from 'react-icons/fa6'
import CalcButton from './calcButton'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function Hopejuly() {
  const [inputValue, setInputValue] = useState<string>('')

  function change(value: string) {
    setInputValue(value)
  }
  return (
    <div className="mt-10 flex flex-col items-center gap-4 bg-green-300">
      <div className="flex flex-col items-center gap-4">
        <Input onChange={(e) => change(e.target.value)} type="text" className="bg-white"></Input>
        <Label>{inputValue}</Label>
      </div>
      <div className="flex gap-4"></div>

      <div className="flex gap-4">
        <CalcButton params="AC"></CalcButton>
        <CalcButton params="+/-"></CalcButton>
        <CalcButton params="%"></CalcButton>
        <CalcButton params="/"></CalcButton>
      </div>

      <div className="flex gap-4">
        <CalcButton params="7"></CalcButton>
        <CalcButton params="8"></CalcButton>
        <CalcButton params="9"></CalcButton>
        <CalcButton params="*"></CalcButton>
      </div>

      <div className="flex gap-4">
        <CalcButton params="4"></CalcButton>
        <CalcButton params="5"></CalcButton>
        <CalcButton params="6"></CalcButton>
        <CalcButton params="-"></CalcButton>
      </div>
      <div className="flex gap-4">
        <CalcButton params="1"></CalcButton>
        <CalcButton params="2"></CalcButton>
        <CalcButton params="3"></CalcButton>
        <CalcButton params="+"></CalcButton>
      </div>
      <div className="flex gap-4">
        <CalcButton params="="></CalcButton>
      </div>
    </div>
  )
}
