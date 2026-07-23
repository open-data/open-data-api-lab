import clsx from 'clsx';
import { useState } from 'react';
import ShikiHighlighter from 'react-shiki';
import {
  FileJsIcon,
  FilePyIcon,
  TerminalIcon,
  CodeIcon,
} from '@phosphor-icons/react';
import {
  CodeTabStyle,
  CodeTabButtonStyle,
  CodeTabContainerStyle,
} from '@/utils/classNames';

const iconsMap = {
  javascript: FileJsIcon,
  python: FilePyIcon,
  bash: TerminalIcon,
};

const themeMap = {
  javascript: 'tokyo-night',
  python: 'one-dark-pro',
  bash: 'dracula',
};

export default function CodeTabs(props) {
  const examples = props.examples;

  if (!examples) {
    return <div className={clsx(CodeTabStyle)}></div>;
  }

  const [active, setActive] = useState(examples[0]?.language);
  const current = examples.find((_example) => _example.language == active);
  const theme =
    current.language in themeMap ? themeMap[current.language] : 'github-dark';

  async function copyCode() {
    if (current) {
      await navigator.clipboard.writeText(current.code);
    }
  }

  return (
    <div className={clsx(CodeTabStyle, props.className)}>
      <h2 className={clsx('text-sm', 'uppercase', 'ml-2')}>{props.label}</h2>
      <div className={CodeTabContainerStyle}>
        <div className={clsx('flex', 'items-center', 'bg-ui-dark-bg')}>
          <div className={clsx('flex', 'flex-1')}>
            {examples.map((_example) => {
              const Icon =
                _example.language in iconsMap
                  ? iconsMap[_example.language]
                  : CodeIcon;
              return (
                <button
                  key={_example.language}
                  onClick={() => setActive(_example.language)}
                  className={clsx(
                    CodeTabButtonStyle,
                    active == _example.language
                      ? 'bg-ui-btn-bg-active! pointer-default! pointer-events-none!'
                      : '',
                  )}
                  tabIndex={active == _example.language ? '-1' : '0'}
                >
                  <span className={clsx('inline')}>
                    <Icon weight={'fill'} size={16} />
                  </span>
                  &nbsp;
                  <span className={clsx('inline')}>{_example.label}</span>
                </button>
              );
            })}
          </div>

          <button onClick={copyCode} className={clsx(CodeTabButtonStyle)}>
            Copy
          </button>
        </div>

        {current && (
          <ShikiHighlighter
            className={clsx('overflow-x-scroll!', 'text-sm', 'rounded-none!')}
            language={current.language}
            theme={theme}
            showLineNumbers={true}
            startingLineNumber={1}
          >
            {current.code}
          </ShikiHighlighter>
        )}
      </div>

      {props.response && (
        <div className={clsx(CodeTabContainerStyle, 'mt-4')}>
          <div className={clsx('flex', 'items-center', 'bg-ui-dark-bg')}>
            <div className={clsx('flex', 'flex-1')}>
              <span
                className={clsx(
                  CodeTabButtonStyle,
                  'block',
                  'w-full',
                  'bg-ui-btn-bg-active!',
                  'pointer-default!',
                  'pointer-events-none!',
                )}
              >
                Response
              </span>
            </div>
          </div>
          <ShikiHighlighter
            className={clsx('overflow-x-scroll!', 'text-sm', 'rounded-none!')}
            language={'JSON'}
            theme={theme}
            showLineNumbers={false}
            startingLineNumber={1}
          >
            {JSON.stringify(props.response, null, 2).trim()}
          </ShikiHighlighter>
        </div>
      )}
    </div>
  );
}
