export const posts = [
  {
    id: 1,
    title: 'Mastering React Custom Hooks: Patterns That Scale',
    excerpt: 'Custom hooks are the backbone of reusable logic in React. Learn battle-tested patterns for building hooks that your team will actually want to use.',
    content: `Custom hooks transformed the way we share logic across React components, but writing truly reusable ones requires more thought than just extracting a \`useState\` call. The key is to design hooks that are **composable**, **predictable**, and **testable**.

One pattern I've found invaluable is the "reducer hook" — wrapping \`useReducer\` inside a custom hook that exposes a clean API. Instead of leaking dispatch actions to your components, you expose semantic methods like \`addItem()\`, \`removeItem()\`, and \`reset()\`. This keeps your component code readable and your state logic centralized.

Another powerful pattern is the "hook composition" approach: building complex hooks by combining simpler ones. For example, a \`useApiQuery\` hook might internally use \`useFetch\`, \`useCache\`, and \`useRetry\`. Each sub-hook is independently testable, and the composed hook stays maintainable as requirements grow.`,
    authorId: 2,
    tags: ['react', 'javascript', 'webdev'],
    createdAt: '2024-06-12T09:00:00Z',
    likes: 142,
    commentCount: 18,
    coverImage: 'https://picsum.photos/seed/post1/800/400',
  },
  {
    id: 2,
    title: 'Why Rust\'s Ownership Model Changed How I Think About Software',
    excerpt: 'After two years of writing Rust, I can\'t go back to thinking about memory the old way. Here\'s what the borrow checker taught me about software design.',
    content: `When I first encountered Rust's ownership system, I saw it as a hurdle — a strict compiler constantly rejecting my code. Six months in, I realized the borrow checker wasn't fighting me; it was **teaching me**. Every compiler error was a lesson about data flow, lifetime management, and shared mutable state.

The biggest mindset shift was understanding that ownership isn't just about memory — it's about **responsibility**. When a function takes ownership of a value, it's declaring: "I am responsible for this data now." This explicitness eliminates entire categories of bugs that plague C++ and even garbage-collected languages. Data races? Gone at compile time. Use-after-free? Impossible.

What surprised me most is how these lessons transferred back to other languages. I now write better Python and JavaScript because I think about who "owns" a piece of data, even when the language doesn't enforce it. Rust didn't just make me a better Rust programmer — it made me a better **programmer**.`,
    authorId: 3,
    tags: ['rust', 'devops', 'webdev'],
    createdAt: '2024-07-03T14:30:00Z',
    likes: 237,
    commentCount: 34,
    coverImage: 'https://picsum.photos/seed/post2/800/400',
  },
  {
    id: 3,
    title: 'Building a RAG Pipeline with Python: From Zero to Production',
    excerpt: 'Retrieval-Augmented Generation is transforming how we build AI applications. Here\'s a practical guide to building a production-ready RAG pipeline.',
    content: `Retrieval-Augmented Generation (RAG) has become the go-to architecture for building AI applications that need to work with custom data. Instead of fine-tuning a model on your documents, you retrieve relevant chunks at query time and feed them as context. The result? Accurate, up-to-date responses without the cost of retraining.

The core pipeline is straightforward: **ingest** your documents, **chunk** them into meaningful segments, generate **embeddings** using a model like OpenAI's text-embedding-3-small, store them in a **vector database** (I recommend Pinecone or ChromaDB for starting out), and then at query time, retrieve the top-k relevant chunks and pass them to your LLM with a carefully crafted prompt.

Where most tutorials stop is where production begins. You need to handle **chunking strategies** (semantic chunking beats naive splitting), implement **hybrid search** (combining vector similarity with keyword matching), add **metadata filtering**, and build evaluation pipelines to measure retrieval quality. I've open-sourced a template that covers all of this — link in the comments.`,
    authorId: 4,
    tags: ['python', 'ai', 'devops'],
    createdAt: '2024-08-18T10:15:00Z',
    likes: 312,
    commentCount: 41,
    coverImage: 'https://picsum.photos/seed/post3/800/400',
  },
  {
    id: 4,
    title: 'CSS Grid Areas: The Layout Superpower You\'re Not Using',
    excerpt: 'Forget wrestling with flexbox for page layouts. CSS Grid template areas give you a visual, intuitive way to build complex layouts in minutes.',
    content: `I see developers reaching for flexbox for everything, including full page layouts. While flexbox is incredible for one-dimensional alignment, CSS Grid was literally designed for two-dimensional layouts. And \`grid-template-areas\` is its most underrated feature.

Imagine defining your layout like an ASCII art diagram:
\`\`\`css
grid-template-areas:
  "header  header  header"
  "sidebar content aside"
  "footer  footer  footer";
\`\`\`
That's it. Your layout is now **visual** in your code. Each child element just needs \`grid-area: header;\` or \`grid-area: sidebar;\`, and it snaps into place. Responsive design becomes trivial — just redefine the template areas in a media query.

The real magic happens when you combine areas with \`grid-template-columns: 250px 1fr 200px\` and \`grid-template-rows: auto 1fr auto\`. You get pixel-perfect control over your layout with code that reads like a blueprint. I've refactored entire dashboard layouts from 200 lines of nested flexbox to 30 lines of Grid, and the result is more maintainable every time.`,
    authorId: 2,
    tags: ['css', 'webdev', 'javascript'],
    createdAt: '2024-09-05T08:45:00Z',
    likes: 89,
    commentCount: 12,
    coverImage: 'https://picsum.photos/seed/post4/800/400',
  },
  {
    id: 5,
    title: 'TypeScript Generics Demystified: From Confusion to Confidence',
    excerpt: 'Generics are TypeScript\'s most powerful feature — and its most confusing. This guide will take you from "what is T?" to writing generic utilities like a pro.',
    content: `If you've ever stared at a TypeScript type signature like \`<T extends Record<string, unknown>, K extends keyof T>\` and felt your brain short-circuit, you're not alone. Generics are the feature that separates TypeScript beginners from TypeScript practitioners, but they don't have to be intimidating.

Think of generics as **type variables** — placeholders that get filled in when the function is called. When you write \`function identity<T>(arg: T): T\`, you're saying: "I don't know what type this will be yet, but whatever goes in will also come out." The compiler then **infers** T from usage. Call \`identity("hello")\` and T becomes \`string\`. Call \`identity(42)\` and T becomes \`number\`. No manual type annotations needed.

Where generics truly shine is in **constraints** and **conditional types**. Adding \`extends\` lets you narrow what T can be: \`<T extends { id: string }>\` means "T must have an id property." Conditional types like \`T extends string ? uppercase : T\` let you transform types based on conditions. Combine these with mapped types and you can build utilities like \`DeepPartial<T>\`, \`PickByValue<T, V>\`, or even type-safe event emitters that autocomplete event names and payload types.`,
    authorId: 1,
    tags: ['typescript', 'javascript', 'webdev'],
    createdAt: '2024-10-11T16:00:00Z',
    likes: 198,
    commentCount: 27,
    coverImage: 'https://picsum.photos/seed/post5/800/400',
  },
  {
    id: 6,
    title: 'Node.js Performance: 7 Mistakes That Are Slowing Your API',
    excerpt: 'Your Node.js API could be 10x faster. These common performance anti-patterns are easy to introduce and surprisingly impactful to fix.',
    content: `After profiling dozens of production Node.js applications, I keep finding the same performance killers. The good news? Most are easy to fix once you know what to look for. Here are the seven most common culprits I encounter.

**Mistake #1: Synchronous operations in request handlers.** Every \`fs.readFileSync\` or \`JSON.parse\` of a massive payload blocks the event loop for every concurrent request. Use streaming parsers and async I/O religiously. **Mistake #2: Not using connection pooling.** Creating a new database connection per request adds 20-50ms of latency each time. Use a pool. **Mistake #3: Missing response compression.** Adding \`compression()\` middleware can reduce payload sizes by 70-90%. **Mistake #4: N+1 query patterns.** Fetching a list and then querying for each item's details individually is the #1 cause of slow endpoints.

**Mistake #5: Ignoring memory leaks.** Event listeners that never get removed, growing caches without eviction, closures holding references to large objects. Use \`--inspect\` and Chrome DevTools to take heap snapshots regularly. **Mistake #6: Not leveraging worker threads for CPU-intensive work.** Image processing, PDF generation, data transformation — these should never run on the main thread. **Mistake #7: Skipping HTTP caching headers.** A well-placed \`Cache-Control\` or \`ETag\` header can eliminate redundant work entirely.`,
    authorId: 1,
    tags: ['node', 'javascript', 'devops'],
    createdAt: '2024-11-22T11:30:00Z',
    likes: 276,
    commentCount: 33,
    coverImage: 'https://picsum.photos/seed/post6/800/400',
  },
  {
    id: 7,
    title: 'WebAssembly in 2025: The State of the Art',
    excerpt: 'WebAssembly has grown far beyond the browser. From edge computing to plugin systems, here\'s where Wasm stands today and where it\'s headed.',
    content: `WebAssembly started as a way to run C++ in the browser, but in 2025 it's become something far more interesting: a **universal runtime**. With WASI (WebAssembly System Interface) maturing and the Component Model gaining traction, Wasm is now a credible choice for server-side workloads, edge functions, and plugin architectures.

The browser story remains strong — frameworks like Leptos (Rust) and Blazor (.NET) deliver genuine near-native performance for compute-heavy web apps. But the real excitement is on the server. Platforms like Fermyon Spin and Fastly Compute let you deploy Wasm modules that cold-start in **microseconds** (not milliseconds — microseconds). Compare that to a container cold start of 500ms+ and you start to see why edge computing providers are betting big on Wasm.

The Component Model is the piece that ties it all together. It defines a standard way for Wasm modules to expose and consume interfaces, regardless of the source language. A Rust module can call a Go module can call a Python module, all through type-safe interfaces with zero serialization overhead. We're approaching a future where "what language is this written in?" truly doesn't matter.`,
    authorId: 3,
    tags: ['rust', 'webdev', 'javascript'],
    createdAt: '2025-01-08T13:00:00Z',
    likes: 164,
    commentCount: 22,
    coverImage: 'https://picsum.photos/seed/post7/800/400',
  },
  {
    id: 8,
    title: 'Docker Compose for Local Development: Tips from the Trenches',
    excerpt: 'Docker Compose can supercharge your local dev environment — or make it a nightmare. Here are hard-won tips for getting it right.',
    content: `Docker Compose is the unsung hero of local development. A single \`docker compose up\` and your entire stack — database, cache, message queue, API — springs to life. But I've seen too many teams struggle with slow builds, stale volumes, and networking headaches. Here's what I've learned the hard way.

**Use \`watch\` mode.** Docker Compose 2.22+ supports \`develop.watch\` in your compose file. It syncs file changes into containers without rebuilding, giving you hot-reload for any language. Combine it with \`rebuild\` triggers for dependency changes (like package.json) and your feedback loop stays tight. **Layer your Dockerfiles aggressively.** Dependencies change less often than source code — install them in an early layer and your rebuilds go from 2 minutes to 5 seconds.

**Named volumes for data persistence, bind mounts for source code.** This is the golden rule. Your Postgres data should survive \`docker compose down\` via a named volume. Your application source should be a bind mount so edits are instant. And please, add \`healthcheck\` definitions to your services. Without them, your API container will crash on startup because it tried to connect to a database that isn't ready yet.`,
    authorId: 5,
    tags: ['devops', 'node', 'webdev'],
    createdAt: '2025-01-25T07:15:00Z',
    likes: 203,
    commentCount: 29,
    coverImage: 'https://picsum.photos/seed/post8/800/400',
  },
  {
    id: 9,
    title: 'React Server Components: What They Actually Change',
    excerpt: 'Server Components aren\'t just a performance optimization — they represent a fundamental shift in how we architect React applications.',
    content: `React Server Components (RSCs) have been the most discussed and least understood feature in the React ecosystem. After building two production apps with them, I want to cut through the noise and explain what actually changes in practice.

The core idea is simple: some components run **only on the server**. They can directly access databases, read files, and call internal APIs — without shipping any of that code to the client. The result is smaller bundles and faster initial loads. But the real shift is architectural: RSCs let you colocate data fetching with the component that needs it, without client-side waterfalls. A \`ProductPage\` component can \`await db.query('SELECT * FROM products WHERE id = ?', [id])\` right in its body. No useEffect, no loading states, no API routes.

The mental model takes getting used to. You need to think about the **server/client boundary** explicitly. State, event handlers, and browser APIs live in \`'use client'\` components. Data fetching, heavy computation, and sensitive logic live in Server Components. The boundary between them is where props flow from server to client. Once this clicks, you'll find yourself writing less code, fewer API endpoints, and shipping dramatically less JavaScript to users.`,
    authorId: 2,
    tags: ['react', 'javascript', 'typescript'],
    createdAt: '2025-02-14T15:45:00Z',
    likes: 321,
    commentCount: 45,
    coverImage: 'https://picsum.photos/seed/post9/800/400',
  },
  {
    id: 10,
    title: 'Python Type Hints in Practice: Beyond the Basics',
    excerpt: 'Python\'s type system has matured dramatically. Here\'s how to leverage Protocol, TypeGuard, and advanced generics in real-world codebases.',
    content: `Python type hints started as simple annotations — \`def greet(name: str) -> str\` — but the type system has evolved into something genuinely powerful. With Python 3.12's type parameter syntax and tools like Pyright reaching feature parity with TypeScript's type checker, it's time to level up your type game.

**Protocols** are Python's answer to structural typing (aka "duck typing with type safety"). Instead of forcing classes to inherit from an abstract base class, you define a Protocol that describes the interface: any class with matching methods and attributes satisfies it. This is huge for testing — your mock objects automatically satisfy protocols without explicit inheritance. **TypeGuard** functions let you write custom type narrowing: \`def is_admin(user: User) -> TypeGuard[AdminUser]\` tells the type checker that after this check, the variable can be treated as the narrower type.

The game-changer for library authors is **ParamSpec** and **Concatenate**. These let you write decorators that perfectly preserve the signature of the decorated function. No more losing autocomplete and type checking when you wrap a function. Combined with \`@overload\` for functions with different return types based on input, you can provide a developer experience that rivals statically-typed languages while keeping Python's expressiveness.`,
    authorId: 4,
    tags: ['python', 'typescript', 'ai'],
    createdAt: '2025-03-01T10:00:00Z',
    likes: 145,
    commentCount: 19,
    coverImage: 'https://picsum.photos/seed/post10/800/400',
  },
  {
    id: 11,
    title: 'The Art of Code Review: How to Give Feedback That Ships Better Software',
    excerpt: 'Code review isn\'t about catching bugs — it\'s about building shared understanding. Here\'s how to make reviews that your teammates actually appreciate.',
    content: `After thousands of code reviews across multiple teams, I've learned that the technical feedback is often the least important part. The best code reviews build **shared context**, spread knowledge across the team, and create a culture where people feel safe to experiment and learn.

Start with the "what and why" before the "how." Before nitpicking variable names, make sure you understand the author's intent. Ask questions like "What alternatives did you consider?" or "How does this interact with the caching layer?" These questions often reveal architectural insights that benefit the whole team. When you do suggest changes, explain your reasoning. "Consider using a Map here" is less helpful than "A Map would give us O(1) lookups instead of O(n) — with 10K items in production, this loop could take 50ms."

**Automate the trivial stuff.** If you're leaving comments about formatting, import order, or naming conventions, your linter is misconfigured. Human reviewers should focus on logic, architecture, edge cases, and readability — things that tools can't catch. And remember: approval isn't about perfection. If the code works, is tested, and doesn't introduce architectural problems, ship it. You can always iterate. Blocking PRs for stylistic preferences is the fastest way to kill team velocity.`,
    authorId: 1,
    tags: ['devops', 'webdev', 'javascript'],
    createdAt: '2025-04-10T12:30:00Z',
    likes: 189,
    commentCount: 38,
    coverImage: 'https://picsum.photos/seed/post11/800/400',
  },
  {
    id: 12,
    title: 'Building Type-Safe APIs with tRPC and React Query',
    excerpt: 'End-to-end type safety from database to UI is no longer a dream. tRPC and React Query make it a reality with zero code generation.',
    content: `If you're building a full-stack TypeScript application and you're still writing REST endpoints with manual type definitions on both sides, you're doing unnecessary work. tRPC eliminates the API layer by letting your frontend **directly call backend functions** with full type safety — no schemas to sync, no code generation step, no runtime validation surprises.

Here's the workflow: define a router on the server with procedures like \`getUser\`, \`createPost\`, \`updateProfile\`. Each procedure has an input schema (validated with Zod) and a resolver function. On the client, you import the router's type and call \`trpc.getUser.useQuery({ id: 1 })\`. TypeScript knows the input shape, the output shape, and the error types. Rename a field on the backend? The frontend gets a compile error instantly. Add a required field to the input? Every call site is flagged.

The integration with React Query (via \`@trpc/react-query\`) gives you the full power of TanStack Query — caching, background refetching, optimistic updates, infinite queries — all with type safety baked in. I've shipped three production apps with this stack and the developer experience is unmatched. The compile-time safety net catches bugs that would otherwise surface as runtime 500 errors in production.`,
    authorId: 5,
    tags: ['typescript', 'react', 'node'],
    createdAt: '2025-05-15T09:20:00Z',
    likes: 256,
    commentCount: 31,
    coverImage: 'https://picsum.photos/seed/post12/800/400',
  },
];
