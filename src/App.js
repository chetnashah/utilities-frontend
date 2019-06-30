import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

// const baseUrl = "http://utilities.jayshah.co:3000";
const baseUrl = "http://localhost:3000";

function App() {
  
  const firstFile = React.useRef(null);
  const file2 = React.useRef(null);
  const file3 = React.useRef(null);
  const file4 = React.useRef(null);

  const submitForm = async (ev) => {
    ev.preventDefault();
    console.log('submitting form = ' + firstFile + ' firstfile.current = ');
    console.log( firstFile.current.files[0]);
    const formData = new FormData();
    formData.append('avatar', firstFile.current.files[0]);
    const response = await Axios.post(`${baseUrl}/formpostwithfile`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('got response: ', response);
  }
  
  const autoFormSubmit = () => {
    console.log('autoformsubmit');
  }

  const onFileSelect3 = async (ev) => {
    console.log('on file select3: ');
    const targetFile = ev.target.files[0];
    const response = await Axios.get(`${baseUrl}/getPresignedUrl`,{
      params: {
        filename: targetFile.name,
        'contenttype': targetFile.type
      }
    });
    debugger;
    const uploadUrl = response.data.url;

    const uploadResponse = await Axios.put(uploadUrl, targetFile, {
      'Content-Type': targetFile.type
    });

    console.log(uploadResponse);
  }

  const onFileSelect4 = (ev) => {
    console.log('on file select 4: ');
    console.log(ev);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{border: "1px solid black"}}>
          Form upload flow
          <form onSubmit={submitForm}>
            <input ref={firstFile} type="file" name="avatar" />
            <input type="submit" />
          </form>
        </div>

        <div style={{"border": "1px solid blue"}}>
          form submit on select file
          <form action="http://example.com">
            <input ref={file2} type="file" onChange={autoFormSubmit} />
          </form>
        </div>

        <div style={{"border": "1px solid green"}}>
        signed upload flow(upload on select)
          <input ref={file3} type="file" onChange={onFileSelect3} />
        </div>

        <div style={{"border": "1px solid yellow"}}>
        signed upload flow(upload on form submit)

          <input ref={file4} type="file" onChange={onFileSelect4} />
        </div>
      </header>
    </div>
  );
}

export default App;
