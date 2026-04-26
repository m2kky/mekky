'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './Guide.module.css';

interface GuideContentProps {
    content: string;
}

export default function GuideContent({ content }: GuideContentProps) {
    const isArabic = /[\u0600-\u06FF]/.test(content.slice(0, 500));
    
    // Inject TOC heading at the start of the content (after the first h1)
    const contentWithToc = content.replace(/^#\s+(.*)\n/, `# $1\n\n## جدول المحتويات\n\n`);

    return (
        <article className={styles.guideContainer} dir={isArabic ? "rtl" : "ltr"}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, [remarkToc, { heading: 'جدول المحتويات', tight: true, maxDepth: 3 }]]}
                rehypePlugins={[rehypeSlug]}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                    margin: '0',
                                    padding: '1.5rem',
                                    backgroundColor: 'transparent', // Let's use the container's pre background
                                }}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {contentWithToc}
            </ReactMarkdown>
        </article>
    );
}
