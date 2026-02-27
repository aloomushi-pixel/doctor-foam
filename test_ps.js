const https = require('https');

const url = "https://drfoam.com.mx";
const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`;

console.log(`Evaluating PageSpeed Insights for: ${url} ...`);

https.get(apiUrl, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
                console.error("API Error:", parsed.error.message);
                process.exit(1);
            }
            const cats = parsed.lighthouseResult.categories;
            console.log("\n========== RESULTS ==========");
            console.log(`- Performance:     ${Math.round(cats.performance.score * 100)}`);
            console.log(`- Accessibility:   ${Math.round(cats.accessibility.score * 100)}`);
            console.log(`- Best Practices:  ${Math.round(cats['best-practices'].score * 100)}`);
            console.log(`- SEO:             ${Math.round(cats.seo.score * 100)}`);
            console.log("=============================\n");

            const audits = parsed.lighthouseResult.audits;
            console.log("--- Performance Opportunities ---");
            Object.values(audits)
                .filter(a => a.details && a.details.type === 'opportunity' && a.score !== 1 && a.details.overallSavingsMs > 0)
                .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
                .slice(0, 5)
                .forEach(a => {
                    console.log(`>> ${a.title} (Saves ~${Math.round(a.details.overallSavingsMs)}ms)`);
                });

            console.log("\n--- Failed Audits ---");
            Object.values(audits)
                .filter(a => a.score !== null && a.score < 1 && a.score !== undefined && a.details && a.details.type !== 'opportunity')
                .slice(0, 5)
                .forEach(a => {
                    if (a.score < 0.9) console.log(`>> ${a.title} (Score: ${a.score})`);
                });

        } catch (e) {
            console.error("Failed to parse", e);
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
