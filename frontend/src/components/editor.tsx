import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill Snow Theme

const Editor = ({value, setValue}) => {
  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean'] // remove formatting button
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
  ];

  return (
    <ReactQuill
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
};

export default Editor;
