---
name: "code-review"
description: "Performs comprehensive code review including security checks, performance optimization, and naming conventions. Invoke when user asks for a code review."
---

# Code Review Expert

This skill guides the AI to perform a structured code review focusing on security, performance, and naming conventions.

## Steps

1. **Security Check**
   - Identify potential security vulnerabilities (e.g., injection, XSS, insecure dependencies).
   - Verify input validation and sanitization.
   - Check for hardcoded secrets or sensitive data.

2. **Performance Optimization**
   - Analyze code for potential bottlenecks (e.g., N+1 queries, expensive loops).
   - Suggest more efficient algorithms or data structures.
   - Identify memory leaks or resource management issues.

3. **Naming Convention Review**
   - Ensure variable, function, and class names follow the project's coding style (e.g., camelCase, snake_case).
   - Check for descriptive and meaningful names.
   - Highlight ambiguous or misleading names.

## Usage

When the user requests a code review, follow the steps above sequentially and provide a detailed report for each section.
