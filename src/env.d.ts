/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    post: {
      title?: string
      tags?: string[]
      ctime?: Date
      mtime?: Date
    }
    isPost: boolean
  }
}
