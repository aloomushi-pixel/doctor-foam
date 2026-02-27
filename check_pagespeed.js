const url = process.argv[2];
if (!url) {
    console.error("Please provide a URL to test.");
    process.exit(1);
}

const strategy = "mobile";
const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`;

console.log(`Evaluating PageSpeed Insights for: ${url} (Strategy: ${strategy})...`);

fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("Error from API:", data.error.message);
            process.exit(1);
        }

        const categories = data.lighthouseResult?.categories;
        if (!categories) {
            console.error("Failed to fetch lighthouse results. Check the URL.");
            process.exit(1);
        }

        const perf = categories.performance?.score * 100;
        const access = categories.accessibility?.score * 100;
        const bp = categories['best-practices']?.score * 100;
        const seo = categories.seo?.score * 100;

        console.log("\n========== RESULTS ==========");
        console.log(`- Performance:     ${perf}`);
        console.log(`- Accessibility:   ${access}`);
        console.log(`- Best Practices:  ${bp}`);
        console.log(`- SEO:             ${seo}`);
        console.log("=============================\n");

        const audits = data.lighthouseResult.audits;

        console.log("--- Performance Opportunities (Largest time savings) ---");
        Object.values(audits)
            .filter(a => a.details && a.details.type === 'opportunity' && a.score !== 1 && a.details.overallSavingsMs > 0)
            .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
            .slice(0, 5)
            .forEach(a => {
                console.log(`>> ${a.title} (Saves ~${Math.round(a.details.overallSavingsMs)}ms)`);
                console.log(`   Fix: ${a.description}`);
            });

        console.log("\n--- Failed Audits (Accessibility & Best Practices) ---");
        Object.values(audits)
            .filter(a => a.score !== null && a.score < 1 && a.score !== undefined && a.details && a.details.type !== 'opportunity')
            .filter(a => !['is-on-https', 'user-timings', 'diagnostics', 'mainthread-work-breakdown', 'font-display', 'network-requests', 'network-rtt', 'network-server-latency', 'script-treemap-data'].includes(a.id))
            .slice(0, 5)
            .forEach(a => {
                if (a.score < 0.9) {
                    console.log(`>> ${a.title} (Score: ${a.score})`);
                    console.log(`   Fix: ${a.description}`);
                }
            });

    })
    .catch(err => {
        console.error("Fetch error:", err.message);
    });
