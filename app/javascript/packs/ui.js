function placeCaretAtEnd(el) {
  el.focus()
  if (
    typeof window.getSelection != 'undefined' &&
    typeof document.createRange != 'undefined'
  ) {
    var range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  } else if (typeof document.body.createTextRange != 'undefined') {
    var textRange = document.body.createTextRange()
    textRange.moveToElementText(el)
    textRange.collapse(false)
    textRange.select()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const uploadButton = document.getElementsByClassName('uploadButton')[0]
  const fileName = document.getElementsByClassName('fileName')[0]
  const fileInput = document.getElementById('book_image')
  const formSubmit = document.getElementsByClassName('formSubmit')[0]
  const form = document.getElementsByTagName('form')[0]
  const customSelectElements = document.getElementsByClassName('customSelect')

  if (uploadButton) {
    uploadButton.addEventListener('click', () => {
      fileInput.click()
    })
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      fileName.innerHTML = fileInput.files[0].name
    })
  }

  if (formSubmit) {
    formSubmit.addEventListener('click', () => {
      form.submit()
    })
  }

  if (customSelectElements) {
    Array.from(customSelectElements).forEach((customSelect) => {
      const input = customSelect.getElementsByTagName('input')[0]
      const selectOptions = customSelect.getElementsByTagName('li')
      const currentSelection = customSelect.getElementsByClassName(
        'currentSelection'
      )[0]

      customSelect.addEventListener('click', () => {
        customSelect.classList.toggle('opened')
      })

      Array.from(selectOptions).forEach((selectOption) => {
        selectOption.addEventListener('click', () => {
          currentSelection.innerHTML = selectOption.innerHTML
          input.value = selectOption.dataset.id
        })
      })
    })
  }

  // Content Editable Demo

  const wrapper = document.getElementById('contentEditable')
  const textInput = document.getElementsByClassName('textInput')[0]
  const putButton = document.getElementsByClassName(
    'putTextToContentEditable'
  )[0]

  textInput.addEventListener('focus', () => {
    console.log('focus')
  })

  textInput.addEventListener('blur', () => {
    console.log('blur')
  })

  textInput.addEventListener('click', () => {
    console.log('click')
  })

  textInput.addEventListener('input', () => {
    console.log('input')
  })

  putButton.addEventListener('click', () => {
    textInput.innerHTML = 'Super Text'
  })

  document.onkeydown = (e) => {
    e = e || window.event

    console.log(e.keyCode)

    if (e.keyCode == 13) {
      e.preventDefault()
      // document.body.insertBefore(textInput, wrapper)
      let newInput = textInput.cloneNode(true)
      newInput.innerHTML = ''

      newInput.addEventListener('focus', () => {
        console.log('focus')
      })

      newInput.addEventListener('blur', () => {
        console.log('blur')
      })

      newInput.addEventListener('click', () => {
        console.log('click')
      })

      newInput.addEventListener('input', () => {
        console.log('input')
      })

      wrapper.appendChild(newInput)

      newInput.focus()
    }

    if (e.keyCode == 8) {
      const activeElement = document.activeElement
      console.log(activeElement)
      let previousSibling = activeElement.previousSibling

      if (previousSibling.nodeName == '#text') {
        previousSibling = previousSibling.previousSibling
      }

      console.log(previousSibling)

      if (activeElement.innerHTML.length <= 1) {
        previousSibling.focus()
        placeCaretAtEnd(previousSibling)
        activeElement.remove()
      }
    }
  }
})
