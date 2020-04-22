import React, {useState, useRef} from 'react'
import cookies from 'react-cookies'
import JoditEditor from 'jodit-react'
import './Board.scss'
import Http from '../../api'
const AdminBoard = (props) => {
    let usrInfo = cookies.load('userdata');
    const editor = useRef(null)
    const [title, setTitle] = useState('')
    const [introduce, setIntroduce] = useState('')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [example, setExample] = useState('')
	const [exaout, setExaout] = useState('');
	const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        direction: 'ltr',
        toolbarButtonSize: 'small'
    }
    
    let submit = () => {
        Http.requestPost('http://danny-server.kro.kr:5000/board/writeProblems',{
            title: title,
            introduce : introduce,
            input: input,
            output: output,
            example: example.replace("\n", "<br/>") + "|" + exaout.replace("\n", "<br/>")
        }).then(rw=>{
            alert("글쓰기가 완료되었습니다!");
            window.location.replace('/')
        }).catch(err=>{
            alert(err);
            console.log(err);
        })
    }
	
    return(
        <div>
            {
                (usrInfo == null || usrInfo.rank == 0) ? <p>This is admin page...</p>:
                <div className="editBoard">
                    <input type="text" className="title" onBlur={e=>{setTitle(e.target.value)}}></input>
                    
                    <div className="introduce_area">
                        <p>Introduce</p>
                        <JoditEditor
                            className="editor"
                            ref={editor}
                            value={introduce}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setIntroduce(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {console.log(newContent)}}
                        />
                    </div>
                    <div className="input_area">
                        <p>Input</p>
                        <JoditEditor
                            className="editor"
                            ref={editor}
                            value={input}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setInput(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {console.log(newContent)}}
                        />
                    </div>
                    <div className="output_area">
                        <p>Output</p>
                        <JoditEditor
                            className="editor"
                            ref={editor}
                            value={output}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setOutput(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {console.log(newContent)}}
                        />
                    </div>
                    <div className="example_input">
                        <p>Example input</p>
                        <JoditEditor
                            className="editor"
                            ref={editor}
                            value={example}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setExample(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {console.log(newContent)}}
                        />
                    </div>
                    <div className="example_output">
                        <p>Example output</p>
                        <JoditEditor
                            className="editor"
                            ref={editor}
                            value={exaout}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setExaout(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={newContent => {console.log(newContent)}}
                        />
                    </div>
                    <button className="savebtn" onClick={submit}> Save </button>
                </div>
            }
        </div>
    )
}
export default AdminBoard