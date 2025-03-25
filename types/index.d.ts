declare module "react" {
  import * as React from "react"
  export = React
  export as namespace React
}

declare module "next/font/google" {
  export interface FontOptions {
    weight?: string | number | Array<string | number>
    style?: string | string[]
    subsets?: string[]
    display?: "auto" | "block" | "swap" | "fallback" | "optional"
    preload?: boolean
    variable?: string
    fallback?: string[]
  }

  export function Inter(options?: FontOptions): {
    className: string
    style: { fontFamily: string }
  }
}

declare module "lucide-react" {
  import { FC, SVGProps } from "react"
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    absoluteStrokeWidth?: boolean
    color?: string
  }
  export const Upload: FC<IconProps>
  export const CalendarIcon: FC<IconProps>
}

declare module "date-fns" {
  export function format(date: Date | number, formatStr: string): string
}

declare module "jspdf" {
  export class jsPDF {
    constructor(options?: {
      orientation?: "portrait" | "landscape"
      unit?: "pt" | "mm" | "cm" | "in"
      format?: string | [number, number]
      compress?: boolean
    })
    addImage(
      imageData: string | HTMLImageElement | HTMLCanvasElement,
      format: string,
      x: number,
      y: number,
      width: number,
      height: number
    ): jsPDF
    addPage(): jsPDF
    save(filename: string): void
  }
}

declare module "html2canvas" {
  interface Html2CanvasOptions {
    scale?: number
    useCORS?: boolean
    allowTaint?: boolean
    backgroundColor?: string
    logging?: boolean
    onclone?: (document: Document, element: HTMLElement) => void
  }

  function html2canvas(
    element: HTMLElement,
    options?: Html2CanvasOptions
  ): Promise<HTMLCanvasElement>

  export default html2canvas
}

declare module "next-themes" {
  import { ComponentType, ReactNode } from "react"

  export interface ThemeProviderProps {
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
    children: ReactNode
  }

  export const ThemeProvider: ComponentType<ThemeProviderProps>
}

declare namespace JSX {
  interface IntrinsicElements {
    html: React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
    head: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>
    title: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>
    meta: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>
    link: React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>
    script: React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>
    body: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>
    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
    p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
    a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
    img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
    input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
    button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
    label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
  }
}
