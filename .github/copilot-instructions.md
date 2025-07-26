First rule: Respond English and use English as naming and commenting language.
Short comments are preferred.

- use hono.js for api routes under "workers/api.v1.ts" file. Also use @hono/zod-validator, zod and hono.  


We use Shadcn/ui for UI components.
Tailwind CSS for styling.
React Router v7 (formerly Remix.js v2) for fullstack framework.
We use React Query for data fetching and state management.
We use TypeScript for type safety and better developer experience.
We use Vite as our build tool for fast development and production builds.
We use Vitest for unit testing.
We use Biome for code quality and formatting.

### App Context Story. 

To be filled.


### Create File Guide. 

Apply the guide I follow below while creating a new component, query, view, action or anything into my application.

1. I want to store all ui-components in the "$PROJECTDIR/app/components/*" so if you need to custom component that needs to be referenced use this directory. 

e.g. TweetCard, TweetList, TweetAvatar. 
- TweetCard: "/app/components/tweet/tweet-card.tsx"
- TweetList: "/app/components/tweet/tweet-list.tsx"
- TweetAvatar: "/app/components/tweet/tweet-avatar.tsx". 

2. I prefer seperating query and mutation into functional programming functional way and import them into the component.

e.g. useFetchLatestTweets, useCreateTweetMutation files should be stored in the "$PROJECTDIR/app/sections/explore/tweets.{query,mutations}.tsx" directory.

-  useFetchLatestTweets: "/app/sections/explore/tweets.query.ts"
-  useCreateTweetMutation: "/app/sections/explore/tweets.mutation.ts"

After that they could easily be imported into the component like this:

```tsx
import { useFetchLatestTweets } from "@/app/sections/explore/tweets.query";
```

3. I love to divide page into sections and divide sections into components and make them reusable. (Wireframing)

e.g. for building "Home" page. First i would create wireframe of page then divide it into sections and components.
- HomePage: "/app/routes/_index.tsx"
- - Hero Section: "/app/sections/home/home-hero.section.tsx"
- - - e.g. If I need to HomeHeroCTA component, I would create it in the components directory.
- - - HomeHeroCTA: "/app/components/home/home-hero-cta.component.tsx"
- - Features Section: "/app/sections/home/home-features.section.tsx"
- - Join The Community Section: "/app/sections/home/home-join-community.section.tsx"
- - Footer Section: "/app/sections/home/home-footer.section.tsx"

