const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const fs = require('fs')
const path = require('path')

/**
 * Lighthouse audit configuration
 */
const config = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  },
}

/**
 * URLs to audit
 */
const urls = [
  'http://localhost:3000',
  'http://localhost:3000/blog',
  // Add more URLs as needed
]

/**
 * Run Lighthouse audit
 */
async function runLighthouse(url, opts, config = null) {
  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags })
  opts.port = chrome.port

  const runnerResult = await lighthouse(url, opts, config)
  await chrome.kill()

  return runnerResult
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting Lighthouse audits...\n')

  const reportsDir = path.join(__dirname, '..', 'lighthouse-reports')

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }

  const opts = {
    chromeFlags: ['--headless'],
  }

  const results = []

  for (const url of urls) {
    console.log(`Auditing: ${url}`)

    try {
      const runnerResult = await runLighthouse(url, opts, config)

      // Extract scores
      const scores = {
        performance: runnerResult.lhr.categories.performance.score * 100,
        accessibility: runnerResult.lhr.categories.accessibility.score * 100,
        bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
        seo: runnerResult.lhr.categories.seo.score * 100,
      }

      results.push({
        url,
        scores,
      })

      // Save HTML report
      const reportHtml = runnerResult.report
      const urlSlug = url.replace(/[^a-z0-9]/gi, '-').toLowerCase()
      const timestamp = new Date().toISOString().split('T')[0]
      const reportPath = path.join(reportsDir, `${urlSlug}-${timestamp}.html`)

      fs.writeFileSync(reportPath, reportHtml)

      console.log(`✅ Performance: ${scores.performance.toFixed(0)}`)
      console.log(`✅ Accessibility: ${scores.accessibility.toFixed(0)}`)
      console.log(`✅ Best Practices: ${scores.bestPractices.toFixed(0)}`)
      console.log(`✅ SEO: ${scores.seo.toFixed(0)}`)
      console.log(`📄 Report saved: ${reportPath}\n`)
    } catch (error) {
      console.error(`❌ Error auditing ${url}:`, error.message)
    }
  }

  // Save summary JSON
  const summaryPath = path.join(reportsDir, `summary-${new Date().toISOString().split('T')[0]}.json`)
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2))

  console.log('\n🎉 Lighthouse audits complete!')
  console.log(`📊 Summary saved: ${summaryPath}`)

  // Check if any scores are below threshold
  const threshold = 80
  const failedAudits = []

  results.forEach((result) => {
    Object.entries(result.scores).forEach(([category, score]) => {
      if (score < threshold) {
        failedAudits.push({ url: result.url, category, score })
      }
    })
  })

  if (failedAudits.length > 0) {
    console.log('\n⚠️  Some audits scored below threshold:')
    failedAudits.forEach((audit) => {
      console.log(`   ${audit.url} - ${audit.category}: ${audit.score.toFixed(0)}`)
    })
  }
}

main().catch(console.error)

