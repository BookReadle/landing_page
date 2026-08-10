# Bookreadle static landing page

A dependency-free GitHub Pages site. Everything required to deploy is in this folder.

## Deploy with GitHub Pages

1. Create an empty GitHub repository.
2. Copy the contents of this folder into it.
3. Commit and push to the `main` branch.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. The included workflow will publish the site automatically after every push to `main`.

The signup and contact forms currently show local success messages. Connect their submit handlers in `script.js` to Formspree, Supabase, or another service when you are ready to collect submissions.
