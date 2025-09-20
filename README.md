# Konami Coding Test
In order to give you a better idea of how I approach development, I have documented my process for implementing the two mock-ups.

1. Created an Expo app from the [blank-typescript template](https://docs.expo.dev/more/create-expo/#options).
``` 
npx create-expo-app@latest --template blank-typescript
```
2. Created the ui directory with sub categories for the different types of components there will be, and added in placeholders for the components I'll be adding.
3. Then, I started working on the SignIn page first, by using the placeholder components. I fill in each component as I take a step deeper into the code. For the sign in page, there were 4 main sections I identified. These were the: 
- Logo Section
- Warning Message Section
- User and Password Form Section
- Forgot Password Section
4. Before diving into the Form of the sign in page, I started by setting the theme and the device size specifications. 
- colors: I got the colors by using the color selector tool on figma to make sure I was getting the exact colors correct, before adding them as constants into a colors.ts file.
- device specifications: For right now, I just put in some values that I might adjust later based on how things look.