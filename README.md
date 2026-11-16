# Sticky wall · 便签墙

A wall of coloured sticky notes for DeepSeek Harness. It opens from its own row in the sidebar, below **更多 / More**.

## Use

- Click **便签墙** (Sticky wall) in the sidebar. The wall fills the main column.
- Write a line in the yellow box at the top, pick one of the six paper colours, then press **添加到墙上** (Add to wall) or `⌘/Ctrl + Enter`.
- Each note shows a category, its text, and a relative time. Click the pencil in a note's corner to edit the category and the text; **完成** (Done) leaves the edit state.
- **删除** (Delete) removes the note inside the editor. A **撤销** (Undo) button then stays for 8 seconds.
- The search box filters notes by text and category as you type.
- Notes save as you type.

New notes start with the category `灵感` (`Idea`); rename it in the editor.

## Where the data lives

Notes are stored in this browser profile's `localStorage`:

| Key | Contents |
| --- | --- |
| `dsh.sticky-wall.v1` | the notes: `{ id, text, category, palette, createdAt, updatedAt }` |
| `dsh.sticky-wall.v1.broken` | a copy of the stored value if it could not be parsed |

The first version of this bundle kept notes under `dsh.sticky-notes.v1`; the wall imports those once, when no wall data exists yet.

Consequences:

- Notes never enter the session log, so the agent cannot read or write them.
- Notes stay on this machine and this browser profile; clearing site data or switching profiles loses them.
- Turning the bundle off hides the wall and keeps the stored notes.
- If the browser refuses a write, the wall shows a warning instead of pretending the note was saved.

## Implementation notes

- The sidebar row registers in `sidebar.panellist` with the id `sticky-wall`; the panel registers in `main` under the same key. The sidebar owns the row button, its label, and the selected state; the plugin supplies the icon (`{ size, active }`).
- Note paper colours and ink colours are fixed, like real sticky notes, so a note reads the same in a light or dark theme. The header, search box, count, and warning line use `--dsw-alias-*` theme tokens.
- All visible strings come from the Client locale service (`zh` / `en`).
- The Host half (`index.js`) only exists so the bundle has a Loader row.
