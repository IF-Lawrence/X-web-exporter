import { Fragment } from 'preact';
import { Signal, useSignal } from '@preact/signals';
import { LogLine, logLinesSignal } from '@/utils/logger';

const colors = {
  info: 'text-base-content',
  warn: 'text-warning',
  error: 'text-error',
};

type LogsProps = {
  lines: Signal<LogLine[]>;
};

function Logs({ lines }: LogsProps) {
  const reversed = lines.value.slice().reverse();

  return (
    <pre class="leading-none text-xs max-h-48 bg-base-200 overflow-y-scroll m-0 px-1 py-2.5 no-scrollbar rounded-box-half">
      {reversed.map((line) => (
        <span class={colors[line.type]} key={line.index}>
          #{line.index} {line.line}
          {'\n'}
        </span>
      ))}
    </pre>
  );
}

export function RuntimeLogsPanel() {
  const isExpanded = useSignal(false);

  return (
    <Fragment>
      <div class="p-1">
        <div class="collapse collapse-arrow bg-base-200">
          <input
            type="checkbox"
            checked={isExpanded.value}
            onChange={(e) => (isExpanded.value = (e.target as HTMLInputElement).checked)}
          />
          <div class="collapse-title flex items-center pr-4 min-h-12 py-3">
            <span class="font-medium uppercase tracking-widest text-xs opacity-70">
              Runtime Logs
            </span>
          </div>
          <div class="collapse-content p-0">
            <Logs lines={logLinesSignal} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
