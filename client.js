window.__ModuleLoader__.load({
  id: '@local/dsh-sticky-wall',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'dsh-sticky-wall'
    const WALL_KEY = 'dsh.sticky-wall.v1'
    const LEGACY_KEY = 'dsh.sticky-notes.v1'
    const PANEL_ID = 'sticky-wall'

    /** Paper colours of the wall. Each note keeps its own paper and ink, like a real sticky note. */
    const PALETTES = [
      { key: 'yellow', bg: '#f7e2a4', ink: '#5f4712', muted: '#8a6a2a' },
      { key: 'pink', bg: '#f3b3c9', ink: '#6a2040', muted: '#83304e' },
      { key: 'sky', bg: '#afd8f2', ink: '#123f5d', muted: '#2a5e7e' },
      { key: 'mint', bg: '#a9e5d2', ink: '#12544a', muted: '#2f6f62' },
      { key: 'lavender', bg: '#cfc0f2', ink: '#382868', muted: '#54427e' },
      { key: 'cream', bg: '#f0e4c6', ink: '#59481f', muted: '#75613a' },
    ]
    const PALETTE_KEYS = PALETTES.map((item) => item.key)
    const COLOR_LABELS = {
      yellow: 'cYellow',
      pink: 'cPink',
      sky: 'cSky',
      mint: 'cMint',
      lavender: 'cLavender',
      cream: 'cCream',
    }
    const LEGACY_COLORS = { brand: 'lavender', warn: 'yellow', success: 'mint', error: 'pink' }

    const EN = {
      wall: 'Sticky wall',
      title: 'Sticky wall',
      subtitle: 'Every idea deserves a place. Notes save as you type.',
      search: 'Search notes',
      noteUnit: 'note',
      notesUnit: 'notes',
      minuteUnit: 'min ago',
      hourUnit: 'h ago',
      placeholder: 'Write your next idea…',
      add: 'Add to wall',
      addHint: '⌘/Ctrl + Enter',
      empty: 'The wall is empty. Write a line and add it to the wall.',
      noMatch: 'No note matches that search.',
      defaultCategory: 'Idea',
      categoryPlaceholder: 'Category, such as Product',
      edit: 'Edit note',
      done: 'Done',
      remove: 'Delete',
      paper: 'Paper colour',
      cYellow: 'Yellow',
      cPink: 'Pink',
      cSky: 'Sky',
      cMint: 'Mint',
      cLavender: 'Lavender',
      cCream: 'Cream',
      deleted: 'Note deleted',
      undo: 'Undo',
      storageFailed: 'This browser refused the save, so changes are lost on reload.',
      justNow: 'just now',
      yesterday: 'yesterday',
    }
    const ZH = {
      wall: '便签墙',
      title: '便签墙',
      subtitle: '每个灵感，都值得记下。便签自动保存。',
      search: '搜索便签',
      noteUnit: '张便签',
      notesUnit: '张便签',
      minuteUnit: '分钟前',
      hourUnit: '小时前',
      placeholder: '写下你的下一个灵感…',
      add: '添加到墙上',
      addHint: '⌘/Ctrl + Enter',
      empty: '墙上还没有便签。写一句，添加到墙上。',
      noMatch: '没有匹配的便签。',
      defaultCategory: '灵感',
      categoryPlaceholder: '分类，如「产品灵感」',
      edit: '编辑便签',
      done: '完成',
      remove: '删除',
      paper: '便签纸颜色',
      cYellow: '黄色',
      cPink: '粉色',
      cSky: '天蓝',
      cMint: '薄荷',
      cLavender: '薰衣草',
      cCream: '奶油',
      deleted: '已删除便签',
      undo: '撤销',
      storageFailed: '本机浏览器拒绝保存，刷新后这些改动会丢失。',
      justNow: '刚刚',
      yesterday: '昨天',
    }

    const CSS = `
.dsw-root{height:100%;overflow-y:auto;box-sizing:border-box;padding:26px 32px 44px;color:var(--dsw-alias-label-primary)}
.dsw-inner{max-width:1120px;margin:0 auto}
.dsw-head{display:flex;align-items:flex-start;gap:16px;margin-bottom:22px}
.dsw-head-text{flex:1;min-width:0}
.dsw-title{margin:0;font-size:26px;line-height:1.25;font-weight:600;letter-spacing:.01em}
.dsw-sub{margin:6px 0 0;font-size:13px;line-height:1.5;color:var(--dsw-alias-label-secondary)}
.dsw-tools{display:flex;align-items:center;gap:14px;flex:none;padding-top:2px}
.dsw-search{display:flex;align-items:center;gap:7px;height:32px;padding:0 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:9px;background:transparent;color:var(--dsw-alias-label-secondary);transition:border-color .12s ease}
.dsw-search:focus-within{border-color:var(--dsw-alias-brand-primary)}
.dsw-search input{width:150px;padding:0;border:0;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;outline:none}
.dsw-search input::placeholder{color:var(--dsw-alias-label-secondary)}
.dsw-count{font-size:12.5px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;white-space:nowrap}
.dsw-composer{position:relative;display:flex;flex-direction:column;gap:10px;padding:18px 20px 14px;border-radius:14px;box-shadow:0 1px 2px rgba(0,0,0,.06),0 8px 24px -18px rgba(0,0,0,.35)}
.dsw-composer textarea{display:block;width:100%;box-sizing:border-box;min-height:46px;max-height:180px;padding:0;border:0;background:transparent;color:inherit;font:inherit;font-size:17px;line-height:1.5;resize:none;outline:none;overflow-y:auto}
.dsw-composer textarea::placeholder{opacity:.62}
.dsw-composer-foot{display:flex;align-items:center;gap:12px}
.dsw-swatches{display:flex;align-items:center;gap:9px;flex:1;min-width:0}
.dsw-swatch{width:17px;height:17px;flex:none;padding:0;border:0;border-radius:50%;cursor:pointer;box-shadow:0 0 0 1px rgba(0,0,0,.08);transition:transform .12s ease,box-shadow .12s ease}
.dsw-swatch:hover{transform:scale(1.12)}
.dsw-swatch[aria-pressed="true"]{box-shadow:0 0 0 2px #fff,0 0 0 3.5px rgba(0,0,0,.32)}
.dsw-swatch:focus-visible{outline:2px solid rgba(0,0,0,.5);outline-offset:3px}
.dsw-hint{font-size:11.5px;opacity:.55;white-space:nowrap;font-variant-numeric:tabular-nums}
.dsw-add{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 16px;border:0;border-radius:999px;cursor:pointer;font:inherit;font-size:13px;font-weight:500;white-space:nowrap;transition:transform .12s ease,opacity .12s ease}
.dsw-add:hover{transform:translateY(-1px)}
.dsw-add:active{transform:translateY(0)}
.dsw-add:focus-visible{outline:2px solid rgba(0,0,0,.45);outline-offset:3px}
.dsw-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px;margin-top:24px;align-items:start}
.dsw-note{position:relative;display:flex;flex-direction:column;gap:12px;min-height:176px;padding:17px 19px 14px;border-radius:15px;box-shadow:0 1px 2px rgba(0,0,0,.07),0 10px 22px -20px rgba(0,0,0,.5);transition:transform .16s ease,box-shadow .16s ease}
.dsw-note:hover{transform:translateY(-2px);box-shadow:0 2px 4px rgba(0,0,0,.08),0 16px 30px -20px rgba(0,0,0,.55)}
@keyframes dsw-in{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}
.dsw-note[data-fresh="true"]{animation:dsw-in .3s ease both}
.dsw-cat{font-size:12px;line-height:1.3;letter-spacing:.02em;opacity:.72;font-weight:500}
.dsw-text{flex:1;min-height:0;font-size:19px;line-height:1.55;font-weight:500;white-space:pre-wrap;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:8;-webkit-box-orient:vertical;overflow:hidden}
.dsw-foot{display:flex;align-items:center;gap:8px;font-size:11.5px;opacity:.62}
.dsw-time{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums}
.dsw-icon-btn{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;flex:none;padding:0;border:0;border-radius:6px;background:transparent;color:inherit;opacity:.75;cursor:pointer}
.dsw-icon-btn:hover{opacity:1;background:rgba(0,0,0,.07)}
.dsw-icon-btn:focus-visible{outline:2px solid rgba(0,0,0,.45);outline-offset:1px}
.dsw-edit .dsw-cat-input{width:100%;padding:0;border:0;background:transparent;color:inherit;font:inherit;font-size:12px;letter-spacing:.02em;opacity:.8;outline:none}
.dsw-edit .dsw-cat-input::placeholder{opacity:.6}
.dsw-edit textarea{display:block;width:100%;box-sizing:border-box;flex:1;min-height:96px;padding:0;border:0;background:transparent;color:inherit;font:inherit;font-size:19px;line-height:1.55;font-weight:500;resize:none;outline:none;overflow-y:auto}
.dsw-edit-foot{display:flex;align-items:center;gap:8px;font-size:12px}
.dsw-text-btn{padding:3px 10px;border:0;border-radius:7px;background:rgba(0,0,0,.08);color:inherit;font:inherit;font-size:12px;cursor:pointer}
.dsw-text-btn:hover{background:rgba(0,0,0,.14)}
.dsw-text-btn.dsw-primary{background:rgba(0,0,0,.72);color:#fff}
.dsw-text-btn.dsw-primary:hover{background:rgba(0,0,0,.82)}
.dsw-text-btn:focus-visible{outline:2px solid rgba(0,0,0,.45);outline-offset:2px}
.dsw-state{margin:34px 8px;font-size:13.5px;line-height:1.7;color:var(--dsw-alias-label-secondary)}
.dsw-undo{position:sticky;bottom:0;display:flex;align-items:center;gap:10px;width:fit-content;margin:18px auto 0;padding:8px 10px 8px 16px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-overlay);box-shadow:0 10px 26px -12px rgba(0,0,0,.45);font-size:12.5px;color:var(--dsw-alias-label-secondary)}
.dsw-warn{margin:12px 2px 0;font-size:12px;line-height:1.5;color:var(--dsw-alias-state-warn-primary)}
`

    function newId() {
      return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    }

    function normalizeNote(item, paletteFallback) {
      if (!item || typeof item !== 'object') return null
      if (typeof item.id !== 'string' || item.id === '') return null
      const text = typeof item.text === 'string' ? item.text : ''
      if (text.trim() === '') return null
      const palette = PALETTE_KEYS.includes(item.palette)
        ? item.palette
        : PALETTE_KEYS.includes(paletteFallback)
          ? paletteFallback
          : PALETTES[0].key
      const now = Date.now()
      return {
        id: item.id,
        text,
        category: typeof item.category === 'string' ? item.category : '',
        palette,
        createdAt: typeof item.createdAt === 'number' ? item.createdAt : now,
        updatedAt: typeof item.updatedAt === 'number' ? item.updatedAt : now,
      }
    }

    /** Notes from the first version of this bundle carried a theme accent instead of a paper colour. */
    function readLegacy() {
      try {
        const raw = window.localStorage.getItem(LEGACY_KEY)
        if (!raw) return []
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        const notes = []
        for (const item of parsed) {
          const note = normalizeNote(item, LEGACY_COLORS[item && item.color])
          if (note) notes.push(note)
        }
        return notes
      } catch (error) {
        return []
      }
    }

    function readNotes() {
      try {
        const raw = window.localStorage.getItem(WALL_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            const notes = []
            for (const item of parsed) {
              const note = normalizeNote(item)
              if (note) notes.push(note)
            }
            return notes
          }
        }
      } catch (error) {
        console.warn('[sticky-wall] stored notes are unreadable', error)
        try {
          const raw = window.localStorage.getItem(WALL_KEY)
          if (raw) window.localStorage.setItem(WALL_KEY + '.broken', raw)
        } catch (inner) {
          /* nothing left to protect */
        }
        return []
      }
      return readLegacy()
    }

    function writeNotes(notes) {
      try {
        window.localStorage.setItem(WALL_KEY, JSON.stringify(notes))
        return true
      } catch (error) {
        console.warn('[sticky-wall] could not persist notes', error)
        return false
      }
    }

    function paletteOf(key) {
      return PALETTES.find((item) => item.key === key) || PALETTES[0]
    }

    function paperStyle(key) {
      const palette = paletteOf(key)
      return { background: palette.bg, color: palette.ink }
    }

    function relativeTime(stamp, t) {
      const delta = Date.now() - stamp
      if (!Number.isFinite(delta) || delta < 60 * 1000) return t('justNow')
      const minutes = Math.floor(delta / (60 * 1000))
      if (minutes < 60) return minutes + ' ' + t('minuteUnit')
      const hours = Math.floor(minutes / 60)
      if (hours < 24) return hours + ' ' + t('hourUnit')
      const date = new Date(stamp)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (date.toDateString() === yesterday.toDateString()) return t('yesterday')
      try {
        return date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })
      } catch (error) {
        return date.toISOString().slice(5, 10)
      }
    }

    function countLabel(total, t) {
      return total + ' ' + (total === 1 ? t('noteUnit') : t('notesUnit'))
    }

    function SearchGlyph() {
      return h(
        'svg',
        { width: 14, height: 14, viewBox: '0 0 16 16', 'aria-hidden': true, style: { display: 'block', flex: 'none' } },
        h('circle', { cx: 7, cy: 7, r: 4.4, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', { d: 'M10.4 10.4 14 14', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
      )
    }

    function PencilGlyph(props) {
      const size = props && props.size ? props.size : 15
      return h(
        'svg',
        { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true, style: { display: 'block' } },
        h('path', {
          d: 'M11.6 2.4a1.5 1.5 0 0 1 2.1 2.1L6 12.2l-3 1 1-3 7.6-7.8Z',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
        }),
      )
    }

    function PlusGlyph() {
      return h(
        'svg',
        { width: 12, height: 12, viewBox: '0 0 16 16', 'aria-hidden': true, style: { display: 'block' } },
        h('path', { d: 'M8 3.4v9.2M3.4 8h9.2', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' }),
      )
    }

    /** Sidebar row glyph: the wall's pencil-in-a-sheet mark, drawn at the size the sidebar asks for. */
    function WallIcon(props) {
      const size = props && Number.isFinite(props.size) ? props.size : 18
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 20 20',
          fill: 'none',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('path', {
          d: 'M4.2 3.6h9.1a1.6 1.6 0 0 1 1.6 1.6v3.3',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        }),
        h('path', {
          d: 'M3.4 5.2v10.2a1.6 1.6 0 0 0 1.6 1.6h5.6',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        }),
        h('path', {
          d: 'M12.9 9.2a1.35 1.35 0 0 1 1.9 1.9l-5.1 5.1-2.4.6.6-2.4 5-5.2Z',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinejoin: 'round',
        }),
      )
    }

    function NoteCard(props) {
      const note = props.note
      const t = props.t
      const editing = props.editing
      const onEdit = props.onEdit
      const onChange = props.onChange
      const onRemove = props.onRemove
      const textRef = React.useRef(null)
      const style = paperStyle(note.palette)

      React.useEffect(() => {
        if (!editing) return
        const el = textRef.current
        if (!el) return
        el.focus()
        el.setSelectionRange(el.value.length, el.value.length)
      }, [editing])

      const grow = () => {
        const el = textRef.current
        if (!el) return
        el.style.height = 'auto'
        el.style.height = Math.min(Math.max(el.scrollHeight, 96), 260) + 'px'
      }

      React.useLayoutEffect(() => {
        if (editing) grow()
      }, [editing, note.text])

      if (editing) {
        return h(
          'article',
          { className: 'dsw-note dsw-edit', style },
          h('input', {
            className: 'dsw-cat-input',
            value: note.category,
            placeholder: t('categoryPlaceholder'),
            'aria-label': t('categoryPlaceholder'),
            onChange: (event) => onChange({ category: event.target.value }),
          }),
          h('textarea', {
            ref: textRef,
            value: note.text,
            'aria-label': t('edit'),
            onChange: (event) => onChange({ text: event.target.value }),
            onKeyDown: (event) => {
              if (event.key === 'Escape') {
                event.stopPropagation()
                onEdit(null)
              }
              if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                onEdit(null)
              }
            },
          }),
          h(
            'div',
            { className: 'dsw-edit-foot' },
            h('button', { type: 'button', className: 'dsw-text-btn', onClick: onRemove }, t('remove')),
            h('span', { style: { flex: 1 } }),
            h('button', { type: 'button', className: 'dsw-text-btn dsw-primary', onClick: () => onEdit(null) }, t('done')),
          ),
        )
      }

      return h(
        'article',
        { className: 'dsw-note', style, 'data-fresh': props.fresh ? 'true' : undefined },
        note.category ? h('div', { className: 'dsw-cat' }, note.category) : null,
        h('div', { className: 'dsw-text' }, note.text),
        h(
          'div',
          { className: 'dsw-foot' },
          h('span', { className: 'dsw-time' }, relativeTime(note.updatedAt, t)),
          h(
            'button',
            { type: 'button', className: 'dsw-icon-btn', title: t('edit'), 'aria-label': t('edit'), onClick: onEdit },
            h(PencilGlyph, { size: 14 }),
          ),
        ),
      )
    }

    function StickyWall(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const [notes, setNotes] = React.useState(readNotes)
      const [query, setQuery] = React.useState('')
      const [draft, setDraft] = React.useState('')
      const [palette, setPalette] = React.useState(PALETTES[0].key)
      const [editingId, setEditingId] = React.useState(null)
      const [undo, setUndo] = React.useState(null)
      const [storageFailed, setStorageFailed] = React.useState(false)
      const [fresh, setFresh] = React.useState(null)
      const draftRef = React.useRef(null)
      const freshTimer = React.useRef(0)

      React.useEffect(
        () => () => {
          window.clearTimeout(freshTimer.current)
        },
        [],
      )

      React.useEffect(() => {
        if (!writeNotes(notes)) setStorageFailed(true)
      }, [notes])

      React.useEffect(() => {
        if (!undo) return undefined
        const timer = window.setTimeout(() => setUndo(null), 8000)
        return () => window.clearTimeout(timer)
      }, [undo])

      const growDraft = () => {
        const el = draftRef.current
        if (!el) return
        el.style.height = 'auto'
        el.style.height = Math.min(Math.max(el.scrollHeight, 46), 180) + 'px'
      }

      React.useLayoutEffect(growDraft, [draft])

      const add = () => {
        const text = draft.trim()
        if (text === '') {
          if (draftRef.current) draftRef.current.focus()
          return
        }
        const now = Date.now()
        const note = {
          id: newId(),
          text,
          category: t('defaultCategory'),
          palette,
          createdAt: now,
          updatedAt: now,
        }
        setNotes((current) => [note, ...current])
        setDraft('')
        setQuery('')
        setUndo(null)
        setFresh(note.id)
        window.clearTimeout(freshTimer.current)
        freshTimer.current = window.setTimeout(() => setFresh(null), 900)
        if (draftRef.current) {
          draftRef.current.style.height = ''
          draftRef.current.focus()
        }
      }

      const update = (id, patch) => {
        setNotes((current) =>
          current.map((note) => (note.id === id ? { ...note, ...patch, updatedAt: Date.now() } : note)),
        )
      }

      const remove = (id) => {
        const index = notes.findIndex((note) => note.id === id)
        if (index < 0) return
        const removed = notes[index]
        setNotes((current) => current.filter((note) => note.id !== id))
        if (editingId === id) setEditingId(null)
        setUndo({ note: removed, index })
      }

      const takeBack = () => {
        if (!undo) return
        const restored = undo
        setUndo(null)
        setNotes((current) => {
          const next = current.slice()
          next.splice(Math.min(restored.index, next.length), 0, restored.note)
          return next
        })
      }

      const needle = query.trim().toLowerCase()
      const visible = needle
        ? notes.filter(
            (note) =>
              note.text.toLowerCase().includes(needle) ||
              (note.category || '').toLowerCase().includes(needle),
          )
        : notes

      const composerStyle = paperStyle(palette)

      return h(
        'div',
        { className: 'dsw-root' },
        h(
          'div',
          { className: 'dsw-inner' },
          h(
            'header',
            { className: 'dsw-head' },
            h(
              'div',
              { className: 'dsw-head-text' },
              h('h1', { className: 'dsw-title' }, t('title')),
              h('p', { className: 'dsw-sub' }, t('subtitle')),
            ),
            h(
              'div',
              { className: 'dsw-tools' },
              h(
                'label',
                { className: 'dsw-search' },
                h(SearchGlyph),
                h('input', {
                  value: query,
                  placeholder: t('search'),
                  'aria-label': t('search'),
                  onChange: (event) => setQuery(event.target.value),
                }),
              ),
              h('span', { className: 'dsw-count' }, countLabel(visible.length, t)),
            ),
          ),
          h(
            'div',
            { className: 'dsw-composer', style: composerStyle },
            h('textarea', {
              ref: draftRef,
              value: draft,
              rows: 1,
              placeholder: t('placeholder'),
              'aria-label': t('placeholder'),
              onChange: (event) => setDraft(event.target.value),
              onKeyDown: (event) => {
                if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault()
                  add()
                }
              },
            }),
            h(
              'div',
              { className: 'dsw-composer-foot' },
              h(
                'div',
                { className: 'dsw-swatches', role: 'group', 'aria-label': t('paper') },
                PALETTES.map((item) =>
                  h('button', {
                    key: item.key,
                    type: 'button',
                    className: 'dsw-swatch',
                    style: { background: item.bg },
                    'aria-pressed': palette === item.key ? 'true' : 'false',
                    'aria-label': t(COLOR_LABELS[item.key]),
                    title: t(COLOR_LABELS[item.key]),
                    onClick: () => setPalette(item.key),
                  }),
                ),
              ),
              h('span', { className: 'dsw-hint' }, t('addHint')),
              h(
                'button',
                { type: 'button', className: 'dsw-add', style: { background: composerStyle.color, color: paletteOf(palette).bg }, onClick: add },
                h(PlusGlyph),
                t('add'),
              ),
            ),
          ),
          storageFailed ? h('p', { className: 'dsw-warn', role: 'status' }, t('storageFailed')) : null,
          visible.length === 0
            ? h('p', { className: 'dsw-state' }, needle ? t('noMatch') : t('empty'))
            : h(
                'div',
                { className: 'dsw-wall' },
                visible.map((note) =>
                  h(NoteCard, {
                    key: note.id,
                    note,
                    t,
                    editing: editingId === note.id,
                    fresh: fresh === note.id,
                    onEdit: (open) => setEditingId(open ? note.id : null),
                    onChange: (patch) => update(note.id, patch),
                    onRemove: () => remove(note.id),
                  }),
                ),
              ),
          undo
            ? h(
                'div',
                { className: 'dsw-undo', role: 'status' },
                h('span', null, t('deleted')),
                h(
                  'button',
                  { type: 'button', className: 'dsw-text-btn dsw-primary', onClick: takeBack },
                  t('undo'),
                ),
              )
            : null,
        ),
      )
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh: ZH, en: EN }), 'sticky-wall: dictionaries')

      ctx.effect(() => {
        const style = document.createElement('style')
        style.setAttribute('data-dsh-sticky-wall', 'true')
        style.textContent = CSS
        document.head.appendChild(style)
        return () => style.remove()
      }, 'sticky-wall: styles')

      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          {
            name: 'sidebar.panellist',
            id: PANEL_ID,
            order: 30,
            label: () => ctx.locale.bind(NS)('wall'),
          },
          WallIcon,
        ),
      )

      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: PANEL_ID,
            inject: () => ({ t: ctx.locale.bind(NS) }),
          },
          StickyWall,
        ),
      )
    }

    return { inject: ['slots', 'locale'], apply }
  },
})
