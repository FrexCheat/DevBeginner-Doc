# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code or code review in this repository.

## Repository Overview

### Introduction

DevBeginner-Doc is a comprehensive programming tutorial website built with Next.js and Fumadocs, specifically designed for programming beginners, particularly university freshmen in computer science or software engineering majors with limited prior programming experience.

### Repository Structure

```
DevBeginner-Doc/
├── .github/             # Github actions workflow files
├── app/                 # Next.js application files
├── components/          # Custom UI components which are used in pages or docs
├── content/docs/        # Documentation content (MDX files)
├── hooks/               # React/Next.js tsx files used for hook
├── lib/                 # Utility libraries
├── mdx-components.tsx/  # Register components for all mdx files of fumadocs
├── public/              # Public static sources such as logo and ico of the site
├── source.config.ts     # Fumadocs source config
└── styles/              # Styles files of the site
```

The repository aims to provide a well-structured learning path for beginners, reducing the learning curve and helping students avoid common pitfalls when starting their programming journey.

## Technical Stack

- Framework: Next.js
- Documentation System: Fumadocs
- Content Format: MDX (Markdown with JSX components)
- Styling: TailwindCSS
- Language: TypeScript(TSX)

## Document Content Requirements

- Prohibit Fumadocs MDX syntax errors
- Prohibit english spelling errors
- Avoid grammatical errors as much as possible
- Keep up to date with the latest information as much as possible

## Key Features

1. Beginner-Friendly: Written with beginners in mind, with step-by-step instructions
2. Comprehensive Screenshots: Extensive visual guides for environment setup
5. Programming Contest Knowledge: Information about programming competitions (ICPC, CCPC, etc.)

## Target Audience

- University freshmen in computer science or software engineering majors
- Self-taught programming beginners
- Students preparing for programming competitions
- Anyone seeking a systematic approach to learning programming fundamentals

## Development Workflow

1. Install dependencies: `pnpm install`
2. Start development: `pnpm run dev` (starts docs in dev environment)
3. Start docs: `pnpm run start` (starts docs in normal environment)
4. Build for production: `pnpm run build`

## Git Workflow

### Commit Types

- `feat`: New documentation files not previously encountered
- `chore`: Modify content in existing documents or perform routine maintenance
- `refactor`: Code refactoring without functional changes
- `build`: Modify code related to the build process
- `ci`: Some works for github workflow