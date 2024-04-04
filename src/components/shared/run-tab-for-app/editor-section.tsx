import React, {PropsWithChildren} from 'react';
import {Editor, EditorSectionFooter, EditorSectionHeader} from './editor-section-components';
import './editor-section.css';
import {cn} from '@/lib/utils';

type Props = {
  value: string
  onChange: (text: string) => void
} & PropsWithChildren

/**
 * this component is a wrapper for editor section
 * @param children
 * @constructor
 */
export default function EditorSection({children, onChange, value}: Props) {
  return (
    <div
      className={cn(
        " col-span-12 flex h-fit overflow-hidden bg-card  p-4 lg:col-span-6 lg:h-full xl:col-span-8",
      )}
    >
      <div className="flex h-fit divide-x  overflow-hidden rounded-2xl border shadow-2xl lg:h-full">
        {/* editor section*/}
        <div className="h-fit overflow-hidden lg:h-full">
          {/* editor header like download and save and workspace */}
          <EditorSectionHeader />
          {/* editor */}
          <Editor
              value={value}
              onChange={onChange}
          />
          {/*editor footer contains number of words or char ,...*/}
          <EditorSectionFooter />
        </div>
        {/* history section*/}
        {children}
      </div>
    </div>
  );
}
