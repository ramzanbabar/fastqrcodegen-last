declare module "qr-code-styling" {
  export interface Options {
    width?: number
    height?: number
    type?: "canvas" | "svg"
    data?: string
    margin?: number
    dotsOptions?: {
      color?: string
      type?: "square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded"
    }
    backgroundOptions?: {
      color?: string
    }
    cornersSquareOptions?: {
      type?: "dot" | "square" | "extra-rounded"
      color?: string
    }
    cornersDotOptions?: {
      type?: "dot" | "square"
      color?: string
    }
    image?: string
    imageOptions?: {
      crossOrigin?: string
      margin?: number
      imageSize?: number
      hideBackgroundDots?: boolean
    }
    qrOptions?: {
      typeNumber?: number
      mode?: string
      errorCorrectionLevel?: "L" | "M" | "Q" | "H"
    }
  }
  export default class QRCodeStyling {
    constructor(options: Options)
    getRawData(format: "png" | "svg" | "jpeg" | "webp"): Promise<Blob | null>
    update(options: Partial<Options>): void
    append(element: HTMLElement): void
    download(options?: { name?: string; extension?: "png" | "svg" | "jpeg" | "webp" }): Promise<void>
  }
}

export {}
