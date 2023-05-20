import * as React from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

const Editor = ({userId, useId = React.useId, date = new Date()}) => {
  const [isSaving, setIsSaving] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const [redirect, setRedirect] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState(null)

  const id = useId()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    setIsSaving(true)
    try {
      const {data} = await savePost({
        id,
        title: title.value,
        content: content.value,
        tags: tags.value,
        userId,
        creationdate: date.toISOString(),
      })
      setResult({...data})
      setTimeout(() => {
        setRedirect(true)
      }, 50)
    } catch (error) {
      setErrorMessage(error.errorMessage)
      setIsSaving(false)
    }
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <>
      {errorMessage && <div role="alert">{errorMessage}</div>}
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
      {result && (
        <div>
          <p>{result?.title}</p>
          <p>{result?.content}</p>
          <p>{result?.tags}</p>
          <p>{result?.id}</p>
          <p>{result?.userId}</p>
          <p>{result?.creationdate}</p>
        </div>
      )}
    </>
  )
}

export {Editor}
