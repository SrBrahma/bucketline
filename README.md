<div align="center">

<br/>
<img src="assets/logo.webp" alt="logo" width="250"/>

# Bucketline
[![npm](https://img.shields.io/npm/v/bucketline)](https://www.npmjs.com/package/bucketline) [![npm](https://img.shields.io/npm/dw/bucketline)](https://www.npmjs.com/package/bucketline)



<h4>


Simple Cloud Bucket Storage integration for your Visual Regression CI. Supports Playwright & Storybook and GitHub & GitLab!

<h5>
Fully free and open-source alternative to Chromatic. No paid tiers!
</h5>
</h4>

# 🏗️ - WIP  - This is not usable yet! - 👷


<br/>

</div>

## 💿 Installation

# Cloud Setup
### 1) Setup the Cloud Bucket with UploadThing

  1) Sign-in to https://uploadthing.com
  2) Create a new app
  3) Copy the API Key on the dashboard and set these ENVs in your CI settings:

  ```
  UPLOADTHING_SECRET = <UPLOADTHING_SECRET>
  UPLOADTHING_SECRET = <UPLOADTHING_APP_ID>
  ```

### 2) Setup the NextJS

  1) Sign-in to https://vercel.com/login
  2) Click to add a new project
  3) Click on the link `Import Third-Party Git Repository` and enter

## 🤖 Development

**For local development of this package**, You need `bun`. Then:

```bash
bun start
```

</br>
<div align="center" >
<h3>
This project is possible thanks to
</h3>
<a href="https://github.com/pingdotgg/uploadthing/">
  <picture >
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/pingdotgg/uploadthing/main/assets/uploadthing-logo-dark-background.svg">
  <img src="https://github.com/pingdotgg/uploadthing/blob/main/assets/uploadthing-logo-light-background.svg" width="480" height="80" alt="Logo for UploadThing">
</picture>
</a>
</div>
