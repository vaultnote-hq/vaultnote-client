# Vaultnote - Open-Source Client for Auditing

**Privacy-first, Zero-Knowledge Notepad with Self-Destructing Notes.**

This repository contains the open-source **client-side code** for Vaultnote. Its primary purpose is to provide full transparency and allow anyone to audit our encryption and security practices. It serves as a public proof of our zero-knowledge architecture.

**This repository is NOT intended for self-hosting.** It does not contain the backend server logic required to store notes. For the fully managed, secure, and Swiss-hosted service, please visit [vaultnote.net](https://vaultnote.net).

## 🛡️ Zero-Knowledge Architecture & Encryption

Transparency is our core principle. Here is exactly how we ensure that your data remains private:

1.  **Note Creation**: When you write a note, a strong, random encryption key (`AES-256-GCM`) is generated directly in your browser.
2.  **Client-Side Encryption**: The content of your note is encrypted with this key before it ever leaves your device. You can audit this logic in the `/lib/crypto.ts` file.
3.  **Data Transmission**: Only the **encrypted ciphertext** is sent to our server for storage. The encryption key is **never** sent to the server.
4.  **URL Fragment**: The encryption key is appended to the shareable URL after a hash (`#`). This part of the URL, known as the URL fragment, is never transmitted to the server by the browser.
5.  **Note Retrieval & Decryption**: When someone opens the share link, the browser fetches the encrypted ciphertext from our server. The decryption key is then taken from the URL fragment (which is only visible to the client) to decrypt the note locally.

**The result: Our server stores only encrypted gibberish and has no way of reading your notes.**

## 🚀 Auditing the Code

This project is a standard Next.js application. You can explore the code to verify our claims.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 20.x or higher)
-   [pnpm](https://pnpm.io/)

### Local Setup for Inspection

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/vaultnote-hq/vaultnote-client.git
    cd vaultnote-client
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

3.  **Run the development server:**
    ```sh
    pnpm dev
    ```

This will start a local development server. Note that functionality requiring a backend (like saving notes) will not work, but you can inspect all client-side components and logic.

## 🛠️ Core Technologies

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
-   **Rich Text Editor**: [TipTap](https://tiptap.dev/)

## 📄 License

This project is released under the **MIT License**. This allows for maximum transparency and review. You are free to use snippets and learn from the code, in accordance with the license terms. See the [LICENSE.md](LICENSE.md) file for the full legal text.
