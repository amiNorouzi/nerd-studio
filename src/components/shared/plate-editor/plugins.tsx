import { withProps } from "@udecode/cn";
import {
  createPlugins,
  RenderAfterEditable,
  PlateLeaf,
  createPluginFactory,
  createDeserializeHtmlPlugin,
  isSelectionAtBlockStart,
  someNode,
  isBlockAboveEmpty,
  setNodes,
  isBlock,
} from "@udecode/plate-common";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  KEYS_HEADING,
} from "@udecode/plate-heading";
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from "@udecode/plate-code-block";
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import {
  createImagePlugin,
  ELEMENT_IMAGE,
  createMediaEmbedPlugin,
  ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  createMentionPlugin,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
} from "@udecode/plate-mention";
import {
  createTablePlugin,
  ELEMENT_TABLE,
  ELEMENT_TR,
  ELEMENT_TD,
  ELEMENT_TH,
} from "@udecode/plate-table";
import {
  createListPlugin,
  createTodoListPlugin,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  TTodoListItemElement,
} from "@udecode/plate-list";
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
} from "@udecode/plate-excalidraw";
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createCodePlugin,
  MARK_CODE,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT,
} from "@udecode/plate-basic-marks";
import {
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
  createFontFamilyPlugin,
  createFontWeightPlugin,
  MARK_FONT_SIZE,
} from "@udecode/plate-font";
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { createIndentPlugin } from "@udecode/plate-indent";
import {
  createIndentListPlugin,
  KEY_LIST_STYLE_TYPE,
  ListStyleType,
  toggleIndentList,
} from "@udecode/plate-indent-list";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createComboboxPlugin } from "@udecode/plate-combobox";
import { createEmojiPlugin } from "@udecode/plate-emoji";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import {
  createSelectOnBackspacePlugin,
  createDeletePlugin,
} from "@udecode/plate-select";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { createCommentsPlugin, MARK_COMMENT } from "@udecode/plate-comments";
import {
  AutoformatRule,
  createAutoformatPlugin,
} from "@udecode/plate-autoformat";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createJuicePlugin } from "@udecode/plate-juice";

import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { ExcalidrawElement } from "@/components/plate-ui/excalidraw-element";
import { HrElement } from "@/components/plate-ui/hr-element";
import { ImageElement } from "@/components/plate-ui/image-element";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { MentionElement } from "@/components/plate-ui/mention-element";
import { MentionInputElement } from "@/components/plate-ui/mention-input-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { TableElement } from "@/components/plate-ui/table-element";
import { TableRowElement } from "@/components/plate-ui/table-row-element";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/plate-ui/table-cell-element";
import { TodoListElement } from "@/components/plate-ui/todo-list-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { CommentLeaf } from "@/components/plate-ui/comment-leaf";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import { EmojiCombobox } from "@/components/plate-ui/emoji-combobox";
import { UndoRedoComponent } from "@/components/plate-ui/undo-redo";
import { ListElement } from "@/components/plate-ui/list-element";
import { createTogglePlugin, ELEMENT_TOGGLE } from "@udecode/plate-toggle";
import { ToggleElement } from "@/components/plate-ui/toggle-element";

export const indentPlugin = {
  inject: {
    props: {
      validTypes: [
        // ELEMENT_PARAGRAPH,
        // ELEMENT_H1,
        // ELEMENT_H2,
        // ELEMENT_H3,
        // ELEMENT_H4,
        // ELEMENT_H5,
        // ELEMENT_H6,
        // ELEMENT_BLOCKQUOTE,
        // ELEMENT_CODE_BLOCK,
      ],
    },
  },
};

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

const resetBlockTypesCodeBlockRule = {
  types: [ELEMENT_CODE_BLOCK],
  defaultType: ELEMENT_PARAGRAPH,
  onReset: unwrapCodeBlock,
};

// const autoformatLists: AutoformatRule[] = [
//   {
//     mode: "block",
//     type: ELEMENT_LI,
//     match: ["* ", "- "],
//     preFormat,
//     format: editor => formatList(editor, ELEMENT_UL),
//   },
//   {
//     mode: "block",
//     type: ELEMENT_LI,
//     match: ["1. ", "1) "],
//     preFormat,
//     format: editor => formatList(editor, ELEMENT_OL),
//   },
//   {
//     mode: "block",
//     type: ELEMENT_TODO_LI,
//     match: "[] ",
//   },
//   {
//     mode: "block",
//     type: ELEMENT_TODO_LI,
//     match: "[x] ",
//     format: editor =>
//       setNodes<TTodoListItemElement>(
//         editor,
//         { type: ELEMENT_TODO_LI, checked: true },
//         {
//           match: n => isBlock(editor, n),
//         },
//       ),
//   },
// ];

