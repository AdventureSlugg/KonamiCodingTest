# Konami Coding Test

This repository showcases my approach to implementing the two provided mock-ups. Below, I’ve documented the process I followed and the reasoning behind my choices.

## Preview
Here is a quick preview of what the running app looks like!
![Konami Coding Sample Preview](https://github.com/AdventureSlugg/KonamiCodingTest/blob/main/KonamiCodeSamplePreview.gif)

## Running the Project
Before diving into my development process, here are a few quick instructions on how to run the code:
1. From the `frontend` directory, run the following commands for web:
```bash
npm install
npm run web
```
**Note**: You will need node

## Initial Setup
1. Bootstrapped a new Expo app using the blank-typescript template:
   ```bash
   npx create-expo-app@latest --template blank-typescript
   ```
2. Created a ui directory with subfolders to organize different component types, adding placeholders for upcoming components.

## Planning and Styling
When I work on a project, I like to break the problem up into smaller sub problems. From the mockups, I broke the pages up into several components, which made it a lot easier to create the application without missing anything.
1. Began with the Sign In page, building it out with placeholder components before implementing each piece in detail. Identified four main sections:
- Logo Section
- Warning Message Section
- User & Password Form Section
- Forgot Password Section

2. After establishing the necessary subcomponents, I like to set the page's css layout so that as each component is implemented, it fits on the page exactly as it will show up in the final product.

3. Established the theme and device size specifications before diving into the form implementation:
- **Colors**: Extracted exact values from Figma using the color picker tool, then stored them as constants in a [colors.ts](https://github.com/AdventureSlugg/KonamiCodingTest/blob/main/frontend/styles/colors.ts) file.
- **Device specifications**: Added initial placeholder values to be refined later based on layout appearance in [screenSizes.ts](https://github.com/AdventureSlugg/KonamiCodingTest/blob/main/frontend/styles/screenSizes.ts).

## Component Implementation
For each identified section, I built components from the top level down, implementing child components progressively.

1. Once the Sign In page was complete, created a simple Success Message page to bridge between screens. (I added a timeout to send the user to the next page after the a few seconds.)

2. Repeated the same process for the TODO List page, applying the same structured approach to componentization.

## Design Philosophy
Throughout the development process, I focused on building reusable, scalable components with future flexibility in mind:
- **Component Interactions**: Considered how each component might interact with others to ensure consistency and ease of integration across the app.
- **Generic Structures**: Implemented a generic list structure so it can easily support other list types in the future.
- **Reusable Form Elements**: Built the `FormField` and `Button` components to be versatile, allowing them to adapt to different use cases and styling needs.
This approach makes the codebase easier to extend, maintain, and adapt as new features or requirements emerge.
