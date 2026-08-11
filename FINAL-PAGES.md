# Deploying the Final site (GitHub Pages)

This file contains the exact steps to publish your final/ folder on GitHub Pages and obtain a friendly public URL for grading.

Option A — Serve from repository root (recommended)
1. In GitHub go to Settings → Pages.
2. Under "Source" select Branch: main and Folder: / (root). Click Save.
3. Your site will be available at https://<your-username>.github.io/<repo-name>/ — for example: https://josephjohn2806.github.io/wdd231/
4. The final site pages will be at:
   - https://josephjohn2806.github.io/wdd231/final/index.html
   - https://josephjohn2806.github.io/wdd231/final/products.html
   - https://josephjohn2806.github.io/wdd231/final/contact.html

Option B — Serve only the final folder using a branch (alternative)
1. Create a branch (e.g., gh-pages) and put the contents of final/ at the repository root in that branch.
2. In Settings → Pages choose Branch: gh-pages and Folder: / (root). Save.
3. Your site will be available at the same URL pattern above.

Notes & tips
- I cannot change your Pages settings for you; follow the steps above in the web UI.
- If you want a custom domain, create a CNAME file at the repository root with your domain and follow GitHub's domain verification steps.
- After publishing, run Lighthouse audits for mobile and desktop, and provide the public final URL when submitting.
