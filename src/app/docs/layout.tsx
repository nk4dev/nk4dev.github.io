import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '../../lib/source';
import 'fumadocs-ui/style.css';
import './globals.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree as any}
      nav={{
        title: 'nk4dev docs',
        url: '/docs',
      }}
    >
      {children}
    </DocsLayout>
  );
}