const autoformatIndentLists: AutoformatRule[] = [
  {
    mode: "block",
    type: "list",
    match: ["* ", "- "],
    format: editor => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Disc,
      });
    },
  },
  {
    mode: "block",
    type: "list",
    match: ["1. ", "1) "],
    format: editor =>
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Decimal,
      }),
  },
];

const KEY_UNDO_REDO = "UNDO_REDO_KEY";

const createUndoRedoKey = createPluginFactory({
  key: KEY_UNDO_REDO,
});

const KEY_EXAMPLE = "EXAMPLE";

const createExamplePlugin = createPluginFactory({
  key: KEY_EXAMPLE,
  handlers: {
    onChange: editor => value => {
      console.info(editor, value);
    },
    onKeyDown: editor => event => {
      console.info(`You pressed ${event.key}`);
    },
  },
});

export const plugins = createPlugins(
  [
    // createExamplePlugin(),
    createListPlugin(),
    createDeserializeHtmlPlugin(),
    createUndoRedoKey(),
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createMediaEmbedPlugin(),
    createCaptionPlugin({
      options: {
        pluginKeys: [
          // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
        ],
      },
    }),
    createMentionPlugin(),
    createTablePlugin(),
    createTodoListPlugin(),
    createExcalidrawPlugin(),
    createTogglePlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createFontFamilyPlugin(),
    createFontWeightPlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_H4,
            ELEMENT_H5,
            ELEMENT_H6,
          ],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
          ],
        },
      },
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
        },
      },
    }),
    createComboboxPlugin(),
    createEmojiPlugin({
      renderAfterEditable: EmojiCombobox,
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: "mod+enter",
          },
          {
            hotkey: "mod+shift+enter",
            before: true,
          },
          {
            hotkey: "enter",
            query: {
              start: true,
              end: true,
              allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          {
            ...resetBlockTypesCommonRule,
            hotkey: "Enter",
            predicate: isBlockAboveEmpty,
          },
          {
            ...resetBlockTypesCommonRule,
            hotkey: "Backspace",
            predicate: isSelectionAtBlockStart,
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: "Enter",
            predicate: isCodeBlockEmpty,
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: "Backspace",
            predicate: isSelectionAtCodeBlockStart,
          },
        ],
      },
    }),

    // remove this plugin because with this backspace not working

    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [
            ELEMENT_IMAGE,
            ELEMENT_HR,
            ...indentPlugin.inject.props.validTypes,
          ],
        },
      },
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: "shift+enter" },
          {
            hotkey: "enter",
            query: {
              allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
            },
          },
        ],
      },
    }),
    createTabbablePlugin(),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH },
    }),
    createCommentsPlugin(),
    createAutoformatPlugin({
      options: {
        rules: [
          ...autoformatIndentLists,
          // Usage: https://platejs.org/docs/autoformat
        ],
        enableUndoOnDelete: true,
      },
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin({}),
    createJuicePlugin(),
  ],
  {
    components: withPlaceholders({
      [KEY_UNDO_REDO]: UndoRedoComponent,
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
      [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
      [ELEMENT_HR]: HrElement,
      [ELEMENT_IMAGE]: ImageElement,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
      [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
      [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
      [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
      [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
      [ELEMENT_MENTION]: MentionElement,
      [ELEMENT_MENTION_INPUT]: MentionInputElement,
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_TABLE]: TableElement,
      [ELEMENT_TR]: TableRowElement,
      [ELEMENT_TD]: TableCellElement,
      [ELEMENT_TH]: TableCellHeaderElement,
      [ELEMENT_TODO_LI]: TodoListElement,
      [ELEMENT_TOGGLE]: ToggleElement,
      [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
      [MARK_CODE]: CodeLeaf,
      [MARK_COMMENT]: CommentLeaf,
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
      [MARK_KBD]: KbdLeaf,
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
      [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
      [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
      [ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
      [ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
    }),
  },
);
