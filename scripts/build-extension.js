import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 复制 manifest.json
fs.copyFileSync(
  path.join(__dirname, '../public/manifest.json'),
  path.join(__dirname, '../dist/manifest.json')
)

// 复制图标
const iconsDir = path.join(__dirname, '../public/icons')
const distIconsDir = path.join(__dirname, '../dist/icons')

if (!fs.existsSync(distIconsDir)) {
  fs.mkdirSync(distIconsDir, { recursive: true })
}

fs.readdirSync(iconsDir).forEach(file => {
  fs.copyFileSync(
    path.join(iconsDir, file),
    path.join(distIconsDir, file)
  )
})

console.log('Chrome extension built successfully!') 