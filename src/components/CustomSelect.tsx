'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Check } from 'lucide-react'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  icon?: React.ReactNode
  className?: string
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = '请选择',
  icon,
  className = ''
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 计算下拉框位置
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8, // fixed定位相对于视口，不需要加scrollY
        left: rect.left,      // fixed定位相对于视口，不需要加scrollX
        width: rect.width
      })
    }
  }, [isOpen])

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      // 检查点击是否在按钮或下拉列表内
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 监听滚动事件，滚动时关闭下拉框
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      setIsOpen(false)
    }

    window.addEventListener('scroll', handleScroll, true) // 使用捕获阶段
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isOpen])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 选择框按钮 */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[160px] w-full rounded-xl border-2 border-primary/30 bg-gradient-to-br from-card/80 to-card/60 px-4 py-2.5 text-sm font-medium text-foreground shadow-[0_0_15px_rgba(168,85,247,0.1)] backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer flex items-center justify-between gap-2"
      >
        <span className="flex items-center gap-2">
          {icon}
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 下拉选项列表 - 使用Portal渲染到body */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed z-[9999] rounded-xl border-2 border-primary/40 bg-gradient-to-br from-card/95 to-card/90 shadow-[0_8px_32px_rgba(168,85,247,0.3)] backdrop-blur-xl overflow-hidden"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            animation: 'fadeIn 0.15s ease-out'
          }}
        >
          <div className="max-h-[280px] overflow-y-auto py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:hover:bg-primary/50 [&::-webkit-scrollbar-track]:bg-transparent">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center justify-between gap-2 ${
                  value === option.value
                    ? 'bg-gradient-to-r from-primary/25 to-primary/15 text-primary border-l-2 border-primary'
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground border-l-2 border-transparent'
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

