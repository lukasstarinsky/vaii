'use client';

import ReactQuill from "react-quill";

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],

  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],

  ['clean']
];

export default function TextEditor(props) {
  return (
    <ReactQuill {...props} theme="snow" modules={{ toolbar: toolbarOptions }} />
  );
}