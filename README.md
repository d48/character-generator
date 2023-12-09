
# Character Generator

Randomizes a character attribute list to be used for ideas in story or illustrations.

Site can be viewed here: https://chargen.netlify.com/

![coverage badge](./coverage/badge.svg)

![screenshot](https://cdn.screencast.com/uploads/g000302GGE4mmgFLvuV3AzQnV1LYO/e2efdaaa-953b-48d4-b07a-984671801e95-CharGen.art.png-318351.png?sv=2022-11-02&st=2023-12-09T22%3A38%3A53Z&se=2023-12-10T22%3A38%3A53Z&sr=b&sp=r&sig=0ybxjtaSDPaKsKcqWPU533keNEGa40SrtRDFoExyuy0%3D)

## Note
App will be setup to handle attribute configuration for random generation of any object of interest. Example: Auto-generate worlds, vehicles, stories. The first use case is for personal character ideation.

# Usage

```
pnpm install
pnpm start
```

1. Open webpage on localhost:3000
2. Click on "Generate Character" button to see output

# Tests

Uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

```
pnpm test
```

# Roadmap

* Set up changelog and automatic versioning: https://github.com/semantic-release/semantic-release
* Convert to TypeScript
* After auto-generating a character, save to a persistent store at a unique URL. This can be shared or revisited
* Create login via email. Can see saved characters
* Create Folders to save different characters into

# Contribute

Join in with a Pull Request.

