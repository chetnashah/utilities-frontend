import React from 'react';
import './App.css';
import Axios from 'axios';
import { observer, inject } from 'mobx-react';
import MessageList from './MessageList';
console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
const baseUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:3000' 
: "https://utilities.jayshah.co:3443";

function App(props) {
  const firstFile = React.useRef(null);
  const file2 = React.useRef(null);
  const file3 = React.useRef(null);
  const file4 = React.useRef(null);

  const getFileInfo = (fileObj) => {
    var newObject  = {
      'lastModified'     : fileObj.lastModified,
      'lastModifiedDate' : fileObj.lastModifiedDate,
      'name'             : fileObj.name,
      'size'             : fileObj.size,
      'type'             : fileObj.type
   };
   return newObject;
   
  }

  const onFirstFileSelect = (ev) => {
    ev.preventDefault();
    console.log(ev.currentTarget.files[0]);
    props.Store.pushMessageToList('selected file: ' + JSON.stringify(getFileInfo(ev.currentTarget.files[0])));
  }

  const submitForm = async (ev) => {
    ev.preventDefault();
    console.log('submitting form = ' + firstFile + ' firstfile.current = ');
    console.log( firstFile.current.files[0]);

    const formData = new FormData();
    formData.append('avatar', firstFile.current.files[0]);
    try{
      const response = await Axios.post(`${baseUrl}/formpostwithfile`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('got response: ', response);
      props.Store.pushMessageToList('success posting form file to server: ' + JSON.stringify(response.data));
    } catch(err) {
      props.Store.pushMessageToList('error doing formpostfile: ' + err.toString());
    }
  }
  
  const autoFormSubmit = () => {
    console.log('autoformsubmit');
  }

  const onFileSelect4 = async (ev) => {
    console.log('on file select4: ');
    const targetFile = ev.target.files[0];
    try {
      const response = await Axios.get(`${baseUrl}/getPresignedUrl`,{
        params: {
          filename: targetFile.name,
          'contenttype': targetFile.type
        }
      });
      const uploadUrl = response.data.url;
      props.Store.pushMessageToList('success getting singed url: ' + uploadUrl)
      try{
        const uploadResponse = await Axios.put(uploadUrl, targetFile, {
          'Content-Type': targetFile.type
        });
        console.log(uploadResponse);
        props.Store.pushMessageToList('success PUTing file to S3: ' + uploadResponse.status);
      } catch(exp) {
        props.Store.pushMessageToList('Error doing PUT to S3' + exp.toString());
        return;
      }
  
    } catch(err) {
      props.Store.pushMessageToList('Error getting singed url: '+ err.toString());
      return;
    }
  }

  const onFileSelect3 = (ev) => {
    console.log('on file select 3: ');
    props.Store.pushMessageToList('selected file: ' + JSON.stringify(getFileInfo(ev.target.files[0])));
    console.log(ev);
  }

  const signFile = async (ev) => {
    console.log('signing file: ');
    console.log(file3.current.files[0]);
    const targetFile = file3.current.files[0];
    try {
      const response = await Axios.get(`${baseUrl}/getPresignedUrl`,{
        params: {
          filename: targetFile.name,
          'contenttype': targetFile.type
        }
      });
      const uploadUrl = response.data.url;
      props.Store.pushMessageToList('Successfully singed, signed url: ' + uploadUrl);
    } catch (exp) {
      props.Store.pushMessageToList('error signing file: ' + exp.toString());
    }
  }

  const submitSignedFile = (ev) => {
    console.log('submit signed file!');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{border: "1px solid black"}}>
          Form upload flow
          <form onSubmit={submitForm}>
            <input ref={firstFile} type="file" name="avatar" onChange={onFirstFileSelect} />
            <input type="submit" />
          </form>
        </div>

        <div style={{"border": "1px solid blue"}}>
          form submit on select file
          <form action="">
            <input ref={file2} type="file" onChange={autoFormSubmit} />
          </form>
        </div>


        <div style={{"border": "1px solid yellow"}}>
        signed upload flow(upload on form submit)

          <input ref={file3} type="file" onChange={onFileSelect3} />
          <button onClick={signFile}>Sign File</button>
          <button onClick={submitSignedFile}>Submit</button>
        </div>

                <div style={{"border": "1px solid green"}}>
        signed upload flow(upload on select) with capture=camera
          <input 
            capture="camera"
            accept="image/*"
            ref={file4}
            type="file"
            onChange={onFileSelect4} />
        </div>


        <MessageList />
      </header>
    </div>
  );
}

export default inject("Store")(observer(App));
