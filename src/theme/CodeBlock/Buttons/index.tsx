import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import WordWrapButton from '@theme/CodeBlock/Buttons/WordWrapButton';
import CopyButton from '@theme/CodeBlock/Buttons/CopyButton';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/CodeBlock/Buttons';

import styles from './styles.module.css';

// ponytail: only languages Compiler Explorer (godbolt.org) actually runs get the button
// https://godbolt.org/api/languages
const GODBOLT_LANG: Record<string, string> = {
  cpp: 'c++',
  c: 'c',
  java: 'java',
  python: 'python',
  py: 'python',
  javascript: 'javascript',
  js: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  csharp: 'csharp',
  ruby: 'ruby',
  go: 'go',
  kotlin: 'kotlin',
  swift: 'swift',
  rust: 'rust',
};

// Creates a real godbolt.org/z/xxx short link carrying the full source, via
// Compiler Explorer's public shortener API, then redirects the tab already
// opened synchronously (so browsers don't block it as a popup).
async function openInGodbolt(language: string, source: string, tab: Window) {
  try {
    const res = await fetch('https://godbolt.org/api/shortener', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        sessions: [{id: 1, language, source, compilers: [], executors: []}],
      }),
    });
    const data: {url?: string} = await res.json();
    if (data.url) {
      tab.location.href = data.url;
      return;
    }
  } catch {
    // fall through to closing the placeholder tab below
  }
  tab.close();
}

function useOpenInEditor(): {editorLang: string; code: string} | null {
  const {metadata} = useCodeBlockContext();
  const editorLang = GODBOLT_LANG[metadata.language ?? ''];
  if (!editorLang || !metadata.code.trim()) return null;
  return {editorLang, code: metadata.code};
}

function OpenInEditorButton(): ReactNode {
  const target = useOpenInEditor();
  if (!target) return null;
  return (
    <button
      type="button"
      className={clsx('clean-btn', styles.openInEditorButton)}
      title="Ouvrir dans Compiler Explorer"
      aria-label="Ouvrir ce code dans Compiler Explorer"
      onClick={() => {
        // must open synchronously in the click handler, URL filled in once ready.
        // NOTE: 'noopener' would make window.open() return null - can't use it here.
        const tab = window.open('', '_blank');
        if (tab) void openInGodbolt(target.editorLang, target.code, tab);
      }}>
      <IconExternalLink width={13} height={13} />
    </button>
  );
}

export default function CodeBlockButtons({className}: Props): ReactNode {
  return (
    <BrowserOnly>
      {() => (
        <div className={clsx(className, styles.buttonGroup)}>
          <OpenInEditorButton />
          <WordWrapButton />
          <CopyButton />
        </div>
      )}
    </BrowserOnly>
  );
}
