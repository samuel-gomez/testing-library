import * as React from 'react'

const Editor = () => {
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />
      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />
      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" />
      <button disabled={isSaving} type="submit">
        Submit
      </button>
    </form>
  )
}

export {Editor}
