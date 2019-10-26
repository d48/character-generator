
# Character Generator

Randomizes a character attribute list to be used for ideas in story or illustrations.

Site can be viewed here: https://chargen.netlify.com/

[![Netlify Status](https://api.netlify.com/api/v1/badges/238cac10-cac7-4a54-bd15-91f093b280af/deploy-status)](https://app.netlify.com/sites/chargen/deploys)

![screenshot](https://content.screencast.com/users/Ryan.Regalado/folders/Default/media/559aff0a-f66e-47b1-92c1-558eb01fe46c/IMG_1283.PNG)

## Note
App will be setup to handle attribute configuration for random generation of any object of interest. Example: Auto-generate worlds, vehicles, stories. The first use case is for personal character ideation.

# Usage

```
npm install
npm run start
```

1. Open webpage on localhost:3000
2. Click on "Generate Character" button to see output

# Todo

* Add tests and explore cypress for e2e/functional tests

# Roadmap

* Add Redux
* Convert to TypeScript
* Dynamically create 2 columns of attributes
* Separate attributes in their own json. Later move to persistent store so can push updates separetely.
* After auto-generating a character, save to a persistent store at a unique URL. This can be shared or revisited
* Create login via email. Can see saved characters
* Create Folders to save different characters into

# Contribute

Join in with a Pull Request.

