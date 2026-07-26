import clsx from 'clsx';
import { useState } from 'react';
import ShikiHighlighter from 'react-shiki';
import {
  FileJsIcon,
  FilePyIcon,
  TerminalIcon,
  CodeIcon,
} from '@phosphor-icons/react';
import Loader from '@/components/loader';
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

const statusMap = {
  0: 'bg-palette-dark-blue',
  200: 'bg-[#28a745]',
  301: 'bg-[#28a745]',
  302: 'bg-[#28a745]',
  304: 'bg-[#28a745]',
  400: 'bg-[#ffc107]',
  401: 'bg-[#ffc107]',
  403: 'bg-[#ffc107]',
  404: 'bg-[#ffc107]',
  405: 'bg-[#ffc107]',
  408: 'bg-[#ffc107]',
  409: 'bg-[#ffc107]',
  429: 'bg-[#ffc107]',
  500: 'bg-[#dc3545]',
  502: 'bg-[#dc3545]',
  503: 'bg-[#dc3545]',
  504: 'bg-[#dc3545]',
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

        {current ? (
          <ShikiHighlighter
            className={clsx(
              props.codeClassName,
              'overflow-x-scroll!',
              'text-sm',
              'rounded-none!',
            )}
            language={current.language}
            theme={theme}
            showLineNumbers={true}
            startingLineNumber={1}
          >
            {current.code}
          </ShikiHighlighter>
        ) : (
          <div
            className={clsx(
              'min-h-32',
              'flex',
              'items-center',
              'justify-center',
            )}
          >
            <Loader />
          </div>
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
                <span
                  className={clsx(
                    props.response.status in statusMap
                      ? statusMap[props.response.status]
                      : statusMap[0],
                    'w-3',
                    'h-3',
                    'rounded-full',
                  )}
                ></span>
                &nbsp;&nbsp;Response&nbsp;({props.response.status}&nbsp;
                {props.response.statusText})
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
            {JSON.stringify(props.response.json, null, 2).trim()}
          </ShikiHighlighter>
        </div>
      )}
    </div>
  );
}
