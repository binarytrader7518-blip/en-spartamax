# Spartamax — Deploy, Bing Webmaster & IndexNow Checklist

Production domain: https://en-spartamax.vercel.app/
Affiliate URL (unchanged): https://getspartamax.info/buy.php?aff_id=2402

## Deploy (Vercel)
1. Upload this folder as the project root (index.html and order.html sit at the top level). No build step: framework preset "Other".
2. `vercel.json` provides:
   - `/order` → serves `order.html` (noindex, follow). Its Buy Now buttons link straight to the affiliate URL.
   - `/go/1`, `/go/3`, `/go/6` → HTTP 302 to the affiliate URL. These are the only redirect targets (fixed allowlist, no `?url=` parameter, so there's no open redirect). Any other `/go/...` path returns 404. Responses are `no-store` and `noindex`.
3. After deploying, check:
   - https://en-spartamax.vercel.app/key.txt returns 200 and contains exactly `ddbcb0f9c3ae2a86c6c721189be04dfe`
   - https://en-spartamax.vercel.app/sitemap.xml and https://en-spartamax.vercel.app/robots.txt load
   - https://en-spartamax.vercel.app/go/6 returns 302 and points to the affiliate URL
   - https://en-spartamax.vercel.app/go/9 returns 404

## IndexNow
- Key: `ddbcb0f9c3ae2a86c6c721189be04dfe` · Key file: https://en-spartamax.vercel.app/key.txt
- Automatic submissions: run `npm run indexnow` after each deploy (Node 18+). The script checks the live key file, reads the live sitemap, hashes each page, and submits only new, changed or removed URLs to api.indexnow.org. It retries on server errors and logs the HTTP status. `npm run indexnow:all` submits every URL.
- A 200 or 202 response means the URLs were received. It does not mean they are indexed.

## Bing Webmaster Tools
1. Sign in at https://www.bing.com/webmasters. Add `https://en-spartamax.vercel.app/`, or import the site from Google Search Console.
2. Verify ownership. For a vercel.app domain, use the Search Console import or the meta-tag method. If you use the meta tag, add it to the `<head>` of index.html.
3. Go to Sitemaps and submit https://en-spartamax.vercel.app/sitemap.xml
4. Use URL Submission to paste the URL list below.
5. Use URL Inspection to check the homepage and the price and review pages.
6. Check the IndexNow report and Crawl and Indexing errors weekly.

## Manual IndexNow submission URLs
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/product-overview.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/how-it-works.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/benefits.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/focus-areas/index.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/focus-areas/energy-drive.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/focus-areas/stamina-endurance.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/focus-areas/circulation.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/focus-areas/male-vitality-confidence.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/reviews.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/blog/index.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/blog/tongkat-ali-maca-ashwagandha-research.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/blog/beetroot-nitrates-circulation.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/blog/l-arginine-explained.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/blog/daily-habits-male-energy.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/blog/sleep-stress-vitality.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/blog/choose-mens-supplement-safely.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/faq.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/ingredients.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/product-review.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/price.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/where-to-buy.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/pros-and-cons.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/affiliate-disclosure.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/disclaimer.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/privacy-policy.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt
https://api.indexnow.org/indexnow?url=https://en-spartamax.vercel.app/terms.html&key=ddbcb0f9c3ae2a86c6c721189be04dfe&keyLocation=https://en-spartamax.vercel.app/key.txt

## Sitemap URLs
https://en-spartamax.vercel.app/
https://en-spartamax.vercel.app/product-overview.html
https://en-spartamax.vercel.app/how-it-works.html
https://en-spartamax.vercel.app/benefits.html
https://en-spartamax.vercel.app/focus-areas/index.html
https://en-spartamax.vercel.app/focus-areas/energy-drive.html
https://en-spartamax.vercel.app/focus-areas/stamina-endurance.html
https://en-spartamax.vercel.app/focus-areas/circulation.html
https://en-spartamax.vercel.app/focus-areas/male-vitality-confidence.html
https://en-spartamax.vercel.app/reviews.html
https://en-spartamax.vercel.app/blog/index.html
https://en-spartamax.vercel.app/blog/tongkat-ali-maca-ashwagandha-research.html
https://en-spartamax.vercel.app/blog/beetroot-nitrates-circulation.html
https://en-spartamax.vercel.app/blog/l-arginine-explained.html
https://en-spartamax.vercel.app/blog/daily-habits-male-energy.html
https://en-spartamax.vercel.app/blog/sleep-stress-vitality.html
https://en-spartamax.vercel.app/blog/choose-mens-supplement-safely.html
https://en-spartamax.vercel.app/faq.html
https://en-spartamax.vercel.app/ingredients.html
https://en-spartamax.vercel.app/product-review.html
https://en-spartamax.vercel.app/price.html
https://en-spartamax.vercel.app/where-to-buy.html
https://en-spartamax.vercel.app/pros-and-cons.html
https://en-spartamax.vercel.app/affiliate-disclosure.html
https://en-spartamax.vercel.app/disclaimer.html
https://en-spartamax.vercel.app/privacy-policy.html
https://en-spartamax.vercel.app/terms.html
